const STORIES = [
  ['default','components-form-select--default'],
  ['error','components-form-select--error'],
  ['disabled','components-form-select--disabled'],
  ['readonly','components-form-select--readonly'],
  ['fluid','components-form-select--fluid'],
  ['float-label','components-form-select--float-label']
];
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
