/**
 * E2E-спека MegaMenu: корневые пункты, подменю, ориентация и закрытие.
 */

const STORIES = [
  { id: 'components-menu-megamenu--custom', name: 'Custom' },
  { id: 'components-menu-megamenu--default', name: 'Default' },
  { id: 'components-menu-megamenu--horizontal', name: 'Horizontal' },
  { id: 'components-menu-megamenu--template', name: 'Template' },
  { id: 'components-menu-megamenu--vertical', name: 'Vertical' }
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
  component: 'megamenu',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: три корневых пункта и role=menubar',
      story: 'components-menu-megamenu--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-megamenu-root-list').getAttribute('role'), 'role').toBe('menubar');
        expect(await page.locator('.p-megamenu-root-list > .p-megamenu-item').count(), 'корневые пункты').toBe(3);
      }
    },
    {
      name: 'Default: подменю открывается и закрывается по Esc',
      story: 'components-menu-megamenu--default',
      run: async ({ page, expect }) => {
        const first = page.locator('.p-megamenu-root-list > .p-megamenu-item').first();
        await first.locator('a').first().click();
        await page.waitForSelector('.p-megamenu-submenu', { state: 'visible' });

        expect(await first.getAttribute('aria-expanded'), 'aria-expanded').toBe('true');
        expect(await page.locator('.p-megamenu-submenu').first().isVisible(), 'подменю').toBe(true);

        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        expect(await first.getAttribute('aria-expanded'), 'после Esc').toBe('false');
      }
    },
    {
      name: 'Vertical: вертикальная ориентация',
      story: 'components-menu-megamenu--vertical',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-megamenu').getAttribute('class'), 'класс').toContain('p-megamenu-vertical');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
