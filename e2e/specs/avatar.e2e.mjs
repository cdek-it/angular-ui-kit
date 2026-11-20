/**
 * E2E-спека Avatar: размеры, формы, группа и бейдж.
 */

const STORIES = [
  { id: 'components-misc-avatar--default', name: 'Default' },
  { id: 'components-misc-avatar--group', name: 'Group' },
  { id: 'components-misc-avatar--icon', name: 'Icon' },
  { id: 'components-misc-avatar--icon-with-badge', name: 'Icon With Badge' },
  { id: 'components-misc-avatar--image', name: 'Image' },
  { id: 'components-misc-avatar--image-with-badge', name: 'Image With Badge' },
  { id: 'components-misc-avatar--label', name: 'Label' },
  { id: 'components-misc-avatar--label-with-badge', name: 'Label With Badge' },
  { id: 'components-misc-avatar--shapes', name: 'Shapes' },
  { id: 'components-misc-avatar--sizes', name: 'Sizes' }
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
  component: 'avatar',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Sizes: 32 < 40 < 56 и классы lg/xl',
      story: 'components-misc-avatar--sizes',
      run: async ({ page, expect }) => {
        const items = await page.locator('.p-avatar').evaluateAll((elements) =>
          elements.map((element) => ({ className: element.className, size: Math.round(element.getBoundingClientRect().height) }))
        );
        expect(items.length, 'количество аватаров').toBe(3);
        expect(items[0].size < items[1].size, 'base ниже lg').toBe(true);
        expect(items[1].size < items[2].size, 'lg ниже xl').toBe(true);
        expect(items[1].className, 'класс lg').toContain('p-avatar-lg');
        expect(items[2].className, 'класс xl').toContain('p-avatar-xl');
      }
    },
    {
      name: 'Shapes: круглая форма через p-avatar-circle',
      story: 'components-misc-avatar--shapes',
      run: async ({ page, expect }) => {
        const classes = await page.locator('.p-avatar').evaluateAll((elements) => elements.map((element) => element.className));
        expect(classes.length, 'количество аватаров').toBe(2);
        expect(classes[1], 'круглый аватар').toContain('p-avatar-circle');
      }
    },
    {
      name: 'Group: несколько аватаров и счётчик +2',
      story: 'components-misc-avatar--group',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-avatar-group').count(), 'группа').toBe(1);
        expect(await page.locator('.p-avatar').count(), 'аватары в группе').toBeGreaterThanOrEqual(3);
        expect(await page.locator('#storybook-root').innerText(), 'счётчик').toContain('+2');
      }
    },
    {
      name: 'Label With Badge: бейдж и изображение',
      story: 'components-misc-avatar--image-with-badge',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-badge').count(), 'бейдж').toBeGreaterThanOrEqual(1);
        expect(await page.locator('img').count(), 'изображения').toBeGreaterThan(0);
      }
    },
    {
      name: 'Image: у изображения аватара есть alt',
      story: 'components-misc-avatar--image',
      knownIssue: 'PrimeNG p-avatar рендерит img без alt: изображение озвучивается как декоративное',
      run: async ({ page, expect }) => {
        const alts = await page.locator('img').evaluateAll((images) => images.map((image) => image.alt));
        expect(alts.length, 'изображения').toBeGreaterThan(0);
        expect(alts.every((alt) => alt.trim().length > 0), 'у всех изображений есть alt').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
