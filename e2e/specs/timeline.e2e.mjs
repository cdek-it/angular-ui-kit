/**
 * E2E-спека Timeline: события, маркеры, ориентация и opposite-контент.
 */

const STORIES = [
  { id: 'components-data-timeline--custom-icon', name: 'Custom Icon' },
  { id: 'components-data-timeline--custom-marker', name: 'Custom Marker' },
  { id: 'components-data-timeline--dashed-line', name: 'Dashed Line' },
  { id: 'components-data-timeline--default', name: 'Default' },
  { id: 'components-data-timeline--horizontal', name: 'Horizontal' },
  { id: 'components-data-timeline--marker-color', name: 'Marker Color' },
  { id: 'components-data-timeline--opposite', name: 'Opposite' }
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
  component: 'timeline',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: четыре события и маркера',
      story: 'components-data-timeline--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-timeline-event').count(), 'события').toBe(4);
        expect(await page.locator('.p-timeline-event-marker').count(), 'маркеры').toBe(4);
        expect(await page.locator('#storybook-root').innerText(), 'текст').toContain('Заказ создан');
      }
    },
    {
      name: 'Horizontal: горизонтальная ориентация',
      story: 'components-data-timeline--horizontal',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-timeline').getAttribute('class'), 'класс').toContain('p-timeline-horizontal');
      }
    },
    {
      name: 'Opposite: контент с противоположной стороны',
      story: 'components-data-timeline--opposite',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-timeline-event-opposite').count(), 'opposite-блоки').toBe(4);
      }
    },
    {
      name: 'Dashed Line: коннекторы между событиями',
      story: 'components-data-timeline--dashed-line',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-timeline-event-connector').count(), 'коннекторы').toBe(3);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
