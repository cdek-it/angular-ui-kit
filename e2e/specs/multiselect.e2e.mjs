const STORIES = [
  ['default', 'components-form-multiselect--default'],
  ['error', 'components-form-multiselect--error'],
  ['disabled', 'components-form-multiselect--disabled'],
  ['readonly', 'components-form-multiselect--readonly'],
  ['chips', 'components-form-multiselect--chips'],
  ['fluid', 'components-form-multiselect--fluid'],
  ['float-label', 'components-form-multiselect--float-label']
];

export default {
  component: 'multiselect',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: API matrix',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect }) => {
        const result = await page.evaluate(() => {
          const host = document.querySelector('#storybook-root extra-multi-select');
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
    ...STORIES.map(([name, id]) => ({
      name: `Smoke: ${name}`,
      story: id,
      run: async ({ page, expect, errors }) => {
        await page.waitForSelector('.p-multiselect');
        expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
        expect(await page.locator('.p-multiselect').count(), 'multiselect').toBe(1);
      }
    })),
    {
      name: 'Error: p-invalid',
      story: 'error',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-multiselect').getAttribute('class'), 'класс').toContain('p-invalid');
      }
    },
    {
      name: 'Disabled: не открывается',
      story: 'disabled',
      run: async ({ page, expect }) => {
        const box = page.locator('.p-multiselect');
        expect((await box.getAttribute('class')) ?? '', 'класс').toContain('p-disabled');
        await box.click({ force: true });
        expect(await page.locator('.p-multiselect-overlay').count(), 'оверлей').toBe(0);
      }
    },
    {
      name: 'Readonly: не открывается',
      story: 'readonly',
      run: async ({ page, expect }) => {
        const box = page.locator('.p-multiselect');
        expect((await box.getAttribute('class')) ?? '', 'класс').toContain('p-multiselect-readonly');
        await box.click({ force: true });
        expect(await page.locator('.p-multiselect-overlay').count(), 'оверлей').toBe(0);
      }
    }
  ]
};
