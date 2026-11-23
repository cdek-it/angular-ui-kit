const STORIES = [
  ['default', 'components-form-textarea--default'],
  ['error', 'components-form-textarea--error'],
  ['disabled', 'components-form-textarea--disabled'],
  ['readonly', 'components-form-textarea--readonly'],
  ['clearable', 'components-form-textarea--clearable'],
  ['fluid', 'components-form-textarea--fluid'],
  ['float-label', 'components-form-textarea--float-label'],
  ['auto-resize', 'components-form-textarea--auto-resize']
];

export default {
  component: 'textarea',
  stories: Object.fromEntries(STORIES),
  tests: [
    ...STORIES.map(([name, id]) => ({
      name: `Smoke: ${name}`,
      story: id,
      run: async ({ page, expect, errors }) => {
        await page.waitForSelector('textarea');
        expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
        expect(await page.locator('textarea').count(), 'textarea').toBe(1);
      }
    })),
    {
      name: 'Error: p-invalid и aria-invalid',
      story: 'error',
      run: async ({ page, expect }) => {
        const field = page.locator('textarea');
        expect(await field.getAttribute('class'), 'класс').toContain('p-invalid');
        expect(await field.getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Readonly: поле только для чтения',
      story: 'readonly',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    }
  ]
};
