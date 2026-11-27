const STORIES = [
  ['default', 'components-form-textarea--default'],
  ['error', 'components-form-textarea--error'],
  ['disabled', 'components-form-textarea--disabled'],
  ['readonly', 'components-form-textarea--readonly'],
  ['clearable', 'components-form-textarea--clearable'],
  ['fluid', 'components-form-textarea--fluid'],
  ['float-label', 'components-form-textarea--float-label'],
  ['auto-resize', 'components-form-textarea--auto-resize']
];


const openTextarea = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'textarea',
  stories: Object.fromEntries(STORIES),
  tests: [
    {
      name: 'Properties: placeholder, label, requiredMark и labelPosition',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'placeholder:CustomPlaceholder;label:Custom;requiredMark:true;labelPosition:left');
        const textarea = page.locator('textarea');
        expect(await textarea.getAttribute('placeholder'), 'placeholder').toBe('CustomPlaceholder');
        const label = page.locator('label');
        expect((await label.innerText()).includes('Custom'), 'label').toBe(true);
        expect((await label.innerText()).includes('*'), 'requiredMark').toBe(true);
        expect((await page.locator('.extra-textarea').getAttribute('class')) ?? '', 'left').toContain('extra-textarea--left');
      }
    },
    {
      name: 'Properties: labelPosition=float',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'labelPosition:float');
        expect(await page.locator('.p-floatlabel').count(), 'floatlabel').toBe(1);
      }
    },
    {
      name: 'Properties: caption и captionSeverity',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'caption:CustomCaption;captionSeverity:danger');
        const caption = page.locator('extra-caption');
        expect((await caption.innerText()).trim(), 'caption').toBe('CustomCaption');
        expect(await caption.getAttribute('data-severity'), 'severity').toBe('danger');
      }
    },
    {
      name: 'Properties: info',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'info:Info');
        expect(await page.locator('.extra-textarea-label-icon').count(), 'info icon').toBe(1);
      }
    },
    {
      name: 'Properties: clearable и onClear',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'clearable:true');
        await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-textarea'));
          window.__clearCount = 0;
          instance?.onClear.subscribe(() => window.__clearCount++);
        });
        const clear = page.locator('p-inputicon');
        expect(await clear.count(), 'иконка очистки').toBe(1);
        await clear.dispatchEvent('click');
        await page.waitForTimeout(200);
        expect(await page.locator('textarea').inputValue(), 'пусто').toBe('');
        expect(await page.evaluate(() => window.__clearCount), 'onClear').toBe(1);
      }
    },
    {
      name: 'Properties: resizable=false',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'resizable:false');
        expect(((await page.locator('textarea').getAttribute('class')) ?? '').includes('p-textarea-resizable'), 'resizable').toBe(false);
      }
    },
    {
      name: 'Properties: size=large',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'size:large');
        expect((await page.locator('textarea').getAttribute('class')) ?? '', 'size').toContain('p-textarea-lg');
      }
    },
    {
      name: 'Properties: readonly',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'readonly:true');
        expect(await page.locator('textarea').evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    },
    {
      name: 'Properties: fluid',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'fluid:true');
        expect((await page.locator('textarea').getAttribute('class')) ?? '', 'fluid').toContain('p-textarea-fluid');
      }
    },
    {
      name: 'Properties: autoResize и onResize',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'autoResize:true');
        await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-textarea'));
          window.__resizeCount = 0;
          instance?.onResize.subscribe(() => window.__resizeCount++);
        });
        const textarea = page.locator('textarea');
        const before = Math.round((await textarea.boundingBox()).height);
        await textarea.fill('one\ntwo\nthree\nfour\nfive\nsix');
        await page.waitForTimeout(400);
        const after = Math.round((await textarea.boundingBox()).height);
        expect(after, 'высота выросла').toBeGreaterThan(before);
        expect(await page.evaluate(() => window.__resizeCount), 'onResize').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: rows и cols',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'rows:5;cols:40');
        const textarea = page.locator('textarea');
        expect(await textarea.getAttribute('rows'), 'rows').toBe('5');
        expect(await textarea.getAttribute('cols'), 'cols').toBe('40');
      }
    },
    {
      name: 'Properties: autofocus',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'autofocus:true');
        expect(await page.evaluate(() => document.activeElement?.tagName), 'фокус').toBe('TEXTAREA');
      }
    },
    {
      name: 'Properties: required',
      story: 'components-form-textarea--required',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').evaluate((element) => element.required), 'required').toBe(true);
      }
    },
    {
      name: 'Properties: name, autocomplete, maxLength',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'autocomplete:off;maxLength:10');
        const textarea = page.locator('textarea');
        expect(await textarea.getAttribute('name'), 'name').toBe('field');
        expect(await textarea.getAttribute('autocomplete'), 'autocomplete').toBe('off');
        expect(await textarea.getAttribute('maxlength'), 'maxLength').toBe('10');
      }
    },
    {
      name: 'Properties: ariaLabel, ariaLabelledBy, tabindex',
      story: 'components-form-textarea--properties',
      run: async ({ page, expect, url }) => {
        await openTextarea(page, url, 'ariaLabel:Label;ariaLabelledBy:some-label;tabindex:3');
        const textarea = page.locator('textarea');
        expect(await textarea.getAttribute('aria-label'), 'aria-label').toBe('Label');
        expect(await textarea.getAttribute('aria-labelledby'), 'aria-labelledby').toBe('some-label');
        expect(await textarea.getAttribute('tabindex'), 'tabindex').toBe('3');
      }
    },
    ...STORIES.map(([name, id]) => ({
      name: `Smoke: ${name}`,
      story: id,
      run: async ({ page, expect, errors }) => {
        await page.waitForSelector('textarea');
        expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
        expect(await page.locator('textarea').count(), 'textarea').toBe(1);
      }
    })),
    {
      name: 'Error: p-invalid и aria-invalid',
      story: 'error',
      run: async ({ page, expect }) => {
        const field = page.locator('textarea');
        expect(await field.getAttribute('class'), 'класс').toContain('p-invalid');
        expect(await field.getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Readonly: поле только для чтения',
      story: 'readonly',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    }
  ]
};
