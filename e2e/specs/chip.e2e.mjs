/**
 * E2E-спека Chip: состояния, удаление и иконки.
 */

const STORIES = [
  { id: 'components-misc-chip--default', name: 'Default' },
  { id: 'components-misc-chip--disabled', name: 'Disabled' },
  { id: 'components-misc-chip--removable', name: 'Removable' },
  { id: 'components-misc-chip--removable-with-icon', name: 'Removable With Icon' },
  { id: 'components-misc-chip--with-icon', name: 'With Icon' }
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
  component: 'chip',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: текст и доступное имя',
      story: 'components-misc-chip--default',
      run: async ({ page, expect }) => {
        const chip = page.locator('.p-chip').first();
        expect(await chip.innerText(), 'текст').toBe('В пути');
        expect(await chip.getAttribute('aria-label'), 'aria-label').toBe('В пути');
      }
    },
    {
      name: 'Disabled: класс p-disabled',
      story: 'components-misc-chip--disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-chip').getAttribute('class'), 'класс').toContain('p-disabled');
      }
    },
    {
      name: 'Removable: иконки удаления доступны и удаляют чип',
      story: 'components-misc-chip--removable',
      run: async ({ page, expect, wait }) => {
        expect(await page.locator('.p-chip').count(), 'чипы').toBe(3);
        const removeIcons = page.locator('.p-chip-remove-icon');
        expect(await removeIcons.count(), 'иконки удаления').toBe(3);
        expect(await removeIcons.first().getAttribute('aria-label'), 'aria-label').toBe('Удалить');
        expect(await removeIcons.first().getAttribute('role'), 'role').toBe('button');
        expect(await removeIcons.first().getAttribute('tabindex'), 'tabindex').toBe('0');

        await removeIcons.first().click();
        await wait(async () => (await page.locator('.p-chip').count()) === 2);
        expect(await page.locator('.p-chip').count(), 'чипов после удаления').toBe(2);
      }
    },
    {
      name: 'With Icon: иконка внутри чипа',
      story: 'components-misc-chip--with-icon',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-chip .ti').count(), 'иконка').toBeGreaterThan(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
