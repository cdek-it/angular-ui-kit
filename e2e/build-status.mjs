#!/usr/bin/env node
/**
 * Собирает e2e/STATUS.md из реестра, спек, отчётов и локальных коммитов.
 *
 * Запуск: node e2e/build-status.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const registry = JSON.parse(readFileSync(join(__dirname, 'registry.json'), 'utf8'));
const WAVES = {
  'static': ['avatar', 'badge', 'card', 'chip', 'divider', 'skeleton', 'progressbar', 'progressspinner', 'tag', 'timeline', 'breadcrumb', 'message', 'metergroup'],
  'form': ['checkbox', 'radiobutton', 'toggleswitch', 'togglebutton', 'select-button', 'inputmask', 'inputnumber', 'inputotp', 'password', 'textarea', 'slider', 'rating', 'inputgroup', 'inputtext', 'select', 'date-picker', 'autocomplete', 'multiselect', 'listbox'],
  'overlay': ['dialog', 'drawer', 'popover', 'tooltip', 'toast', 'confirm-dialog', 'menu', 'menubar', 'megamenu', 'panelmenu', 'tieredmenu', 'tabs', 'stepper', 'accordion', 'scroll-panel', 'fileupload'],
  'media': ['carousel', 'galleria', 'image', 'paginator', 'button']
};

const waveOf = (component) => Object.entries(WAVES).find(([, list]) => list.includes(component))?.[0] ?? 'other';

const readJson = (file) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
};

const commitFor = (component) => {
  try {
    return execFileSync('git', ['log', '--all', '--format=%h', '--grep', `test(${component}): добавить e2e-спеку`, '-1'], {
      cwd: ROOT,
      encoding: 'utf8'
    }).trim();
  } catch {
    return '';
  }
};

const rows = registry.components.map((item) => {
  const spec = existsSync(join(__dirname, 'specs', `${item.component}.e2e.mjs`));
  const e2e = readJson(join(__dirname, 'reports', `${item.component}-e2e.json`));
  const builtin = readJson(join(__dirname, 'reports', 'builtin', `${item.component}.json`));

  const e2eSummary = e2e ? `${e2e.summary.passed}/${e2e.summary.total}${e2e.summary.failed ? ` ✗${e2e.summary.failed}` : ''}` : '—';
  const builtinSummary = builtin ? `${builtin.numPassedTests}/${builtin.numTotalTests}${builtin.numFailedTests ? ` ✗${builtin.numFailedTests}` : ''}` : '—';

  return {
    ...item,
    wave: waveOf(item.component),
    spec,
    e2eSummary,
    builtinSummary,
    commit: commitFor(item.component)
  };
});

const status = (row) => {
  if (!row.spec) return 'ожидает';
  if (row.e2eSummary === '—') return 'спека';
  if (row.e2eSummary.includes('✗')) return 'падает';
  if (row.builtinSummary.includes('✗')) return 'builtin ✗';
  if (row.commit) return 'готово';
  return 'спека ок';
};

const lines = [
  '# E2E STATUS',
  '',
  `Обновлено: ${new Date().toISOString()}`,
  '',
  `Компонентов: ${rows.length}, stories: ${rows.reduce((sum, row) => sum + row.storyCount, 0)}.`,
  '',
  'Статусы: `ожидает` — нет спеки; `спека` — спека есть, прогона нет; `спека ок` — e2e зелёный, коммита нет;',
  '`builtin ✗` — падает встроенный раннер; `падает` — падает e2e; `готово` — e2e и builtin зелёные, коммит в ветке есть.',
  '',
  '| Компонент | Волна | Stories | Спека | e2e | builtin | Ветка | Коммит | Статус |',
  '|---|---|---|---|---|---|---|---|---|'
];

for (const row of rows.sort((a, b) => a.component.localeCompare(b.component))) {
  lines.push(
    `| ${row.component} | ${row.wave} | ${row.storyCount} | ${row.spec ? '✓' : '—'} | ${row.e2eSummary} | ${row.builtinSummary} | ${row.branch ?? '—'} | ${row.commit ? `\`${row.commit}\`` : '—'} | ${status(row)} |`
  );
}

const byWave = Object.fromEntries(Object.keys(WAVES).map((wave) => [wave, rows.filter((row) => row.wave === wave).length]));
lines.push('', `Волны: ${Object.entries(byWave).map(([wave, count]) => `${wave} — ${count}`).join(', ')}.`, '');

const done = rows.filter((row) => status(row) === 'готово').length;
lines.push(`Готово: ${done} из ${rows.length}.`, '');

writeFileSync(join(__dirname, 'STATUS.md'), `${lines.join('\n')}\n`);
log(`STATUS.md: ${rows.length} компонентов, готово ${done}`);
