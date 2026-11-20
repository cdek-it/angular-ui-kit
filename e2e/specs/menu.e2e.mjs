/**
 * E2E-спека Menu: пункты, иконки, всплывающее меню и закрытие по Esc.
 */

const STORIES = [
  { id: 'components-menu-menu--basic', name: 'Basic' },
  { id: 'components-menu-menu--default', name: 'Default' },
  { id: 'components-menu-menu--grouped', name: 'Grouped' },
  { id: 'components-menu-menu--item-end', name: 'Item end slot' },
  { id: 'components-menu-menu--popup', name: 'Popup' },
  { id: 'components-menu-menu--with-icons', name: 'WithIcons' }
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
  component: 'menu',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: три пункта с ролью menuitem',
      story: 'components-menu-menu--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-menu-item[role=menuitem]').count(), 'пункты').toBe(3);
        expect(await page.locator('.p-menu-item-link').allInnerTexts(), 'тексты').toEqual([
          'Кабинет',
          'Скачать реестр\nCtrl+E',
          'Выйти'
        ]);
      }
    },
    {
      name: 'Popup: кнопка открывает меню, Esc закрывает',
      story: 'components-menu-menu--popup',
      run: async ({ page, expect }) => {
        const trigger = page.locator('button.p-button', { hasText: 'Действия с заказом' });
        await trigger.click();
        await page.waitForSelector('.p-menu', { state: 'visible' });
        expect(await page.locator('.p-menu-item').count(), 'пункты').toBeGreaterThan(0);

        await page.keyboard.press('Escape');
        await page.waitForSelector('.p-menu', { state: 'detached' });
        expect(await page.locator('.p-menu').count(), 'после Esc').toBe(0);
      }
    },
    {
      name: 'WithIcons: иконки у пунктов',
      story: 'components-menu-menu--with-icons',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-menu-item .ti').count(), 'иконки').toBeGreaterThan(0);
      }
    },
    {
      name: 'Popup: кнопка объявляет aria-expanded',
      story: 'components-menu-menu--popup',
      knownIssue: 'Кнопка-триггер меню не имеет aria-expanded/aria-haspopup: состояние меню не объявляется',
      run: async ({ page, expect }) => {
        const trigger = page.locator('button.p-button', { hasText: 'Действия с заказом' });
        const expanded = await trigger.getAttribute('aria-expanded');
        const haspopup = await trigger.getAttribute('aria-haspopup');
        expect(expanded !== null && haspopup !== null, 'aria-состояние').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
