/**
 * E2E-спека ToggleSwitch: роль switch, переключение, состояния, лейбл и клавиатура.
 */

const STORIES = [
  { id: 'components-form-toggleswitch--default', name: 'Default' },
  { id: 'components-form-toggleswitch--checked', name: 'Checked' },
  { id: 'components-form-toggleswitch--danger', name: 'Danger' },
  { id: 'components-form-toggleswitch--disabled', name: 'Disabled' },
  { id: 'components-form-toggleswitch--label-left', name: 'LabelLeft' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('.p-toggleswitch-input').count(), 'переключатель').toBe(1);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
  }
});

export default {
  component: 'toggleswitch',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    ...STORIES.map(smoke),
    {
      name: 'Default: role=switch, клик и aria-checked',
      story: 'components-form-toggleswitch--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input').first();
        expect(await input.getAttribute('role'), 'role').toBe('switch');
        expect(await input.getAttribute('aria-checked'), 'до клика').toBe('false');
        await page.locator('.p-toggleswitch').first().click();
        expect(await input.isChecked(), 'checked').toBe(true);
        expect(await input.getAttribute('aria-checked'), 'после клика').toBe('true');
      }
    },
    {
      name: 'Default: label связан с input и переключает',
      story: 'components-form-toggleswitch--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input').first();
        const inputId = await input.getAttribute('id');
        const label = page.locator('label').first();
        expect(await label.getAttribute('for'), 'for').toBe(inputId);
        expect((await label.innerText()).trim(), 'текст лейбла').toBe('Label');
        await label.click();
        expect(await input.isChecked(), 'выбрано кликом по label').toBe(true);
      }
    },
    {
      name: 'Checked: включённое состояние',
      story: 'components-form-toggleswitch--checked',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input').first();
        expect(await input.isChecked(), 'checked').toBe(true);
        expect(await input.getAttribute('aria-checked'), 'aria-checked').toBe('true');
        expect((await page.locator('.p-toggleswitch').first().getAttribute('class')) ?? '', 'класс').toContain('p-toggleswitch-checked');
      }
    },
    {
      name: 'Danger: p-invalid и подпись ошибки',
      story: 'components-form-toggleswitch--danger',
      run: async ({ page, expect }) => {
        expect((await page.locator('.p-toggleswitch').first().getAttribute('class')) ?? '', 'invalid').toContain('p-invalid');
        expect(await page.locator('body').innerText(), 'текст ошибки').toContain('Обязательное поле');
      }
    },
    {
      name: 'Disabled: input disabled, клик не переключает',
      story: 'components-form-toggleswitch--disabled',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input').first();
        expect(await input.isDisabled(), 'disabled').toBe(true);
        expect((await page.locator('.p-toggleswitch').first().getAttribute('class')) ?? '', 'p-disabled').toContain('p-disabled');
        try {
          await page.locator('.p-toggleswitch').first().click({ force: true, timeout: 1500 });
        } catch {
          /* disabled-элемент может не принимать клик — это ожидаемо */
        }
        expect(await input.isChecked(), 'не переключён').toBe(false);
      }
    },
    {
      name: 'LabelLeft: класс left и label связан с input',
      story: 'components-form-toggleswitch--label-left',
      run: async ({ page, expect }) => {
        expect((await page.locator('.extra-toggleswitch').getAttribute('class')) ?? '', 'left').toContain('extra-toggleswitch--left');
        const inputId = await page.locator('.p-toggleswitch-input').first().getAttribute('id');
        expect(await page.locator('label').first().getAttribute('for'), 'for').toBe(inputId);
      }
    },
    {
      name: 'Keyboard: Space переключает',
      story: 'components-form-toggleswitch--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input').first();
        await input.focus();
        await page.keyboard.press('Space');
        expect(await input.isChecked(), 'включено с клавиатуры').toBe(true);
      }
    },
    {
      name: 'ToggleSwitch: tabindex не NaN',
      story: 'components-form-toggleswitch--default',
      run: async ({ page, expect }) => {
        const tabindex = await page.locator('.p-toggleswitch-input').first().getAttribute('tabindex');
        expect(tabindex === null || /^-?\d+$/.test(tabindex), 'валидный tabindex').toBe(true);
      }
    },
    { ...smoke(STORIES[0]), name: 'Smoke: Default (тёмная тема)', theme: 'dark' }
  ]
};
