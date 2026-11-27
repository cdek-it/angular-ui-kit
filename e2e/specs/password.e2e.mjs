/**
 * E2E-спека Password: маска, переключение видимости, feedback и состояния.
 */

const STORIES = [
  { id: 'components-form-password--default', name: 'Default' },
  { id: 'components-form-password--disabled', name: 'Disabled' },
  { id: 'components-form-password--feedback', name: 'Feedback' },
  { id: 'components-form-password--float-label', name: 'FloatLabel' },
  { id: 'components-form-password--header', name: 'Header' },
  { id: 'components-form-password--invalid', name: 'Invalid' },
  { id: 'components-form-password--template', name: 'Template' },
  { id: 'components-form-password--toggle-mask', name: 'ToggleMask' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
  }
});


const openPassword = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

export default {
  component: 'password',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: ввод скрыт',
      story: 'components-form-password--default',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-password-input');
        expect(await input.getAttribute('type'), 'тип').toBe('password');
        await input.fill('secret123');
        expect(await input.inputValue(), 'значение').toBe('secret123');
      }
    },
    {
      name: 'ToggleMask: иконка показывает и скрывает пароль',
      story: 'components-form-password--toggle-mask',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-password-input');
        const toggle = page.locator('.p-password-toggle-mask-icon');
        expect(await input.getAttribute('type'), 'до').toBe('password');

        await toggle.click();
        expect(await input.getAttribute('type'), 'после показа').toBe('text');
        await toggle.click();
        expect(await input.getAttribute('type'), 'после скрытия').toBe('password');
      }
    },
    {
      name: 'Feedback: индикатор сложности появляется при вводе',
      story: 'components-form-password--feedback',
      run: async ({ page, expect }) => {
        await page.locator('input.p-password-input').fill('abc');
        expect(await page.locator('.p-password-meter').count(), 'индикатор').toBe(1);
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'components-form-password--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-password-input').isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Invalid: класс p-invalid',
      story: 'components-form-password--invalid',
      knownIssue: 'p-invalid не появляется на input в текущей ветке',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-password-input').getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'ToggleMask: иконка доступна с клавиатуры',
      story: 'components-form-password--toggle-mask',
      knownIssue: 'Иконка переключения — svg без role/aria-label/tabindex: недоступна скринридеру и с клавиатуры',
      run: async ({ page, expect }) => {
        const icon = page.locator('.p-password-toggle-mask-icon');
        const accessible = await icon.evaluate((element) => {
          const role = element.getAttribute('role');
          const label = element.getAttribute('aria-label');
          const tabindex = element.getAttribute('tabindex');
          return Boolean(role && label) || tabindex === '0';
        });
        expect(accessible, 'иконка доступна').toBe(true);
      }
    },
    {
      name: 'Properties: showFeedback true/false',
      story: 'components-form-password--feedback',
      run: async ({ page, expect, url }) => {
        await page.locator('input.p-password-input').fill('abc');
        expect(await page.locator('.p-password-meter').count(), 'feedback').toBe(1);
        await openPassword(page, url, 'showFeedback:false;value:abc');
        await page.locator('input.p-password-input').fill('abc');
        expect(await page.locator('.p-password-meter').count(), 'без feedback').toBe(0);
      }
    },
    {
      name: 'Properties: showMaskToggle',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'showMaskToggle:true');
        expect(await page.locator('.p-password-toggle-mask-icon').count(), 'toggle').toBe(1);
        await openPassword(page, url, 'showMaskToggle:false');
        expect(await page.locator('.p-password-toggle-mask-icon').count(), 'без toggle').toBe(0);
      }
    },
    {
      name: 'Properties: placeholder',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'placeholder:CustomPlaceholder');
        expect(await page.locator('input.p-password-input').getAttribute('placeholder'), 'placeholder').toBe('CustomPlaceholder');
      }
    },
    {
      name: 'Properties: size=large',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'size:large');
        expect((await page.locator('input.p-password-input').getAttribute('class')) ?? '', 'size').toContain('p-inputtext-lg');
      }
    },
    {
      name: 'Properties: variant=filled',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'variant:filled');
        expect((await page.locator('input.p-password-input').getAttribute('class')) ?? '', 'variant').toContain('p-variant-filled');
      }
    },
    {
      name: 'Properties: fluid',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'fluid:true');
        expect((await page.locator('.extra-password').getAttribute('class')) ?? '', 'fluid').toContain('extra-password--fluid');
      }
    },
    {
      name: 'Properties: label и labelPosition',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'label:Custom;labelPosition:left');
        expect((await page.locator('label').innerText()).includes('Custom'), 'label').toBe(true);
        expect((await page.locator('.extra-password').getAttribute('class')) ?? '', 'left').toContain('extra-password--left');
      }
    },
    {
      name: 'Properties: floatLabel',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'floatLabel:true');
        expect(await page.locator('.p-floatlabel').count(), 'floatlabel').toBe(1);
      }
    },
    {
      name: 'Properties: caption и captionSeverity',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'caption:CustomCaption;captionSeverity:danger');
        const caption = page.locator('extra-caption');
        expect((await caption.innerText()).trim(), 'caption').toBe('CustomCaption');
        expect(await caption.getAttribute('data-severity'), 'severity').toBe('danger');
      }
    },
    {
      name: 'Properties: requiredMark и info',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'requiredMark:true;info:Info');
        expect((await page.locator('label').innerText()).includes('*'), 'requiredMark').toBe(true);
        expect(await page.locator('.extra-password-label-icon').count(), 'info').toBe(1);
      }
    },
    {
      name: 'Properties: clearable и onClear',
      story: 'components-form-password--clearable',
      run: async ({ page, expect }) => {
        await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-password'));
          window.__clearCount = 0;
          instance?.onClear.subscribe(() => window.__clearCount++);
        });
        const clear = page.locator('.extra-password-clear');
        expect(await clear.count(), 'иконка очистки').toBe(1);
        await clear.dispatchEvent('click');
        await page.waitForTimeout(200);
        expect(await page.evaluate(() => window.__clearCount), 'onClear').toBe(1);
      }
    },
    {
      name: 'Properties: inputStyleClass',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'inputStyleClass:custom-input');
        expect((await page.locator('input.p-password-input').getAttribute('class')) ?? '', 'inputStyleClass').toContain('custom-input');
      }
    },
    {
      name: 'Properties: ariaLabel и ariaLabelledBy',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'ariaLabel:Label;ariaLabelledBy:some-label');
        const input = page.locator('input.p-password-input');
        expect(await input.getAttribute('aria-label'), 'aria-label').toBe('Label');
        expect(await input.getAttribute('aria-labelledby'), 'aria-labelledby').toBe('some-label');
      }
    },
    {
      name: 'Properties: autofocus',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'autofocus:true');
        expect(await page.evaluate(() => document.activeElement?.tagName), 'фокус').toBe('INPUT');
      }
    },
    {
      name: 'Properties: required',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'required:true');
        expect(await page.locator('input.p-password-input').evaluate((element) => element.required), 'required').toBe(true);
      }
    },
    {
      name: 'Properties: name, autocomplete, maxLength',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'name:password;autocomplete:new-password;maxLength:12');
        const input = page.locator('input.p-password-input');
        expect(await input.getAttribute('name'), 'name').toBe('password');
        expect(await input.getAttribute('autocomplete'), 'autocomplete').toBe('new-password');
        expect(await input.getAttribute('maxlength'), 'maxLength').toBe('12');
      }
    },
    {
      name: 'Properties: tabindex и readonly',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'tabindex:3;readonly:true');
        const input = page.locator('input.p-password-input');
        expect(await input.getAttribute('tabindex'), 'tabindex').toBe('3');
        expect(await input.evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    },
    {
      name: 'Properties: promptLabel, weakLabel, mediumLabel, strongLabel',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'promptLabel:P;weakLabel:W;mediumLabel:M;strongLabel:S');
        const values = await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-password'));
          return [instance?.promptLabel, instance?.weakLabel, instance?.mediumLabel, instance?.strongLabel];
        });
        expect(values, 'labels').toEqual(['P', 'W', 'M', 'S']);
      }
    },
    {
      name: 'Properties: onFocus и onBlur',
      story: 'components-form-password--default',
      run: async ({ page, expect }) => {
        await page.evaluate(() => {
          const instance = globalThis.ng?.getComponent(document.querySelector('extra-password'));
          window.__passwordEvents = [];
          instance?.onFocus.subscribe(() => window.__passwordEvents.push('focus'));
          instance?.onBlur.subscribe(() => window.__passwordEvents.push('blur'));
        });
        const input = page.locator('input.p-password-input');
        await input.focus();
        await input.blur();
        await page.waitForTimeout(200);
        const events = await page.evaluate(() => window.__passwordEvents);
        expect(events.includes('focus'), 'focus').toBe(true);
        expect(events.includes('blur'), 'blur').toBe(true);
      }
    },
    {
      name: 'Properties: appendTo',
      story: 'components-form-password--default',
      run: async ({ page, expect, url }) => {
        await openPassword(page, url, 'appendTo:body');
        expect(await page.evaluate(() => globalThis.ng?.getComponent(document.querySelector('extra-password'))?.appendTo), 'appendTo').toBe('body');
      }
    },
    ...STORIES.map((story) => story.id.endsWith('--invalid') ? { ...smoke(story), knownIssue: 'p-invalid не появляется на input в текущей ветке' } : smoke(story)),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
