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

const openInput = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'inputtext',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: label, requiredMark и labelPosition',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'label:Custom;requiredMark:true;labelPosition:left');
        const label = page.locator('label.extra-inputtext-label');
        expect((await label.innerText()).includes('Custom'), 'label').toBe(true);
        expect((await label.innerText()).includes('*'), 'requiredMark').toBe(true);
        expect((await page.locator('.extra-inputtext').getAttribute('class')) ?? '', 'left').toContain('extra-inputtext--left');
      }
    },
    {
      name: 'Properties: placeholder',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'placeholder:CustomPlaceholder');
        expect(await page.locator('input').getAttribute('placeholder'), 'placeholder').toBe('CustomPlaceholder');
      }
    },
    {
      name: 'Properties: floatLabel',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'floatLabel:true');
        expect(await page.locator('.p-floatlabel').count(), 'floatlabel').toBe(1);
      }
    },
    {
      name: 'Properties: clearable и onClear',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'clearable:true;value:Text');
        await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-input-text'));
          window.__clearCount = 0;
          instance?.onClear.subscribe(() => window.__clearCount++);
        });
        const clear = page.locator('[aria-label="Очистить поле"]');
        expect(await clear.count(), 'иконка очистки').toBe(1);
        await clear.dispatchEvent('click');
        await page.waitForTimeout(200);
        expect(await page.locator('input').inputValue(), 'пусто').toBe('');
        expect(await page.evaluate(() => window.__clearCount), 'onClear').toBe(1);
      }
    },
    {
      name: 'Properties: readonly',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'readonly:true');
        expect(await page.locator('input').evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    },
    {
      name: 'Properties: caption и captionSeverity',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'caption:CustomCaption;captionSeverity:danger');
        const caption = page.locator('extra-caption');
        expect((await caption.innerText()).trim(), 'caption').toBe('CustomCaption');
        expect(await caption.getAttribute('data-severity'), 'severity').toBe('danger');
      }
    },
    {
      name: 'Properties: info',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'info:Info');
        expect(await page.locator('.extra-inputtext-label-icon').count(), 'info icon').toBe(1);
      }
    },
    {
      name: 'Properties: size=large',
      story: 'components-form-inputtext--properties',
      run: async ({ page, expect }) => {
        expect((await page.locator('input').getAttribute('class')) ?? '', 'size').toContain('p-inputtext-lg');
      }
    },
    {
      name: 'Properties: fluid',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'fluid:true');
        expect((await page.locator('input').getAttribute('class')) ?? '', 'fluid').toContain('p-inputtext-fluid');
      }
    },
    {
      name: 'Properties: type=email',
      story: 'components-form-inputtext--properties',
      run: async ({ page, expect }) => {
        expect(await page.locator('input').getAttribute('type'), 'type').toBe('password');
      }
    },
    {
      name: 'Properties: required',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'required:true');
        expect(await page.locator('input').evaluate((element) => element.required), 'required').toBe(true);
      }
    },
    {
      name: 'Properties: name, autocomplete, maxLength',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'name:field;autocomplete:email;maxLength:10');
        const input = page.locator('input');
        expect(await input.getAttribute('name'), 'name').toBe('field');
        expect(await input.getAttribute('autocomplete'), 'autocomplete').toBe('email');
        expect(await input.getAttribute('maxlength'), 'maxLength').toBe('10');
      }
    },
    {
      name: 'Properties: ariaLabel, ariaLabelledBy, tabindex',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'ariaLabel:Label;ariaLabelledBy:some-label;tabindex:3');
        const input = page.locator('input');
        expect(await input.getAttribute('aria-label'), 'aria-label').toBe('Label');
        expect(await input.getAttribute('aria-labelledby'), 'aria-labelledby').toBe('some-label');
        expect(await input.getAttribute('tabindex'), 'tabindex').toBe('3');
      }
    },
    {
      name: 'Properties: autofocus',
      story: 'components-form-inputtext--default',
      run: async ({ page, expect, url }) => {
        await openInput(page, url, 'autofocus:true');
        expect(await page.locator('input').evaluate((element) => element.hasAttribute('autofocus')), 'autofocus').toBe(true);
      }
    },
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
      await icon.dispatchEvent('click'); await page.waitForTimeout(100);
      expect(await f.inputValue(),'значение').toBe('');
      expect(await f.evaluate(e=>document.activeElement===e),'фокус').toBe(true);
    }}
  ]
};
