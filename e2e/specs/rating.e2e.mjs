/**
 * E2E-спека Rating: звёзды, выбор, доступность радиогруппы и состояния.
 */

const STORIES = [
  { id: 'components-form-rating--clearable', name: 'Clearable' },
  { id: 'components-form-rating--default', name: 'Default' },
  { id: 'components-form-rating--disabled', name: 'Disabled' },
  { id: 'components-form-rating--read-only', name: 'ReadOnly' }
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
  component: 'rating',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: три звезды и выбор четвёртой',
      story: 'components-form-rating--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-rating-on-icon').count(), 'заполненные').toBe(3);
        await page.locator('.p-rating-option').nth(3).click();
        expect(await page.locator('.p-rating-on-icon').count(), 'после клика').toBe(4);
      }
    },
    {
      name: 'A11y: радиогруппа с именами звёзд',
      story: 'components-form-rating--default',
      run: async ({ page, expect }) => {
        const radios = page.locator('.p-rating input[type=radio]');
        expect(await radios.count(), 'радио').toBe(5);
        const names = await radios.evaluateAll((elements) => elements.map((element) => element.getAttribute('aria-label')));
        expect(names.filter(Boolean).length, 'имена звёзд').toBe(5);
      }
    },
    {
      name: 'Disabled: клик не меняет оценку',
      story: 'components-form-rating--disabled',
      run: async ({ page, expect }) => {
        const before = await page.locator('.p-rating-on-icon').count();
        await page.locator('.p-rating-option').last().click({ force: true });
        expect(await page.locator('.p-rating-on-icon').count(), 'оценка').toBe(before);
        expect(await page.locator('.p-rating').getAttribute('class'), 'класс').toContain('p-disabled');
      }
    },
    {
      name: 'ReadOnly: клик не меняет оценку',
      story: 'components-form-rating--read-only',
      run: async ({ page, expect }) => {
        const before = await page.locator('.p-rating-on-icon').count();
        await page.locator('.p-rating-option').last().click({ force: true });
        expect(await page.locator('.p-rating-on-icon').count(), 'оценка').toBe(before);
        expect(await page.locator('.p-rating').getAttribute('class'), 'класс').toContain('p-readonly');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
