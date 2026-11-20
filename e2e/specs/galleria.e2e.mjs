/**
 * E2E-спека Galleria: индикаторы, миниатюры, подписи и навигация.
 */

const STORIES = [
  { id: 'components-media-galleria--autoplay', name: 'Autoplay' },
  { id: 'components-media-galleria--caption', name: 'Caption' },
  { id: 'components-media-galleria--default', name: 'Default' },
  { id: 'components-media-galleria--full-screen', name: 'FullScreen' },
  { id: 'components-media-galleria--indicator', name: 'Indicator' },
  { id: 'components-media-galleria--thumbnails', name: 'Thumbnails' }
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
  component: 'galleria',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: регион, индикаторы и активный слайд',
      story: 'components-media-galleria--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-galleria').getAttribute('role'), 'role').toBe('region');
        expect(await page.locator('.p-galleria-indicator').count(), 'индикаторы').toBe(4);
        expect(await page.locator('.p-galleria-item').first().getAttribute('aria-label'), 'подпись слайда').toBe('1');
      }
    },
    {
      name: 'Thumbnails: четыре миниатюры и переключение',
      story: 'components-media-galleria--thumbnails',
      run: async ({ page, expect }) => {
        const thumbs = page.locator('.p-galleria-thumbnail-item');
        expect(await thumbs.count(), 'миниатюры').toBe(4);
        expect(await page.locator('.p-galleria-thumbnail-item-current').count(), 'текущая').toBe(1);

        await thumbs.nth(1).click();
        expect(await thumbs.nth(1).getAttribute('class'), 'вторая текущая').toContain('p-galleria-thumbnail-item-current');
      }
    },
    {
      name: 'Caption: подпись слайда',
      story: 'components-media-galleria--caption',
      run: async ({ page, expect }) => {
        expect(await page.locator('#storybook-root').innerText(), 'подпись').toContain('Доставка');
      }
    },
    {
      name: 'Indicator: заголовок и футер',
      story: 'components-media-galleria--indicator',
      run: async ({ page, expect }) => {
        const text = await page.locator('#storybook-root').innerText();
        expect(text, 'заголовок').toContain('Галерея СДЭК');
        expect(text, 'подсказка').toContain('Переключайте изображения');
      }
    },
    {
      name: 'Навигация: у кнопок есть доступные имена',
      story: 'components-media-galleria--default',
      knownIssue: 'Кнопки p-galleria-prev/next без aria-label: скринридер не различает их',
      run: async ({ page, expect }) => {
        const names = await page.locator('.p-galleria-nav-button').evaluateAll((buttons) =>
          buttons.map((button) => button.getAttribute('aria-label') || button.textContent.trim())
        );
        expect(names.length, 'кнопки').toBeGreaterThan(0);
        expect(names.every(Boolean), 'имена кнопок').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
