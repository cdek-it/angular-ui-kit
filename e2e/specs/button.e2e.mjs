/**
 * E2E-спека Button: размеры, варианты, состояния, события, fluid и бейджи.
 */

const STORIES = [
  { id: 'components-button--default', name: 'Default' },
  { id: 'components-button--variants', name: 'Variants' },
  { id: 'components-button--sizes', name: 'Sizes' },
  { id: 'components-button--icons', name: 'Icons' },
  { id: 'components-button--states', name: 'States' },
  { id: 'components-button--rounded', name: 'Rounded' },
  { id: 'components-button--badge', name: 'Badge' },
  { id: 'components-button--fluid', name: 'Fluid' },
  { id: 'components-button--events', name: 'Events' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.height > 0), 'высота story').toBe(true);
  }
});

const visibleButtons = (page) => page.locator('button.p-button');

const buttonByText = (page, text) => page.locator('button.p-button', { hasText: text }).first();

export default {
  component: 'button',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Sizes: высоты small < base < large < xlarge',
      story: 'components-button--sizes',
      run: async ({ page, expect }) => {
        const heights = await visibleButtons(page).evaluateAll((buttons) =>
          buttons.map((button) => Math.round(button.getBoundingClientRect().height))
        );
        expect(heights.length, 'количество кнопок').toBe(4);
        expect(heights[0] < heights[1], 'small ниже base').toBe(true);
        expect(heights[1] < heights[2], 'base ниже large').toBe(true);
        expect(heights[2] < heights[3], 'large ниже xlarge').toBe(true);
      }
    },
    {
      name: 'Variants: классы secondary/contrast/text/link',
      story: 'components-button--variants',
      run: async ({ page, expect }) => {
        const classes = await visibleButtons(page).evaluateAll((buttons) =>
          buttons.map((button) => button.className)
        );
        expect(classes[0], 'primary').toContain('p-button');
        expect(classes[1], 'secondary').toContain('p-button-secondary');
        expect(classes[2], 'tertiary').toContain('p-button-contrast');
        expect(classes[3], 'text').toContain('p-button-text');
        expect(classes[4], 'link').toContain('p-button-link');
      }
    },
    {
      name: 'Disabled: нативный disabled и отсутствие фокуса по Tab',
      story: 'components-button--states',
      run: async ({ page, expect }) => {
        const disabled = buttonByText(page, 'Disabled');
        expect(await disabled.isDisabled(), 'disabled-кнопка').toBe(true);

        await page.keyboard.press('Tab');
        const firstFocused = await page.evaluate(() => document.activeElement?.textContent?.trim());
        expect(firstFocused, 'первый Tab').toBe('Primary');

        await page.keyboard.press('Tab');
        const secondFocused = await page.evaluate(() => document.activeElement?.textContent?.trim());
        expect(secondFocused === 'Disabled', 'disabled пропускается по Tab').toBe(false);
      }
    },
    {
      name: 'Loading: класс p-button-loading и disabled',
      story: 'components-button--states',
      run: async ({ page, expect }) => {
        const loading = buttonByText(page, 'Loading');
        expect(await loading.getAttribute('class'), 'класс loading').toContain('p-button-loading');
        expect(await loading.isDisabled(), 'loading-кнопка disabled').toBe(true);
      }
    },
    {
      name: 'Events: click, focus и клавиатура пишутся в лог',
      story: 'components-button--events',
      run: async ({ page, expect, wait }) => {
        const button = buttonByText(page, 'Нативные события');

        await button.click();
        await wait(async () => (await page.locator('.events-log li').count()) > 0);
        const afterClick = await page.locator('.events-log li').allInnerTexts();
        expect(afterClick.some((entry) => entry.startsWith('click')), 'click в логе').toBe(true);

        await page.keyboard.press('Tab');
        await wait(async () => (await page.locator('.events-log li').first().innerText()).startsWith('focus'));
        const afterFocus = await page.locator('.events-log li').first().innerText();
        expect(afterFocus, 'focus в логе').toContain('focus');
      }
    },
    {
      name: 'Fluid: кнопки занимают ширину контейнера',
      story: 'components-button--fluid',
      run: async ({ page, expect }) => {
        const widths = await visibleButtons(page).evaluateAll((buttons) =>
          buttons.map((button) => ({
            button: Math.round(button.getBoundingClientRect().width),
            parent: Math.round(button.parentElement.getBoundingClientRect().width)
          }))
        );
        expect(widths.length, 'количество кнопок').toBe(4);
        for (const { button, parent } of widths) expect(button, 'ширина кнопки').toBe(parent);
      }
    },
    {
      name: 'Badge: четыре бейджа, у последнего severity=danger',
      story: 'components-button--badge',
      run: async ({ page, expect }) => {
        const badges = await page.locator('.p-badge').evaluateAll((elements) =>
          elements.map((element) => ({ text: element.textContent.trim(), className: element.className }))
        );
        expect(badges.length, 'количество бейджей').toBe(4);
        expect(badges.map((badge) => badge.text), 'тексты бейджей').toEqual(['8', '8', '8', '2']);
        expect(badges[3].className, 'severity последнего').toContain('p-badge-danger');
      }
    },
    {
      name: 'Icons: иконки слева/справа и icon-only',
      story: 'components-button--icons',
      run: async ({ page, expect }) => {
        const icons = await page.locator('button.p-button [class*=ti]').evaluateAll((elements) =>
          elements.map((element) => element.className)
        );
        expect(icons.length >= 4, 'количество иконок').toBe(true);
        expect(icons.join(' '), 'иконка слева').toContain('p-button-icon-left');
        expect(icons.join(' '), 'иконка справа').toContain('p-button-icon-right');
      }
    },
    {
      name: 'A11y: базовые кнопки без critical/serious',
      story: 'components-button--default',
      run: async ({ page, expect, a11y, formatViolations }) => {
        const violations = await a11y({
          rules: {
            'landmark-one-main': { enabled: false },
            region: { enabled: false },
            'page-has-heading-one': { enabled: false },
            'color-contrast': { enabled: false }
          }
        });
        expect(violations, `нарушения axe: ${formatViolations(violations)}`).toEqual([]);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} [dark]`, theme: 'dark' }
  ]
};
