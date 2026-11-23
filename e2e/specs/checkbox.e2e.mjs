const STORIES = [
  ['default','components-form-checkbox--default'],
  ['error','components-form-checkbox--error'],
  ['disabled','components-form-checkbox--disabled'],
  ['readonly','components-form-checkbox--readonly'],
  ['indeterminate','components-form-checkbox--indeterminate'],
  ['without-label','components-form-checkbox--without-label'],
  ['without-caption','components-form-checkbox--without-caption'],
  ['label-left','components-form-checkbox--label-left']
];
export default {
  component: 'checkbox',
  stories: Object.fromEntries(STORIES),
  tests: [
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('.p-checkbox-input');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('.p-checkbox-input').count(),'чекбокс').toBe(1);
    }})),
    {name:'Indeterminate: нативное состояние',story:'indeterminate',run:async({page,expect})=>{
      const i=page.locator('.p-checkbox-input');
      expect(await i.evaluate(e=>e.indeterminate),'indeterminate').toBe(true);
      expect(await i.getAttribute('tabindex'),'tabindex').toBe('0');
    }},
    {name:'Error: aria-invalid',story:'error',run:async({page,expect})=>{
      expect(await page.locator('.p-checkbox-input').getAttribute('aria-invalid'),'aria-invalid').toBe('true');
    }},
    {name:'Disabled: поле отключено',story:'disabled',run:async({page,expect})=>{
      expect(await page.locator('.p-checkbox-input').isDisabled(),'disabled').toBe(true);
    }}
  ]
};
