/**
 * E2E-спека SelectButton: группа, выбор, disabled и иконки.
 */

const STORIES = [
  { id: 'components-form-selectbutton--default', name: 'Default' },
  { id: 'components-form-selectbutton--disabled', name: 'Disabled' },
  { id: 'components-form-selectbutton--fluid', name: 'Fluid' },
  { id: 'components-form-selectbutton--selected', name: 'Selected' },
  { id: 'components-form-selectbutton--semi-disabled', name: 'Semi Disabled' },
  { id: 'components-form-selectbutton--with-icons', name: 'With Icons' }
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
  component: 'select-button',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: группа из трёх кнопок и переключение выбора',
      story: 'components-form-selectbutton--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-selectbutton').getAttribute('role'), 'role').toBe('group');
        const buttons = page.locator('.p-selectbutton .p-togglebutton');
        expect(await buttons.count(), 'кнопки').toBe(3);
        expect(await buttons.first().getAttribute('aria-pressed'), 'первая выбрана').toBe('true');

        await buttons.nth(1).click();
        const pressed = await buttons.evaluateAll((elements) => elements.map((element) => element.getAttribute('aria-pressed')));
        expect(pressed, 'после клика').toEqual(['false', 'true', 'false']);
      }
    },
    {
      name: 'Disabled: вся группа помечена p-disabled',
      story: 'components-form-selectbutton--disabled',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-selectbutton .p-togglebutton').evaluateAll((elements) =>
          elements.map((element) => element.className)
        );
        expect(classes.every((className) => className.includes('p-disabled')), 'все p-disabled').toBe(true);
      }
    },
    {
      name: 'Disabled: кнопки объявляют aria-disabled',
      story: 'components-form-selectbutton--disabled',
      knownIssue: 'p-togglebutton в disabled-группе имеет p-disabled, но не aria-disabled',
      run: async ({ page, expect }) => {
        const values = await page.locator('.p-selectbutton .p-togglebutton').evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('aria-disabled'))
        );
        expect(values.every((value) => value === 'true'), 'aria-disabled').toBe(true);
      }
    },
    {
      name: 'With Icons: иконки в кнопках',
      story: 'components-form-selectbutton--with-icons',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-selectbutton .ti').count(), 'иконки').toBeGreaterThan(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
