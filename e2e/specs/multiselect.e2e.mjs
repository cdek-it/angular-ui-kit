const STORIES = [
  ['default', 'components-form-multiselect--default'],
  ['error', 'components-form-multiselect--error'],
  ['disabled', 'components-form-multiselect--disabled'],
  ['readonly', 'components-form-multiselect--readonly'],
  ['chips', 'components-form-multiselect--chips'],
  ['fluid', 'components-form-multiselect--fluid'],
  ['float-label', 'components-form-multiselect--float-label']
];


const openMulti = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

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
    {
      name: 'Properties: выбор одной опции',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect }) => {
        await page.locator('.p-multiselect').click();
        await page.waitForSelector('.p-multiselect-option');
        const first = (await page.locator('.p-multiselect-option').first().innerText()).trim();
        await page.locator('.p-multiselect-option').first().click();
        await page.waitForTimeout(300);
        expect((await page.locator('#storybook-root .p-multiselect-label').innerText()).trim(), 'выбрано').toBe(first);
      }
    },
    {
      name: 'Properties: выбор нескольких опций',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect }) => {
        await page.locator('.p-multiselect').click();
        await page.waitForSelector('.p-multiselect-option');
        await page.locator('.p-multiselect-option').nth(0).click();
        await page.locator('.p-multiselect-option').nth(1).click();
        await page.waitForTimeout(300);
        const text = (await page.locator('#storybook-root .p-multiselect-label').innerText()).trim();
        expect(text.includes(',') || text.length > 12, 'несколько').toBe(true);
      }
    },
    {
      name: 'Properties: showChips',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect, url }) => {
        await openMulti(page, url, 'showChips:true');
        await page.locator('.p-multiselect').click();
        await page.waitForSelector('.p-multiselect-option');
        await page.locator('.p-multiselect-option').first().click();
        await page.waitForTimeout(300);
        expect(await page.locator('#storybook-root .p-multiselect-chip').count(), 'chips').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: placeholder',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect, url }) => {
        await openMulti(page, url, 'placeholder:PickMany');
        expect((await page.locator('#storybook-root .p-multiselect-label').innerText()).trim(), 'placeholder').toBe('PickMany');
      }
    },
    {
      name: 'Properties: showFilter',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect, url }) => {
        await openMulti(page, url, 'showFilter:true');
        await page.locator('.p-multiselect').click();
        await page.waitForSelector('.p-multiselect-filter');
        await page.locator('.p-multiselect-filter').fill('Мос');
        await page.waitForTimeout(300);
        const options = await page.locator('.p-multiselect-option').allInnerTexts();
        expect(options.join(' '), 'Москва').toContain('Москва');
      }
    },
    {
      name: 'Properties: clearable',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect, url }) => {
        await openMulti(page, url, 'clearable:true');
        await page.locator('.p-multiselect').click();
        await page.waitForSelector('.p-multiselect-option');
        await page.locator('.p-multiselect-option').first().click();
        await page.waitForTimeout(200);
        const clear = page.locator('.p-multiselect-clear-icon');
        expect(await clear.count(), 'clear').toBe(1);
        await clear.click();
        await page.waitForTimeout(200);
        expect((await page.locator('#storybook-root .p-multiselect-label').innerText()).trim() === 'Новосибирск', 'очищено').toBe(false);
      }
    },
    {
      name: 'Properties: label/floatLabel и size/fluid',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect, url }) => {
        await openMulti(page, url, 'floatLabel:true;size:large;fluid:true');
        expect(await page.locator('.p-floatlabel').count(), 'floatlabel').toBe(1);
        const cls = (await page.locator('#storybook-root .p-multiselect').getAttribute('class')) ?? '';
        expect(cls, 'size').toContain('p-multiselect-lg');
        expect(cls, 'fluid').toContain('p-multiselect-fluid');
      }
    },
    {
      name: 'Properties: ariaLabel',
      story: 'components-form-multiselect--default',
      run: async ({ page, expect, url }) => {
        await openMulti(page, url, 'ariaLabel:MultiLabel');
        expect(await page.locator('#storybook-root [role=combobox]').getAttribute('aria-label'), 'aria-label').toBe('MultiLabel');
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
