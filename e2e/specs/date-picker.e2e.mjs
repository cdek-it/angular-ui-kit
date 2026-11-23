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
