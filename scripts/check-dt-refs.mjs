/**
 * Проверка ссылок на токены из компонентных стилей.
 *
 * Стили компонентов (src/lib/providers/prime-preset/tokens/components/*.ts) обращаются к токенам
 * через `dt('путь.к.токену')`. Если такого пути нет в tokens.json, PrimeNG подставит ссылку на
 * несуществующую CSS-переменную — свойство просто не применится, молча и без ошибки сборки.
 *
 * Скрипт ловит два класса проблем:
 *   1. мёртвые ссылки — `dt()` на путь, которого нет в tokens.json;
 *   2. коллизии имён — два разных пути схлопываются в одну CSS-переменную, потому что PrimeUIX
 *      отбрасывает служебные сегменты (`root`, `extend`): `multiselect.extend.paddingX` и
 *      `multiselect.root.paddingX` дают один и тот же `--p-multiselect-padding-x`.
 *
 * Запуск: `npm run check:tokens`. Ненулевой код возврата — если найдены мёртвые ссылки.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PRESET = resolve(ROOT, 'src/lib/providers/prime-preset');
const TOKENS_PATH = resolve(PRESET, 'tokens/tokens.json');
const CSS_DIR = resolve(PRESET, 'tokens/components');

const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'));

/** Собрать все уникальные `dt('...')` из компонентных стилей, с указанием файла. */
function collectRefs() {
  const refs = new Map(); // путь → Set(файлов)
  for (const file of readdirSync(CSS_DIR).filter((f) => f.endsWith('.ts'))) {
    const src = readFileSync(resolve(CSS_DIR, file), 'utf8');
    for (const m of src.matchAll(/dt\(\s*'([^']+)'\s*\)/g)) {
      if (!refs.has(m[1])) refs.set(m[1], new Set());
      refs.get(m[1]).add(file);
    }
  }
  return refs;
}

function walk(obj, segments) {
  let node = obj;
  for (const key of segments) {
    if (node && typeof node === 'object' && key in node) node = node[key];
    else return undefined;
  }
  return node;
}

/**
 * Резолв пути из `dt()`. Пресет собирается как definePreset(Aura, tokens), поэтому путь может
 * указывать в components, semantic, primitive, в light-схему семантики или в colorScheme.light
 * конкретного компонента.
 */
function resolves(path) {
  const segments = path.split('.');
  const scopes = [tokens.components, tokens.semantic, tokens.primitive, tokens.semantic.colorScheme?.light];
  for (const scope of scopes) {
    if (walk(scope, segments) !== undefined) return true;
  }
  const component = tokens.components?.[segments[0]];
  const scheme = walk(component, ['colorScheme', 'light']);
  return walk(scheme, segments.slice(1)) !== undefined;
}

/**
 * Имя CSS-переменной, которую PrimeUIX выпустит для пути токена: служебные сегменты `root`
 * и `extend` отбрасываются, camelCase разбивается дефисами.
 */
function cssVarName(path) {
  return (
    '--p-' +
    path
      .split('.')
      .filter((s) => s !== 'root' && s !== 'extend')
      .join('-')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
  );
}

/** Коллизии: два разных пути токенов дают одну и ту же CSS-переменную. */
function collectCollisions() {
  const byVar = new Map();
  const visit = (node, path) => {
    for (const [key, value] of Object.entries(node ?? {})) {
      const next = [...path, key];
      if (value && typeof value === 'object' && !Array.isArray(value)) visit(value, next);
      else {
        const full = next.join('.');
        const name = cssVarName(full);
        if (!byVar.has(name)) byVar.set(name, []);
        byVar.get(name).push(full);
      }
    }
  };
  for (const [component, definition] of Object.entries(tokens.components ?? {})) {
    visit(definition, [component]);
  }
  return [...byVar.entries()].filter(([, paths]) => paths.length > 1);
}

const refs = collectRefs();
const dead = [...refs.entries()].filter(([path]) => !resolves(path));
const collisions = collectCollisions();

console.log(`Ссылок dt() в компонентных стилях: ${refs.size}`);
console.log(`Мёртвых: ${dead.length}`);

if (dead.length) {
  const byFile = new Map();
  for (const [path, files] of dead) {
    for (const file of files) {
      if (!byFile.has(file)) byFile.set(file, []);
      byFile.get(file).push(path);
    }
  }
  console.log('');
  for (const [file, paths] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${file} (${paths.length})`);
    for (const path of paths.sort()) console.log(`      ${path}`);
  }
}

if (collisions.length) {
  console.log('');
  console.log(`Коллизии имён CSS-переменных: ${collisions.length}`);
  for (const [name, paths] of collisions) {
    console.log(`  ${name}`);
    for (const path of paths) console.log(`      ${path}`);
  }
}

process.exit(dead.length ? 1 : 0);
