/**
 * E2E-спека Popover: открытие, закрытие и доступность диалога.
 */

const STORIES = [
  { id: 'components-overlay-popover--default', name: 'Default' },
  { id: 'components-overlay-popover--rich-content', name: 'RichContent' }
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

const openPopover = async (page) => {
  await page.locator('button', { hasText: 'Показать' }).click();
  await page.waitForSelector('.p-popover', { state: 'visible' });
};

export default {
  component: 'popover',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: поповер открывается и закрывается кликом вне',
      story: 'components-overlay-popover--default',
      run: async ({ page, expect }) => {
        await openPopover(page);
        expect(await page.locator('.p-popover').isVisible(), 'поповер').toBe(true);
        await page.mouse.click(1000, 700);
        await page.waitForTimeout(400);
        expect(await page.locator('.p-popover').isVisible().catch(() => false), 'после клика вне').toBe(false);
      }
    },
    {
      name: 'Default: у поповера есть доступное имя',
      story: 'components-overlay-popover--default',
      knownIssue: 'p-popover имеет role=dialog без aria-label/aria-labelledby',
      knownIssue: 'p-popover имеет role=dialog без aria-label/aria-labelledby',
      run: async ({ page, expect }) => {
        await openPopover(page);
        const popover = page.locator('.p-popover');
        const label = await popover.getAttribute('aria-label');
        const labelledBy = await popover.getAttribute('aria-labelledby');
        expect(Boolean(label || labelledBy), 'доступное имя').toBe(true);
      }
    },
    {
      name: 'RichContent: содержимое поповера',
      story: 'components-overlay-popover--rich-content',
      run: async ({ page, expect }) => {
        await openPopover(page);
        expect((await page.locator('.p-popover').innerText()).trim().length, 'контент').toBeGreaterThan(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
