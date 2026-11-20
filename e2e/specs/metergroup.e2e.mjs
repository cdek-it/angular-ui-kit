/**
 * E2E-спека MeterGroup: значения, ориентация и подписи.
 */

const STORIES = [
  { id: 'components-misc-metergroup--default', name: 'Default' },
  { id: 'components-misc-metergroup--horizontal', name: 'Horizontal' },
  { id: 'components-misc-metergroup--icon', name: 'Icon' },
  { id: 'components-misc-metergroup--label-start', name: 'LabelStart' },
  { id: 'components-misc-metergroup--label-vertical', name: 'LabelVertical' },
  { id: 'components-misc-metergroup--vertical', name: 'Vertical' }
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
  component: 'metergroup',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: meter, значение 48 и три сегмента',
      story: 'components-misc-metergroup--default',
      run: async ({ page, expect }) => {
        const group = page.locator('.p-metergroup');
        expect(await group.getAttribute('role'), 'role').toBe('meter');
        expect(await group.getAttribute('aria-valuenow'), 'aria-valuenow').toBe('48');
        expect(await group.getAttribute('aria-label'), 'aria-label').toBe('Использование диска');
        expect(await page.locator('.p-metergroup-meter').count(), 'сегменты').toBe(3);
        expect(await page.locator('.p-metergroup-label').count(), 'подписи').toBe(3);
      }
    },
    {
      name: 'Vertical: вертикальная ориентация',
      story: 'components-misc-metergroup--vertical',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-metergroup').getAttribute('class'), 'класс').toContain('p-metergroup-vertical');
      }
    },
    {
      name: 'LabelVertical: подписи на всю ширину',
      story: 'components-misc-metergroup--label-vertical',
      run: async ({ page, expect }) => {
        const widths = await page.locator('.p-metergroup-label').evaluateAll((labels) =>
          labels.map((label) => Math.round(label.getBoundingClientRect().width))
        );
        expect(widths.length, 'подписи').toBe(3);
        expect(widths.every((width) => width > 1000), 'широкие подписи').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
