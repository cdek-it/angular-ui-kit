/**
 * E2E-спека Card: состав слотов, отсутствие шапки/футера/подзаголовка и тень.
 */

const STORIES = [
  { id: 'components-panel-card--default', name: 'Default' },
  { id: 'components-panel-card--minimal', name: 'Minimal' },
  { id: 'components-panel-card--overlay', name: 'Overlay' },
  { id: 'components-panel-card--without-footer', name: 'WithoutFooter' },
  { id: 'components-panel-card--without-header', name: 'WithoutHeader' },
  { id: 'components-panel-card--without-subtitle', name: 'WithoutSubtitle' }
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

const count = (page, selector) => page.locator(selector).count();

export default {
  component: 'card',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: заголовок, подзаголовок, шапка, футер и alt изображения',
      story: 'components-panel-card--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-card-title').innerText(), 'заголовок').toBe('Заголовок');
        expect(await page.locator('.p-card-subtitle').innerText(), 'подзаголовок').toBe('Подзаголовок');
        expect(await count(page, '.p-card-header'), 'шапка').toBe(1);
        expect(await count(page, '.p-card-footer'), 'футер').toBe(1);
        expect(await page.locator('.p-card img').getAttribute('alt'), 'alt изображения').toBe('Заголовок');
      }
    },
    {
      name: 'Minimal: только тело без заголовка и футера',
      story: 'components-panel-card--minimal',
      run: async ({ page, expect }) => {
        expect(await count(page, '.p-card'), 'карточка').toBe(1);
        expect(await count(page, '.p-card-title'), 'заголовок').toBe(0);
        expect(await count(page, '.p-card-footer'), 'футер').toBe(0);
        expect(await count(page, '.p-card-header'), 'шапка').toBe(0);
      }
    },
    {
      name: 'Overlay: тень shadow-md',
      story: 'components-panel-card--overlay',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-card').getAttribute('class'), 'класс тени').toContain('shadow-md');
      }
    },
    {
      name: 'WithoutHeader: нет шапки, но заголовок остался',
      story: 'components-panel-card--without-header',
      run: async ({ page, expect }) => {
        expect(await count(page, '.p-card-header'), 'шапка').toBe(0);
        expect(await page.locator('.p-card-title').innerText(), 'заголовок').toBe('Заголовок');
      }
    },
    {
      name: 'WithoutFooter и WithoutSubtitle: слоты отсутствуют',
      story: 'components-panel-card--without-footer',
      run: async ({ page, expect }) => {
        expect(await count(page, '.p-card-footer'), 'футер').toBe(0);
        expect(await count(page, '.p-card-title'), 'заголовок').toBe(1);
      }
    },
    {
      name: 'WithoutSubtitle: подзаголовка нет',
      story: 'components-panel-card--without-subtitle',
      run: async ({ page, expect }) => {
        expect(await count(page, '.p-card-subtitle'), 'подзаголовок').toBe(0);
        expect(await page.locator('.p-card-title').innerText(), 'заголовок').toBe('Заголовок');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
