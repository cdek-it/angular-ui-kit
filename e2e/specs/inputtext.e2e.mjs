/**
 * E2E-спека InputText: ввод, лейблы, состояния, очистка и размеры.
 *
 * Проверяет контракт формы, а не вёрстку: значение, фокус, нативные атрибуты
 * и доступность. Дефекты, которые сейчас воспроизводятся, помечены knownIssue.
 */

const input = (page, index = 0) => page.locator('input').nth(index);
const clearIcon = (page) => page.locator('[aria-label="Очистить поле"]');

const a11yRulesWithoutDocumentNoise = {
  'landmark-one-main': { enabled: false },
  region: { enabled: false },
  'page-has-heading-one': { enabled: false },
  'scrollable-region-focusable': { enabled: false },
  'color-contrast': { enabled: false }
};

export default {
  component: 'inputtext',
  stories: {
    default: 'components-form-inputtext--default',
    labels: 'components-form-inputtext--labels',
    sizes: 'components-form-inputtext--sizes',
    types: 'components-form-inputtext--types',
    states: 'components-form-inputtext--states',
    clearable: 'components-form-inputtext--clearable'
  },
  tests: [
    {
      name: 'Ввод обновляет значение поля',
      story: 'default',
      run: async ({ page, expect }) => {
        const field = input(page);
        expect(await field.count(), 'поле').toBe(1);
        expect(await field.getAttribute('placeholder'), 'плейсхолдер').toBe('Введите текст...');

        await field.fill('Привет');
        expect(await field.inputValue(), 'значение после ввода').toBe('Привет');
        expect(await field.evaluate((element) => element.classList.contains('p-filled')), 'класс p-filled').toBe(true);
      }
    },
    {
      name: 'Лейбл связан с полем и фокусирует его по клику',
      story: 'labels',
      run: async ({ page, expect }) => {
        const label = page.locator('label.extra-inputtext-label').first();
        const field = input(page);
        const inputId = await field.getAttribute('id');

        expect(await label.getAttribute('for'), 'for у лейбла').toBe(inputId);

        await label.click();
        expect(await page.evaluate(() => document.activeElement?.tagName), 'фокус после клика по лейблу').toBe('INPUT');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('id')), 'id сфокусированного поля').toBe(inputId);
      }
    },
    {
      name: 'Disabled: поле отключено и пропускается по Tab',
      story: 'states',
      run: async ({ page, expect }) => {
        expect(await input(page, 1).isDisabled(), 'disabled-поле').toBe(true);

        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('id')), 'первый Tab').toBe('extra-input-text-0');

        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('id')), 'второй Tab').toBe('extra-input-text-2');
      }
    },
    {
      name: 'Invalid: поле получает класс p-invalid',
      story: 'states',
      run: async ({ page, expect }) => {
        expect(await input(page, 2).evaluate((element) => element.classList.contains('p-invalid')), 'класс p-invalid').toBe(true);
      }
    },
    {
      name: 'Invalid: поле объявляет aria-invalid',
      story: 'states',
      knownIssue: 'PrimeNG ставит только класс p-invalid; aria-invalid на input отсутствует, скринридер не узнаёт об ошибке',
      run: async ({ page, expect }) => {
        expect(await input(page, 2).getAttribute('aria-invalid'), 'aria-invalid').toBe('true');
      }
    },
    {
      name: 'Размеры small/base/large/xlarge возрастают',
      story: 'sizes',
      run: async ({ page, expect }) => {
        const heights = await page
          .locator('input')
          .evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().height)));

        expect(heights.length, 'количество полей').toBe(4);
        expect(heights[0] < heights[1], 'small ниже base').toBe(true);
        expect(heights[1] < heights[2], 'base ниже large').toBe(true);
        expect(heights[2] < heights[3], 'large ниже xlarge').toBe(true);
      }
    },
    {
      name: 'Тип поля применяется: password скрывает ввод',
      story: 'types',
      run: async ({ page, expect }) => {
        expect(await input(page, 1).getAttribute('type'), 'тип второго поля').toBe('password');
      }
    },
    {
      name: 'Очистка: иконка появляется только при значении и очищает поле',
      story: 'clearable',
      run: async ({ page, expect, wait }) => {
        const field = input(page);

        expect(await clearIcon(page).count(), 'иконка при заполненном поле').toBe(1);
        expect(await clearIcon(page).getAttribute('aria-label'), 'aria-label иконки').toBe('Очистить поле');
        expect(await clearIcon(page).getAttribute('tabindex'), 'tabindex иконки').toBe('0');

        await clearIcon(page).click();
        await wait(async () => (await clearIcon(page).count()) === 0);
        expect(await field.inputValue(), 'значение после очистки').toBe('');

        await field.fill('Снова текст');
        await wait(async () => (await clearIcon(page).count()) === 1);
        expect(await field.inputValue(), 'значение после повторного ввода').toBe('Снова текст');
      }
    },
    {
      name: 'Очистка с клавиатуры: Enter на иконке',
      story: 'clearable',
      run: async ({ page, expect, wait }) => {
        const field = input(page);
        await clearIcon(page).focus();
        await page.keyboard.press('Enter');
        await wait(async () => (await clearIcon(page).count()) === 0);
        expect(await field.inputValue(), 'значение после Enter').toBe('');
      }
    },
    {
      name: 'После очистки фокус остаётся в поле',
      story: 'clearable',
      knownIssue: 'После клика по иконке очистки фокус уходит в body: клавиатурный пользователь теряет место',
      run: async ({ page, expect }) => {
        await clearIcon(page).click();
        await page.waitForTimeout(150);

        expect(await page.evaluate(() => document.activeElement?.tagName), 'активный элемент после очистки').toBe('INPUT');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('id')), 'id активного поля').toBe('extra-input-text-0');
      }
    },
    {
      name: 'A11y: структура формы без critical/serious',
      story: 'labels',
      run: async ({ page, expect, a11y, formatViolations }) => {
        const violations = await a11y({ rules: a11yRulesWithoutDocumentNoise });
        expect(violations, `нарушения axe: ${formatViolations(violations)}`).toEqual([]);
      }
    },
    {
      name: 'A11y: контраст плавающего лейбла',
      story: 'labels',
      knownIssue: 'Цвет float-label — color.fg.muted (#85888e) на белом: 3.55:1 при норме 4.5:1',
      run: async ({ page, expect, a11y, formatViolations }) => {
        const violations = await a11y({
          rules: {
            'landmark-one-main': { enabled: false },
            region: { enabled: false },
            'page-has-heading-one': { enabled: false },
            'scrollable-region-focusable': { enabled: false }
          }
        });
        expect(violations, `нарушения axe: ${formatViolations(violations)}`).toEqual([]);
      }
    }
  ]
};
