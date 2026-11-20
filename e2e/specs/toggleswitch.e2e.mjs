/**
 * E2E-спека ToggleSwitch: роль switch, переключение, состояния и клавиатура.
 */

const STORIES = [
  { id: 'components-form-toggleswitch--bare', name: 'Bare' },
  { id: 'components-form-toggleswitch--default', name: 'Default' },
  { id: 'components-form-toggleswitch--positions', name: 'Positions' },
  { id: 'components-form-toggleswitch--states', name: 'States' }
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
  component: 'toggleswitch',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: role=switch, клик и aria-checked',
      story: 'components-form-toggleswitch--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input');
        expect(await input.getAttribute('role'), 'role').toBe('switch');
        expect(await input.getAttribute('aria-checked'), 'до клика').toBe('false');

        await page.locator('.p-toggleswitch').click();
        expect(await input.isChecked(), 'checked').toBe(true);
        expect(await input.getAttribute('aria-checked'), 'aria-checked').toBe('true');
      }
    },
    {
      name: 'Keyboard: Space переключает',
      story: 'components-form-toggleswitch--default',
      run: async ({ page, expect }) => {
        const input = page.locator('.p-toggleswitch-input');
        await input.focus();
        await page.keyboard.press('Space');
        expect(await input.isChecked(), 'после Space').toBe(true);
      }
    },
    {
      name: 'States: checked, disabled и invalid',
      story: 'components-form-toggleswitch--states',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-toggleswitch-input').nth(1).isChecked(), 'второй включён').toBe(true);
        expect(await page.locator('.p-toggleswitch-input').nth(2).isDisabled(), 'третий disabled').toBe(true);
        expect(await page.locator('.p-toggleswitch').nth(3).getAttribute('class'), 'четвёртый invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Positions: оба положения включены',
      story: 'components-form-toggleswitch--positions',
      run: async ({ page, expect }) => {
        const checked = await page.locator('.p-toggleswitch-input').evaluateAll((elements) => elements.map((element) => element.checked));
        expect(checked, 'все включены').toEqual([true, true]);
      }
    },
    {
      name: 'ToggleSwitch: tabindex не должен быть NaN',
      story: 'components-form-toggleswitch--default',
      knownIssue: 'PrimeNG выставляет tabindex="NaN" на нативный input',
      run: async ({ page, expect }) => {
        const tabindex = await page.locator('.p-toggleswitch-input').getAttribute('tabindex');
        expect(tabindex === null || /^-?\d+$/.test(tabindex), 'валидный tabindex').toBe(true);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
