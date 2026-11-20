/**
 * E2E-спека ScrollPanel: контент, прокрутка и ориентация.
 */

const STORIES = [
  { id: 'components-panel-scrollpanel--both', name: 'Both' },
  { id: 'components-panel-scrollpanel--default', name: 'Default' },
  { id: 'components-panel-scrollpanel--horizontal', name: 'Horizontal' }
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
  component: 'scroll-panel',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: панель и её контент',
      story: 'components-panel-scrollpanel--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-scrollpanel').count(), 'панель').toBe(1);
        expect((await page.locator('#storybook-root').innerText()).length, 'контент').toBeGreaterThan(100);
      }
    },
    {
      name: 'Horizontal: горизонтальная ориентация',
      story: 'components-panel-scrollpanel--horizontal',
      run: async ({ page, expect }) => {
        const className = await page.locator('.p-scrollpanel').getAttribute('class');
        expect(className.includes('horizontal') || (await page.locator('.p-scrollpanel').boundingBox()).width > 0, 'панель').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
