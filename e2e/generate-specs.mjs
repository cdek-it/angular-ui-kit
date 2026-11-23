#!/usr/bin/env node
/**
 * Генерация smoke-спек для компонентов, у которых ещё нет e2e-спеки.
 *
 * Одна story = один тест: корень отрендерился, страница без pageerror. Плюс одна
 * проверка тёмной темы на первую story. Глубокие сценарии (клавиатура, оверлеи,
 * состояния) дописываются в спеку компонента вручную — генератор их не трогает.
 *
 * Запуск: node e2e/generate-specs.mjs [--only=avatar,card] [--force]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REGISTRY = join(__dirname, 'registry.json');
const SPECS = join(__dirname, 'specs');

const args = process.argv.slice(2);
const onlyArg = args.find((arg) => arg.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',').map((value) => value.trim())) : null;
const force = args.includes('--force');

if (!existsSync(REGISTRY)) {
  console.error('Нет e2e/registry.json. Сначала: node e2e/build-registry.mjs');
  process.exit(2);
}

const registry = JSON.parse(readFileSync(REGISTRY, 'utf8'));
const MARKER = 'Сгенерировано e2e/generate-specs.mjs';

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'story';

const quote = (value) => JSON.stringify(value);
const storiesLiteral = (stories) =>
  ['[', ...stories.map((story) => `  { id: ${quote(story.id)}, name: ${quote(story.name)} },`), ']'].join('\n');

const specFor = (item) => {
  const stories = item.stories.map((story) => ({ id: story.id, name: story.name }));
  const first = stories[0];

  const renderCheck = `run: async ({ page, expect, errors }) => {
        const pageErrors = errors.filter((error) => error.type === 'pageerror');
        expect(pageErrors.map((error) => error.text), 'ошибки страницы').toEqual([]);
        expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
        const box = await page.locator('#storybook-root').boundingBox();
        expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
      }`;

  return `/**
 * Smoke-спека «${item.component}»: все story рендерятся без pageerror, тёмная тема.
 *
 * ${MARKER}: глубокие сценарии (клавиатура, оверлеи, состояния) добавляются вручную.
 */

const STORIES = ${storiesLiteral(stories)};

export default {
  component: ${quote(item.component)},
  stories: Object.fromEntries(STORIES.map((story, index) => [\`story-\${index}\`, story.id])),
  tests: [
    ...STORIES.map((story, index) => ({
      name: \`Smoke: \${story.name}\`,
      story: \`story-\${index}\`,
      ${renderCheck}
    })),
    {
      name: \`Тёмная тема: \${STORIES[0].name}\`,
      story: 'story-0',
      theme: 'dark',
      ${renderCheck}
    }
  ]
};
`;
};

let created = 0;
let skipped = 0;

for (const item of registry.components) {
  if (only && !only.has(item.component)) continue;

  const file = join(SPECS, `${item.component}.e2e.mjs`);
  if (existsSync(file)) {
    const existing = readFileSync(file, 'utf8');
    if (!force || !existing.includes(MARKER)) {
      skipped += 1;
      continue;
    }
  }

  writeFileSync(file, specFor(item));
  created += 1;
  log(`+ ${item.component} (${item.stories.length} stories)`);
}

log(`\nСоздано: ${created}, пропущено (уже есть): ${skipped}`);
