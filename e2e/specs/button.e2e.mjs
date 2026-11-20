/**
 * Smoke-спека «button»: все story рендерятся без pageerror, тёмная тема.
 *
 * Сгенерировано e2e/generate-specs.mjs: глубокие сценарии (клавиатура, оверлеи, состояния) добавляются вручную.
 */

const STORIES = [
  { id: "components-button--badge", name: "Badge" },
  { id: "components-button--default", name: "Default" },
  { id: "components-button--events", name: "Events" },
  { id: "components-button--fluid", name: "Fluid" },
  { id: "components-button--icons", name: "Icons" },
  { id: "components-button--rounded", name: "Rounded" },
  { id: "components-button--sizes", name: "Sizes" },
  { id: "components-button--states", name: "States" },
  { id: "components-button--variants", name: "Variants" },
];

export default {
  component: "button",
  stories: Object.fromEntries(STORIES.map((story, index) => [`story-${index}`, story.id])),
  tests: [
    ...STORIES.map((story, index) => ({
      name: `Smoke: ${story.name}`,
      story: `story-${index}`,
      run: async ({ page, expect, errors }) => {
        const pageErrors = errors.filter((error) => error.type === 'pageerror');
        expect(pageErrors.map((error) => error.text), 'ошибки страницы').toEqual([]);
        expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
        const box = await page.locator('#storybook-root').boundingBox();
        expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
      }
    })),
    {
      name: `Тёмная тема: ${STORIES[0].name}`,
      story: 'story-0',
      theme: 'dark',
      run: async ({ page, expect, errors }) => {
        const pageErrors = errors.filter((error) => error.type === 'pageerror');
        expect(pageErrors.map((error) => error.text), 'ошибки страницы').toEqual([]);
        expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
        const box = await page.locator('#storybook-root').boundingBox();
        expect(Boolean(box && box.width > 0), 'ширина story').toBe(true);
      }
    }
  ]
};
