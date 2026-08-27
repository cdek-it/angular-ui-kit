import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getViolations, injectAxe } from 'axe-playwright';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
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

/** `expect` приходит из jest-окружения раннера, отдельного импорта у него нет. */
declare const expect: ((received: unknown) => {
  toMatchImageSnapshot: (options: Record<string, unknown>) => void;
}) & { extend: (matchers: Record<string, unknown>) => void };
type StyleSnapshot = Record<string, Record<string, string>>;

const BASELINE_DIR = join(process.cwd(), '.storybook', 'style-baselines');
const UPDATE = process.env['UPDATE_STYLE_BASELINES'] === '1';

const PIXEL_BASELINE_DIR = join(process.cwd(), '.storybook', 'pixel-baselines');
const CLIP_PADDING = 4;
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

/**
 * Компоненты, для которых снимаем ещё и пиксели: тень карточки, пунктир разделителя, форма
 * аватара, градиент скелетона, иконка внутри бейджа/тега/чипа — вычисленные стили этого
 * не описывают. Остальным хватает снимка стилей: он дешевле и не привязан к ОС.
 *
 * Baseline этих снимков в репозиторий не кладётся: рендер шрифтов в macOS и в образе CI
 * различается, и общий baseline не совпал бы ни там, ни там. Первый локальный прогон
 * создаёт снимки сам, дальше сверяется с ними.
 */
const PIXEL_SNAPSHOT_TITLES = [
  'Components/Panel/Card',
  'Components/Panel/Divider',
  'Components/Misc/Avatar',
  'Components/Misc/Skeleton',
  'Components/Misc/Badge',
  'Components/Misc/Tag',
  'Components/Misc/Chip'
];
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

/**
 * Пиксельный снимок — только для того, что вычисленные стили не описывают: теней, пунктира,
 * формы стрелки, градиента скелетона. Список компонентов — в `PIXEL_SNAPSHOT_TITLES`.
 *
 * Baseline привязан к ОС и рендеру шрифтов: снятый на macOS не совпадёт с Linux в CI. Гонять
 * генерацию и сверку нужно в одном окружении — в CI это образ `mcr.microsoft.com/playwright`.
 */
const FROZEN_ANIMATIONS = `*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
}`;

/**
 * Область снимка считается сама: у горизонтального разделителя `#storybook-root` имеет нулевую
 * высоту (линию рисует `::before`), и `locator.screenshot()` на таком элементе просто виснет,
 * ожидая, когда тот станет видимым. Поэтому берём объединение прямоугольников корня и всех его
 * потомков, расширяем на несколько пикселей и снимаем обычным клипом.
 */
const snapshotClip = (padding: number) => {
  const root = document.querySelector('#storybook-root');
  if (!root) return null;

  const rects = [root, ...root.querySelectorAll('*')].map((element) => element.getBoundingClientRect());
  const left = Math.min(...rects.map((rect) => rect.left));
  const top = Math.min(...rects.map((rect) => rect.top));
  const right = Math.max(...rects.map((rect) => rect.right));
  const bottom = Math.max(...rects.map((rect) => rect.bottom));

  return {
    x: Math.max(0, Math.floor(left) - padding),
    y: Math.max(0, Math.floor(top) - padding),
    width: Math.min(window.innerWidth, Math.ceil(right - left) + padding * 2),
    height: Math.min(window.innerHeight, Math.ceil(bottom - top) + padding * 2)
  };
};

/**
 * `complete` у картинки означает «загружена», но не «раскодирована и отрисована»: снимок аватара
 * успевал захватить кадр без изображения. `decode()` дожидается готовности к отрисовке.
 */
const decodeImages = (): Promise<unknown> =>
  Promise.all([...document.images].map((image) => image.decode().catch(() => undefined)));

const capturePixelSnapshot = async (page: Page, storyId: string): Promise<string[]> => {
  await page.addStyleTag({ content: FROZEN_ANIMATIONS });
  await page.evaluate(decodeImages);
  await page.evaluate(settleLayout, SETTLE_TIMEOUT);

  const clip = await page.evaluate(snapshotClip, CLIP_PADDING);
  if (!clip || clip.width < 1 || clip.height < 1) return ['[pixel] нечего снимать: у story нулевая область'];

  expect(await page.screenshot({ clip })).toMatchImageSnapshot({
    customSnapshotsDir: PIXEL_BASELINE_DIR,
    customDiffDir: join(PIXEL_BASELINE_DIR, '__diff__'),
    customSnapshotIdentifier: storyId,
    failureThreshold: 0.01,
    failureThresholdType: 'percent'
  });

  return [];
};

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },

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

    if (PIXEL_SNAPSHOT_TITLES.includes(context.title)) {
      issues.push(...(await capturePixelSnapshot(page, context.id)));
    }

    if (issues.length > 0) throw new Error(formatFailure(context, issues));
  }
};

export default config;
