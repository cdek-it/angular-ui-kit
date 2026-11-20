/**
 * E2E-спека Slider: значения, диапазон, клавиатура и ориентация.
 */

const STORIES = [
  { id: 'components-form-slider--default', name: 'Default' },
  { id: 'components-form-slider--disabled', name: 'Disabled' },
  { id: 'components-form-slider--range', name: 'Range' },
  { id: 'components-form-slider--step', name: 'Step' },
  { id: 'components-form-slider--vertical', name: 'Vertical' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
  }
});

export default {
  component: 'slider',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: роль slider, 50 и стрелка вправо',
      story: 'components-form-slider--default',
      run: async ({ page, expect }) => {
        const handle = page.locator('.p-slider-handle');
        expect(await handle.getAttribute('role'), 'role').toBe('slider');
        expect(await handle.getAttribute('aria-valuenow'), 'значение').toBe('50');
        expect(await handle.getAttribute('aria-valuemin'), 'min').toBe('0');
        expect(await handle.getAttribute('aria-valuemax'), 'max').toBe('100');

        await handle.focus();
        await page.keyboard.press('ArrowRight');
        expect(await handle.getAttribute('aria-valuenow'), 'после ArrowRight').toBe('51');
      }
    },
    {
      name: 'Range: два ползунка 20 и 80',
      story: 'components-form-slider--range',
      run: async ({ page, expect }) => {
        const handles = page.locator('.p-slider-handle');
        expect(await handles.count(), 'ползунки').toBe(2);
        expect(await handles.nth(0).getAttribute('aria-valuenow'), 'первый').toBe('20');
        expect(await handles.nth(1).getAttribute('aria-valuenow'), 'второй').toBe('80');
      }
    },
    {
      name: 'Vertical: вертикальная ориентация',
      story: 'components-form-slider--vertical',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-slider').getAttribute('class'), 'класс').toContain('p-slider-vertical');
      }
    },
    {
      name: 'Disabled: ползунок недоступен',
      story: 'components-form-slider--disabled',
      knownIssue: 'У disabled-слайдера handle остаётся focusable (tabindex=0) и без aria-disabled',
      run: async ({ page, expect }) => {
        const handle = page.locator('.p-slider-handle');
        const tabindex = await handle.getAttribute('tabindex');
        const disabled = await handle.getAttribute('aria-disabled');
        expect(disabled === 'true' || tabindex === '-1', 'недоступен').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
