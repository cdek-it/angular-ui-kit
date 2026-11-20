/**
 * E2E-спека Drawer: открытие, позиции, размеры и закрытие.
 */

const STORIES = [
  { id: 'components-overlay-drawer--default', name: 'Default' },
  { id: 'components-overlay-drawer--full-screen', name: 'Full Screen' },
  { id: 'components-overlay-drawer--position', name: 'Position' },
  { id: 'components-overlay-drawer--sizes', name: 'Sizes' },
  { id: 'components-overlay-drawer--with-custom-header', name: 'With Custom Header' },
  { id: 'components-overlay-drawer--with-footer', name: 'With Footer' },
  { id: 'components-overlay-drawer--without-modal', name: 'Without Modal' }
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

const openDrawer = async (page) => {
  await page.locator('button', { hasText: 'Open Drawer' }).click();
  await page.waitForSelector('.p-drawer', { state: 'visible' });
};

export default {
  component: 'drawer',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: панель открывается и закрывается по Esc',
      story: 'components-overlay-drawer--default',
      run: async ({ page, expect }) => {
        await openDrawer(page);
        expect(await page.locator('.p-drawer').count(), 'панель').toBe(1);
        await page.keyboard.press('Escape');
        await page.waitForSelector('.p-drawer', { state: 'detached' });
        expect(await page.locator('.p-drawer').count(), 'после Esc').toBe(0);
      }
    },
    {
      name: 'Position: Left открывает панель слева',
      story: 'components-overlay-drawer--position',
      run: async ({ page, expect }) => {
        await page.locator('button', { hasText: 'Left' }).click();
        await page.waitForSelector('.p-drawer', { state: 'visible' });
        expect(await page.locator('.p-drawer').getAttribute('class'), 'класс').toContain('p-drawer-left');
      }
    },
    {
      name: 'Drawer: панель объявляет роль и имя',
      story: 'components-overlay-drawer--default',
      knownIssue: 'p-drawer имеет role=complementary без aria-modal/aria-label: диалоговая панель не объявляется как диалог',
      run: async ({ page, expect }) => {
        await openDrawer(page);
        const drawer = page.locator('.p-drawer');
        const role = await drawer.getAttribute('role');
        const modal = await drawer.getAttribute('aria-modal');
        const label = await drawer.getAttribute('aria-label') || (await drawer.getAttribute('aria-labelledby'));
        expect(role === 'dialog' && modal === 'true' && Boolean(label), 'семантика диалога').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
