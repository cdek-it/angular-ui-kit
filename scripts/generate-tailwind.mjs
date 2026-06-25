/**
 * Генератор Tailwind-темы кита (v4 CSS-first, @theme) из дизайн-токенов.
 *
 * Источник правды: src/lib/providers/prime-preset/tokens/tokens.json (тот же, что кормит
 * provideExtraThemes() / пресет Aura). На выходе — src/tailwind/theme.css (@theme).
 * Чистый v4: никакого JS-пресета/@config/v3.
 *
 * Запуск: `npm run generate:tailwind`. Включён в `build:lib`. НЕ правьте сгенерированный файл руками.
 *
 * Что маппится в v4-namespace'ы (@theme → утилиты): colors (--color-*), fonts (--font-*),
 * font-weight (--font-weight-*), font-size (--text-*), line-height (--leading-*),
 * border-radius (--radius-*), shadow (--shadow-*), transition-easing (--ease-*).
 * НЕ маппится (нет v4-namespace, либо одиночный множитель): spacing (= v4 --spacing, 0.25rem),
 * sizing, border-width (только --default-border-width), opacity, transition-duration.
 *
 * Почему primitive-палитра идёт статическим hex-слепком: у кита она вложена в `colors.solid.*`
 * (поверх Aura), поэтому runtime-имена `--p-*` у оттенков нестандартные/непредсказуемые. Только кит
 * знает свои токены — поэтому маппинг генерируется здесь, в одном месте. Semantic-токены, напротив,
 * имеют стабильные `--p-*` имена → линкуем на runtime-тему (цвет трекает provideExtraThemes).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TOKENS_PATH = resolve(ROOT, 'src/lib/providers/prime-preset/tokens/tokens.json');
const OUT_DIR = resolve(ROOT, 'src/tailwind');

const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'));
const primitive = tokens.primitive;
const semantic = tokens.semantic.colorScheme.light;

const SOLID = primitive.colors.solid; // 22 цвета × 50..950
const ALPHA = primitive.colors.alpha; // { white, black } × 100..1000

const SOLID_ORDER = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
];

/** Разрешить значение токена: литерал отдаём как есть, "{ref.path}" — раскрываем. */
function resolveToken(value, scope = tokens) {
  if (typeof value !== 'string') return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  const path = m[1];
  // {colors.solid.green.500} → primitive.colors.solid.green.500
  // {text.color} / {form.borderColor} → semantic.colorScheme.light.*
  const solidMatch = path.match(/^colors\.solid\.(.+)$/);
  if (solidMatch) {
    const [color, shade] = solidMatch[1].split('.');
    return SOLID[color]?.[shade];
  }
  const alphaMatch = path.match(/^colors\.alpha\.(.+)$/);
  if (alphaMatch) {
    const [color, shade] = alphaMatch[1].split('.');
    return ALPHA[color]?.[shade];
  }
  const semanticMatch = path.match(
    /^(text|form|content|surface|primary|navigation|overlay|highlight|focusRing|mask|list)\.(.+)$/
  );
  if (semanticMatch) {
    const obj = walk(semantic[semanticMatch[1]], semanticMatch[2].split('.'));
    return typeof obj === 'string' ? resolveToken(obj) : obj;
  }
  return value;
}

function walk(obj, keys) {
  return keys.reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

function solidHex(color, shade) {
  return SOLID[color]?.[shade];
}

/**
 * Разрешить все "{ref}" внутри строки (инлайн, напр. shadow "0 0 0.1rem {colors.alpha.black.200}").
 * Целостный "{...}" значения тоже раскрывает. Нераспознанные ref оставляет как есть.
 */
function resolveInline(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_m, path) => {
    const resolved = resolveToken(`{${path}}`);
    return resolved === `{${path}}` ? `{${path}}` : String(resolved);
  });
}

