/**
 * Postbuild: кладёт сгенерированные Tailwind-артефакты в dist/ и патчит dist/package.json,
 * чтобы subpath'ы `@cdek-it/angular-ui-kit/tailwind` (CSS) и `/tailwind/preset` (JS)
 * резолвились у consumer'а. Запускается в конце `build:lib`.
 *
 * ng-packagr генерирует `exports`-карту из entry-points и НЕ знает про наши CSS/JS-артефакты;
 * без этой правки `exports` заблокировал бы subpath `./tailwind/*` (exports — закрытое множество).
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src/tailwind');
const DIST = resolve(ROOT, 'dist');
const DIST_TW = resolve(DIST, 'tailwind');
const DIST_PKG = resolve(DIST, 'package.json');

if (!existsSync(DIST)) {
  console.error('✗ dist/ не найден — запустите после `ng build angular-ui-kit-lib`.');
  process.exit(1);
}
if (!existsSync(DIST_PKG)) {
  console.error('✗ dist/package.json не найден — ожидается, что его сгенерировал ng-packagr.');
  process.exit(1);
}

// 1) Копируем артефакт (чистый v4 — только theme.css)
mkdirSync(DIST_TW, { recursive: true });
const from = resolve(SRC, 'theme.css');
if (!existsSync(from)) {
  console.error(`✗ ${from} не найден — выполните \`npm run generate:tailwind\` сначала.`);
  process.exit(1);
}
copyFileSync(from, resolve(DIST_TW, 'theme.css'));

// 2) Патчим dist/package.json: exports для tailwind subpath'ов (v4 CSS-first only)
const pkg = JSON.parse(readFileSync(DIST_PKG, 'utf8'));
pkg.exports = pkg.exports || {};

const cssEntry = { default: './tailwind/theme.css' };
pkg.exports['./tailwind'] = cssEntry;
pkg.exports['./tailwind/theme.css'] = cssEntry;

// CSS не должен вырезаться tree-shaking'ом при JS-импорте (для тех, кто импортит css через bundler).
// Sass @use инлайнит CSS на этапе сборки — для основного сценария это не обязательно, но безопасно.
if (pkg.sideEffects === undefined || pkg.sideEffects === false) {
  pkg.sideEffects = ['**/*.css'];
} else if (Array.isArray(pkg.sideEffects) && !pkg.sideEffects.some((s) => s.includes('.css'))) {
  pkg.sideEffects.push('**/*.css');
}

writeFileSync(DIST_PKG, JSON.stringify(pkg, null, 2) + '\n');

console.log('✓ dist/tailwind/theme.css + exports patched');
