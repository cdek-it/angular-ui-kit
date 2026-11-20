/**
 * E2E-спека Skeleton: формы, размеры и отключение анимации.
 */

const STORIES = [
  { id: 'components-misc-skeleton--card-placeholder', name: 'CardPlaceholder' },
  { id: 'components-misc-skeleton--circle', name: 'Circle' },
  { id: 'components-misc-skeleton--default', name: 'Default' },
  { id: 'components-misc-skeleton--no-animation', name: 'NoAnimation' },
  { id: 'components-misc-skeleton--rectangles', name: 'Rectangles' }
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
  component: 'skeleton',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: ширина контейнера и высота строки',
      story: 'components-misc-skeleton--default',
      run: async ({ page, expect }) => {
        const box = await page.locator('.p-skeleton').first().boundingBox();
        expect(Math.round(box.width), 'ширина').toBeGreaterThan(1000);
        expect(Math.round(box.height), 'высота').toBe(16);
      }
    },
    {
      name: 'Circle: три круга с равными сторонами',
      story: 'components-misc-skeleton--circle',
      run: async ({ page, expect }) => {
        const boxes = await page.locator('.p-skeleton-circle').evaluateAll((elements) =>
          elements.map((element) => {
            const box = element.getBoundingClientRect();
            return { width: Math.round(box.width), height: Math.round(box.height) };
          })
        );
        expect(boxes.length, 'количество кругов').toBe(3);
        for (const box of boxes) expect(box.width, 'круг').toBe(box.height);
        expect(boxes[0].width < boxes[2].width, 'размеры различаются').toBe(true);
      }
    },
    {
      name: 'Rectangles: несколько прямоугольников',
      story: 'components-misc-skeleton--rectangles',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-skeleton').count(), 'количество').toBeGreaterThanOrEqual(3);
      }
    },
    {
      name: 'NoAnimation: анимация отключена',
      story: 'components-misc-skeleton--no-animation',
      run: async ({ page, expect }) => {
        const skeleton = page.locator('.p-skeleton').first();
        expect(await skeleton.getAttribute('class'), 'класс').toContain('p-skeleton-animation-none');
        expect(await skeleton.evaluate((element) => getComputedStyle(element).animationName), 'animation-name').toBe('none');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
