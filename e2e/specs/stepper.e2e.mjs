/**
 * E2E-спека Stepper: шаги, переходы, вертикальная ориентация и состояния.
 */

const STORIES = [
  { id: 'components-panel-stepper--default', name: 'Default' },
  { id: 'components-panel-stepper--linear', name: 'Linear' },
  { id: 'components-panel-stepper--states', name: 'States' },
  { id: 'components-panel-stepper--vertical', name: 'Vertical' }
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

const panelText = (page) => page.locator('.p-stepper-panel, .p-step-panel').innerText();

export default {
  component: 'stepper',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: три шага и переход Вперёд/Назад',
      story: 'components-panel-stepper--default',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-stepper').getAttribute('role'), 'role').toBe('tablist');
        expect(await page.locator('.p-step-header').count(), 'шаги').toBe(3);
        expect(await page.locator('#storybook-root').innerText(), 'первый шаг').toContain('Шаг 1');

        await page.locator('button.p-button', { hasText: 'Вперёд' }).click();
        expect(await page.locator('#storybook-root').innerText(), 'после Вперёд').toContain('Шаг 2');

        await page.locator('button.p-button', { hasText: 'Назад' }).click();
        expect(await page.locator('#storybook-root').innerText(), 'после Назад').toContain('Шаг 1');
      }
    },
    {
      name: 'Default: клик по третьему шагу открывает его',
      story: 'components-panel-stepper--default',
      run: async ({ page, expect }) => {
        await page.locator('.p-step-header').nth(2).click();
        expect(await page.locator('#storybook-root').innerText(), 'активный шаг').toContain('Шаг 3');
      }
    },
    {
      name: 'Vertical: шаги стоят друг под другом',
      story: 'components-panel-stepper--vertical',
      run: async ({ page, expect }) => {
        const boxes = await page.locator('.p-step-header').evaluateAll((headers) =>
          headers.map((header) => {
            const box = header.getBoundingClientRect();
            return { x: Math.round(box.x), y: Math.round(box.y) };
          })
        );
        expect(boxes.length, 'шаги').toBe(3);
        expect(new Set(boxes.map((box) => box.x)).size, 'одна колонка').toBe(1);
        expect(boxes[0].y < boxes[1].y && boxes[1].y < boxes[2].y, 'шаги друг под другом').toBe(true);
      }
    },
    {
      name: 'States: подписи готово/ошибка/недоступно',
      story: 'components-panel-stepper--states',
      run: async ({ page, expect }) => {
        const text = await page.locator('#storybook-root').innerText();
        expect(text, 'статусы').toContain('ошибка');
        expect(text, 'недоступный шаг').toContain('недоступно');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
