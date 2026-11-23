const STORIES = [
  ['default','components-button--default'],
  ['disabled','components-button--disabled'],
  ['loading','components-button--loading'],
  ['rounded','components-button--rounded'],
  ['icon','components-button--icon'],
  ['icon-right','components-button--icon-right'],
  ['icon-only','components-button--icon-only'],
  ['badge','components-button--badge'],
  ['fluid','components-button--fluid']
];
export default {
  component: 'button',
  stories: Object.fromEntries(STORIES),
  tests: [
    ...STORIES.map(([name,id])=>({name:`Smoke: ${name}`,story:id,run:async({page,expect,errors})=>{
      await page.waitForSelector('button.p-button');
      expect(errors.filter(e=>e.type==='pageerror').map(e=>e.text),'ошибки').toEqual([]);
      expect(await page.locator('button.p-button').count(),'кнопка').toBe(1);
    }})),
    {name:'Disabled: неактивна',story:'disabled',run:async({page,expect})=>{
      expect(await page.locator('button.p-button').isDisabled(),'disabled').toBe(true);
    }},
    {name:'Loading: спиннер и блокировка',story:'loading',run:async({page,expect})=>{
      const b=page.locator('button.p-button');
      expect((await b.getAttribute('class'))??'','класс').toContain('p-button-loading');
      expect(await b.isDisabled(),'disabled').toBe(true);
    }},
    {name:'Icon Only: квадрат и aria-label',story:'icon-only',run:async({page,expect})=>{
      const b=page.locator('button.p-button'); const box=await b.boundingBox();
      expect(Math.round(box.width),'ширина').toBe(Math.round(box.height));
      expect(await b.getAttribute('aria-label'),'имя').toBe('Button');
    }},
    {name:'Fluid: ширина контейнера',story:'fluid',run:async({page,expect})=>{
      const s=await page.locator('button.p-button').evaluate(e=>({b:Math.round(e.getBoundingClientRect().width),p:Math.round(e.parentElement.getBoundingClientRect().width)}));
      expect(s.b,'ширина').toBe(s.p);
    }}
  ]
};
