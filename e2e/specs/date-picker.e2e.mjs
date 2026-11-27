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
