/**
 * E2E-спека ToggleButton: роль, переключение, состояния и размеры.
 */

const STORIES = [
  { id: 'components-form-togglebutton--default', name: 'Default' },
  { id: 'components-form-togglebutton--disabled', name: 'Disabled' },
  { id: 'components-form-togglebutton--fluid', name: 'Fluid' },
  { id: 'components-form-togglebutton--icon-only', name: 'IconOnly' },
  { id: 'components-form-togglebutton--sizes', name: 'Sizes' },
  { id: 'components-form-togglebutton--with-icon', name: 'WithIcon' }
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
  component: 'togglebutton',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: role=button и переключение по клику',
      story: 'components-form-togglebutton--default',
      run: async ({ page, expect }) => {
        const button = page.locator('.p-togglebutton').first();
        expect(await button.getAttribute('role'), 'role').toBe('button');
        expect(await button.getAttribute('aria-pressed'), 'до клика').toBe('false');

        await button.click();
        expect(await button.getAttribute('aria-pressed'), 'после клика').toBe('true');
      }
    },
    {
      name: 'Keyboard: Space переключает',
      story: 'components-form-togglebutton--default',
      run: async ({ page, expect }) => {
        const button = page.locator('.p-togglebutton').first();
        await button.focus();
        await page.keyboard.press('Space');
        expect(await button.getAttribute('aria-pressed'), 'после Space').toBe('true');
      }
    },
    {
      name: 'Disabled: aria-disabled и класс p-disabled',
      story: 'components-form-togglebutton--disabled',
      run: async ({ page, expect }) => {
        const button = page.locator('.p-togglebutton').first();
        expect(await button.getAttribute('class'), 'класс').toContain('p-disabled');
        expect(await button.getAttribute('aria-disabled'), 'aria-disabled').toBe('true');
      }
    },
    {
      name: 'Sizes: 32 < 40 < 56 < 64',
      story: 'components-form-togglebutton--sizes',
      run: async ({ page, expect }) => {
        const heights = await page.locator('.p-togglebutton').evaluateAll((buttons) =>
          buttons.map((button) => Math.round(button.getBoundingClientRect().height))
        );
        expect(heights.length, 'количество').toBe(4);
        expect(heights[0] < heights[1] && heights[1] < heights[2] && heights[2] < heights[3], 'высоты возрастают').toBe(true);
      }
    },
    {
      name: 'IconOnly: квадратная кнопка',
      story: 'components-form-togglebutton--icon-only',
      run: async ({ page, expect }) => {
        const box = await page.locator('.p-togglebutton').first().boundingBox();
        expect(Math.round(box.width), 'ширина').toBe(Math.round(box.height));
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
