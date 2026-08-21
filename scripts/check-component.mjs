/**
 * Гейты качества для стилей одного компонента.
 *
 * Запуск: `npm run check:component -- button` (или несколько имён через пробел,
 * без аргументов — все компоненты).
 *
 * Имя компонента = имя файла в src/lib/providers/prime-preset/tokens/components без `.ts`.
 *
 * Гейты делятся на жёсткие (FAIL, ненулевой код возврата) и мягкие (WARN, требуют осознанного
 * решения человека). Полное описание причин — .claude/skills/migrate-component-tokens/references/gates.md
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PRESET = resolve(ROOT, 'src/lib/providers/prime-preset');
const CSS_DIR = resolve(PRESET, 'tokens/components');
const tokens = JSON.parse(readFileSync(resolve(PRESET, 'tokens/tokens.json'), 'utf8'));
const Aura = require('@primeuix/themes/aura').default ?? require('@primeuix/themes/aura');

// Корневые ветки токенов, общие для всех компонентов — на них ссылаться можно всегда.
const SHARED_ROOTS = new Set(['fonts', 'colors', 'sizing', 'dimension', 'effects', 'color']);

// CSS-значения, которые не являются размерами и потому не обязаны быть токенами.
const VALUE_ALLOWLIST =
  /^(0|auto|none|inherit|initial|unset|transparent|currentColor|min-content|max-content|fit-content|100%|50%|-50%)$/;

const get = (obj, segments) =>
  segments.reduce((acc, key) => (acc && typeof acc === 'object' && key in acc ? acc[key] : undefined), obj);

const resolvesInTokens = (path) => {
  const segments = path.split('.');
  for (const scope of [tokens.components, tokens.semantic, tokens.primitive, tokens.semantic.colorScheme?.light]) {
    if (get(scope, segments) !== undefined) return true;
  }
  const scheme = get(tokens.components?.[segments[0]], ['colorScheme', 'light']);
  return get(scheme, segments.slice(1)) !== undefined;
};

/**
 * Имя CSS-переменной, которую PrimeUIX выпустит для пути токена: служебные сегменты `root`
 * и `extend` отбрасываются, camelCase разбивается дефисами.
 */
const cssVarName = (path) =>
  '--p-' +
  path
    .split('.')
    .filter((s, i, all) => s !== 'root' && s !== 'extend' && !(s === 'colorScheme') && !(all[i - 1] === 'colorScheme'))
    .join('-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

/**
 * Тема, в которой живёт токен. Варианты light и dark выпускаются в разные блоки (`:root` и `.dark`)
 * и потому законно делят одно имя переменной — коллизией это не является.
 */
const themeScope = (path) => {
  const m = path.match(/(?:^|\.)colorScheme\.(\w+)(?:\.|$)/);
  return m ? m[1] : 'base';
};

/** Все листовые пути внутри объекта токенов, с префиксом. */
function leafPaths(node, prefix = []) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return [prefix.join('.')];
  return Object.entries(node).flatMap(([key, value]) => leafPaths(value, [...prefix, key]));
}

/** Убрать из исходника комментарии и селекторы — остаются только значения CSS-свойств. */
function declarationValues(source) {
  return [...source.matchAll(/^[^:{}\n]*:\s*([^;\n]+);/gm)]
    .map((m) => m[1])
    .filter((v) => !v.includes('--p-') || v.includes('${'));
}

