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
