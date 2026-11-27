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

const openCheckbox = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'checkbox',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: label и labelPosition',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'label:Custom;labelPosition:left');
        expect((await page.locator('label.checkbox-label').innerText()).trim(), 'label').toBe('Custom');
        expect((await page.locator('.extra-checkbox').getAttribute('class')) ?? '', 'left').toContain('extra-checkbox--left');
      }
    },
    {
      name: 'Properties: caption и aria-describedby',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'caption:CustomCaption');
        const caption = page.locator('.checkbox-caption');
        expect((await caption.innerText()).trim(), 'caption').toBe('CustomCaption');
        const captionId = await caption.getAttribute('id');
        expect(await page.locator('.p-checkbox-input').getAttribute('aria-describedby'), 'aria-describedby').toBe(captionId);
      }
    },
    {
      name: 'Properties: indeterminate',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'indeterminate:true');
        const input = page.locator('.p-checkbox-input');
        expect(await input.evaluate((element) => element.indeterminate), 'indeterminate').toBe(true);
        await input.click();
        await page.waitForTimeout(200);
        expect(await input.isChecked(), 'checked').toBe(true);
        expect(await input.evaluate((element) => element.indeterminate), 'indeterminate после клика').toBe(false);
      }
    },
    {
      name: 'Properties: readonly',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'readonly:true');
        const input = page.locator('.p-checkbox-input');
        await input.click({ force: true });
        await page.keyboard.press('Space');
        await page.waitForTimeout(200);
        expect(await input.isChecked(), 'не изменился').toBe(false);
      }
    },
    {
      name: 'Properties: required валидирует',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'required:true');
        const error = await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-checkbox'));
          return instance?.validate({ value: false });
        });
        expect(Boolean(error), 'required error').toBe(true);
      }
    },
    {
      name: 'Properties: ariaLabel',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'ariaLabel:Check');
        expect(await page.locator('.p-checkbox-input').getAttribute('aria-label'), 'aria-label').toBe('Check');
      }
    },
    {
      name: 'Properties: ariaLabelledBy',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'ariaLabelledBy:some-label');
        expect(await page.locator('.p-checkbox-input').getAttribute('aria-labelledby'), 'aria-labelledby').toBe('some-label');
      }
    },
    {
      name: 'Properties: autofocus',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'autofocus:true');
        expect(await page.evaluate(() => document.activeElement?.classList.contains('p-checkbox-input')), 'фокус').toBe(true);
      }
    },
    {
      name: 'Properties: tabindex',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect, url }) => {
        await openCheckbox(page, url, 'tabindex:3');
        expect(await page.locator('.p-checkbox-input').getAttribute('tabindex'), 'tabindex').toBe('3');
      }
    },
    {
      name: 'Properties: onChange',
      story: 'components-form-checkbox--default',
      run: async ({ page, expect }) => {
        const event = await page.evaluate(() => new Promise((resolve) => {
          const host = document.querySelector('extra-checkbox');
          const instance = globalThis.ng?.getComponent(host);
          instance?.onChange.subscribe((value) => resolve(value));
          document.querySelector('.p-checkbox-input').click();
        }));
        expect(Boolean(event), 'onChange').toBe(true);
      }
    },
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
