/**
 * E2E-спека ConfirmDialog: открытие, семантика, подтверждение и отмена.
 */

const STORIES = [
  { id: 'components-overlay-confirmdialog--confirm-dialog', name: 'Confirm Dialog' },
  { id: 'components-overlay-confirmdialog--severities-story', name: 'Severities Story' },
  { id: 'components-overlay-confirmdialog--sizes', name: 'Sizes' },
  { id: 'components-overlay-confirmdialog--templates', name: 'Templates' }
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

const openConfirm = async (page) => {
  await page.locator('button', { hasText: 'Показать диалог' }).click();
  await page.waitForSelector('.p-confirmdialog', { state: 'visible' });
};

export default {
  component: 'confirm-dialog',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Confirm Dialog: текст и кнопки подтверждения',
      story: 'components-overlay-confirmdialog--confirm-dialog',
      run: async ({ page, expect }) => {
        await openConfirm(page);
        const dialog = page.locator('.p-confirmdialog');
        expect(await dialog.getAttribute('role'), 'role').toBe('alertdialog');
        expect(await dialog.innerText(), 'текст').toContain('Вы уверены');
        expect(await dialog.locator('button', { hasText: 'Да' }).count(), 'кнопка Да').toBe(1);
        expect(await dialog.locator('button', { hasText: 'Нет' }).count(), 'кнопка Нет').toBe(1);
      }
    },
    {
      name: 'Confirm Dialog: Да закрывает диалог',
      story: 'components-overlay-confirmdialog--confirm-dialog',
      run: async ({ page, expect }) => {
        await openConfirm(page);
        await page.locator('.p-confirmdialog button', { hasText: 'Да' }).click();
        await page.waitForSelector('.p-confirmdialog', { state: 'detached' });
        expect(await page.locator('.p-confirmdialog').count(), 'после Да').toBe(0);
      }
    },
    {
      name: 'Confirm Dialog: Нет закрывает диалог',
      story: 'components-overlay-confirmdialog--confirm-dialog',
      run: async ({ page, expect }) => {
        await openConfirm(page);
        await page.locator('.p-confirmdialog button', { hasText: 'Нет' }).click();
        await page.waitForSelector('.p-confirmdialog', { state: 'detached' });
        expect(await page.locator('.p-confirmdialog').count(), 'после Нет').toBe(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
