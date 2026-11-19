/**
 * E2E-спека TieredMenu: пункты, вложенные подменю и выбранный пункт.
 */

const STORIES = [
  { id: 'components-menu-tieredmenu--basic', name: 'Basic' },
  { id: 'components-menu-tieredmenu--custom', name: 'Custom' },
  { id: 'components-menu-tieredmenu--with-selected', name: 'WithSelected' }
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
  component: 'tieredmenu',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Basic: корневые пункты с ролью menuitem',
      story: 'components-menu-tieredmenu--basic',
      run: async ({ page, expect }) => {
        const items = page.locator('.p-tieredmenu-root-list > .p-tieredmenu-item');
        expect(await items.count(), 'корневые пункты').toBeGreaterThanOrEqual(3);
        expect(await items.first().getAttribute('role'), 'role').toBe('menuitem');
      }
    },
    {
      name: 'Basic: пункт открывает вложенное подменю',
      story: 'components-menu-tieredmenu--basic',
      run: async ({ page, expect }) => {
        const first = page.locator('.p-tieredmenu-root-list > .p-tieredmenu-item').first();
        await first.locator('a').first().click();
        await page.waitForSelector('.p-tieredmenu-submenu', { state: 'visible' });
        expect(await first.getAttribute('aria-expanded'), 'aria-expanded').toBe('true');
        expect(await page.locator('.p-tieredmenu-submenu').first().isVisible(), 'подменю').toBe(true);
      }
    },
    {
      name: 'WithSelected: три пункта и выбранный класс',
      story: 'components-menu-tieredmenu--with-selected',
      run: async ({ page, expect }) => {
        const items = page.locator('.p-tieredmenu-root-list > .p-tieredmenu-item');
        expect(await items.count(), 'пункты').toBe(3);
        expect((await items.first().innerText()).trim(), 'первый пункт').toBe('Отправления');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