// ── semantic → линк на runtime --p-* + hex-fallback из tokens.json ──────────
// Имена --p-* — стандартные PrimeNG styled-mode (semantic.* => --p-*, camelCase → kebab).
const SEMANTIC_LINKS = [
  // [tailwind var, runtime --p-* name, fallback hex/value]
  ['--color-primary', 'var(--p-primary-color)', solidHex('green', '500')],
  ['--color-on-primary', 'var(--p-primary-contrast-color)', ALPHA.white[1000]],
  ['--color-primary-hover', 'var(--p-primary-hover-color)', solidHex('green', '600')],
  ['--color-primary-active', 'var(--p-primary-active-color)', solidHex('green', '700')],
  ['--color-surface-ground', 'var(--p-content-background)', ALPHA.white[1000]],
  ['--color-surface-section', 'var(--p-content-hover-background)', solidHex('zinc', '100')],
  ['--color-surface-card', 'var(--p-content-background)', ALPHA.white[1000]],
  ['--color-surface-overlay', 'var(--p-overlay-background)', ALPHA.white[1000]],
  ['--color-surface-border', 'var(--p-content-border-color)', solidHex('zinc', '200')],
  ['--color-surface-hover', 'var(--p-content-hover-background)', solidHex('zinc', '100')],
  ['--color-text', 'var(--p-text-color)', solidHex('zinc', '900')],
  ['--color-text-muted', 'var(--p-text-muted-color)', solidHex('zinc', '500')],
  ['--color-text-secondary', 'var(--p-text-secondary-color)', solidHex('zinc', '600')],
  ['--color-text-disabled', 'var(--p-text-disabled-color)', solidHex('zinc', '300')],
  ['--color-form-border', 'var(--p-form-field-border-color)', solidHex('zinc', '300')],
  ['--color-form-bg', 'var(--p-form-field-background)', ALPHA.white[1000]],
  ['--color-danger', 'var(--p-text-danger-color)', solidHex('red', '600')],
  ['--color-success', 'var(--p-text-success-color)', solidHex('green', '700')],
  ['--color-warning', 'var(--p-text-warning-color)', solidHex('yellow', '600')],
  ['--color-info', 'var(--p-text-info-color)', solidHex('blue', '600')],
  ['--color-help', 'var(--p-text-help-color)', solidHex('purple', '600')]
];

// ── service colors: семантика кита → какой solid-цвет несёт полный рейнж ─────
const SERVICE_TO_SOLID = {
  danger: 'red',
  success: 'green',
  warning: 'yellow',
  info: 'blue',
  help: 'purple'
};

// ── fonts / type / radius / shadow / easing / spacing ───────────────────────
const FONT_HEADING = primitive.fonts.fontFamily.heading; // 'TT Fellows'
const FONT_BASE = primitive.fonts.fontFamily.base; // 'PT Sans'
const FONT_WEIGHT = primitive.fonts.fontWeight; // {regular,medium,demibold,bold}
const FONT_SIZE = primitive.fonts.fontSize; // {100..1000}
const LINE_HEIGHT = primitive.fonts.lineHeight; // {100..1000, auto}
const RADIUS = primitive.borderRadius; // {100,200,...,none,max}
const SHADOWS = primitive.shadows; // {100..500, none} (со ссылками на alpha-цвета)
const EASING = primitive.transition.easing; // {linear, in, out, inOut}
// spacing: v4 отдаёт под spacing ОДНУ ручку --spacing (множитель). Базовый шаг кита —
// primitive.spacing["1x"] (= 0.25rem); вся шкала (p/m/w/h/gap/inset/...) выводится v4 как calc(var(--spacing)*N).
const SPACING_STEP = primitive.spacing['1x'];

const HEADER = `/**
 * СГЕНЕРИРОВАНО. Не править руками — источник: src/lib/providers/prime-preset/tokens/tokens.json.
 * Регенерация: \`npm run generate:tailwind\`.
 *
 * Tailwind v4 CSS-first тема кита @cdek-it/angular-ui-kit.
 * Подключение в проекте:
 *   @use "tailwindcss";
 *   @use "@cdek-it/angular-ui-kit/tailwind";
 *
 * Semantic-токены ссылаются на runtime-переменные PrimeNG (--p-*) — цвет трекает
 * provideExtraThemes(). Primitive-оттенки — статический слепок палитры кита
 * (их runtime-имена --p-* нестандартны, поэтому заморожены здесь).
 */
`;

