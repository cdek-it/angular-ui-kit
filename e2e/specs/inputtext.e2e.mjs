const STORIES = [
  ['default','components-form-inputtext--default'],
  ['error','components-form-inputtext--error'],
  ['disabled','components-form-inputtext--disabled'],
  ['readonly','components-form-inputtext--readonly'],
  ['float-label','components-form-inputtext--float-label'],
  ['clearable','components-form-inputtext--clearable'],
  ['fluid','components-form-inputtext--fluid'],
  ['reactive-forms','components-form-inputtext--reactive-forms']
];
export default {
  component: 'inputtext',
  stories: Object.fromEntries(STORIES),
  tests: [
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('input.p-inputtext');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('input.p-inputtext').count(),'поле').toBe(1);
    }})),
    {name:'Error: p-invalid и aria-invalid',story:'error',run:async({page,expect})=>{
      const f=page.locator('input.p-inputtext');
      expect((await f.getAttribute('class'))??'','класс').toContain('p-invalid');
      expect(await f.getAttribute('aria-invalid'),'aria-invalid').toBe('true');
    }},
    {name:'Disabled: поле отключено',story:'disabled',run:async({page,expect})=>{
      expect(await page.locator('input.p-inputtext').isDisabled(),'disabled').toBe(true);
    }},
    {name:'Readonly: поле только для чтения',story:'readonly',run:async({page,expect})=>{
      expect(await page.locator('input.p-inputtext').evaluate(e=>e.readOnly),'readonly').toBe(true);
    }},
    {name:'Clearable: очистка и фокус',story:'clearable',run:async({page,expect})=>{
      const f=page.locator('input.p-inputtext'); const icon=page.locator('[aria-label="Очистить поле"]');
      await icon.click(); await page.waitForTimeout(100);
      expect(await f.inputValue(),'значение').toBe('');
      expect(await f.evaluate(e=>document.activeElement===e),'фокус').toBe(true);
    }}
  ]
};
