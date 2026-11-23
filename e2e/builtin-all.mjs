#!/usr/bin/env node
/**
 * Прогон встроенного Storybook test-runner по каждому компоненту из реестра.
 *
 * На компонент: обёртка e2e/storybook-runner.mjs (фильтрация index.json) + JSON-отчёт
 * в <storage>/reports/builtin/<component>.json. Сводка — <storage>/reports/builtin-summary.json.
 *
 * Запуск: node e2e/builtin-all.mjs [--only=select,button] [--limit=3] [--url=...]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';
import { reportsDir as storageReportsDir, storybookBaselinesDir } from './lib/storage.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const args = process.argv.slice(2);
const onlyArg = args.find((arg) => arg.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',').map((value) => value.trim())) : null;
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : Infinity;
const urlArg = args.find((arg) => arg.startsWith('--url='));
const url = urlArg ? urlArg.slice('--url='.length) : 'http://localhost:6007';

const registryPath = join(__dirname, 'registry.json');
if (!existsSync(registryPath)) {
  const build = spawnSync(process.execPath, [join(__dirname, 'build-registry.mjs')], { cwd: ROOT, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const reportsDir = join(storageReportsDir, 'builtin');
mkdirSync(reportsDir, { recursive: true });

let components = registry.components;
if (only) components = components.filter((item) => only.has(item.component));
components = components.slice(0, limit);

const results = [];

for (const item of components) {
  const reportPath = join(reportsDir, `${item.component}.json`);
  const started = Date.now();
  process.stdout.write(`${item.component.padEnd(18)} `);

  const run = spawnSync(
    process.execPath,
    [
      join(__dirname, 'storybook-runner.mjs'),
      item.component,
      `--url=${url}`,
      '--',
      '--maxWorkers=2',
      '--json',
      '--outputFile',
      reportPath
    ],
    {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
      // Свежие baseline в отдельном каталоге: не трогаем рабочие снимки и их дрейф.
      env: { ...process.env, STORYBOOK_BASELINE_ROOT: storybookBaselinesDir }
    }
  );

  let summary = { passed: 0, failed: 0, total: 0 };
  try {
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    summary = {
      passed: report.numPassedTests ?? 0,
      failed: report.numFailedTests ?? 0,
      total: report.numTotalTests ?? 0
    };
  } catch {
    /* отчёт не создан — ниже это видно по коду возврата */
  }

  const duration = Date.now() - started;
  const status = run.status === 0 ? 'ok' : `fail(${run.status})`;
  log(`${status}  ${summary.passed}/${summary.total}  ${duration}ms`);

  results.push({
    component: item.component,
    branch: item.branch,
    exitCode: run.status,
    duration,
    ...summary,
    report: reportPath,
    stderr: run.status === 0 ? undefined : (run.stderr ?? '').split('\n').filter(Boolean).slice(-20)
  });
}

const failed = results.filter((result) => result.exitCode !== 0);
const payload = {
  generatedAt: new Date().toISOString(),
  url,
  total: results.length,
  failed: failed.length,
  results
};

writeFileSync(join(storageReportsDir, 'builtin-summary.json'), `${JSON.stringify(payload, null, 2)}\n`);

log(`\nКомпонентов: ${results.length}, успешно: ${results.length - failed.length}, с падениями: ${failed.length}`);
if (failed.length > 0) {
  for (const result of failed) log(`  ✗ ${result.component} (exit ${result.exitCode})`);
  process.exit(1);
}
