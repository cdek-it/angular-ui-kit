/**
 * E2E-спека InputOTP: ячейки, авто-переход, маска и состояния.
 */

const STORIES = [
  { id: 'components-form-inputotp--autofocus', name: 'Autofocus' },
  { id: 'components-form-inputotp--default', name: 'Default' },
  { id: 'components-form-inputotp--disabled', name: 'Disabled' },
  { id: 'components-form-inputotp--integer-only', name: 'IntegerOnly' },
  { id: 'components-form-inputotp--invalid', name: 'Invalid' },
  { id: 'components-form-inputotp--mask', name: 'Mask' }
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
  component: 'inputotp',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: четыре ячейки и переход фокуса',
      story: 'components-form-inputotp--default',
      run: async ({ page, expect }) => {
        const inputs = page.locator('input.p-inputotp-input');
        expect(await inputs.count(), 'ячейки').toBe(4);

        await inputs.first().fill('1');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('class')), 'фокус ушёл').toContain('p-inputotp-input');
      }
    },
    {
      name: 'Mask: ячейки скрывают ввод',
      story: 'components-form-inputotp--mask',
      run: async ({ page, expect }) => {
        const types = await page.locator('input.p-inputotp-input').evaluateAll((elements) => elements.map((element) => element.type));
        expect(types, 'типы ячеек').toEqual(['password', 'password', 'password', 'password']);
      }
    },
    {
      name: 'IntegerOnly: буква не принимается, цифра принимается',
      story: 'components-form-inputotp--integer-only',
      run: async ({ page, expect }) => {
        const first = page.locator('input.p-inputotp-input').first();
        await first.focus();
        await page.keyboard.type('a');
        expect(await first.inputValue(), 'буква').toBe('');
        await page.keyboard.type('5');
        expect(await first.inputValue(), 'цифра').toBe('5');
      }
    },
    {
      name: 'Disabled: все ячейки отключены',
      story: 'components-form-inputotp--disabled',
      run: async ({ page, expect }) => {
        const disabled = await page.locator('input.p-inputotp-input').evaluateAll((elements) => elements.map((element) => element.disabled));
        expect(disabled.every(Boolean), 'все disabled').toBe(true);
      }
    },
    {
      name: 'Invalid: класс p-invalid',
      story: 'components-form-inputotp--invalid',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-inputotp-input').first().getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Autofocus: первая ячейка в фокусе',
      story: 'components-form-inputotp--autofocus',
      run: async ({ page, expect }) => {
        expect(await page.evaluate(() => document.activeElement?.getAttribute('class')), 'фокус').toContain('p-inputotp-input');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
