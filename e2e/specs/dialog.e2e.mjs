/**
 * E2E-спека Dialog: открытие, семантика, размеры, фичи и закрытие.
 */

const STORIES = [
  { id: 'components-overlay-dialog--basic', name: 'Basic' },
  { id: 'components-overlay-dialog--dynamic', name: 'Dynamic' },
  { id: 'components-overlay-dialog--features', name: 'Features' },
  { id: 'components-overlay-dialog--header', name: 'Header' },
  { id: 'components-overlay-dialog--sizes', name: 'Sizes' },
  { id: 'components-overlay-dialog--slots', name: 'Slots' }
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

const openBasic = async (page) => {
  await page.locator('button', { hasText: 'Открыть окно' }).first().click();
  await page.waitForSelector('.p-dialog', { state: 'visible' });
};

export default {
  component: 'dialog',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Basic: диалог, заголовок и aria-modal',
      story: 'components-overlay-dialog--basic',
      run: async ({ page, expect }) => {
        await openBasic(page);
        const dialog = page.locator('[role=dialog]');
        expect(await dialog.count(), 'диалог').toBe(1);
        expect(await dialog.getAttribute('aria-modal'), 'aria-modal').toBe('true');
        expect(await dialog.getAttribute('aria-labelledby'), 'aria-labelledby').toBeTruthy();
        expect(await page.locator('.p-dialog-title').innerText(), 'заголовок').toBe('Подтверждение заявки');
      }
    },
    {
      name: 'Basic: Esc закрывает диалог',
      story: 'components-overlay-dialog--basic',
      run: async ({ page, expect }) => {
        await openBasic(page);
        await page.keyboard.press('Escape');
        await page.waitForSelector('.p-dialog', { state: 'detached' });
        expect(await page.locator('.p-dialog').count(), 'после Esc').toBe(0);
      }
    },
    {
      name: 'Sizes: кнопка SM открывает компактный диалог',
      story: 'components-overlay-dialog--sizes',
      run: async ({ page, expect }) => {
        await page.locator('button', { hasText: 'SM' }).first().click({ force: true });
        await page.locator('button', { hasText: 'Открыть окно (sm)' }).click({ force: true });
        await page.waitForSelector('.p-dialog', { state: 'visible' });
        const className = await page.locator('.p-dialog').getAttribute('class');
        expect(className.includes('p-dialog-sm') || (await page.locator('.p-dialog').boundingBox()).width < 500, 'компактный').toBe(true);
      }
    },
    {
      name: 'Features: без showClose нет кнопки закрытия',
      story: 'components-overlay-dialog--features',
      run: async ({ page, expect }) => {
        await page.locator('button', { hasText: 'Без закрытия' }).click();
        await page.waitForSelector('.p-dialog', { state: 'visible' });
        expect(await page.locator('.p-dialog-close-button').count(), 'кнопка закрытия').toBe(0);
      }
    },
    {
      name: 'Фокус после открытия остаётся внутри диалога',
      story: 'components-overlay-dialog--basic',
      knownIssue: 'После открытия фокус остаётся на документе, а не внутри диалога',
      run: async ({ page, expect }) => {
        await openBasic(page);
        const inside = await page.evaluate(() => Boolean(document.activeElement?.closest('.p-dialog')));
        expect(inside, 'фокус в диалоге').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
