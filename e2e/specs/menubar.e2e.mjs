/**
 * E2E-спека Menubar: корневые пункты, подменю и иконки.
 */

const STORIES = [
  { id: 'components-menu-menubar--basic', name: 'Basic' },
  { id: 'components-menu-menubar--custom', name: 'Custom' },
  { id: 'components-menu-menubar--with-icon', name: 'WithIcon' }
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
  component: 'menubar',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Basic: role=menubar и три корневых пункта',
      story: 'components-menu-menubar--basic',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-menubar-root-list').getAttribute('role'), 'role').toBe('menubar');
        const items = page.locator('.p-menubar-root-list > .p-menubar-item');
        expect(await items.count(), 'корневые пункты').toBe(3);
        expect(await items.first().getAttribute('role'), 'role пункта').toBe('menuitem');
      }
    },
    {
      name: 'Basic: подменю открывается и закрывается по Esc',
      story: 'components-menu-menubar--basic',
      run: async ({ page, expect }) => {
        const second = page.locator('.p-menubar-root-list > .p-menubar-item').nth(1);
        await second.locator('a').first().click();
        await page.waitForSelector('.p-menubar-submenu', { state: 'visible' });
        expect(await page.locator('.p-menubar-submenu').first().isVisible(), 'подменю').toBe(true);

        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        expect(await page.locator('.p-menubar-submenu').first().isVisible(), 'после Esc').toBe(false);
      }
    },
    {
      name: 'WithIcon: иконки в пунктах',
      story: 'components-menu-menubar--with-icon',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-menubar .ti').count(), 'иконки').toBeGreaterThan(0);
      }
    },
    {
      name: 'Basic: пункт с подменю объявляет aria-expanded',
      story: 'components-menu-menubar--basic',
      knownIssue: 'У пункта с подменю нет aria-haspopup/aria-expanded: состояние подменю не объявляется',
      run: async ({ page, expect }) => {
        const link = page.locator('.p-menubar-root-list > .p-menubar-item').nth(1).locator('a').first();
        const haspopup = await link.getAttribute('aria-haspopup');
        const expanded = await link.getAttribute('aria-expanded');
        expect(haspopup !== null || expanded !== null, 'aria-состояние').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
