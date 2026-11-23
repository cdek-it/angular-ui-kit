#!/usr/bin/env node
/**
 * Прогон всех e2e-спек подряд.
 *
 * Запуск: node e2e/all.mjs [--url=...] [--theme=light,dark] [--grep=...] [--headed]
 *
 * Каждая спека — отдельный процесс и отдельный браузер: падение одной не мешает
 * остальным, а итоговая сводка собирается по кодам возврата.
 */
import { readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const passThrough = process.argv.slice(2);

let specs = [];
try {
  specs = readdirSync(join(__dirname, 'specs'))
    .filter((file) => file.endsWith('.e2e.mjs'))
    .map((file) => file.replace(/\.e2e\.mjs$/, ''))
    .sort();
} catch {
  /* каталога спек нет: спеки приходят в компонентных PR */
}

if (specs.length === 0) {
  log('E2E-спек в e2e/specs нет: они приходят в компонентных PR.');
  process.exit(0);
}

const results = [];

for (const spec of specs) {
  log(`\n${'='.repeat(72)}\n${spec}\n${'='.repeat(72)}`);
  const result = spawnSync(process.execPath, [join(ROOT, 'e2e/run.mjs'), spec, ...passThrough], {
    cwd: ROOT,
    stdio: 'inherit'
  });
  results.push({ spec, code: result.status ?? 1 });
}

const failed = results.filter((result) => result.code !== 0);

log(`\n${'='.repeat(72)}`);
log(`Спек: ${results.length}, успешно: ${results.length - failed.length}, с падениями: ${failed.length}`);
for (const result of results) {
  log(`  ${result.code === 0 ? '✓' : '✗'} ${result.spec}`);
}

process.exit(failed.length > 0 ? 1 : 0);
