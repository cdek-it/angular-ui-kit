const STORIES = [
  ['default','components-form-autocomplete--default'],
  ['error','components-form-autocomplete--error'],
  ['disabled','components-form-autocomplete--disabled'],
  ['dropdown','components-form-autocomplete--dropdown'],
  ['multiple','components-form-autocomplete--multiple'],
  ['grouped','components-form-autocomplete--grouped'],
  ['fluid','components-form-autocomplete--fluid']
];

const openAuto = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'autocomplete',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: API matrix',
      story: 'components-form-autocomplete--default',
      run: async ({ page, expect }) => {
        const result = await page.evaluate(() => {
          const host = document.querySelector('#storybook-root extra-auto-complete');
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
      name: 'Properties: ввод и выбор подсказки',
      story: 'components-form-autocomplete--default',
      run: async ({ page, expect }) => {
        const input = page.locator('#storybook-root .p-autocomplete input');
        await input.fill('Мос');
        await page.waitForSelector('.p-autocomplete-option');
        expect((await page.locator('.p-autocomplete-option').first().innerText()).trim(), 'подсказка').toBe('Москва');
        await page.locator('.p-autocomplete-option').first().click();
        await page.waitForTimeout(200);
        expect(await input.inputValue(), 'значение').toBe('Москва');
      }
    },
    {
      name: 'Properties: dropdown',
      story: 'components-form-autocomplete--dropdown',
      run: async ({ page, expect }) => {
        await page.locator('.p-autocomplete-dropdown').click();
        await page.waitForSelector('.p-autocomplete-option');
        expect(await page.locator('.p-autocomplete-option').count(), 'варианты').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: multiple',
      story: 'components-form-autocomplete--multiple',
      knownIssue: 'story multiple не открывает подсказки по вводу',
      run: async ({ page, expect }) => {
        const input = page.locator('#storybook-root .p-autocomplete input');
        await input.fill('Мос');
        await page.waitForSelector('.p-autocomplete-option');
        await page.locator('.p-autocomplete-option').first().click();
        await page.waitForTimeout(300);
        expect(await page.locator('#storybook-root .p-autocomplete-multiple-container .p-autocomplete-token').count(), 'token').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: grouped',
      story: 'components-form-autocomplete--grouped',
      knownIssue: 'в grouped нет кнопки dropdown',
      run: async ({ page, expect }) => {
        await page.locator('.p-autocomplete-dropdown').click();
        await page.waitForSelector('.p-autocomplete-option');
        expect(await page.locator('.p-autocomplete-option-group').count(), 'группы').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: clearable',
      story: 'components-form-autocomplete--default',
      run: async ({ page, expect, url }) => {
        await openAuto(page, url, 'clearable:true');
        const input = page.locator('#storybook-root .p-autocomplete input');
        await input.fill('Мос');
        await page.waitForSelector('.p-autocomplete-option');
        await page.locator('.p-autocomplete-option').first().click();
        await page.waitForTimeout(200);
        const clear = page.locator('.p-autocomplete-clear-icon');
        expect(await clear.count(), 'clear').toBe(1);
        await clear.click();
        await page.waitForTimeout(200);
        expect(await input.inputValue(), 'очищено').toBe('');
      }
    },
    {
      name: 'Properties: label, size, fluid и ariaLabel',
      story: 'components-form-autocomplete--default',
      run: async ({ page, expect, url }) => {
        await openAuto(page, url, 'label:Auto;size:large;fluid:true;ariaLabel:AutoLabel');
        const root = page.locator('#storybook-root .p-autocomplete');
        const cls = (await root.getAttribute('class')) ?? '';
        expect(cls, 'size').toContain('extra-autocomplete-lg');
        expect(cls, 'fluid').toContain('p-autocomplete-fluid');
        expect(await page.locator('#storybook-root [role=combobox]').getAttribute('aria-label'), 'aria-label').toBe('AutoLabel');
      }
    },
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('.p-autocomplete');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('.p-autocomplete').count(),'autocomplete').toBe(1);
    }})),
    {name:'Dropdown: 16 вариантов',story:'dropdown',run:async({page,expect})=>{
      await page.locator('.p-autocomplete-dropdown').click();
      await page.waitForSelector('.p-autocomplete-option');
      expect(await page.locator('.p-autocomplete-option').count(),'варианты').toBe(16);
    }},
    {name:'Error: p-invalid',story:'error',run:async({page,expect})=>{
      expect((await page.locator('.p-autocomplete').getAttribute('class'))??'','класс').toContain('p-invalid');
    }},
    {name:'Disabled: поле отключено',story:'disabled',run:async({page,expect})=>{
      expect(await page.locator('.p-autocomplete input').isDisabled(),'disabled').toBe(true);
    }}
  ]
};
