/**
 * E2E-спека Toast: сообщения, добавление, severity и закрытие.
 */

const STORIES = [
  { id: 'components-feedback-toast--default', name: 'Default' },
  { id: 'components-feedback-toast--position', name: 'Position' },
  { id: 'components-feedback-toast--slots', name: 'Slots' },
  { id: 'components-feedback-toast--width', name: 'Width' },
  { id: 'components-feedback-toast--with-close-button', name: 'WithCloseButton' }
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
  component: 'toast',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: четыре сообщения и добавление пятого',
      story: 'components-feedback-toast--default',
      run: async ({ page, expect, wait }) => {
        expect(await page.locator('.p-toast-message').count(), 'сообщения').toBe(4);
        await page.locator('button', { hasText: 'Показать: Успех' }).click();
        await wait(async () => (await page.locator('.p-toast-message').count()) === 5);
        expect(await page.locator('.p-toast-message').count(), 'после клика').toBe(5);
      }
    },
    {
      name: 'Default: сообщение имеет роль alert/status',
      story: 'components-feedback-toast--default',
      knownIssue: 'p-toast-message без role: скринридер не объявляет всплывающее сообщение',
      run: async ({ page, expect }) => {
        const roles = await page.locator('.p-toast-message').evaluateAll((messages) =>
          messages.map((message) => message.getAttribute('role'))
        );
        expect(roles.every((role) => role === 'alert' || role === 'status'), 'роли сообщений').toBe(true);
      }
    },
    {
      name: 'WithCloseButton: кнопка закрытия удаляет сообщение',
      story: 'components-feedback-toast--with-close-button',
      knownIssue: 'Клик по p-toast-close-button не удаляет сообщение: счётчик остаётся прежним',
      run: async ({ page, expect, wait }) => {
        const before = await page.locator('.p-toast-message').count();
        const close = page.locator('.p-toast-close-button').first();
        expect(await close.count(), 'кнопка закрытия').toBeGreaterThan(0);
        await close.click();
        await wait(async () => (await page.locator('.p-toast-message').count()) === before - 1, { timeout: 2000 });
        expect(await page.locator('.p-toast-message').count(), 'после закрытия').toBe(before - 1);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
