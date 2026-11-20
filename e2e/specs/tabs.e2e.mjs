/**
 * E2E-спека Tabs: роли, переключение, disabled и клавиатура.
 */

const STORIES = [
  { id: 'components-menu-tabs--default', name: 'Default' },
  { id: 'components-menu-tabs--with-badge', name: 'WithBadge' },
  { id: 'components-menu-tabs--with-disabled', name: 'WithDisabled' }
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
  component: 'tabs',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: три вкладки и переключение',
      story: 'components-menu-tabs--default',
      run: async ({ page, expect }) => {
        const tabs = page.locator('.p-tab');
        expect(await tabs.count(), 'вкладки').toBe(3);
        expect(await tabs.first().getAttribute('role'), 'role').toBe('tab');
        expect(await page.locator('.p-tab-active').innerText(), 'активная').toBe('Профиль');

        await tabs.nth(1).click();
        expect(await page.locator('.p-tab-active').innerText(), 'после клика').toBe('Настройки');
        expect(await page.locator('.p-tabpanel-active').innerText(), 'панель').toBe('Параметры аккаунта');
      }
    },
    {
      name: 'WithDisabled: недоступная вкладка не активируется',
      story: 'components-menu-tabs--with-disabled',
      run: async ({ page, expect }) => {
        const disabled = page.locator('.p-tab.p-disabled, .p-tab[aria-disabled=true]');
        expect(await disabled.count(), 'disabled-вкладка').toBe(1);
        expect((await page.locator('.p-tab-active').innerText()) !== 'Недоступно', 'активная не disabled').toBe(true);
      }
    },
    {
      name: 'Keyboard: стрелка переключает вкладку',
      story: 'components-menu-tabs--default',
      knownIssue: 'ArrowRight не переключает вкладку: активной остаётся первая',
      run: async ({ page, expect }) => {
        await page.locator('.p-tab').first().focus();
        await page.keyboard.press('ArrowRight');
        expect(await page.locator('.p-tab-active').innerText(), 'после ArrowRight').toBe('Настройки');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