// ── theme.css (@theme) ──────────────────────────────────────────────────────
function buildThemeCss() {
  const lines = [];
  lines.push('@theme {');

  // semantic links
  lines.push('  /* semantic — линк на runtime тему кита (--p-*) + hex-fallback */');
  for (const [twVar, runtime, fallback] of SEMANTIC_LINKS) {
    lines.push(`  ${twVar}: ${runtime.replace(')', `, ${fallback})`)};`);
  }

  // primary = green-палитра (primary кита это green.500). DEFAULT уже задан в semantic-блоке выше.
  lines.push('');
  lines.push('  /* primary — фирменный цвет кита (= green-палитра), оттенки */');
  for (const shade of shadesOf('green')) {
    lines.push(`  --color-primary-${shade}: ${solidHex('green', shade)};`);
  }

  // service colors (полные рейнжи)
  lines.push('');
  lines.push('  /* service colors (полные рейнжи из палитры кита) */');
  for (const [name, solid] of Object.entries(SERVICE_TO_SOLID)) {
    for (const shade of shadesOf(solid)) {
      lines.push(`  --color-${name}-${shade}: ${solidHex(solid, shade)};`);
    }
  }

  // surface ramp (zinc + surface.0)
  lines.push('');
  lines.push('  /* surface — zinc-палитра + surface.0 (white) */');
  lines.push(`  --color-surface-0: ${ALPHA.white[1000]};`);
  for (const shade of shadesOf('zinc')) {
    lines.push(`  --color-surface-${shade}: ${solidHex('zinc', shade)};`);
  }

  // вся solid-палитра (22 цвета)
  lines.push('');
  lines.push('  /* полная primitive-палитра кита (colors.solid.*) */');
  for (const color of SOLID_ORDER) {
    if (!SOLID[color]) continue;
    for (const shade of shadesOf(color)) {
      lines.push(`  --color-${color}-${shade}: ${solidHex(color, shade)};`);
    }
  }

  // alpha white/black
  lines.push('');
  lines.push('  /* alpha white/black (colors.alpha.*) */');
  for (const shade of Object.keys(ALPHA.white)) {
    lines.push(`  --color-white-${shade === '1000' ? 'DEFAULT' : shade}: ${ALPHA.white[shade]};`);
  }
  for (const shade of Object.keys(ALPHA.black)) {
    lines.push(`  --color-black-${shade === '1000' ? 'DEFAULT' : shade}: ${ALPHA.black[shade]};`);
  }

  // fonts
  lines.push('');
  lines.push('  /* fonts (шрифтовые файлы китом не публикуются — без них fallback) */');
  lines.push(`  --font-heading: '${FONT_HEADING}', sans-serif;`);
  lines.push(`  --font-base: '${FONT_BASE}', sans-serif;`);
  lines.push('  /* font-weight (utilities: font-regular/medium/demibold/bold) */');
  for (const [k, v] of Object.entries(FONT_WEIGHT)) {
    lines.push(`  --font-weight-${k}: ${v};`);
  }

  // type scale: font-size (--text-*) + line-height (--leading-*)
  lines.push('');
  lines.push('  /* font-size (--text-*), line-height (--leading-*) из типошкалы кита */');
  for (const [k, v] of Object.entries(FONT_SIZE)) {
    lines.push(`  --text-${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(LINE_HEIGHT)) {
    lines.push(`  --leading-${k}: ${v};`);
  }

  // radius
  lines.push('');
  lines.push('  /* border-radius */');
  for (const [k, v] of Object.entries(RADIUS)) {
    lines.push(`  --radius-${k}: ${v};`);
  }

  // spacing — единственная ручка v4; из неё выводятся p/m/w/h/gap/inset/space/translate.
  lines.push('');
  lines.push('  /* spacing: множитель для p/m/w/h/gap/inset/… (v4: calc(var(--spacing)*N)) */');
  lines.push(`  --spacing: ${SPACING_STEP};`);

  // shadows (со ссылками на alpha-цвета раскрываем инлайн)
  lines.push('');
  lines.push('  /* shadows (box-shadow, {colors.alpha.*} раскрыты) */');
  for (const [k, v] of Object.entries(SHADOWS)) {
    lines.push(`  --shadow-${k}: ${resolveInline(v)};`);
  }

  // easing
  lines.push('');
  lines.push('  /* transition easing (--ease-*) */');
  for (const [k, v] of Object.entries(EASING)) {
    lines.push(`  --ease-${k}: ${v};`);
  }

  lines.push('}');
  return lines.join('\n');
}

function shadesOf(color) {
  return Object.keys(SOLID[color] || {});
}

// ── write ───────────────────────────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });
const themeCss = `${HEADER}\n${buildThemeCss()}\n`;
writeFileSync(resolve(OUT_DIR, 'theme.css'), themeCss);

console.log('✓ Generated src/tailwind/theme.css');
