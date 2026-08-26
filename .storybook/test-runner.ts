import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getViolations, injectAxe } from 'axe-playwright';
import { getStoryContext, waitForPageReady, type TestRunnerConfig } from '@storybook/test-runner';

/**
 * Снапшоты вычисленных стилей вместо пиксельных скриншотов.
 *
 * Слепок снимается с элементов, размеченных PrimeNG (`data-pc-section`), — это стабильная
 * семантическая карта компонента. Дифф читается как «padding-top: 12px → 10px», не зависит
 * от шрифтов, сглаживания и ОС, поэтому baseline переносится между macOS и CI без docker.
 *
 * Каждая story снимается в трёх вариантах: `light` (десктоп, светлая тема), `dark` и `mobile`.
 * `light` хранится целиком, `dark` и `mobile` — только отличия от него: тёмная тема меняет
 * цвета, мобильный вьюпорт — единицы свойств, и хранить ради этого три полных копии незачем.
 *
 * Обновить baseline после осознанной правки токенов: UPDATE_STYLE_BASELINES=1 npm run test-storybook
 */

type Page = Parameters<NonNullable<TestRunnerConfig['postVisit']>>[0];
type StyleSnapshot = Record<string, Record<string, string>>;

const BASELINE_DIR = join(process.cwd(), '.storybook', 'style-baselines');
const UPDATE = process.env['UPDATE_STYLE_BASELINES'] === '1';

const A11Y_BASELINE_DIR = join(process.cwd(), '.storybook', 'a11y-baseline');
const UPDATE_A11Y = process.env['UPDATE_A11Y_BASELINE'] === '1';

const MOBILE_VIEWPORT = { width: 390, height: 844 };

/**
 * Story, снимок которых нестабилен по своей природе. Лента миниатюр галереи перерисовывается
 * вместе с позицией карусели: часть элементов остаётся свёрнутой в нулевую высоту, и какие
 * именно — от прогона к прогону разное. Снимок адресует повторы по порядку в DOM, поэтому там
 * он не воспроизводится; геометрию галереи покрывают остальные её stories.
 */
const STYLE_SNAPSHOT_SKIP = ['components-media-galleria--thumbnails'];
const SETTLE_TIMEOUT = 2000;

/**
 * Блокируют прогон только нарушения, которые реально мешают пользоваться компонентом.
 * `moderate` и `minor` axe тоже находит, но там много спорного — их не гейтим.
 */
const BLOCKING_A11Y_IMPACTS = ['critical', 'serious'];

const TRACKED_PROPERTIES = [
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'height',
  'min-height',
  'font-size',
  'line-height',
  'font-weight',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'gap',
  'color',
  'background-color',
  'border-top-color'
];

/**
 * Тема переключается классом на `<html>` — так же, как это делает `withThemeByClassName`
 * в `preview.ts`, и именно этот селектор ждёт PrimeNG (`darkModeSelector: '.dark'`).
 */
const VARIANTS: { name: string; apply: (page: Page) => Promise<void>; reset: (page: Page) => Promise<void> }[] = [
  {
    name: 'light',
    apply: async () => undefined,
    reset: async () => undefined
  },
  {
    name: 'dark',
    apply: (page) => page.evaluate(() => document.documentElement.classList.add('dark')),
    reset: (page) => page.evaluate(() => document.documentElement.classList.remove('dark'))
  },
  {
    name: 'mobile',
    apply: (page) => page.setViewportSize(MOBILE_VIEWPORT),
    reset: async () => undefined
  }
];

/**
 * Ждём, пока раскладка перестанет меняться: `waitForPageReady` закрывает загрузку шрифтов и
 * сети, но ленивые картинки и анимации раскрытия доезжают позже, и снимок ловит промежуточную
 * геометрию (`height: 0px` у превью галереи). Сигнатура опрашивается по кадрам, пока не совпадёт
 * дважды подряд.
 */
