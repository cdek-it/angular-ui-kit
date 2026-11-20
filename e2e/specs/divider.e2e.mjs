/**
 * E2E-спека Divider: ориентация, тип линии, контент и иконка.
 */

const STORIES = [
  { id: 'components-panel-divider--align-bottom', name: 'Align Bottom' },
  { id: 'components-panel-divider--align-left', name: 'Align Left' },
  { id: 'components-panel-divider--type-dashed', name: 'Dashed' },
  { id: 'components-panel-divider--default', name: 'Default' },
  { id: 'components-panel-divider--vertical', name: 'Vertical' },
  { id: 'components-panel-divider--with-content', name: 'With Content' },
  { id: 'components-panel-divider--with-icon', name: 'With Icon' }
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
  component: 'divider',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: separator, горизонтальный и контент',
      story: 'components-panel-divider--default',
      run: async ({ page, expect }) => {
        const divider = page.locator('.p-divider');
        expect(await divider.getAttribute('role'), 'role').toBe('separator');
        expect(await divider.getAttribute('class'), 'горизонтальный').toContain('p-divider-horizontal');
        expect((await divider.evaluate((element) => element.textContent)).trim(), 'контент').toBe('Отправитель');
      }
    },
    {
      name: 'Dashed: класс p-divider-dashed',
      story: 'components-panel-divider--type-dashed',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-divider').getAttribute('class'), 'пунктир').toContain('p-divider-dashed');
      }
    },
    {
      name: 'Vertical: вертикальная ориентация',
      story: 'components-panel-divider--vertical',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-divider').getAttribute('class'), 'вертикальный').toContain('p-divider-vertical');
      }
    },
    {
      name: 'With Content: текст внутри разделителя',
      story: 'components-panel-divider--with-content',
      run: async ({ page, expect }) => {
        expect((await page.locator('.p-divider-content').evaluate((element) => element.textContent)).trim(), 'контент').toBe('Москва → Новосибирск');
      }
    },
    {
      name: 'With Icon: иконка внутри разделителя',
      story: 'components-panel-divider--with-icon',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-divider-content .ti-map-pin').count(), 'иконка').toBe(1);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
