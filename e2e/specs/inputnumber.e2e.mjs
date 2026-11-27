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


const openNumber = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
};

const numberValue = async (page, key) => page.evaluate((name) => {
  const instance = globalThis.ng?.getComponent(document.querySelector('extra-input-number'));
  return instance?.[name];
}, key);

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
    {
      name: 'Properties API: A',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect, url }) => {
        const cases = { 'placeholder': 'Place', 'label': 'Custom', 'labelPosition': 'left', 'floatLabel': true, 'clearable': true, 'caption': 'Cap', 'captionSeverity': 'danger', 'info': 'Info' };
        for (const [key, value] of Object.entries(cases)) {
          const arg = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
          await openNumber(page, url, `${key}:${arg}`);
          const actual = await numberValue(page, key);
          const comparable = typeof actual === 'boolean' ? String(actual) : String(actual);
          expect(comparable, key).toBe(String(value));
        }
      }
    },
    {
      name: 'Properties API: B',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect, url }) => {
        const cases = { 'size': 'large', 'showButtons': true, 'mode': 'currency', 'currency': 'RUB', 'locale': 'ru-RU', 'readonly': true, 'fluid': true };
        for (const [key, value] of Object.entries(cases)) {
          const arg = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
          await openNumber(page, url, `${key}:${arg}`);
          const actual = await numberValue(page, key);
          const comparable = typeof actual === 'boolean' ? String(actual) : String(actual);
          expect(comparable, key).toBe(String(value));
        }
      }
    },
    {
      name: 'Properties API: C',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect, url }) => {
        const cases = { 'min': 1, 'max': 10, 'step': 2, 'suffix': 'kg', 'minFractionDigits': 2, 'maxFractionDigits': 3, 'useGrouping': true };
        for (const [key, value] of Object.entries(cases)) {
          const arg = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
          await openNumber(page, url, `${key}:${arg}`);
          const actual = await numberValue(page, key);
          const comparable = typeof actual === 'boolean' ? String(actual) : String(actual);
          expect(comparable, key).toBe(String(value));
        }
      }
    },
    {
      name: 'Properties API: D',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect, url }) => {
        const cases = { 'incrementButtonIcon': 'ti ti-plus', 'decrementButtonIcon': 'ti ti-minus', 'required': true, 'name': 'num', 'autocomplete': 'off', 'ariaLabel': 'Label', 'ariaLabelledBy': 'some', 'autofocus': true, 'tabindex': 3 };
        for (const [key, value] of Object.entries(cases)) {
          const arg = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
          await openNumber(page, url, `${key}:${arg}`);
          const actual = await numberValue(page, key);
          const comparable = typeof actual === 'boolean' ? String(actual) : String(actual);
          expect(comparable, key).toBe(String(value));
        }
      }
    },
    {
      name: 'Properties: onInput и onClear',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect }) => {
        const outputs = await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-input-number'));
          return [typeof instance?.onInput?.subscribe, typeof instance?.onClear?.subscribe];
        });
        expect(outputs, 'outputs').toEqual(['function', 'function']);
      }
    },
    {
      name: 'Properties: buttonLayout',
      story: 'components-form-inputnumber--default',
      run: async ({ page, expect }) => {
        expect(await numberValue(page, 'buttonLayout'), 'buttonLayout').toBe('stacked');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
