/**
 * E2E-спека ProgressSpinner: размеры, доступность и монохром.
 */

const STORIES = [
  { id: 'components-misc-progressspinner--default', name: 'Default' },
  { id: 'components-misc-progressspinner--monochrome', name: 'Monochrome' },
  { id: 'components-misc-progressspinner--sizes', name: 'Sizes' }
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
  component: 'progressspinner',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Sizes: 16 < 32 < 48 < 56',
      story: 'components-misc-progressspinner--sizes',
      run: async ({ page, expect }) => {
        const sizes = await page.locator('.p-progressspinner').evaluateAll((elements) =>
          elements.map((element) => Math.round(element.getBoundingClientRect().width))
        );
        expect(sizes.length, 'количество').toBe(4);
        expect(sizes[0] < sizes[1] && sizes[1] < sizes[2] && sizes[2] < sizes[3], 'размеры возрастают').toBe(true);
      }
    },
    {
      name: 'Default: role=progressbar и доступное имя',
      story: 'components-misc-progressspinner--default',
      run: async ({ page, expect }) => {
        const spinner = page.locator('.p-progressspinner');
        expect(await spinner.getAttribute('role'), 'role').toBe('progressbar');
        expect(await spinner.getAttribute('aria-label'), 'aria-label').toBe('Загрузка');
      }
    },
    {
      name: 'Monochrome: класс монохромного режима',
      story: 'components-misc-progressspinner--monochrome',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-progressspinner').evaluateAll((elements) => elements.map((element) => element.className));
        expect(classes.length, 'количество').toBe(2);
        expect(classes.every((className) => className.includes('p-progressspinner-monochrome')), 'все монохромные').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
