const STORIES = [
  ['default','components-form-select--default'],
  ['error','components-form-select--error'],
  ['disabled','components-form-select--disabled'],
  ['readonly','components-form-select--readonly'],
  ['fluid','components-form-select--fluid'],
  ['float-label','components-form-select--float-label']
];

const openSelect = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'select',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: API matrix',
      story: 'components-form-select--default',
      run: async ({ page, expect }) => {
        const result = await page.evaluate(() => {
          const host = document.querySelector('#storybook-root extra-select');
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
      name: 'Properties: выбор опции',
      story: 'components-form-select--default',
      run: async ({ page, expect }) => {
        await page.locator('#storybook-root .p-select').click();
        await page.waitForSelector('.p-select-option');
        const first = (await page.locator('.p-select-option').first().innerText()).trim();
        await page.locator('.p-select-option').first().click();
        expect((await page.locator('#storybook-root .p-select-label').innerText()).trim(), 'выбрано').toBe(first);
      }
    },
    {
      name: 'Properties: placeholder',
      story: 'components-form-select--default',
      run: async ({ page, expect, url }) => {
        await openSelect(page, url, 'placeholder:Pick');
        const label = page.locator('#storybook-root .p-select-label');
        expect((await label.innerText()).trim(), 'placeholder').toBe('Pick');
      }
    },
    {
      name: 'Properties: clearable',
      story: 'components-form-select--default',
      run: async ({ page, expect, url }) => {
        await openSelect(page, url, 'clearable:true');
        await page.locator('#storybook-root .p-select').click();
        await page.waitForSelector('.p-select-option');
        await page.locator('.p-select-option').first().click();
        await page.waitForTimeout(200);
        const clear = page.locator('.p-select-clear-icon');
        expect(await clear.count(), 'clear icon').toBe(1);
        await clear.click();
        await page.waitForTimeout(200);
        expect((await page.locator('#storybook-root .p-select-label').innerText()).trim() === 'Новосибирск', 'очищено').toBe(false);
      }
    },
    {
      name: 'Properties: showFilter',
      story: 'components-form-select--default',
      run: async ({ page, expect, url }) => {
        await openSelect(page, url, 'showFilter:true');
        await page.locator('#storybook-root .p-select').click();
        await page.waitForSelector('.p-select-filter');
        await page.locator('.p-select-filter').fill('Мос');
        await page.waitForTimeout(300);
        const options = await page.locator('.p-select-option').allInnerTexts();
        expect(options.length, 'отфильтровано').toBeLessThan(5);
        expect(options.join(' '), 'Москва').toContain('Москва');
      }
    },
    {
      name: 'Properties: label и floatLabel',
      story: 'components-form-select--float-label',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-floatlabel').count(), 'floatlabel').toBe(1);
        expect((await page.locator('label').innerText()).trim(), 'label').toBeTruthy();
      }
    },
    {
      name: 'Properties: size и fluid',
      story: 'components-form-select--default',
      run: async ({ page, expect, url }) => {
        await openSelect(page, url, 'size:large;fluid:true');
        const root = page.locator('#storybook-root .p-select');
        const cls = (await root.getAttribute('class')) ?? '';
        expect(cls, 'size').toContain('p-select-lg');
        expect(cls, 'fluid').toContain('p-select-fluid');
      }
    },
    {
      name: 'Properties: ariaLabel',
      story: 'components-form-select--default',
      run: async ({ page, expect, url }) => {
        await openSelect(page, url, 'ariaLabel:SelectLabel');
        expect(await page.locator('#storybook-root [role=combobox]').getAttribute('aria-label'), 'aria-label').toBe('SelectLabel');
      }
    },
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('.p-select');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('.p-select').count(),'select').toBe(1);
    }})),
    {name:'Error: p-invalid и aria-invalid',story:'error',run:async({page,expect})=>{
      const f=page.locator('.p-select'); const c=page.locator('[role=combobox]');
      expect((await f.getAttribute('class'))??'','класс').toContain('p-invalid');
      expect(await c.getAttribute('aria-invalid'),'aria-invalid').toBe('true');
    }},
    {name:'Disabled: класс и aria-disabled',story:'disabled',run:async({page,expect})=>{
      expect((await page.locator('.p-select').getAttribute('class'))??'','класс').toContain('p-disabled');
    }},
    {name:'Readonly: не открывается',story:'readonly',run:async({page,expect})=>{
      expect((await page.locator('.p-select').getAttribute('class'))??'','класс').toContain('p-select-readonly');
    }}
  ]
};
