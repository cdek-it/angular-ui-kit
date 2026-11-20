/**
 * E2E-спека Checkbox: переключение, indeterminate, состояния и клавиатура.
 */

const STORIES = [
  { id: 'components-form-checkbox--default', name: 'Default' },
  { id: 'components-form-checkbox--indeterminate', name: 'Indeterminate' },
  { id: 'components-form-checkbox--labels', name: 'Labels' },
  { id: 'components-form-checkbox--states', name: 'States' }
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
  component: 'checkbox',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: клик переключает и ставит класс checked',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-checkbox-input').first();
        expect(await input.isChecked(), 'до клика').toBe(false);
        await page.locator('.p-checkbox').first().click();
        expect(await input.isChecked(), 'после клика').toBe(true);
        expect(await page.locator('.p-checkbox').first().getAttribute('class'), 'класс').toContain('p-checkbox-checked');
      }
    },
    {
      name: 'Labels: клик по лейблу переключает чекбокс',
      story: 'components-form-checkbox--labels',
      run: async ({ page, expect }) => {
        const label = page.locator('label.checkbox-label').first();
        const input = page.locator('.p-checkbox-input').first();
        expect(await label.getAttribute('for'), 'for').toBe(await input.getAttribute('id'));
        await label.click();
        expect(await input.isChecked(), 'после клика по лейблу').toBe(true);
      }
    },
    {
      name: 'Indeterminate: хост помечен, нативное состояние mixed',
      story: 'components-form-checkbox--indeterminate',
      knownIssue: 'PrimeNG рисует p-checkbox-indeterminate, но не выставляет input.indeterminate: скринридер видит unchecked',
      run: async ({ page, expect }) => {
        const host = page.locator('.p-checkbox').first();
        expect(await host.getAttribute('class'), 'класс indeterminate').toContain('p-checkbox-indeterminate');
        expect(await page.locator('.p-checkbox-input').first().evaluate((element) => element.indeterminate), 'input.indeterminate').toBe(true);
      }
    },
    {
      name: 'States: disabled и invalid',
      story: 'components-form-checkbox--states',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-checkbox-input').nth(1).isDisabled(), 'disabled').toBe(true);
        expect(await page.locator('.p-checkbox').nth(2).getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Keyboard: Space переключает чекбокс',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-checkbox-input').first();
        await input.focus();
        await page.keyboard.press('Space');
        expect(await input.isChecked(), 'после Space').toBe(true);
      }
    },
    {
      name: 'Checkbox: tabindex не должен быть NaN',
      story: 'components-form-checkbox--default',
      knownIssue: 'PrimeNG выставляет tabindex="NaN" на нативный input (невалидное значение)',
      run: async ({ page, expect }) => {
        const tabindex = await page.locator('.p-checkbox-input').first().getAttribute('tabindex');
        expect(tabindex === null || /^-?\d+$/.test(tabindex), 'валидный tabindex').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
