/**
 * E2E-спека Accordion: раскрытие, режим multiple, disabled и клавиатура.
 */

const STORIES = [
  { id: 'components-panel-accordion--default', name: 'Default' },
  { id: 'components-panel-accordion--disabled', name: 'Disabled' },
  { id: 'components-panel-accordion--multiple', name: 'Multiple' },
  { id: 'components-panel-accordion--slots', name: 'Slots' }
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

const expanded = (page) =>
  page.locator('.p-accordionheader').evaluateAll((headers) => headers.map((header) => header.getAttribute('aria-expanded')));

export default {
  component: 'accordion',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: один раскрытый раздел, клик переключает',
      story: 'components-panel-accordion--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-accordionheader').count(), 'заголовки').toBe(3);
        expect(await expanded(page), 'начальное состояние').toEqual(['true', 'false', 'false']);

        await page.locator('.p-accordionheader').nth(1).click();
        expect(await expanded(page), 'после клика').toEqual(['false', 'true', 'false']);
      }
    },
    {
      name: 'Multiple: раскрываются все три раздела',
      story: 'components-panel-accordion--multiple',
      run: async ({ page, expect }) => {
        expect(await expanded(page), 'начальное состояние').toEqual(['true', 'false', 'true']);
        await page.locator('.p-accordionheader').nth(1).click();
        expect(await expanded(page), 'после клика').toEqual(['true', 'true', 'true']);
      }
    },
    {
      name: 'Disabled: недоступный раздел не раскрывается',
      story: 'components-panel-accordion--disabled',
      run: async ({ page, expect }) => {
        const disabled = page.locator('.p-accordionheader[aria-disabled=true]');
        expect(await disabled.count(), 'disabled-заголовок').toBe(1);
        const before = await disabled.getAttribute('aria-expanded');
        await disabled.click({ force: true });
        expect(await disabled.getAttribute('aria-expanded'), 'после клика').toBe(before);
      }
    },
    {
      name: 'Keyboard: Enter раскрывает раздел',
      story: 'components-panel-accordion--default',
      run: async ({ page, expect }) => {
        const header = page.locator('.p-accordionheader').nth(1);
        await header.focus();
        await page.keyboard.press('Enter');
        expect(await header.getAttribute('aria-expanded'), 'после Enter').toBe('true');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
