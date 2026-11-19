/**
 * E2E-спека PanelMenu: заголовки, раскрытие панелей и disabled.
 */

const STORIES = [
  { id: 'components-menu-panelmenu--basic', name: 'Basic' },
  { id: 'components-menu-panelmenu--custom', name: 'Custom' },
  { id: 'components-menu-panelmenu--default', name: 'Default' },
  { id: 'components-menu-panelmenu--multiple', name: 'Multiple' }
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

const visibleContents = (page) =>
  page.locator('.p-panelmenu-content').evaluateAll((contents) => contents.filter((content) => content.offsetParent !== null).length);

export default {
  component: 'panelmenu',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: четыре заголовка и раскрытая панель',
      story: 'components-menu-panelmenu--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-panelmenu-header').count(), 'заголовки').toBe(4);
        expect(await visibleContents(page), 'видимые панели').toBeGreaterThanOrEqual(1);
      }
    },
    {
      name: 'Default: клик по заголовку сворачивает панель',
      story: 'components-menu-panelmenu--default',
      knownIssue: 'Клик по заголовку не меняет aria-expanded и не сворачивает панель',
      run: async ({ page, expect }) => {
        const before = await visibleContents(page);
        await page.locator('.p-panelmenu-header').first().click();
        expect(await visibleContents(page), 'после сворачивания').toBe(before - 1);
        await page.locator('.p-panelmenu-header').first().click();
        expect(await visibleContents(page), 'после разворачивания').toBe(before);
      }
    },
    {
      name: 'Default: disabled-заголовок не раскрывается',
      story: 'components-menu-panelmenu--default',
      run: async ({ page, expect }) => {
        const disabled = page.locator('.p-panelmenu-header.p-disabled');
        expect(await disabled.count(), 'disabled-заголовок').toBe(1);
        const before = await visibleContents(page);
        await disabled.click({ force: true });
        expect(await visibleContents(page), 'панели').toBe(before);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
