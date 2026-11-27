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


const openTooltip = async (page, url, args) => {
  await page.goto(`${url}&args=${args}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
};

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
    {
      name: 'Properties: tooltip задаёт текст',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect }) => {
        await page.locator('#storybook-root button').first().hover();
        await page.waitForSelector('.p-tooltip', { state: 'visible' });
        expect(await page.locator('.p-tooltip').innerText(), 'текст').toBe('Это текст подсказки');
      }
    },
    {
      name: 'Properties: positions top/right/bottom/left',
      story: 'components-overlay-tooltip--positions',
      run: async ({ page, expect }) => {
        const cases = [
          ['Top', 'p-tooltip-top', 'Подсказка сверху'],
          ['Right', 'p-tooltip-right', 'Подсказка справа'],
          ['Bottom', 'p-tooltip-bottom', 'Подсказка снизу'],
          ['Left', 'p-tooltip-left', 'Подсказка слева']
        ];
        for (const [label, cls, text] of cases) {
          await page.getByRole('button', { name: label }).hover();
          await page.waitForSelector('.p-tooltip', { state: 'visible' });
          const tooltip = page.locator('.p-tooltip');
          expect((await tooltip.getAttribute('class')) ?? '', label).toContain(cls);
          expect(await tooltip.innerText(), `${label} text`).toBe(text);
          await page.mouse.move(5, 5);
          await page.waitForTimeout(300);
        }
      }
    },
    {
      name: 'Properties: event=focus показывает по фокусу, не по hover',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect, url }) => {
        await openTooltip(page, url, 'event:focus');
        const button = page.locator('#storybook-root button').first();
        await button.hover();
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').count(), 'по hover').toBe(0);
        await button.focus();
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').count(), 'по focus').toBe(1);
      }
    },
    {
      name: 'Properties: event=both показывает по фокусу',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect, url }) => {
        await openTooltip(page, url, 'event:both');
        await page.locator('#storybook-root button').first().focus();
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').count(), 'по focus').toBe(1);
      }
    },
    {
      name: 'Properties: event=hover показывает по hover',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect, url }) => {
        await openTooltip(page, url, 'event:hover');
        await page.locator('#storybook-root button').first().hover();
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').count(), 'по hover').toBe(1);
      }
    },
    {
      name: 'Properties: showDelay откладывает появление',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect, url }) => {
        await openTooltip(page, url, 'showDelay:600');
        const button = page.locator('#storybook-root button').first();
        await button.hover();
        await page.waitForTimeout(100);
        expect(await page.locator('.p-tooltip').count(), 'сразу').toBe(0);
        await page.waitForTimeout(700);
        expect(await page.locator('.p-tooltip').count(), 'после задержки').toBe(1);
      }
    },
    {
      name: 'Properties: hideDelay откладывает скрытие',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect, url }) => {
        await openTooltip(page, url, 'hideDelay:600');
        const button = page.locator('#storybook-root button').first();
        await button.hover();
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').count(), 'показан').toBe(1);
        await page.mouse.move(5, 5);
        await page.waitForTimeout(100);
        expect(await page.locator('.p-tooltip').count(), 'сразу после ухода').toBe(1);
        await page.waitForTimeout(700);
        expect(await page.locator('.p-tooltip').count(), 'после задержки').toBe(0);
      }
    },
    {
      name: 'Properties: tooltipDisabled отключает подсказку',
      story: 'components-overlay-tooltip--default',
      run: async ({ page, expect, url }) => {
        await openTooltip(page, url, 'tooltipDisabled:true');
        await page.locator('#storybook-root button').first().hover();
        await page.waitForTimeout(500);
        expect(await page.locator('.p-tooltip').count(), 'подсказка').toBe(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
