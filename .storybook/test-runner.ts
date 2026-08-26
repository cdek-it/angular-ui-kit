import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { TestRunnerConfig } from '@storybook/test-runner';

/**
 * Снапшоты вычисленных стилей вместо пиксельных скриншотов.
 *
 * Слепок снимается с элементов, размеченных PrimeNG (`data-pc-section`), — это стабильная
 * семантическая карта компонента. Дифф читается как «paddingInline: 12px → 10px», не зависит
 * от шрифтов, сглаживания и ОС, поэтому baseline переносится между macOS и CI без docker.
 *
 * Обновить baseline после осознанной правки токенов: UPDATE_STYLE_BASELINES=1 npm run test-storybook
 */

const BASELINE_DIR = join(process.cwd(), '.storybook', 'style-baselines');
const UPDATE = process.env['UPDATE_STYLE_BASELINES'] === '1';

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

type StyleSnapshot = Record<string, Record<string, string>>;

/**
 * Веб-шрифты и картинки догружаются после рендера story и сдвигают геометрию: без ожидания
 * baseline ловит промежуточное состояние (`height: 0px` у превью, `40px` вместо `44px` у поля
 * с иконкой) и следующий же прогон падает на ровном месте.
 */
const waitForStableLayout = async (): Promise<void> => {
  await document.fonts.ready;

  await Promise.all(
    [...document.images]
      .filter((image) => !image.complete)
      .map(
        (image) =>
          new Promise<void>((resolve) => {
            image.addEventListener('load', () => resolve(), { once: true });
            image.addEventListener('error', () => resolve(), { once: true });
          })
      )
  );

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
};

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

const diff = (baseline: StyleSnapshot, actual: StyleSnapshot): string[] => {
  const changes: string[] = [];

  for (const key of new Set([...Object.keys(baseline), ...Object.keys(actual)])) {
    if (!(key in actual)) {
      changes.push(`${key}: элемент исчез`);
      continue;
    }
    if (!(key in baseline)) {
      changes.push(`${key}: новый элемент`);
      continue;
    }
    for (const [property, expected] of Object.entries(baseline[key])) {
      const received = actual[key][property];
      if (received !== expected) changes.push(`${key} · ${property}: ${expected} → ${received}`);
    }
  }

  return changes;
};

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    await page.evaluate(waitForStableLayout);
    const actual = await page.evaluate(collectStyles, TRACKED_PROPERTIES);
    if (Object.keys(actual).length === 0) return;

    const baselineFile = join(BASELINE_DIR, `${context.id}.json`);

    if (UPDATE || !existsSync(baselineFile)) {
      mkdirSync(dirname(baselineFile), { recursive: true });
      writeFileSync(baselineFile, `${JSON.stringify(actual, null, 2)}\n`, 'utf8');
      return;
    }

    const baseline = JSON.parse(readFileSync(baselineFile, 'utf8')) as StyleSnapshot;
    const changes = diff(baseline, actual);

    if (changes.length > 0) {
      throw new Error(
        [
          `Стили story «${context.title} / ${context.name}» разошлись с baseline:`,
          ...changes.map((change) => `  ${change}`),
          '',
          'Если изменение ожидаемое: UPDATE_STYLE_BASELINES=1 npm run test-storybook'
        ].join('\n')
      );
    }
  }
};

export default config;
