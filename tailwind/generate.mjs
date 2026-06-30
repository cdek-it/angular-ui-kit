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
const OUT_DIR = resolve(ROOT, 'tailwind');

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
    /^(text|formField|content|surface|primary|navigation|overlay|highlight|focusRing|mask|list|background|border|icon)\.(.+)$/
  );
  if (semanticMatch) {
    const obj = walk(semantic[semanticMatch[1]], semanticMatch[2].split('.'));
    return typeof obj === 'string' ? resolveToken(obj) : obj;
  }
  const sizeMatch = path.match(/^size\.(.+)$/);
  if (sizeMatch) {
    return primitive.size[sizeMatch[1]];
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

// ── semantic → литералы из tokens.json (статика) ────────────────────────────
// Тема кита одна (darkModeSelector: false), пресет = definePreset(Aura, tokens), поэтому
// значения semantic-токенов в tokens.json и есть финальные цвета. Резолвим их в литералы,
// без линков на runtime --p-* (их имена у кастомного пресета нестандартны) и без fallback'ов.
// Нейминг чистый: foreground/secondary/muted/disabled (утилиты text-foreground, text-secondary…).
const SEMANTIC_TOKENS = [
  // [tailwind var, путь в semantic.colorScheme.light.*]
  ['--color-foreground', 'text.color'],
  ['--color-secondary', 'text.subtle'],
  ['--color-muted', 'text.muted'],
  ['--color-disabled', 'text.disabled'],
  ['--color-primary', 'primary.color'],
  ['--color-on-primary', 'primary.contrastColor'],
  ['--color-primary-hover', 'primary.hoverColor'],
  ['--color-primary-active', 'primary.activeColor'],
  ['--color-surface-ground', 'content.background'],
  ['--color-surface-section', 'content.hoverBackground'],
  ['--color-surface-card', 'content.background'],
  ['--color-surface-overlay', 'overlay.select.background'],
  ['--color-surface-border', 'content.borderColor'],
  ['--color-surface-hover', 'content.hoverBackground'],
  ['--color-form-border', 'formField.borderColor'],
  ['--color-form-bg', 'formField.background'],
  ['--color-danger', 'text.danger'],
  ['--color-success', 'text.success'],
  ['--color-warning', 'text.warning'],
  ['--color-info', 'text.info'],
  ['--color-help', 'text.help']
];

/** Разрешить semantic-токен по пути (text.color, primary.color, content.background…). */
function semanticValue(path) {
  return resolveToken(`{${path}}`);
}

/**
 * Гард: значение должно разрешиться в конкретную величину. Иначе генератор падает с понятной
 * ошибкой вместо того, чтобы молча написать `--x: undefined;` в тему.
 */
function assertResolved(twVar, value, path) {
  if (value === undefined || value === null || value === '' || `${value}`.includes('{')) {
    throw new Error(
      `[generate-tailwind] токен не разрешён: ${twVar} ← semantic.${path} (получено "${value}"). ` +
        `Проверьте путь в tokens.json (semantic.colorScheme.light.*).`
    );
  }
  return value;
}

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
const RADIUS = tokens.semantic.dimension.radius; // {100,200,...,none,max}
const SHADOWS = primitive.shadows; // {100..500, none} (со ссылками на alpha-цвета)
const EASING = primitive.transition.easing; // {linear, in, out, inOut}
// spacing: v4 отдаёт под spacing ОДНУ ручку --spacing (множитель). Базовый шаг кита —
// primitive.spacing["1x"] (= 0.25rem); вся шкала (p/m/w/h/gap/inset/...) выводится v4 как calc(var(--spacing)*N).
const SPACING_STEP = primitive.size['1x'];

const HEADER = `/**
 * СГЕНЕРИРОВАНО. Не править руками — источник: src/lib/providers/prime-preset/tokens/tokens.json.
 * Регенерация: \`npm run generate:tailwind\`.
 *
 * Tailwind v4 CSS-first тема кита @cdek-it/angular-ui-kit. Единая точка истины — tokens.json
 * (тот же источник, что и пресет PrimeNG provideExtraThemes()).
 *
 * Подключение в проекте:
 *   @use "tailwindcss";
 *   @use "@cdek-it/angular-ui-kit/tailwind";
 *
 * ВСЕ значения — статические литералы, разрешённые из tokens.json (semantic-токены из
 * semantic.colorScheme.light.*, оттенки палитры — из colors.solid/alpha). Ссылок на runtime
 * переменные PrimeNG (--p-*) НЕТ: тема кита одна (darkModeSelector: false), поэтому tokens
 * совпадают с рантаймом, и статика = рантайм. Поменяли токен → пересобрали кит → у consumer'а
 * обновилось (через bump версии).
 *
 * Покрытие: colors, fonts (--font-*), font-weight, font-size (--text-*), line-height (--leading-*),
 * radius (--radius-*), shadow (--shadow-*), easing (--ease-*), spacing (--spacing).
 */
`;

// ── theme.css (@theme) ──────────────────────────────────────────────────────
function buildThemeCss() {
  const lines = [];
  lines.push('@theme {');

  // semantic — литералы из tokens.json (статика, через гард)
  lines.push('  /* semantic — литералы из tokens.json (тема кита одна → tokens = рантайм) */');
  for (const [twVar, path] of SEMANTIC_TOKENS) {
    lines.push(`  ${twVar}: ${assertResolved(twVar, semanticValue(path), path)};`);
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
    lines.push(`  --radius-${k}: ${resolveToken(v)};`);
  }

  // spacing — единственная ручка v4; из неё выводятся p/m/w/h/gap/inset/space/translate.
  lines.push('');
  lines.push('  /* spacing: множитель для p/m/w/h/gap/inset/… (v4: calc(var(--spacing)*N)) */');
  lines.push(`  --spacing: ${assertResolved('--spacing', SPACING_STEP, "spacing['1x']")};`);

  // shadows (со ссылками на alpha-цвета раскрываем инлайн; гард ловит неразрешённые ref)
  lines.push('');
  lines.push('  /* shadows (box-shadow, {colors.alpha.*} раскрыты) */');
  for (const [k, v] of Object.entries(SHADOWS)) {
    const resolved = resolveInline(v);
    lines.push(`  --shadow-${k}: ${assertResolved(`--shadow-${k}`, resolved, `shadows.${k}`)};`);
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

console.log('✓ Generated tailwind/theme.css');
