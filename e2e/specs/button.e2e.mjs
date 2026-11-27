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

const openButton = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
};

export default {
  component: 'button',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: label',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'label:Custom');
        expect((await page.locator('#storybook-root button').innerText()).trim(), 'label').toBe('Custom');
      }
    },
    {
      name: 'Properties: variant=secondary',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'variant:secondary');
        expect((await page.locator('#storybook-root button').getAttribute('class')) ?? '', 'secondary').toContain('p-button-secondary');
      }
    },
    {
      name: 'Properties: severity=danger',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'severity:danger');
        expect((await page.locator('#storybook-root button').getAttribute('class')) ?? '', 'danger').toContain('p-button-danger');
      }
    },
    {
      name: 'Properties: size=large',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'size:large');
        expect((await page.locator('#storybook-root button').getAttribute('class')) ?? '', 'large').toContain('p-button-lg');
      }
    },
    {
      name: 'Properties: rounded',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'rounded:true');
        expect((await page.locator('#storybook-root button').getAttribute('class')) ?? '', 'rounded').toContain('p-button-rounded');
      }
    },
    {
      name: 'Properties: icon и iconPosition=left',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'icon:ti ti-check');
        const icon = page.locator('#storybook-root .p-button-icon');
        expect(await icon.count(), 'icon').toBe(1);
        expect(((await icon.getAttribute('class')) ?? '').includes('p-button-icon-right'), 'left').toBe(false);
      }
    },
    {
      name: 'Properties: iconPosition=right',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'icon:ti ti-check;iconPosition:right');
        expect((await page.locator('#storybook-root .p-button-icon').getAttribute('class')) ?? '', 'right').toContain('p-button-icon-right');
      }
    },
    {
      name: 'Properties: iconOnly',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'icon:ti ti-check;iconOnly:true;ariaLabel:Icon');
        const button = page.locator('#storybook-root button');
        expect((await button.getAttribute('class')) ?? '', 'icon-only').toContain('p-button-icon-only');
        expect((await button.innerText()).trim(), 'без label').toBe('');
      }
    },
    {
      name: 'Properties: disabled',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'disabled:true');
        expect(await page.locator('#storybook-root button').isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Properties: loading',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'loading:true');
        const button = page.locator('#storybook-root button');
        expect((await button.getAttribute('class')) ?? '', 'loading').toContain('p-button-loading');
        expect(await button.isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Properties: badge и showBadge',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'badge:5;showBadge:true');
        expect((await page.locator('#storybook-root .p-badge').innerText()).trim(), 'badge').toBe('5');
      }
    },
    {
      name: 'Properties: badgeSeverity=danger',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'badge:5;showBadge:true;badgeSeverity:danger');
        expect((await page.locator('#storybook-root .p-badge').getAttribute('class')) ?? '', 'badge danger').toContain('p-badge-danger');
      }
    },
    {
      name: 'Properties: fluid',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'fluid:true');
        expect((await page.locator('#storybook-root button').getAttribute('class')) ?? '', 'fluid').toContain('p-button-fluid');
      }
    },
    {
      name: 'Properties: ariaLabel',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'ariaLabel:Action');
        expect(await page.locator('#storybook-root button').getAttribute('aria-label'), 'aria-label').toBe('Action');
      }
    },
    {
      name: 'Properties: autofocus',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'autofocus:true');
        expect(await page.evaluate(() => document.activeElement?.tagName), 'фокус').toBe('BUTTON');
      }
    },
    {
      name: 'Properties: tabindex',
      story: 'components-button--default',
      run: async ({ page, expect, url }) => {
        await openButton(page, url, 'tabindex:3');
        expect(await page.locator('#storybook-root button').getAttribute('tabindex'), 'tabindex').toBe('3');
      }
    },
    {
      name: 'Properties: focus и blur',
      story: 'components-button--default',
      run: async ({ page, expect }) => {
        await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-button'));
          window.__buttonEvents = [];
          instance?.focus.subscribe(() => window.__buttonEvents.push('focus'));
          instance?.blur.subscribe(() => window.__buttonEvents.push('blur'));
        });
        const button = page.locator('#storybook-root button');
        await button.focus();
        await button.blur();
        await page.waitForTimeout(200);
        const events = await page.evaluate(() => window.__buttonEvents);
        expect(events.includes('focus'), 'focus').toBe(true);
        expect(events.includes('blur'), 'blur').toBe(true);
      }
    },
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