const settleLayout = (timeout: number): Promise<void> =>
  new Promise((resolve) => {
    const root = document.querySelector('#storybook-root');
    // Подпись собирается по тем же элементам, что попадут в снимок: у галереи превью лежат
    // в контейнере фиксированной высоты, поэтому размеры страницы не меняются, пока картинки
    // догружаются, — общая геометрия страницы такую гонку не ловит.
    const signature = () =>
      root
        ? [
            document.images.length - [...document.images].filter((image) => image.complete).length,
            ...[...root.querySelectorAll('[data-pc-section]')].map((element) =>
              Math.round(element.getBoundingClientRect().height)
            )
          ].join(',')
        : '';

    const deadline = performance.now() + timeout;
    let previous = signature();
    let stable = 0;

    const tick = () => {
      const current = signature();
      stable = current === previous ? stable + 1 : 0;
      previous = current;

      if (stable >= 2 || performance.now() > deadline) resolve();
      else requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });

const collectStyles = (properties: string[]): StyleSnapshot => {
  const root = document.querySelector('#storybook-root');
  if (!root) return {};

  const snapshot: StyleSnapshot = {};
  const seen = new Map<string, number>();

  root.querySelectorAll('[data-pc-section]').forEach((element) => {
    const name = element.getAttribute('data-pc-name') ?? element.tagName.toLowerCase();
    const base = `${name}/${element.getAttribute('data-pc-section')}`;
    const repeat = seen.get(base) ?? 0;
    seen.set(base, repeat + 1);

    const computed = getComputedStyle(element);
    snapshot[repeat === 0 ? base : `${base}[${repeat}]`] = Object.fromEntries(
      properties.map((property) => [property, computed.getPropertyValue(property)])
    );
  });

  return snapshot;
};

/** Свойства варианта, которые отличаются от `light`. Элементы с полным совпадением опускаются. */
const deltaFromBase = (base: StyleSnapshot, variant: StyleSnapshot): StyleSnapshot => {
  const delta: StyleSnapshot = {};

  for (const [key, properties] of Object.entries(variant)) {
    const changed = Object.entries(properties).filter(([property, value]) => base[key]?.[property] !== value);
    if (changed.length > 0) delta[key] = Object.fromEntries(changed);
  }

  return delta;
};

const diff = (baseline: StyleSnapshot, actual: StyleSnapshot): string[] => {
  const changes: string[] = [];

  for (const key of new Set([...Object.keys(baseline), ...Object.keys(actual)])) {
    const expectedProperties = baseline[key] ?? {};
    const receivedProperties = actual[key] ?? {};

    for (const property of new Set([...Object.keys(expectedProperties), ...Object.keys(receivedProperties)])) {
      const expected = expectedProperties[property] ?? '= light';
      const received = receivedProperties[property] ?? '= light';
      if (expected !== received) changes.push(`${key} · ${property}: ${expected} → ${received}`);
    }
  }

  return changes;
};

const compareWithBaseline = (file: string, actual: StyleSnapshot): string[] => {
  if (UPDATE || !existsSync(file)) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, `${JSON.stringify(actual, null, 2)}\n`, 'utf8');
    return [];
  }

  return diff(JSON.parse(readFileSync(file, 'utf8')) as StyleSnapshot, actual);
};

const formatFailure = (context: { title: string; name: string }, issues: string[]): string =>
  [
    `Проверки story «${context.title} / ${context.name}» не прошли:`,
    ...issues.map((issue) => `  ${issue}`),
    '',
    'Если расхождение стилей ожидаемое: UPDATE_STYLE_BASELINES=1 npm run test-storybook'
  ].join('\n');

/**
 * Нарушения доступности от axe — в том же формате, что и расхождения стилей.
 *
 * Гейтить всё сразу нельзя: на момент подключения axe находил `critical`/`serious` в 129 из 264
 * stories — это накопленный долг PrimeNG и обёрток, его не закрыть одним PR. Поэтому известные
 * правила зафиксированы в `.storybook/a11y-baseline/<storyId>.json` и прогон падает только на
 * **новом** нарушении. Список ведётся по id правила, без числа элементов, чтобы baseline
 * не дёргался от каждой правки разметки.
 *
 * Пересобрать после починки: UPDATE_A11Y_BASELINE=1 npm run test-storybook
 */
const collectA11yIssues = async (page: Page, storyId: string, options: unknown): Promise<string[]> => {
  const violations = (await getViolations(page, '#storybook-root', options as never)).filter((violation) =>
    BLOCKING_A11Y_IMPACTS.includes(violation.impact ?? '')
  );

  const baselineFile = join(A11Y_BASELINE_DIR, `${storyId}.json`);

  if (UPDATE_A11Y) {
    const rules = [...new Set(violations.map((violation) => violation.id))].sort();

    if (rules.length === 0) rmSync(baselineFile, { force: true });
    else {
      mkdirSync(A11Y_BASELINE_DIR, { recursive: true });
      writeFileSync(baselineFile, `${JSON.stringify(rules, null, 2)}\n`, 'utf8');
    }

    return [];
  }

  const known: string[] = existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : [];

  return violations
    .filter((violation) => !known.includes(violation.id))
    .map(
      (violation) => `[a11y/${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length} элем.)`
    );
};

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },

  async postVisit(page, context) {
    const { parameters } = await getStoryContext(page, context);
    const issues: string[] = [];

    if (!parameters['a11y']?.disable) {
      issues.push(...(await collectA11yIssues(page, context.id, parameters['a11y']?.options)));
    }

    if (STYLE_SNAPSHOT_SKIP.includes(context.id)) {
      if (issues.length > 0) throw new Error(formatFailure(context, issues));
      return;
    }

    const desktopViewport = page.viewportSize();
    const snapshots = new Map<string, StyleSnapshot>();

    for (const variant of VARIANTS) {
      await variant.apply(page);
      await waitForPageReady(page);
      await page.evaluate(settleLayout, SETTLE_TIMEOUT);
      snapshots.set(variant.name, await page.evaluate(collectStyles, TRACKED_PROPERTIES));
      await variant.reset(page);
    }

    if (desktopViewport) await page.setViewportSize(desktopViewport);

    const base = snapshots.get('light') as StyleSnapshot;
    if (Object.keys(base).length === 0) return;

    const changes: string[] = [];

    for (const [name, snapshot] of snapshots) {
      const elementsDiffer = name !== 'light' && Object.keys(snapshot).join() !== Object.keys(base).join();

      if (elementsDiffer) {
        changes.push(`${name}: набор элементов не совпадает с light — вариант меняет разметку, а не только стили`);
        continue;
      }

      const payload = name === 'light' ? base : deltaFromBase(base, snapshot);
      changes.push(
        ...compareWithBaseline(join(BASELINE_DIR, name, `${context.id}.json`), payload).map(
          (change) => `[${name}] ${change}`
        )
      );
    }

    issues.push(...changes);

    if (issues.length > 0) throw new Error(formatFailure(context, issues));
  }
};

export default config;