function checkComponent(name) {
  const file = resolve(CSS_DIR, `${name}.ts`);
  if (!existsSync(file)) return [{ level: 'FAIL', gate: 'файл', text: `${name}.ts не найден` }];

  const source = readFileSync(file, 'utf8');
  const issues = [];
  const fail = (gate, text) => issues.push({ level: 'FAIL', gate, text });
  const warn = (gate, text) => issues.push({ level: 'WARN', gate, text });

  const refs = [...source.matchAll(/dt\(\s*'([^']+)'\s*\)/g)].map((m) => m[1]);

  // G1. Каждая dt()-ссылка резолвится в tokens.json.
  for (const ref of [...new Set(refs)]) {
    if (!resolvesInTokens(ref)) fail('G1 мёртвая ссылка', ref);
  }

  // G2. Значения CSS-свойств — только токены. Сырые размеры и цвета запрещены.
  for (const value of declarationValues(source)) {
    const cleaned = value.replace(/\$\{[^}]*\}/g, '·').trim();
    if (/#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|color-mix)\s*\(/.test(cleaned)) {
      fail('G2 сырой цвет', value.trim());
      continue;
    }
    for (const literal of cleaned.matchAll(/(?<![\w.·-])(\d*\.?\d+)(px|rem|em|ch|vh|vw|%)/g)) {
      if (!VALUE_ALLOWLIST.test(literal[0])) fail('G2 сырой размер', `${literal[0]}  в  "${value.trim()}"`);
    }
  }

  // G3. Обращение к теме только через dt() — сырое var(--p-*) не проверяется ничем.
  for (const raw of new Set([...source.matchAll(/var\((--p-[a-z0-9-]+)/g)].map((m) => m[1]))) {
    fail('G3 сырая var', raw);
  }

  // G4. Ровно один экспорт: <name>Css. Мёртвые дубли не тащим.
  if (/export\s+default/.test(source)) fail('G4 экспорт', 'есть export default — дубль/мёртвый код');
  const exports = [...source.matchAll(/export\s+const\s+(\w+)/g)].map((m) => m[1]);
  if (exports.length !== 1) fail('G4 экспорт', `экспортов ${exports.length}, ожидался один: ${exports.join(', ')}`);

  // G5. Слоя синонимов быть не должно: PrimeUIX уже выпускает переменную для каждого токена.
  if (/:root\s*\{/.test(source)) fail('G5 слой синонимов', 'блок :root — переменные уже выпускает тема');

  // G6. Ссылки на чужой компонент — скрытая связность, требует осознанного решения.
  const foreign = new Set();
  for (const ref of refs) {
    const head = ref.split('.')[0];
    if (head !== name.replace(/-/g, '') && !SHARED_ROOTS.has(head) && head in tokens.components) foreign.add(ref);
  }
  for (const ref of foreign) warn('G6 чужой компонент', ref);

  // G7. Коллизии: два пути токена схлопываются в одну CSS-переменную.
  const own = tokens.components[name.replace(/-/g, '')];
  if (own) {
    const byVar = new Map();
    for (const path of leafPaths(own)) {
      const key = `${themeScope(path)} ${cssVarName(`${name.replace(/-/g, '')}.${path}`)}`;
      if (!byVar.has(key)) byVar.set(key, []);
      byVar.get(key).push(path);
    }
    for (const [key, paths] of byVar) {
      if (paths.length > 1) fail('G7 коллизия имён', `${key.split(' ')[1]} ← ${paths.join(' и ')}`);
    }
  }

  // G8. Собственные токены компонента (те, которых нет у Aura) обязаны использоваться в CSS:
  // PrimeNG про них не знает, поэтому неиспользованный токен = дизайн задал, а мы не применили.
  //
  // Сравнение идёт по ИМЕНИ CSS-переменной, а не по пути: Aura держит цвета под
  // `colorScheme.light.root.background`, наш экспорт — под `root.background`, но переменная
  // у обоих одна (`--p-togglebutton-background`), и стили Aura её применяют. Сравнение путей
  // давало на такие токены ложные срабатывания.
  if (own) {
    const component = name.replace(/-/g, '');
    const auraVars = new Set(leafPaths(Aura.components?.[component] ?? {}).map((p) => cssVarName(`${component}.${p}`)));
    const usedVars = new Set(refs.map(cssVarName));
    for (const path of leafPaths(own)) {
      const varName = cssVarName(`${component}.${path}`);
      if (auraVars.has(varName)) continue; // переменную применяют стили Aura
      if (usedVars.has(varName)) continue; // применяем сами
      warn('G8 токен не применён', path);
    }
  }

  return issues;
}

const names = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const targets = names.length
  ? names
  : readdirSync(CSS_DIR)
      .filter((f) => f.endsWith('.ts'))
      .map((f) => basename(f, '.ts'));

let failed = 0;
for (const name of targets) {
  const issues = checkComponent(name);
  const fails = issues.filter((i) => i.level === 'FAIL');
  const warns = issues.filter((i) => i.level === 'WARN');
  if (!issues.length) {
    if (names.length) console.log(`✓ ${name}: все гейты пройдены`);
    continue;
  }
  console.log(`${fails.length ? '✗' : '!'} ${name}: ${fails.length} FAIL, ${warns.length} WARN`);
  for (const i of [...fails, ...warns]) console.log(`    ${i.level}  ${i.gate.padEnd(24)} ${i.text}`);
  if (fails.length) failed++;
}

if (!names.length) console.log(`\nКомпонентов с FAIL: ${failed} из ${targets.length}`);
process.exit(failed ? 1 : 0);
