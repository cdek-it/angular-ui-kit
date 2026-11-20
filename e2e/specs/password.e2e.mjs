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
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
