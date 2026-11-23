#!/usr/bin/env node
/**
 * Раннер e2e-тестов компонентов на Storybook.
 *
 * Запуск:
 *   node e2e/run.mjs select
 *   node e2e/run.mjs select --url=http://localhost:6007 --theme=light,dark
 *   node e2e/run.mjs select --grep=клавиатура --headed
 *
 * Спека — `e2e/specs/<component>.e2e.mjs` с default-экспортом:
 *   { component, stories: { default: 'components-form-select--default' }, tests: [...] }
 *
 * Каждый тест получает свой browser context: состояние одной проверки не влияет
 * на другую. Отчёт пишется в `e2e/reports/<component>-e2e.json`, скриншоты
 * падений — в `e2e/artifacts/<component>/`.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

import { scanA11y, formatViolations } from './lib/a11y.mjs';
import { expect } from './lib/expect.mjs';
import { poll } from './lib/poll.mjs';
import { DEFAULT_STORYBOOK_URL, normalizeBaseUrl, openStory, storyUrl } from './lib/storybook.mjs';
import { focused } from './lib/dom.mjs';
import { log } from './lib/log.mjs';
import { artifactsDir as artifactsRoot, reportsDir } from './lib/storage.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const component = args.find((arg) => !arg.startsWith('-'));
const flag = (name, fallback = undefined) => {
  const prefix = `--${name}=`;
  const found = args.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
};
const has = (name) => args.includes(`--${name}`);

if (!component) {
  console.error('Укажите компонент: node e2e/run.mjs <component> [--url=...] [--theme=light,dark] [--grep=...] [--headed]');
  process.exit(2);
}

const baseUrl = normalizeBaseUrl(flag('url', DEFAULT_STORYBOOK_URL));
const themes = (flag('theme', 'light') || 'light').split(',').map((theme) => theme.trim()).filter(Boolean);
const grep = flag('grep');
const headed = has('headed');
const timeout = Number(flag('timeout', '30000'));

const specPath = join(__dirname, 'specs', `${component}.e2e.mjs`);
let spec;
try {
  spec = (await import(pathToFileURL(specPath).href)).default;
} catch (error) {
  console.error(`Не удалось загрузить спеку ${specPath}: ${error.message}`);
  process.exit(2);
}

const stories = spec.stories ?? {};
const resolveStory = (test) => {
  if (test.story && typeof test.story === 'object') return test.story;
  const id = stories[test.story] ?? test.story;
  if (!id) throw new Error(`Тест «${test.name}»: не найдена story «${test.story}»`);
  return { id, args: test.args };
};

const selected = (spec.tests ?? []).filter((test) => {
  if (grep && !test.name.toLowerCase().includes(grep.toLowerCase())) return false;
  return true;
});

if (selected.length === 0) {
  console.error(`В спеке ${component} нет тестов под фильтр «${grep ?? ''}»`);
  process.exit(2);
}

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const artifactsDir = join(artifactsRoot, component);
mkdirSync(reportsDir, { recursive: true });
mkdirSync(artifactsDir, { recursive: true });

const browser = await chromium.launch({ headless: !headed });
const results = [];
let failed = 0;
let skipped = 0;

const contextFor = async (test) => {
  const context = await browser.newContext({
    viewport: test.viewport ?? { width: 1280, height: 800 },
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow'
  });
  return context;
};

const runTest = async (test, theme) => {
  const started = Date.now();
  const story = resolveStory(test);
  const name = theme === 'light' ? test.name : `${test.name} [${theme}]`;
  const testSlug = `${slug(test.name)}${theme === 'light' ? '' : `-${theme}`}`;
  const context = await contextFor(test);
  const page = await context.newPage();
  page.setDefaultTimeout(timeout);

  const consoleErrors = [];
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(`console: ${message.text()}`);
  });

  let pageErrors = [];

  try {
    const opened = await openStory(page, baseUrl, {
      id: story.id,
      theme,
      args: story.args,
      timeout,
      waitFor: test.waitFor
    });
    pageErrors = opened.errors;

    const ctx = {
      page,
      theme,
      expect: (actual, label) => expect(actual, label),
      wait: (check, options) => poll(check, { timeout, label: test.name, ...options }),
      a11y: (options) => scanA11y(page, options),
      formatViolations,
      focused: () => focused(page),
      errors: pageErrors,
      url: storyUrl(baseUrl, { id: story.id, theme, args: story.args }),
      test
    };

    await test.run(ctx);

    const duration = Date.now() - started;
    results.push({
      name,
      story: story.id,
      theme,
      status: 'passed',
      duration,
      consoleErrors,
      pageErrors,
      note: test.knownIssue ? 'известный дефект больше не воспроизводится' : undefined
    });
    log(`  ✓ ${name} (${duration}ms)${test.knownIssue ? ' — дефект больше не воспроизводится' : ''}`);
    return true;
  } catch (error) {
    const known = Boolean(test.knownIssue);
    if (!known) failed += 1;
    const duration = Date.now() - started;
    const screenshot = join(artifactsDir, `${testSlug}.png`);
    try {
      await page.screenshot({ path: screenshot, fullPage: false });
    } catch {
      /* страница могла закрыться — скриншот не критичен */
    }
    results.push({
      name,
      story: story.id,
      theme,
      status: known ? 'known' : 'failed',
      duration,
      knownIssue: test.knownIssue,
      error: { message: error.message, stack: error.stack?.split('\n').slice(0, 6).join('\n') },
      screenshot,
      consoleErrors,
      pageErrors
    });
    log(`  ${known ? '!' : '✗'} ${name} (${duration}ms)${known ? ' — известный дефект' : ''}`);
    log(`    ${error.message.split('\n')[0]}`);
    if (error.stack && process.env.E2E_VERBOSE) log(error.stack);
    return false;
  } finally {
    await context.close();
  }
};

log(`\nE2E ${component} · Storybook ${baseUrl} · темы: ${themes.join(', ')}`);

for (const test of selected) {
  if (test.skip) {
    skipped += 1;
    results.push({ name: test.name, status: 'skipped', reason: test.skip });
    log(`  - ${test.name} (skip: ${test.skip})`);
    continue;
  }

  const testThemes = test.theme ? [test.theme] : themes;
  for (const theme of testThemes) {
    await runTest(test, theme);
  }
}

await browser.close();

const passed = results.filter((result) => result.status === 'passed').length;
const failedResults = results.filter((result) => result.status === 'failed');
const knownResults = results.filter((result) => result.status === 'known');
const report = {
  component,
  baseUrl,
  generatedAt: new Date().toISOString(),
  summary: { total: results.length, passed, failed, skipped, known: knownResults.length },
  results
};

const reportPath = join(reportsDir, `${component}-e2e.json`);
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

log(`\nИтого: ${passed} passed, ${failed} failed, ${knownResults.length} known, ${skipped} skipped`);
log(`Отчёт: ${reportPath}`);

if (knownResults.length > 0) {
  log('\nИзвестные дефекты (не блокируют прогон):');
  for (const result of knownResults) {
    log(`- ${result.name}: ${result.error.message.split('\n')[0]}`);
  }
}

if (failedResults.length > 0) {
  log('\nПадения:');
  for (const result of failedResults) {
    log(`- ${result.name}: ${result.error.message.split('\n')[0]}`);
    if (result.screenshot) log(`  ${result.screenshot}`);
  }
  process.exit(1);
}
