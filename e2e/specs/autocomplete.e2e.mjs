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
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('.p-autocomplete');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('.p-autocomplete').count(),'autocomplete').toBe(1);
    }})),
    {name:'Dropdown: 8 вариантов',story:'dropdown',run:async({page,expect})=>{
      await page.locator('.p-autocomplete-dropdown').click();
      await page.waitForSelector('.p-autocomplete-option');
      expect(await page.locator('.p-autocomplete-option').count(),'варианты').toBe(8);
    }},
    {name:'Error: p-invalid',story:'error',run:async({page,expect})=>{
      expect((await page.locator('.p-autocomplete').getAttribute('class'))??'','класс').toContain('p-invalid');
    }},
    {name:'Disabled: поле отключено',story:'disabled',run:async({page,expect})=>{
      expect(await page.locator('.p-autocomplete input').isDisabled(),'disabled').toBe(true);
    }}
  ]
};
