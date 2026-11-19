/**
 * E2E-спека Carousel: слайды, индикаторы, ориентация и доступность навигации.
 */

const STORIES = [
  { id: 'components-media-carousel--autoplay', name: 'Autoplay' },
  { id: 'components-media-carousel--default', name: 'Default' },
  { id: 'components-media-carousel--header-and-footer', name: 'Header And Footer' },
  { id: 'components-media-carousel--vertical', name: 'Vertical' }
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
  component: 'carousel',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: регион, четыре индикатора и переключение',
      story: 'components-media-carousel--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-carousel').getAttribute('role'), 'role').toBe('region');
        expect(await page.locator('.p-carousel-indicator').count(), 'индикаторы').toBe(4);
        const activeIndex = () =>
          page.locator('.p-carousel-indicator').evaluateAll((indicators) =>
            indicators.findIndex((indicator) => indicator.classList.contains('p-carousel-indicator-active'))
          );
        expect(await activeIndex(), 'первый слайд').toBe(0);

        await page.locator('.p-carousel button.p-button').nth(1).click();
        expect(await activeIndex(), 'после Next').toBe(1);
      }
    },
    {
      name: 'Vertical: вертикальная ориентация',
      story: 'components-media-carousel--vertical',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-carousel').getAttribute('class'), 'класс').toContain('p-carousel-vertical');
      }
    },
    {
      name: 'Autoplay: шесть индикаторов',
      story: 'components-media-carousel--autoplay',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-carousel-indicator').count(), 'индикаторы').toBe(6);
      }
    },
    {
      name: 'Навигация: у кнопок есть доступные имена',
      story: 'components-media-carousel--default',
      knownIssue: 'Кнопки вперёд/назад — иконки без aria-label: скринридер не различает их',
      run: async ({ page, expect }) => {
        const names = await page.locator('.p-carousel button.p-button').evaluateAll((buttons) =>
          buttons.map((button) => button.getAttribute('aria-label') || button.textContent.trim())
        );
        expect(names.every(Boolean), 'имена кнопок').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
