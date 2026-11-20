/**
 * E2E-спека InputMask: маска, очистка, состояния и лейблы.
 */

const STORIES = [
  { id: 'components-form-inputmask--clearable', name: 'Clearable' },
  { id: 'components-form-inputmask--default', name: 'Default' },
  { id: 'components-form-inputmask--fluid', name: 'Fluid' },
  { id: 'components-form-inputmask--labels', name: 'Labels' },
  { id: 'components-form-inputmask--reactive-forms', name: 'ReactiveForms' },
  { id: 'components-form-inputmask--sizes', name: 'Sizes' },
  { id: 'components-form-inputmask--states', name: 'States' }
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
  component: 'inputmask',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: маска телефона форматирует ввод',
      story: 'components-form-inputmask--default',
      run: async ({ page, expect }) => {
        const input = page.locator('input').first();
        expect(await input.getAttribute('placeholder'), 'плейсхолдер маски').toBe('(___) ___-____');
        await input.fill('4951234567');
        expect(await input.inputValue(), 'отформатированное значение').toBe('(495) 123-4567');
      }
    },
    {
      name: 'Clearable: иконка очищает значение',
      story: 'components-form-inputmask--clearable',
      run: async ({ page, expect }) => {
        const input = page.locator('input').first();
        expect(await page.locator('.p-inputmask-clear-icon').count(), 'иконка очистки').toBe(1);
        await page.locator('.p-inputmask-clear-icon').click();
        expect(await input.inputValue(), 'значение после очистки').toBe('');
      }
    },
    {
      name: 'States: disabled, readonly и invalid',
      story: 'components-form-inputmask--states',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').nth(1).isDisabled(), 'disabled').toBe(true);
        expect(await page.locator('input').nth(2).evaluate((element) => element.readOnly), 'readonly').toBe(true);
        expect(await page.locator('input').nth(3).getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Labels: лейбл связан с полем',
      story: 'components-form-inputmask--labels',
      run: async ({ page, expect }) => {
        const label = page.locator('label').first();
        expect(await label.getAttribute('for'), 'for').toBe(await page.locator('input').first().getAttribute('id'));
      }
    },
    {
      name: 'Invalid: поле объявляет aria-invalid',
      story: 'components-form-inputmask--states',
      knownIssue: 'PrimeNG ставит только класс p-invalid; aria-invalid отсутствует',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').nth(3).getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
