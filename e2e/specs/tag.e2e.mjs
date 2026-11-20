/**
 * E2E-спека Tag: severity, скругление и иконка.
 */

const STORIES = [
  { id: 'components-misc-tag--default', name: 'Primary' },
  { id: 'components-misc-tag--rounded', name: 'Rounded' },
  { id: 'components-misc-tag--severity', name: 'Severity' },
  { id: 'components-misc-tag--with-icon', name: 'WithIcon' }
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
  component: 'tag',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Severity: классы шести severity',
      story: 'components-misc-tag--severity',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-tag').evaluateAll((elements) => elements.map((element) => element.className));
        expect(classes.length, 'количество тегов').toBe(12);
        expect(classes[1], 'secondary').toContain('p-tag-secondary');
        expect(classes[2], 'info').toContain('p-tag-info');
        expect(classes[3], 'success').toContain('p-tag-success');
        expect(classes[4], 'warn').toContain('p-tag-warn');
        expect(classes[5], 'danger').toContain('p-tag-danger');
      }
    },
    {
      name: 'Rounded: шесть скруглённых тегов',
      story: 'components-misc-tag--rounded',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-tag.p-tag-rounded').count(), 'скруглённые').toBeGreaterThanOrEqual(6);
      }
    },
    {
      name: 'WithIcon: иконка внутри тега',
      story: 'components-misc-tag--with-icon',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-tag .ti').count(), 'иконки').toBeGreaterThan(0);
      }
    },
    {
      name: 'Primary: текст тега',
      story: 'components-misc-tag--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-tag').innerText(), 'текст').toBe('Tag');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
