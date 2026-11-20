/**
 * E2E-спека Message: severity, закрытие и доступность кнопки закрытия.
 */

const STORIES = [
  { id: 'components-feedback-message--default', name: 'Info' },
  { id: 'components-feedback-message--severity', name: 'Severity' },
  { id: 'components-feedback-message--slots', name: 'Slots' },
  { id: 'components-feedback-message--timer', name: 'Timer' },
  { id: 'components-feedback-message--with-close', name: 'WithClose' },
  { id: 'components-feedback-message--with-icon', name: 'WithIcon' }
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
  component: 'message',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Info: role=alert, severity info и текст',
      story: 'components-feedback-message--default',
      run: async ({ page, expect }) => {
        const message = page.locator('.p-message');
        expect(await message.getAttribute('role'), 'role').toBe('alert');
        expect(await message.getAttribute('class'), 'severity').toContain('p-message-info');
        expect(await message.innerText(), 'текст').toContain('Message');
      }
    },
    {
      name: 'Severity: четыре варианта',
      story: 'components-feedback-message--severity',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-message').evaluateAll((elements) => elements.map((element) => element.className));
        expect(classes.length, 'количество').toBe(4);
        expect(classes[0], 'info').toContain('p-message-info');
        expect(classes[1], 'success').toContain('p-message-success');
        expect(classes[2], 'warn').toContain('p-message-warn');
        expect(classes[3], 'error').toContain('p-message-error');
      }
    },
    {
      name: 'Message: класс severity не должен содержать undefined',
      story: 'components-feedback-message--severity',
      knownIssue: 'PrimeNG добавляет p-message-undefined к каждому сообщению: класс собирается из незаполненного severity',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-message').evaluateAll((elements) => elements.map((element) => element.className));
        expect(classes.some((className) => className.includes('p-message-undefined')), 'класс с undefined').toBe(false);
      }
    },
    {
      name: 'WithClose: кнопки закрытия удаляют сообщение',
      story: 'components-feedback-message--with-close',
      run: async ({ page, expect, wait }) => {
        expect(await page.locator('.p-message').count(), 'сообщения').toBe(4);
        expect(await page.locator('.p-message-close-button').count(), 'кнопки').toBe(4);

        await page.locator('.p-message-close-button').first().click();
        await wait(async () => (await page.locator('.p-message').count()) === 3);
        expect(await page.locator('.p-message').count(), 'после закрытия').toBe(3);
      }
    },
    {
      name: 'WithClose: у кнопки закрытия есть доступное имя',
      story: 'components-feedback-message--with-close',
      knownIssue: 'p-message-close-button не имеет aria-label/title: скринридер не называет кнопку',
      run: async ({ page, expect }) => {
        const name = await page.locator('.p-message-close-button').first().evaluate((element) => {
          return element.getAttribute('aria-label') || element.getAttribute('title') || element.textContent.trim();
        });
        expect(Boolean(name), 'доступное имя').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
