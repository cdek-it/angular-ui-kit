/**
 * E2E-спека InputGroup: аддоны, размеры и disabled.
 */

const STORIES = [
  { id: 'components-form-inputgroup--addon-both', name: 'AddonBoth' },
  { id: 'components-form-inputgroup--addon-right', name: 'AddonRight' },
  { id: 'components-form-inputgroup--default', name: 'Default' },
  { id: 'components-form-inputgroup--disabled', name: 'Disabled' },
  { id: 'components-form-inputgroup--sizes', name: 'Sizes' },
  { id: 'components-form-inputgroup--with-text', name: 'WithText' }
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
  component: 'inputgroup',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: аддон слева и поле',
      story: 'components-form-inputgroup--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-inputgroup').getAttribute('class'), 'аддон слева').toContain('extra-input-group--addon-left');
        expect(await page.locator('.p-inputgroupaddon').count(), 'аддон').toBe(1);
        expect(await page.locator('.p-inputgroup input').count(), 'поле').toBe(1);
      }
    },
    {
      name: 'AddonBoth: аддоны с двух сторон',
      story: 'components-form-inputgroup--addon-both',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-inputgroup').getAttribute('class'), 'класс').toContain('extra-input-group--addon-both');
        expect(await page.locator('.p-inputgroup input').count(), 'поле').toBe(1);
      }
    },
    {
      name: 'WithText: текстовый аддон @',
      story: 'components-form-inputgroup--with-text',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-inputgroup').innerText(), 'текст аддона').toContain('@');
      }
    },
    {
      name: 'Sizes: xlarge высота 64',
      story: 'components-form-inputgroup--sizes',
      run: async ({ page, expect }) => {
        const box = await page.locator('.p-inputgroup input').boundingBox();
        expect(Math.round(box.height), 'высота').toBe(64);
        expect(await page.locator('input').getAttribute('class'), 'класс xlg').toContain('p-inputtext-xlg');
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'components-form-inputgroup--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-inputgroup input').isDisabled(), 'disabled').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
