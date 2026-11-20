/**
 * E2E-спека AutoComplete: подсказки, выбор, dropdown, multiple, очистка и a11y.
 */

const STORIES = [
  { id: 'components-form-autocomplete--clearable', name: 'Clearable' },
  { id: 'components-form-autocomplete--default', name: 'Default' },
  { id: 'components-form-autocomplete--disabled', name: 'Disabled' },
  { id: 'components-form-autocomplete--dropdown', name: 'Dropdown' },
  { id: 'components-form-autocomplete--invalid', name: 'Invalid' },
  { id: 'components-form-autocomplete--labels', name: 'Labels' },
  { id: 'components-form-autocomplete--multiple', name: 'Multiple' },
  { id: 'components-form-autocomplete--objects', name: 'Objects' }
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
  component: 'autocomplete',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: ввод открывает подсказки и выбор заполняет поле',
      story: 'components-form-autocomplete--default',
      run: async ({ page, expect, wait }) => {
        const input = page.locator('input.p-autocomplete-input');
        expect(await input.getAttribute('role'), 'role').toBe('combobox');
        expect(await input.getAttribute('aria-expanded'), 'до ввода').toBe('false');

        await input.fill('Мо');
        await wait(async () => (await page.locator('.p-autocomplete-option').count()) > 0);
        expect(await input.getAttribute('aria-expanded'), 'после ввода').toBe('true');
        expect(await page.locator('.p-autocomplete-option').first().innerText(), 'подсказка').toBe('Москва');

        await page.locator('.p-autocomplete-option').first().click();
        expect(await input.inputValue(), 'значение').toBe('Москва');
      }
    },
    {
      name: 'Keyboard: ArrowDown и Enter выбирают подсказку',
      story: 'components-form-autocomplete--default',
      run: async ({ page, expect, wait }) => {
        const input = page.locator('input.p-autocomplete-input');
        await input.fill('Мо');
        await wait(async () => (await page.locator('.p-autocomplete-option').count()) > 0);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        expect(await input.inputValue(), 'значение после Enter').toBe('Москва');
      }
    },
    {
      name: 'Dropdown: кнопка открывает все восемь вариантов',
      story: 'components-form-autocomplete--dropdown',
      run: async ({ page, expect }) => {
        await page.locator('.p-autocomplete-dropdown').click();
        await page.waitForSelector('.p-autocomplete-option');
        expect(await page.locator('.p-autocomplete-option').count(), 'варианты').toBe(8);
        expect(await page.locator('input').first().getAttribute('aria-expanded'), 'aria-expanded').toBe('true');
      }
    },
    {
      name: 'Multiple: выбранный вариант становится чипом',
      story: 'components-form-autocomplete--multiple',
      run: async ({ page, expect, wait }) => {
        const input = page.locator('input.p-autocomplete-input');
        await input.fill('Мо');
        await wait(async () => (await page.locator('.p-autocomplete-option').count()) > 0);
        await page.locator('.p-autocomplete-option').first().click();
        expect(await page.locator('.p-autocomplete-chip').count(), 'чип').toBe(1);
        expect(await page.locator('#storybook-root').innerText(), 'текст чипа').toContain('Москва');
      }
    },
    {
      name: 'Clearable: иконка очищает значение',
      story: 'components-form-autocomplete--clearable',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-autocomplete-input').first();
        expect(await page.locator('.p-autocomplete-clear-icon').count(), 'иконка очистки').toBe(1);
        await page.locator('.p-autocomplete-clear-icon').click();
        expect(await input.inputValue(), 'значение после очистки').toBe('');
      }
    },
    {
      name: 'Disabled: поле отключено и не открывает подсказки',
      story: 'components-form-autocomplete--disabled',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-autocomplete-input');
        expect(await input.isDisabled(), 'disabled').toBe(true);
        await input.click({ force: true });
        await page.waitForTimeout(300);
        expect(await page.locator('.p-autocomplete-overlay').count(), 'оверлей').toBe(0);
      }
    },
    {
      name: 'Invalid: класс p-invalid',
      story: 'components-form-autocomplete--invalid',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-autocomplete-input').getAttribute('class'), 'invalid').toContain('p-invalid');
      }
    },
    {
      name: 'Labels: лейбл связан с полем',
      story: 'components-form-autocomplete--labels',
      run: async ({ page, expect }) => {
        const label = page.locator('label').first();
        expect(await label.getAttribute('for'), 'for').toBe(await page.locator('input').first().getAttribute('id'));
      }
    },
    {
      name: 'Dropdown: у кнопки есть доступное имя',
      story: 'components-form-autocomplete--dropdown',
      knownIssue: 'p-autocomplete-dropdown — button без aria-label/текста: скринридер не называет кнопку',
      run: async ({ page, expect }) => {
        const name = await page.locator('.p-autocomplete-dropdown').evaluate((element) => {
          return element.getAttribute('aria-label') || element.getAttribute('title') || element.textContent.trim();
        });
        expect(Boolean(name), 'доступное имя').toBe(true);
      }
    },
    {
      name: 'Keyboard: активная подсказка объявляется через aria-activedescendant',
      story: 'components-form-autocomplete--default',
      knownIssue: 'PrimeNG не выставляет aria-activedescendant при навигации по подсказкам',
      run: async ({ page, expect, wait }) => {
        const input = page.locator('input.p-autocomplete-input');
        await input.fill('Мо');
        await wait(async () => (await page.locator('.p-autocomplete-option').count()) > 0);
        await page.keyboard.press('ArrowDown');
        expect(await input.getAttribute('aria-activedescendant'), 'aria-activedescendant').toBeTruthy();
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
