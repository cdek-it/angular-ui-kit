/**
 * E2E-спека InputNumber: spinbutton, кнопки, валюта, очистка и состояния.
 */

const STORIES = [
  { id: 'components-form-inputnumber--buttons', name: 'Buttons' },
  { id: 'components-form-inputnumber--clearable', name: 'Clearable' },
  { id: 'components-form-inputnumber--currency', name: 'Currency' },
  { id: 'components-form-inputnumber--default', name: 'Default' },
  { id: 'components-form-inputnumber--disabled', name: 'Disabled' },
  { id: 'components-form-inputnumber--float-label', name: 'FloatLabel' },
  { id: 'components-form-inputnumber--labels', name: 'Labels' }
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
  component: 'inputnumber',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: role=spinbutton и ввод числа',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect }) => {
        const input = page.locator('input').first();
        expect(await input.getAttribute('role'), 'role').toBe('spinbutton');
        await input.fill('42');
        expect(await input.inputValue(), 'значение').toBe('42');
      }
    },
    {
      name: 'Buttons: стрелки увеличивают и уменьшают значение',
      story: 'components-form-inputnumber--buttons',
      run: async ({ page, expect }) => {
        const input = page.locator('input').first();
        await page.locator('.p-inputnumber-increment-button').click({ force: true });
        expect(await input.inputValue(), 'после +').toBe('1');
        await page.locator('.p-inputnumber-decrement-button').click({ force: true });
        expect(await input.inputValue(), 'после −').toBe('0');
      }
    },
    {
      name: 'Currency: значение с символом рубля',
      story: 'components-form-inputnumber--currency',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').first().inputValue(), 'значение').toContain('₽');
      }
    },
    {
      name: 'Clearable: иконка очищает значение',
      story: 'components-form-inputnumber--clearable',
      run: async ({ page, expect }) => {
        const input = page.locator('input').first();
        await page.locator('.p-inputnumber-clear-icon').click();
        expect(await input.inputValue(), 'после очистки').toBe('');
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'components-form-inputnumber--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').first().isDisabled(), 'disabled').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
