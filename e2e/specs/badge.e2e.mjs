/**
 * E2E-спека Badge: severity, размеры, точка и форма.
 */

const STORIES = [
  { id: 'components-misc-badge--default', name: 'Default' },
  { id: 'components-misc-badge--dot', name: 'Dot' },
  { id: 'components-misc-badge--severity', name: 'Severity' },
  { id: 'components-misc-badge--sizes', name: 'Sizes' }
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
  component: 'badge',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Severity: классы info/success/warn/danger',
      story: 'components-misc-badge--severity',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-badge').evaluateAll((elements) => elements.map((element) => element.className));
        expect(classes.length, 'количество бейджей').toBe(5);
        expect(classes[1], 'info').toContain('p-badge-info');
        expect(classes[2], 'success').toContain('p-badge-success');
        expect(classes[3], 'warn').toContain('p-badge-warn');
        expect(classes[4], 'danger').toContain('p-badge-danger');
      }
    },
    {
      name: 'Sizes: 24 < 28 < 32 и классы lg/xl',
      story: 'components-misc-badge--sizes',
      run: async ({ page, expect }) => {
        const items = await page.locator('.p-badge').evaluateAll((elements) =>
          elements.map((element) => ({ className: element.className, size: Math.round(element.getBoundingClientRect().height) }))
        );
        expect(items.length, 'количество бейджей').toBe(6);
        expect(items[0].size < items[1].size, 'base ниже lg').toBe(true);
        expect(items[1].size < items[2].size, 'lg ниже xl').toBe(true);
        expect(items[1].className, 'класс lg').toContain('p-badge-lg');
        expect(items[2].className, 'класс xl').toContain('p-badge-xl');
      }
    },
    {
      name: 'Dot: квадратные точки 8/12/16',
      story: 'components-misc-badge--dot',
      run: async ({ page, expect }) => {
        const sizes = await page.locator('.p-badge-dot').evaluateAll((elements) =>
          elements.map((element) => {
            const box = element.getBoundingClientRect();
            return { width: Math.round(box.width), height: Math.round(box.height) };
          })
        );
        expect(sizes.length, 'количество точек').toBeGreaterThanOrEqual(3);
        for (const size of sizes) expect(size.width, 'точка квадратная').toBe(size.height);
        expect(sizes[0].width < sizes.at(-1).width, 'есть увеличенные точки').toBe(true);
      }
    },
    {
      name: 'Default: круглый бейдж с числом',
      story: 'components-misc-badge--default',
      run: async ({ page, expect }) => {
        const badge = page.locator('.p-badge').first();
        expect(await badge.innerText(), 'текст бейджа').toBe('8');
        expect(await badge.getAttribute('class'), 'круглая форма').toContain('p-badge-circle');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
