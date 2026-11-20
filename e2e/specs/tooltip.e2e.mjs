/**
 * E2E-спека Tooltip: показ, скрытие, позиции и связь с триггером.
 */

const STORIES = [
  { id: 'components-overlay-tooltip--default', name: 'Default' },
  { id: 'components-overlay-tooltip--delay', name: 'Delay' },
  { id: 'components-overlay-tooltip--event-focus', name: 'Event' },
  { id: 'components-overlay-tooltip--positions', name: 'Positions' }
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
  component: 'tooltip',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: подсказка появляется при наведении и исчезает',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect }) => {
        const trigger = page.locator('button', { hasText: 'Наведи на меня' });
        await trigger.hover();
        await page.waitForSelector('.p-tooltip', { state: 'visible' });
        expect(await page.locator('.p-tooltip').innerText(), 'текст').toBe('Это текст подсказки');

        await page.mouse.move(1000, 700);
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').isVisible().catch(() => false), 'после ухода').toBe(false);
      }
    },
    {
      name: 'Default: роль tooltip',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect }) => {
        await page.locator('button', { hasText: 'Наведи на меня' }).hover();
        await page.waitForSelector('.p-tooltip', { state: 'visible' });
        expect(await page.locator('.p-tooltip').getAttribute('role'), 'role').toBe('tooltip');
      }
    },
    {
      name: 'Default: триггер связан с подсказкой через aria-describedby',
      story: 'components-overlay-tooltip--default',
      knownIssue: 'У триггера нет aria-describedby, у tooltip нет id: подсказка не связывается с элементом',
      run: async ({ page, expect }) => {
        const trigger = page.locator('button', { hasText: 'Наведи на меня' });
        await trigger.hover();
        await page.waitForSelector('.p-tooltip', { state: 'visible' });
        const describedBy = await trigger.getAttribute('aria-describedby');
        const tooltipId = await page.locator('.p-tooltip').getAttribute('id');
        expect(Boolean(describedBy && tooltipId && describedBy === tooltipId), 'связь').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
