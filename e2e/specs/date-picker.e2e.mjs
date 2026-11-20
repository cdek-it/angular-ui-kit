/**
 * E2E-спека DatePicker: календарь, выбор даты, диапазон, inline и состояния.
 */

const STORIES = [
  { id: 'components-form-datepicker--button-bar', name: 'Button Bar' },
  { id: 'components-form-datepicker--clear-icon', name: 'Clear Icon' },
  { id: 'components-form-datepicker--default', name: 'Default' },
  { id: 'components-form-datepicker--disabled', name: 'Disabled' },
  { id: 'components-form-datepicker--inline', name: 'Inline' },
  { id: 'components-form-datepicker--invalid', name: 'Invalid' },
  { id: 'components-form-datepicker--locale', name: 'Locale' },
  { id: 'components-form-datepicker--range', name: 'Range' },
  { id: 'components-form-datepicker--time', name: 'Time' }
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

const openPicker = async (page) => {
  await page.locator('input.p-datepicker-input').click();
  await page.waitForSelector('.p-datepicker-panel', { state: 'visible' });
};

const pickDay = async (page, index = 3) => {
  const days = page.locator('.p-datepicker-panel td:not(.p-datepicker-other-month) span:not(.p-disabled)');
  await days.nth(index).click();
};

export default {
  component: 'date-picker',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: диалог календаря и выбор даты',
      story: 'components-form-datepicker--default',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-datepicker-input');
        expect(await input.getAttribute('role'), 'role поля').toBe('combobox');
        expect(await input.getAttribute('aria-expanded'), 'до открытия').toBe('false');

        await openPicker(page);
        const panel = page.locator('.p-datepicker-panel');
        expect(await panel.getAttribute('role'), 'role календаря').toBe('dialog');
        expect(await panel.getAttribute('aria-label'), 'имя календаря').toBe('Выбрать дату');
        expect(await page.locator('.p-datepicker-panel td').count(), 'ячейки').toBe(42);

        await pickDay(page);
        expect(await input.inputValue(), 'значение').toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
      }
    },
    {
      name: 'Default: панель закрывается после выбора даты',
      story: 'components-form-datepicker--default',
      knownIssue: 'После выбора даты панель остаётся открытой: aria-expanded не сбрасывается',
      run: async ({ page, expect, wait }) => {
        const input = page.locator('input.p-datepicker-input');
        await openPicker(page);
        await pickDay(page);
        await wait(async () => (await input.getAttribute('aria-expanded')) === 'false', { timeout: 2000 });
        expect(await input.getAttribute('aria-expanded'), 'aria-expanded').toBe('false');
      }
    },
    {
      name: 'Clear Icon: иконка очищает выбранную дату',
      story: 'components-form-datepicker--clear-icon',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-datepicker-input');
        await openPicker(page);
        await pickDay(page);
        expect(await page.locator('.p-datepicker-clear-icon').count(), 'иконка очистки').toBe(1);

        await page.locator('.p-datepicker-clear-icon').click();
        expect(await input.inputValue(), 'значение после очистки').toBe('');
      }
    },
    {
      name: 'Range: выбор двух дат даёт период',
      story: 'components-form-datepicker--range',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-datepicker-input');
        await openPicker(page);
        await pickDay(page, 2);
        await pickDay(page, 6);
        expect(await input.inputValue(), 'период').toMatch(/^\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}$/);
      }
    },
    {
      name: 'Inline: календарь виден без поля',
      story: 'components-form-datepicker--inline',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-datepicker-input').count(), 'поле ввода').toBe(0);
        expect(await page.locator('.p-datepicker-panel').isVisible(), 'календарь').toBe(true);
        expect(await page.locator('.p-datepicker-panel td').count(), 'ячейки').toBe(42);
      }
    },
    {
      name: 'Disabled: поле отключено',
      story: 'components-form-datepicker--disabled',
      knownIssue: 'FormControl.disable() не доходит до input: disabled=false, класс p-disabled отсутствует',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-datepicker-input').isDisabled(), 'disabled').toBe(true);
      }
    },
    {
      name: 'Invalid: поле объявляет aria-invalid',
      story: 'components-form-datepicker--invalid',
      knownIssue: 'PrimeNG ставит только класс p-invalid; aria-invalid отсутствует',
      run: async ({ page, expect }) => {
        expect(await page.locator('input.p-datepicker-input').getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    {
      name: 'Locale: английские названия месяцев',
      story: 'components-form-datepicker--locale',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-datepicker-panel').innerText(), 'календарь').toContain('November');
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
