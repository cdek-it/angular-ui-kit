/**
 * E2E-спека RadioButton: выбор, клавиатура, состояния, лейблы и caption.
 */

const STORIES = [
  { id: 'components-form-radiobutton--default', name: 'Default' },
  { id: 'components-form-radiobutton--error', name: 'Error' },
  { id: 'components-form-radiobutton--disabled', name: 'Disabled' },
  { id: 'components-form-radiobutton--without-label', name: 'WithoutLabel' },
  { id: 'components-form-radiobutton--without-caption', name: 'WithoutCaption' },
  { id: 'components-form-radiobutton--label-left', name: 'LabelLeft' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('.p-radiobutton-input').count(), 'радиокнопка').toBe(1);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
  }
});

export default {
  component: 'radiobutton',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    ...STORIES.map(smoke),
    {
      name: 'Default: клик выбирает радиокнопку',
      story: 'components-form-radiobutton--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-radiobutton-input').first();
        expect(await input.getAttribute('type'), 'тип').toBe('radio');
        expect(await input.isChecked(), 'до клика').toBe(false);
        await page.locator('.p-radiobutton').first().click();
        expect(await input.isChecked(), 'после клика').toBe(true);
      }
    },
    {
      name: 'Default: label связан с input, caption через aria-describedby',
      story: 'components-form-radiobutton--default',
      run: async ({ page, expect }) => {
        const inputId = await page.locator('.p-radiobutton-input').first().getAttribute('id');
        const label = page.locator('label.radio-label').first();
        expect(await label.getAttribute('for'), 'for').toBe(inputId);
        expect((await label.innerText()).trim(), 'текст лейбла').toBe('label');

        const caption = page.locator('.radio-caption').first();
        expect(await caption.count(), 'caption').toBe(1);
        const captionId = await caption.getAttribute('id');
        expect(await page.locator('.p-radiobutton-input').first().getAttribute('aria-describedby'), 'aria-describedby').toBe(captionId);
      }
    },
    {
      name: 'Error: p-invalid не пропадает после выбора',
      story: 'components-form-radiobutton--error',
      run: async ({ page, expect }) => {
        const radiobutton = page.locator('.p-radiobutton').first();
        expect((await page.locator('.p-radiobutton-input').first().getAttribute('class')) ?? '', 'input').toBeTruthy();
        expect((await radiobutton.getAttribute('class')) ?? '', 'invalid').toContain('p-invalid');
        await radiobutton.click();
        expect(await page.locator('.p-radiobutton-input').first().isChecked(), 'выбрано').toBe(true);
        expect((await radiobutton.getAttribute('class')) ?? '', 'invalid после выбора').toContain('p-invalid');
      }
    },
    {
      name: 'Disabled: input disabled, клик не выбирает',
      story: 'components-form-radiobutton--disabled',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-radiobutton-input').first();
        expect(await input.isDisabled(), 'disabled').toBe(true);
        expect((await page.locator('.p-radiobutton').first().getAttribute('class')) ?? '', 'p-disabled').toContain('p-disabled');
        try {
          await page.locator('.p-radiobutton').first().click({ force: true, timeout: 1500 });
        } catch {
          /* disabled-элемент может не принимать клик — это ожидаемо */
        }
        expect(await input.isChecked(), 'не выбран').toBe(false);
      }
    },
    {
      name: 'WithoutLabel: aria-label «Выбор», без label и caption',
      story: 'components-form-radiobutton--without-label',
      run: async ({ page, expect }) => {
        expect(await page.locator('label.radio-label').count(), 'label').toBe(0);
        expect(await page.locator('.radio-caption').count(), 'caption').toBe(0);
        expect(await page.locator('.p-radiobutton-input').first().getAttribute('aria-label'), 'aria-label').toBe('Выбор');
      }
    },
    {
      name: 'WithoutCaption: label есть, caption и aria-describedby нет',
      story: 'components-form-radiobutton--without-caption',
      run: async ({ page, expect }) => {
        expect(await page.locator('label.radio-label').count(), 'label').toBe(1);
        expect(await page.locator('.radio-caption').count(), 'caption').toBe(0);
        expect(await page.locator('.p-radiobutton-input').first().getAttribute('aria-describedby'), 'aria-describedby').toBe(null);
      }
    },
    {
      name: 'LabelLeft: класс left и label связан с input',
      story: 'components-form-radiobutton--label-left',
      run: async ({ page, expect }) => {
        expect((await page.locator('.extra-radiobutton').getAttribute('class')) ?? '', 'left').toContain('extra-radiobutton--left');
        const inputId = await page.locator('.p-radiobutton-input').first().getAttribute('id');
        expect(await page.locator('label.radio-label').first().getAttribute('for'), 'for').toBe(inputId);
      }
    },
    {
      name: 'Keyboard: Space выбирает радиокнопку',
      story: 'components-form-radiobutton--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-radiobutton-input').first();
        await input.focus();
        await page.keyboard.press('Space');
        expect(await input.isChecked(), 'выбрано с клавиатуры').toBe(true);
      }
    },
    {
      name: 'RadioButton: tabindex не NaN',
      story: 'components-form-radiobutton--default',
      knownIssue: 'PrimeNG выставляет tabindex="NaN" на нативный input',
      run: async ({ page, expect }) => {
        const tabindex = await page.locator('.p-radiobutton-input').first().getAttribute('tabindex');
        expect(tabindex === null || /^-?\d+$/.test(tabindex), 'валидный tabindex').toBe(true);
      }
    },
    { ...smoke(STORIES[0]), name: 'Smoke: Default (тёмная тема)', theme: 'dark' }
  ]
};
