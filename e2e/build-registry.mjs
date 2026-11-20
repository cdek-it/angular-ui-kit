#!/usr/bin/env node
/**
 * Реестр компонентов для e2e-работ: stories, группа, ветка.
 *
 * Источник stories — живой index.json Storybook (не storybook-static: он отстаёт).
 * Ветка выбирается по конвенции `feature/<group>-<component>-figma-sync`; если её нет —
 * следующие варианты, иначе `branch: null` и компонент попадает в список нерешённых.
 *
 * Запуск: node e2e/build-registry.mjs [--url=http://localhost:6007]
 * Результат: e2e/registry.json
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { log } from './lib/log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const urlArg = process.argv.find((arg) => arg.startsWith('--url='));
const baseUrl = (urlArg ? urlArg.slice('--url='.length) : 'http://localhost:6007').replace(/\/+$/, '');

const index = await (await fetch(`${baseUrl}/index.json`)).json();
const componentsOnDisk = new Set(
  readdirSync(join(ROOT, 'src/lib/components')).filter((name) => existsSync(join(ROOT, 'src/lib/components', name)))
);
const branches = execFileSync('git', ['branch', '--format=%(refname:short)'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

const groupFromTitle = (title) => {
  const parts = String(title).split('/');
  return parts.length > 2 ? parts[1].toLowerCase() : 'components';
};

const branchFor = (component, group) => {
  const candidates = [
    `feature/${group}-${component}-figma-sync`,
    `feature/${component}-figma-sync`,
    `feature/${component}`,
    component,
    `e2e/${component}`
  ];
  return candidates.find((candidate) => branches.includes(candidate)) ?? null;
};

const byComponent = new Map();

for (const entry of Object.values(index.entries ?? {})) {
  if (entry.type === 'docs') continue;

  const importPath = entry.importPath ?? '';
  const fromPath = importPath.match(/src\/stories\/components\/([^/]+)\//)?.[1];
  const component = fromPath ?? String(entry.title).split('/').pop().toLowerCase();
  if (!componentsOnDisk.has(component)) continue;

  if (!byComponent.has(component)) {
    byComponent.set(component, {
      component,
      title: entry.title,
      group: groupFromTitle(entry.title),
      stories: []
    });
  }

  byComponent.get(component).stories.push({ id: entry.id, name: entry.name });
}

const registry = [...byComponent.values()]
  .map((item) => {
    item.stories.sort((a, b) => a.name.localeCompare(b.name));
    return {
      ...item,
      branch: branchFor(item.component, item.group),
      storyCount: item.stories.length
    };
  })
  .sort((a, b) => a.component.localeCompare(b.component));

const unresolved = registry.filter((item) => !item.branch);
const payload = {
  generatedAt: new Date().toISOString(),
  storybook: baseUrl,
  total: registry.length,
  unresolved: unresolved.map((item) => item.component),
  components: registry
};

writeFileSync(join(__dirname, 'registry.json'), `${JSON.stringify(payload, null, 2)}\n`);

log(`Компонентов: ${registry.length}, stories: ${registry.reduce((sum, item) => sum + item.storyCount, 0)}`);
log(`Без ветки: ${unresolved.length}${unresolved.length ? ` — ${unresolved.map((item) => item.component).join(', ')}` : ''}`);
log('\nКомпонент          Stories  Ветка');
for (const item of registry) {
  log(`${item.component.padEnd(18)} ${String(item.storyCount).padStart(4)}     ${item.branch ?? '—'}`);
}
