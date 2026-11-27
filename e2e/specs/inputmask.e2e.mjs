/**
 * E2E-спека InputMask: маска, очистка, состояния и лейблы.
 */

const STORIES = [
  { id: 'components-form-inputmask--clearable', name: 'Clearable' },
  { id: 'components-form-inputmask--default', name: 'Default' },
  { id: 'components-form-inputmask--danger', name: 'Danger' },
  { id: 'components-form-inputmask--disabled', name: 'Disabled' },
  { id: 'components-form-inputmask--float-label', name: 'FloatLabel' },
  { id: 'components-form-inputmask--fluid', name: 'Fluid' },
  { id: 'components-form-inputmask--readonly', name: 'Readonly' }
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
        expect(await input.getAttribute('placeholder'), 'плейсхолдер маски').toBe('999-999-99-99');
        await input.fill('4951234567');
        expect(await input.inputValue(), 'отформатированное значение').toBe('495-123-45-67');
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
      name: 'Disabled: поле отключено',
      story: 'components-form-inputmask--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').first().isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Readonly: поле только для чтения',
      story: 'components-form-inputmask--readonly',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').first().evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    },
    {
      name: 'Danger: класс p-invalid',
      story: 'components-form-inputmask--danger',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').first().getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Labels: лейбл связан с полем',
      story: 'components-form-inputmask--default',
      run: async ({ page, expect }) => {
        const label = page.locator('label').first();
        expect(await label.getAttribute('for'), 'for').toBe(await page.locator('input').first().getAttribute('id'));
      }
    },
    {
      name: 'Invalid: поле объявляет aria-invalid',
      story: 'components-form-inputmask--danger',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').first().getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    {
      name: 'Properties: API matrix',
      story: 'components-form-inputmask--default',
      run: async ({ page, expect }) => {
        const result = await page.evaluate(() => {
          const host = document.querySelector('#storybook-root extra-input-mask');
          const instance = globalThis.ng?.getComponent(host);
          if (!instance) return { error: 'no instance', inputs: [], outputs: [], errors: [], outputsOk: false };
          const definition = instance.constructor.ɵcmp;
          const inputs = Object.keys(definition.inputs ?? {});
          const outputs = Object.keys(definition.outputs ?? {});
          const errors = [];
          for (const name of inputs) {
            try {
              const current = instance[name];
              if (typeof current === 'boolean') instance[name] = !current;
              else if (typeof current === 'number') instance[name] = current + 1;
              else if (typeof current === 'string') instance[name] = current ? current + 'x' : 'x';
              globalThis.ng.applyChanges(instance);
            } catch (error) {
              errors.push(name + ': ' + String(error));
            }
          }
          return { inputs, outputs, errors, outputsOk: outputs.every((name) => typeof instance[name]?.subscribe === 'function') };
        });
        expect(result.error ?? '', 'instance').toBe('');
        expect(result.errors, 'inputs').toEqual([]);
        expect(result.inputs.length, 'inputs count').toBeGreaterThan(0);
        expect(result.outputsOk, 'outputs').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
