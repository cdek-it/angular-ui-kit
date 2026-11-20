/**
 * E2E-спека RadioButton: выбор в группе, клавиатура, состояния и лейблы.
 */

const STORIES = [
  { id: 'components-form-radiobutton--caption', name: 'Caption' },
  { id: 'components-form-radiobutton--default', name: 'Default' },
  { id: 'components-form-radiobutton--disabled', name: 'Disabled' },
  { id: 'components-form-radiobutton--group', name: 'Group' },
  { id: 'components-form-radiobutton--invalid', name: 'Invalid' },
  { id: 'components-form-radiobutton--label-position', name: 'LabelPosition' }
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
  component: 'radiobutton',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Group: две группы по два варианта, по одному выбору в каждой',
      story: 'components-form-radiobutton--group',
      run: async ({ page, expect }) => {
        const inputs = page.locator('.p-radiobutton-input');
        expect(await inputs.count(), 'количество').toBe(4);
        const names = await inputs.evaluateAll((elements) => [...new Set(elements.map((element) => element.name))]);
        expect(names.length, 'количество групп').toBe(2);

        await page.locator('.p-radiobutton').nth(1).click();
        const checked = await inputs.evaluateAll((elements) => elements.map((element) => element.checked));
        expect(checked.filter(Boolean).length, 'по одному в каждой группе').toBe(2);
        expect(checked[1], 'выбран второй в первой группе').toBe(true);
        expect(checked[2], 'вторая группа не изменилась').toBe(true);
      }
    },
    {
      name: 'Keyboard: стрелка переключает выбор в группе',
      story: 'components-form-radiobutton--group',
      run: async ({ page, expect }) => {
        const inputs = page.locator('.p-radiobutton-input');
        await inputs.first().focus();
        await page.keyboard.press('ArrowDown');
        expect(await inputs.nth(1).isChecked(), 'выбран следующий').toBe(true);
        expect(await inputs.first().isChecked(), 'первый снят').toBe(false);
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'components-form-radiobutton--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-radiobutton-input').first().isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Invalid: класс p-invalid на радиокнопке',
      story: 'components-form-radiobutton--invalid',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-radiobutton').first().getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'LabelPosition: лейбл связан с полем',
      story: 'components-form-radiobutton--label-position',
      run: async ({ page, expect }) => {
        const label = page.locator('label').first();
        const inputId = await page.locator('.p-radiobutton-input').first().getAttribute('id');
        expect(await label.getAttribute('for'), 'for').toBe(inputId);
      }
    },
    {
      name: 'RadioButton: tabindex не должен быть NaN',
      story: 'components-form-radiobutton--default',
      knownIssue: 'PrimeNG выставляет tabindex="NaN" на нативный input',
      run: async ({ page, expect }) => {
        const tabindex = await page.locator('.p-radiobutton-input').first().getAttribute('tabindex');
        expect(tabindex === null || /^-?\d+$/.test(tabindex), 'валидный tabindex').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
