/**
 * E2E-спека Textarea: ввод, лейблы, размеры, валидация и disabled.
 */

const STORIES = [
  { id: 'components-form-textarea--auto-resize', name: 'AutoResize' },
  { id: 'components-form-textarea--default', name: 'Default' },
  { id: 'components-form-textarea--disabled', name: 'Disabled' },
  { id: 'components-form-textarea--float-label', name: 'FloatLabel' },
  { id: 'components-form-textarea--invalid', name: 'Invalid' },
  { id: 'components-form-textarea--labels', name: 'Labels' },
  { id: 'components-form-textarea--readonly', name: 'Readonly' },
  { id: 'components-form-textarea--sizes', name: 'Sizes' }
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
  component: 'textarea',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: ввод и связь с лейблом',
      story: 'components-form-textarea--default',
      run: async ({ page, expect }) => {
        const textarea = page.locator('textarea');
        expect(await page.locator('label').getAttribute('for'), 'for').toBe(await textarea.getAttribute('id'));

        await textarea.fill('Комментарий к заказу');
        expect(await textarea.inputValue(), 'значение').toBe('Комментарий к заказу');
        expect(await textarea.getAttribute('class'), 'p-filled').toContain('p-filled');
      }
    },
    {
      name: 'Invalid: класс p-invalid',
      story: 'components-form-textarea--invalid',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Invalid: поле объявляет aria-invalid',
      story: 'components-form-textarea--invalid',
      knownIssue: 'PrimeNG ставит только класс p-invalid; aria-invalid на textarea отсутствует',
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    {
      name: 'Readonly: текст нельзя изменить',
      story: 'components-form-textarea--readonly',
      run: async ({ page, expect }) => {
        const textarea = page.locator('textarea');
        expect(await textarea.evaluate((element) => element.readOnly), 'readonly').toBe(true);
      }
    },
    {
      name: 'Disabled: поле нельзя изменить',
      story: 'components-form-textarea--disabled',
      knownIssue: 'FormControl.disable() не доходит до textarea: disabled=false, ввод меняет значение',
      run: async ({ page, expect }) => {
        const textarea = page.locator('textarea');
        const before = await textarea.inputValue();
        await textarea.fill('попытка ввода').catch(() => undefined);
        expect(await textarea.inputValue(), 'значение не изменилось').toBe(before);
        expect(await textarea.evaluate((element) => element.disabled), 'disabled').toBe(true);
      }
    },
    {
      name: 'AutoResize: поле растёт при вводе',
      story: 'components-form-textarea--auto-resize',
      run: async ({ page, expect, wait }) => {
        const textarea = page.locator('textarea');
        const before = (await textarea.boundingBox()).height;
        await textarea.fill('Строка 1\nСтрока 2\nСтрока 3\nСтрока 4\nСтрока 5\nСтрока 6');
        await wait(async () => (await textarea.boundingBox()).height > before);
        expect((await textarea.boundingBox()).height > before, 'высота выросла').toBe(true);
      }
    },
    {
      name: 'Sizes: small получает класс p-textarea-sm',
      story: { id: 'components-form-textarea--sizes', args: 'size:small' },
      run: async ({ page, expect }) => {
        const textarea = page.locator('textarea');
        expect(await textarea.getAttribute('class'), 'класс sm').toContain('p-textarea-sm');
      }
    },
    {
      name: 'Sizes: large получает класс p-textarea-lg',
      story: { id: 'components-form-textarea--sizes', args: 'size:large' },
      run: async ({ page, expect }) => {
        expect(await page.locator('textarea').getAttribute('class'), 'класс lg').toContain('p-textarea-lg');
      }
    },
    {
      name: 'Sizes: xlarge выше base',
      story: { id: 'components-form-textarea--sizes', args: 'size:xlarge' },
      run: async ({ page, expect }) => {
        const textarea = page.locator('textarea');
        expect(await textarea.getAttribute('class'), 'класс xlg').toContain('p-textarea-xlg');
        expect((await textarea.boundingBox()).height, 'высота xlg').toBeGreaterThan(80);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
