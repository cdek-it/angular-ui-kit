/**
 * E2E-спека Paginator: страницы, переходы, отчёт и размер страницы.
 */

const STORIES = [
  { id: 'components-data-paginator--current-page-report', name: 'Current Page Report' },
  { id: 'components-data-paginator--default', name: 'Default' },
  { id: 'components-data-paginator--rows-per-page', name: 'Rows Per Page' }
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
  component: 'paginator',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: пять страниц, первая выбрана, prev disabled',
      story: 'components-data-paginator--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-paginator-page').count(), 'страницы').toBe(5);
        expect(await page.locator('.p-paginator-page-selected').innerText(), 'текущая').toBe('1');
        expect(await page.locator('.p-paginator-prev').getAttribute('class'), 'prev disabled').toContain('p-disabled');
        expect(await page.locator('.p-paginator-next').getAttribute('aria-label'), 'aria-label next').toBe('Следующая страница');
      }
    },
    {
      name: 'Default: Next переключает на вторую страницу',
      story: 'components-data-paginator--default',
      run: async ({ page, expect }) => {
        await page.locator('.p-paginator-next').click();
        expect(await page.locator('.p-paginator-page-selected').innerText(), 'текущая').toBe('2');
        expect((await page.locator('.p-paginator-prev').getAttribute('class')).includes('p-disabled'), 'prev стал активен').toBe(false);
      }
    },
    {
      name: 'Current Page Report: 1 из 12 и переход',
      story: 'components-data-paginator--current-page-report',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-paginator-current').innerText(), 'отчёт').toBe('1 из 12');
        await page.locator('.p-paginator-next').click();
        expect(await page.locator('.p-paginator-current').innerText(), 'после Next').toBe('2 из 12');
      }
    },
    {
      name: 'Rows Per Page: выбор 10 строк',
      story: 'components-data-paginator--rows-per-page',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-paginator-rpp-dropdown').innerText(), 'значение').toContain('10');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
