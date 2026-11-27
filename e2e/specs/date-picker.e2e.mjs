const STORIES = [
  ['default','components-form-datepicker--default'],
  ['error','components-form-datepicker--error'],
  ['disabled','components-form-datepicker--disabled'],
  ['readonly','components-form-datepicker--readonly'],
  ['float-label','components-form-datepicker--float-label'],
  ['range','components-form-datepicker--range'],
  ['clearable','components-form-datepicker--clearable'],
  ['fluid','components-form-datepicker--fluid'],
  ['inline','components-form-datepicker--inline'],
  ['time','components-form-datepicker--time'],
  ['time-only','components-form-datepicker--time-only'],
  ['button-bar','components-form-datepicker--button-bar']
];

const openDate = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'date-picker',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: API matrix',
      story: 'components-form-datepicker--default',
      run: async ({ page, expect }) => {
        const result = await page.evaluate(() => {
          const host = document.querySelector('#storybook-root extra-date-picker');
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
      name: 'Properties: выбор даты',
      story: 'components-form-datepicker--default',
      run: async ({ page, expect }) => {
        const input = page.locator('#storybook-root input');
        await input.click();
        await page.waitForSelector('.p-datepicker-day');
        await page.locator('.p-datepicker-day:not(.p-disabled)').nth(10).click();
        await page.waitForTimeout(300);
        expect((await input.inputValue()).length > 0, 'значение').toBe(true);
      }
    },
    {
      name: 'Properties: clearable',
      story: 'components-form-datepicker--clearable',
      run: async ({ page, expect }) => {
        const input = page.locator('#storybook-root input');
        await input.click();
        await page.waitForSelector('.p-datepicker-day');
        await page.locator('.p-datepicker-day:not(.p-disabled)').nth(10).click();
        await page.waitForTimeout(200);
        const clear = page.locator('.p-datepicker-clear-icon');
        expect(await clear.count(), 'clear').toBe(1);
        await clear.click();
        await page.waitForTimeout(200);
        expect(await input.inputValue(), 'очищено').toBe('');
      }
    },
    {
      name: 'Properties: range',
      story: 'components-form-datepicker--range',
      run: async ({ page, expect }) => {
        const input = page.locator('#storybook-root input');
        await input.click();
        await page.waitForSelector('.p-datepicker-day');
        const days = page.locator('.p-datepicker-day:not(.p-disabled)');
        await days.nth(10).click();
        await days.nth(12).click();
        await page.waitForTimeout(300);
        expect((await input.inputValue()).includes(' - '), 'диапазон').toBe(true);
      }
    },
    {
      name: 'Properties: showTime',
      story: 'components-form-datepicker--time',
      knownIssue: 'story time не рендерит time panel',
      run: async ({ page, expect }) => {
        await page.locator('#storybook-root input').click();
        await page.waitForSelector('.p-datepicker-day');
        expect(await page.locator('.p-datepicker-time-panel').count(), 'time panel').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: inline',
      story: 'components-form-datepicker--inline',
      knownIssue: 'story inline не рендерит p-datepicker-inline',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-datepicker-inline').count(), 'inline').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: label, floatLabel, size/fluid и ariaLabel',
      story: 'components-form-datepicker--default',
      run: async ({ page, expect, url }) => {
        await openDate(page, url, 'label:Date;floatLabel:true;size:large;fluid:true;ariaLabel:DateLabel');
        expect(await page.locator('.p-floatlabel').count(), 'floatlabel').toBe(1);
        const cls = (await page.locator('#storybook-root .p-datepicker').getAttribute('class')) ?? '';
        expect(cls, 'size').toContain('extra-date-picker-field--large');
        expect(cls, 'fluid').toContain('extra-date-picker-field--fluid');
        expect(await page.locator('#storybook-root input').getAttribute('aria-label'), 'aria-label').toBe('DateLabel');
      }
    },
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('extra-date-picker');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('#storybook-root > *').count(),'корень').toBeGreaterThan(0);
    }})),
    {name:'Error: aria-invalid',story:'error',run:async({page,expect})=>{
      expect(await page.locator('input.p-datepicker-input').getAttribute('aria-invalid'),'aria-invalid').toBe('true');
    }},
    {name:'Disabled: поле отключено',story:'disabled',run:async({page,expect})=>{
      expect(await page.locator('input.p-datepicker-input').isDisabled(),'disabled').toBe(true);
    }},
    {name:'Readonly: поле только для чтения',story:'readonly',run:async({page,expect})=>{
      expect(await page.locator('input.p-datepicker-input').evaluate(e=>e.readOnly),'readonly').toBe(true);
    }}
  ]
};
