/**
 * E2E-спека MultiSelect: оверлей, выбор, чипы, группы и состояния.
 */

const STORIES = [
  { id: 'components-form-multiselect--chips', name: 'Chips' },
  { id: 'components-form-multiselect--default', name: 'Default' },
  { id: 'components-form-multiselect--disabled', name: 'Disabled' },
  { id: 'components-form-multiselect--grouped', name: 'Grouped' },
  { id: 'components-form-multiselect--invalid', name: 'Invalid' },
  { id: 'components-form-multiselect--labels', name: 'Labels' }
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

const openOverlay = async (page) => {
  await page.locator('.p-multiselect-label').click();
  await page.waitForSelector('.p-multiselect-overlay', { state: 'visible' });
};

export default {
  component: 'multiselect',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: combobox, открытие, пять опций и выбор',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect }) => {
        const hidden = page.locator('input[role=combobox]');
        expect(await hidden.count(), 'скрытый combobox').toBe(1);
        expect(await hidden.getAttribute('aria-expanded'), 'до открытия').toBe('false');

        await openOverlay(page);
        expect(await hidden.getAttribute('aria-expanded'), 'после открытия').toBe('true');
        expect(await page.locator('.p-multiselect-option').count(), 'опции').toBe(5);
        expect(await page.locator('.p-multiselect-option[role=option]').count(), 'role=option').toBe(5);

        await page.locator('.p-multiselect-option').first().click();
        expect(await page.locator('#storybook-root').innerText(), 'выбранное значение').toContain('Новосибирск');
      }
    },
    {
      name: 'Chips: два выбора дают два чипа',
      story: 'components-form-multiselect--chips',
      run: async ({ page, expect }) => {
        await openOverlay(page);
        expect(await page.locator('.p-multiselect-option').count(), 'опции').toBe(4);

        await page.locator('.p-multiselect-option').nth(0).click();
        await page.locator('.p-multiselect-option').nth(1).click();
        expect(await page.locator('.p-multiselect-chip').count(), 'чипы').toBe(2);

        await page.keyboard.press('Escape');
        expect(await page.locator('input[role=combobox]').getAttribute('aria-expanded'), 'после Esc').toBe('false');
      }
    },
    {
      name: 'Grouped: две группы и шесть опций',
      story: 'components-form-multiselect--grouped',
      run: async ({ page, expect }) => {
        await openOverlay(page);
        expect(await page.locator('.p-multiselect-option-group').count(), 'группы').toBe(2);
        expect(await page.locator('.p-multiselect-option').count(), 'опции').toBe(6);
      }
    },
    {
      name: 'Disabled: класс p-disabled и оверлей не открывается',
      story: 'components-form-multiselect--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-multiselect').getAttribute('class'), 'класс').toContain('p-disabled');
        await page.locator('.p-multiselect').click({ force: true });
        await page.waitForTimeout(300);
        expect(await page.locator('.p-multiselect-overlay').count(), 'оверлей').toBe(0);
      }
    },
    {
      name: 'Invalid: класс p-invalid',
      story: 'components-form-multiselect--invalid',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-multiselect').getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Labels: лейбл связан с полем',
      story: 'components-form-multiselect--labels',
      run: async ({ page, expect }) => {
        const label = page.locator('label').first();
        const target = await label.getAttribute('for');
        expect(target, 'for').toBeTruthy();
        expect(await page.evaluate((id) => Boolean(document.getElementById(id)), target), 'элемент с id').toBe(true);
      }
    },
    {
      name: 'Disabled: combobox объявлен aria-disabled',
      story: 'components-form-multiselect--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('input[role=combobox]').getAttribute('aria-disabled'), 'aria-disabled').toBe('true');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
