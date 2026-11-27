const STORIES = [
  ['default','components-form-autocomplete--default'],
  ['error','components-form-autocomplete--error'],
  ['disabled','components-form-autocomplete--disabled'],
  ['dropdown','components-form-autocomplete--dropdown'],
  ['multiple','components-form-autocomplete--multiple'],
  ['grouped','components-form-autocomplete--grouped'],
  ['fluid','components-form-autocomplete--fluid']
];
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
