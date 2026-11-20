/**
 * E2E-спека Listbox: выбор, множественный режим, фильтр, группы и состояния.
 */

const STORIES = [
  { id: 'components-form-listbox--checkbox', name: 'Checkbox' },
  { id: 'components-form-listbox--checkmark', name: 'Checkmark' },
  { id: 'components-form-listbox--custom', name: 'Custom' },
  { id: 'components-form-listbox--default', name: 'Default' },
  { id: 'components-form-listbox--disabled', name: 'Disabled' },
  { id: 'components-form-listbox--filter', name: 'Filter' },
  { id: 'components-form-listbox--grouped', name: 'Grouped' },
  { id: 'components-form-listbox--multiple', name: 'Multiple' }
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
  component: 'listbox',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: role=listbox и выбор опции',
      story: 'components-form-listbox--default',
      run: async ({ page, expect }) => {
        const list = page.locator('.p-listbox-list');
        expect(await list.getAttribute('role'), 'role списка').toBe('listbox');
        expect(await page.locator('.p-listbox-option').count(), 'опции').toBe(5);

        await page.locator('.p-listbox-option').nth(1).click();
        expect(await page.locator('.p-listbox-option-selected').count(), 'выбрано').toBe(1);
        expect(await page.locator('.p-listbox-option-selected').innerText(), 'значение').toBe('Rome');
      }
    },
    {
      name: 'Multiple: два выбранных пункта',
      story: 'components-form-listbox--multiple',
      run: async ({ page, expect }) => {
        await page.locator('.p-listbox-option').nth(0).click();
        await page.locator('.p-listbox-option').nth(2).click();
        expect(await page.locator('.p-listbox-option-selected').count(), 'выбрано').toBe(2);
      }
    },
    {
      name: 'Checkbox: чекбоксы у опций и выбор',
      story: 'components-form-listbox--checkbox',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-listbox-option .p-checkbox').count(), 'чекбоксы').toBe(5);
        await page.locator('.p-listbox-option').first().click();
        expect(await page.locator('.p-listbox-option-selected').count(), 'выбрано').toBe(1);
      }
    },
    {
      name: 'Filter: поиск оставляет London',
      story: 'components-form-listbox--filter',
      run: async ({ page, expect, wait }) => {
        const filter = page.locator('input.p-listbox-filter');
        await filter.fill('lon');
        await wait(async () => (await page.locator('.p-listbox-option').count()) === 1);
        expect(await page.locator('.p-listbox-option').innerText(), 'результат').toBe('London');
      }
    },
    {
      name: 'Grouped: две группы и шесть опций',
      story: 'components-form-listbox--grouped',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-listbox-option-group').count(), 'группы').toBe(2);
        expect(await page.locator('.p-listbox-option').count(), 'опции').toBe(6);
      }
    },
    {
      name: 'Disabled: класс p-disabled и выбор не меняется',
      story: 'components-form-listbox--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-listbox').getAttribute('class'), 'класс').toContain('p-disabled');
        await page.locator('.p-listbox-option').first().click({ force: true });
        expect(await page.locator('.p-listbox-option-selected').count(), 'выбрано').toBe(0);
      }
    },
    {
      name: 'Custom: три опции с кастомным содержимым',
      story: 'components-form-listbox--custom',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-listbox-option').count(), 'опции').toBe(3);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
