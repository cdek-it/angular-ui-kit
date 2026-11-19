/**
 * E2E-спека Breadcrumb: элементы, ссылки и режим только с иконками.
 */

const STORIES = [
  { id: 'components-menu-breadcrumb--basic', name: 'Basic' },
  { id: 'components-menu-breadcrumb--default', name: 'Default' },
  { id: 'components-menu-breadcrumb--icons-only', name: 'IconsOnly' }
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
  component: 'breadcrumb',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: три элемента и ссылки',
      story: 'components-menu-breadcrumb--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-breadcrumb-item').count(), 'элементы').toBe(3);
        const texts = await page.locator('.p-breadcrumb-item-link').evaluateAll((links) => links.map((link) => link.textContent.trim()));
        expect(texts.filter(Boolean), 'тексты').toEqual(['Электроника', 'Компьютеры', 'Ноутбуки']);
        expect(await page.locator('.p-breadcrumb a.p-breadcrumb-item-link').count(), 'ссылки').toBeGreaterThanOrEqual(2);
      }
    },
    {
      name: 'IconsOnly: три элемента без текста',
      story: 'components-menu-breadcrumb--icons-only',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-breadcrumb-item').count(), 'элементы').toBe(3);
        const texts = await page.locator('.p-breadcrumb-item').evaluateAll((items) => items.map((item) => item.textContent.trim()));
        expect(texts.every((text) => text === ''), 'текста нет').toBe(true);
        expect(await page.locator('.p-breadcrumb .ti').count(), 'иконки').toBeGreaterThanOrEqual(3);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
