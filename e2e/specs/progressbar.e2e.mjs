/**
 * E2E-спека ProgressBar: значение, indeterminate и подпись.
 */

const STORIES = [
  { id: 'components-misc-progressbar--default', name: 'Default' },
  { id: 'components-misc-progressbar--indeterminate', name: 'Indeterminate' },
  { id: 'components-misc-progressbar--no-label', name: 'No Label' }
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
  component: 'progressbar',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: aria-valuenow 50, подпись и половина полосы',
      story: 'components-misc-progressbar--default',
      run: async ({ page, expect }) => {
        const bar = page.locator('.p-progressbar');
        expect(await bar.getAttribute('role'), 'role').toBe('progressbar');
        expect(await bar.getAttribute('aria-valuenow'), 'aria-valuenow').toBe('50');
        expect(await bar.getAttribute('aria-label'), 'aria-label').toBe('Загрузка данных');
        expect(await page.locator('.p-progressbar-label').innerText(), 'подпись').toBe('50%');

        const total = await bar.boundingBox();
        const value = await page.locator('.p-progressbar-value').boundingBox();
        expect(Math.abs(value.width / total.width - 0.5) < 0.05, 'половина полосы').toBe(true);
      }
    },
    {
      name: 'Indeterminate: класс и отсутствие aria-valuenow',
      story: 'components-misc-progressbar--indeterminate',
      run: async ({ page, expect }) => {
        const bar = page.locator('.p-progressbar');
        expect(await bar.getAttribute('class'), 'класс').toContain('p-progressbar-indeterminate');
        expect(await bar.getAttribute('aria-valuenow'), 'aria-valuenow').toBe(null);
      }
    },
    {
      name: 'No Label: подпись пустая',
      story: 'components-misc-progressbar--no-label',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-progressbar-label').innerText(), 'подпись').toBe('');
        expect(await page.locator('.p-progressbar').getAttribute('aria-valuenow'), 'aria-valuenow').toBe('60');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
