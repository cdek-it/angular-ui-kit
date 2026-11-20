#!/usr/bin/env node
/**
 * Одна команда на компонент: поднять Storybook (если нужно), прогнать встроенный
 * test-runner и e2e-спеку, собрать общий отчёт.
 *
 *   node e2e/check.mjs button
 *   node e2e/check.mjs select --theme=light,dark
 *   node e2e/check.mjs button --spec=button-demo --fresh-baselines
 *   node e2e/check.mjs button --no-builtin
 *
 * Отчёт: e2e/reports/<component>-check.json. Exit code 1 — есть падения.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  log(`Usage: node e2e/check.mjs <component> [options]

Одна команда: Storybook (если нужно) + встроенный test-runner + e2e.

Options:
  --spec=<name>            e2e-спека, по умолчанию имя компонента
  --theme=light,dark       темы e2e, по умолчанию light
  --url=<url>              адрес Storybook, по умолчанию http://localhost:6007
  --port=<number>          порт, если --url не задан
  --no-builtin             пропустить встроенный test-runner
  --no-e2e                 пропустить e2e
  --no-start-storybook     не поднимать Storybook автоматически
  --fresh-baselines        baseline во временном каталоге`);
  process.exit(0);
}

const component = argv.find((arg) => !arg.startsWith('-'));
if (!component) {
  console.error('Укажите компонент: node e2e/check.mjs <component> [--spec=...] [--url=...]');
  process.exit(2);
}

const flag = (name, fallback = undefined) => {
  const prefix = `--${name}=`;
  const found = argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
};
const has = (name) => argv.includes(`--${name}`);

const port = Number(flag('port', '6007'));
const baseUrl = (flag('url', `http://localhost:${port}`) || '').replace(/\/+$/, '');
const spec = flag('spec', component);
const theme = flag('theme', 'light');
const skipBuiltin = has('no-builtin');
const skipE2e = has('no-e2e');
const noStart = has('no-start-storybook');
const freshBaselines = has('fresh-baselines');

const reportsDir = join(__dirname, 'reports');
const builtinReport = join(reportsDir, `${component}-builtin-runner.json`);
const e2eReport = join(reportsDir, `${spec}-e2e.json`);
const checkReport = join(reportsDir, `${component}-check.json`);

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

const isUp = async () => {
  try {
    return (await fetch(`${baseUrl}/iframe.html`, { signal: AbortSignal.timeout(1500) })).ok;
  } catch {
    return false;
  }
};

let storybook = null;
const stopStorybook = () => {
  if (!storybook || storybook.killed) return;
  try {
    process.kill(-storybook.pid, 'SIGTERM');
  } catch {
    storybook.kill('SIGTERM');
  }
  storybook = null;
};

const startStorybook = async () => {
  if (await isUp()) return false;
  if (noStart) {
    console.error(`Storybook не запущен на ${baseUrl}. Уберите --no-start-storybook или поднимите его вручную.`);
    process.exit(2);
  }

  log(`Storybook не запущен — поднимаю на :${port}…`);
  storybook = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['ng', 'run', 'angular-ui-kit:storybook', '--port', String(port), '--no-open'],
    { cwd: ROOT, detached: true, stdio: ['ignore', 'ignore', 'ignore'] }
  );

  const started = Date.now();
  while (Date.now() - started < 180_000) {
    if (await isUp()) {
      log(`Storybook готов за ${Math.round((Date.now() - started) / 1000)} с`);
      return true;
    }
    if (storybook.exitCode !== null) {
      console.error('Storybook завершился с ошибкой. Запустите вручную: npm run storybook -- --port ' + port);
      process.exit(2);
    }
    await sleep(1500);
  }

  console.error('Storybook не поднялся за 180 с.');
  stopStorybook();
  process.exit(2);
};

const resolveTitle = async () => {
  const response = await fetch(`${baseUrl}/index.json`);
  if (!response.ok) throw new Error(`index.json: HTTP ${response.status}`);
  const index = await response.json();
  const entries = Object.values(index.entries ?? {}).filter((entry) => entry.type !== 'docs');
  const normalized = component.toLowerCase().replace(/[^a-z0-9]/g, '');
  const exact = entries.filter((entry) => {
    const last = String(entry.title ?? '').split('/').pop() ?? '';
    return last.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized;
  });
  if (exact.length === 0) throw new Error(`в Storybook нет stories компонента «${component}»`);
  return { title: exact[0].title, count: exact.length };
};

const result = {
  component,
  spec,
  baseUrl,
  generatedAt: new Date().toISOString(),
  builtin: { status: 'skipped' },
  e2e: { status: 'skipped' }
};

const run = async () => {
  const startedStorybook = await startStorybook();

  try {
    const { title } = await resolveTitle();
    log(`\nКомпонент: ${component} (${title})`);

    if (!skipBuiltin) {
      log('\n── Storybook test-runner ─────────────────────────');
      const baselineRoot = freshBaselines ? mkdtempSync(join(tmpdir(), 'e2e-baselines-')) : join(__dirname, 'baselines');
      const runArgs = [
        join(__dirname, 'storybook-runner.mjs'),
        title,
        `--url=${baseUrl}`,
        '--',
        '--maxWorkers=2',
        '--json',
        '--outputFile',
        builtinReport
      ];

      const child = spawnSync(process.execPath, runArgs, {
        cwd: ROOT,
        stdio: 'inherit',
        env: { ...process.env, STORYBOOK_BASELINE_ROOT: baselineRoot }
      });
      result.builtin = { status: child.status === 0 ? 'passed' : 'failed', exitCode: child.status, report: builtinReport };
    }

    if (!skipE2e) {
      const specFile = join(__dirname, 'specs', `${spec}.e2e.mjs`);
      if (!existsSync(specFile)) {
        log(`\n── E2E ────────────────────────────────────────────`);
        log(`Спека ${spec}.e2e.mjs не найдена — пропускаю e2e.`);
        result.e2e = { status: 'skipped', reason: 'spec-not-found' };
      } else {
        log('\n── E2E ────────────────────────────────────────────');
        const child = spawnSync(process.execPath, [join(__dirname, 'run.mjs'), spec, `--theme=${theme}`], {
          cwd: ROOT,
          stdio: 'inherit'
        });
        result.e2e = { status: child.status === 0 ? 'passed' : 'failed', exitCode: child.status, report: e2eReport };
      }
    }
  } finally {
    if (startedStorybook) stopStorybook();
  }

  result.generatedAt = new Date().toISOString();
  writeFileSync(checkReport, `${JSON.stringify(result, null, 2)}\n`);

  log('\n── Итог ───────────────────────────────────────────');
  log(`builtin: ${result.builtin.status}${result.builtin.exitCode !== undefined ? ` (exit ${result.builtin.exitCode})` : ''}`);
  log(`e2e:     ${result.e2e.status}${result.e2e.exitCode !== undefined ? ` (exit ${result.e2e.exitCode})` : ''}`);
  log(`Отчёт:   ${checkReport}`);

  process.exit([result.builtin, result.e2e].some((part) => part.status === 'failed') ? 1 : 0);
};

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    stopStorybook();
    process.exit(130);
  });
}

run().catch((error) => {
  stopStorybook();
  console.error(error.message);
  process.exit(2);
});
