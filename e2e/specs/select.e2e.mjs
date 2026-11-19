/**
 * E2E-спека Select: поведение, клавиатура, состояния и доступность.
 *
 * Тесты с пометкой `knownIssue` описывают ожидаемое поведение, которое сейчас
 * не выполняется. Они не валят прогон, но попадают в отчёт — когда дефект
 * починят, тест станет зелёным и отчёт это покажет.
 */

const combo = (page) => page.locator('[role=combobox]').first();
const overlay = (page) => page.locator('.p-select-overlay');
const options = (page) => page.locator('.p-select-option');

const optionByText = (page, text) => page.locator('.p-select-option', { hasText: text }).first();

const openByClick = async (page) => {
  await combo(page).click();
  await page.waitForSelector('.p-select-overlay', { state: 'visible' });
  // PrimeNG вешает document-listener и запускает анимацию уже после появления узла:
  // клик в первые ~100ms может не закрыть список, хотя пользовательский клик — закроет.
  await page.waitForTimeout(200);
};

const waitClosed = (page) => page.waitForSelector('.p-select-overlay', { state: 'detached' });

const a11yRulesWithoutDocumentNoise = {
  'landmark-one-main': { enabled: false },
  region: { enabled: false },
  'page-has-heading-one': { enabled: false },
  'scrollable-region-focusable': { enabled: false },
  'color-contrast': { enabled: false }
};

export default {
  component: 'select',
  stories: {
    default: 'components-form-select--default',
    filter: 'components-form-select--filter',
    grouped: 'components-form-select--grouped',
    editable: 'components-form-select--editable',
    sizes: 'components-form-select--sizes',
    disabled: 'components-form-select--disabled',
    labelPosition: 'components-form-select--label-position'
  },
  tests: [
    {
      name: 'Открытие по клику: оверлей, aria-expanded и все опции',
      story: 'default',
      run: async ({ page, expect }) => {
        await openByClick(page);

        expect(await overlay(page).isVisible(), 'оверлей').toBe(true);
        expect(await page.locator('#storybook-root .p-select-overlay').count(), 'оверлей вне story-root').toBe(0);
        expect(await page.locator('body .p-select-overlay').count(), 'оверлей в body').toBe(1);
        expect(await combo(page).getAttribute('aria-expanded'), 'aria-expanded').toBe('true');
        expect(await options(page).count(), 'количество опций').toBe(5);
        expect(await page.locator('.p-select-list[role=listbox]').count(), 'listbox').toBe(1);
        expect(await page.locator('.p-select-option[role=option]').count(), 'role=option').toBe(5);
      }
    },
    {
      name: 'Выбор опции: значение, aria-label, иконка очистки',
      story: 'default',
      run: async ({ page, expect }) => {
        await openByClick(page);
        await optionByText(page, 'Москва').click();
        await waitClosed(page);

        expect(await page.locator('.p-select-label').innerText(), 'текст поля').toBe('Москва');
        expect(await combo(page).getAttribute('aria-label'), 'aria-label поля').toBe('Москва');
        expect(await combo(page).getAttribute('aria-expanded'), 'aria-expanded').toBe('false');
        expect(await page.locator('.p-select-clear-icon').count(), 'иконка очистки').toBe(1);
        expect(await overlay(page).count(), 'оверлей после выбора').toBe(0);
      }
    },
    {
      name: 'Очистка: плейсхолдер возвращается, иконка исчезает',
      story: 'default',
      run: async ({ page, expect }) => {
        await openByClick(page);
        await optionByText(page, 'Казань').click();
        await waitClosed(page);

        await page.locator('.p-select-clear-icon').click();
        await ctxWait(page, async () => (await page.locator('.p-select-clear-icon').count()) === 0, 'иконка очистки исчезла');

        expect(await page.locator('.p-select-label').innerText(), 'текст поля').toBe('Выберите город...');
        expect(await page.locator('.p-select-label.p-placeholder').count(), 'класс placeholder').toBe(1);
        expect(await overlay(page).count(), 'оверлей').toBe(0);
      }
    },
    {
      name: 'Клавиатура: ArrowDown открывает, Enter выбирает',
      story: 'default',
      run: async ({ page, expect }) => {
        await combo(page).focus();
        await page.keyboard.press('ArrowDown');
        await page.waitForSelector('.p-select-overlay', { state: 'visible' });
        await page.keyboard.press('ArrowDown');

        const firstActive = await combo(page).getAttribute('aria-activedescendant');
        await page.keyboard.press('ArrowDown');
        const secondActive = await combo(page).getAttribute('aria-activedescendant');

        expect(firstActive, 'первый активный пункт').toBeTruthy();
        expect(secondActive !== firstActive, 'активный пункт сместился').toBe(true);

        await page.keyboard.press('Enter');
        await waitClosed(page);

        expect(await page.locator('.p-select-label').innerText(), 'выбранное значение').toBe('Москва');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('role')), 'фокус после выбора').toBe('combobox');
      }
    },
    {
      name: 'Esc закрывает список и оставляет фокус на поле',
      story: 'default',
      run: async ({ page, expect }) => {
        await combo(page).focus();
        await page.keyboard.press('ArrowDown');
        await page.waitForSelector('.p-select-overlay', { state: 'visible' });

        await page.keyboard.press('Escape');
        await waitClosed(page);

        expect(await page.evaluate(() => document.activeElement?.getAttribute('role')), 'фокус после Esc').toBe('combobox');
        expect(await page.locator('.p-select-label').innerText(), 'значение не изменилось').toBe('Выберите город...');
      }
    },
    {
      name: 'Клик вне закрывает список без выбора',
      story: 'default',
      run: async ({ page, expect }) => {
        await openByClick(page);
        await page.mouse.click(600, 600);
        await waitClosed(page);

        expect(await combo(page).getAttribute('aria-expanded'), 'aria-expanded').toBe('false');
        expect(await page.locator('.p-select-label').innerText(), 'значение').toBe('Выберите город...');
      }
    },
    {
      name: 'Фильтр оставляет только совпадающие опции и выбирает их',
      story: 'filter',
      run: async ({ page, expect, wait }) => {
        await openByClick(page);
        const filter = page.locator('.p-select-overlay input.p-select-filter');
        expect(await filter.count(), 'поле фильтра').toBe(1);

        await filter.fill('Мос');
        await wait(async () => (await options(page).count()) === 1);

        expect(await options(page).first().innerText(), 'единственная опция').toBe('Москва');

        await options(page).first().click();
        await waitClosed(page);
        expect(await page.locator('.p-select-label').innerText(), 'выбранное значение').toBe('Москва');
      }
    },
    {
      name: 'Фильтр сбрасывается при повторном открытии',
      story: 'filter',
      knownIssue: 'PrimeNG сохраняет введённый фильтр: после закрытия и открытия список остаётся отфильтрованным',
      run: async ({ page, expect }) => {
        await openByClick(page);
        await page.locator('.p-select-overlay input.p-select-filter').fill('Мос');
        await page.keyboard.press('Escape');
        await waitClosed(page);

        await openByClick(page);
        expect(await page.locator('.p-select-overlay input.p-select-filter').inputValue(), 'значение фильтра после reopen').toBe('');
        expect(await options(page).count(), 'количество опций после reopen').toBe(5);
      }
    },
    {
      name: 'Disabled: не открывается, aria-disabled и tabindex=-1',
      story: 'disabled',
      run: async ({ page, expect }) => {
        expect(await page.locator('.p-select.p-disabled').count(), 'класс p-disabled').toBe(1);
        expect(await combo(page).getAttribute('aria-disabled'), 'aria-disabled').toBe('true');
        expect(await combo(page).getAttribute('tabindex'), 'tabindex').toBe('-1');

        await combo(page).click({ force: true });
        await page.waitForTimeout(300);
        expect(await overlay(page).count(), 'оверлей после клика').toBe(0);

        await page.keyboard.press('Tab');
        const roleAfterTab = await page.evaluate(() => document.activeElement?.getAttribute('role'));
        expect(roleAfterTab !== 'combobox', 'disabled-поле не получает фокус по Tab').toBe(true);
      }
    },
    {
      name: 'Grouped: заголовок группы не выбирается, опция выбирается',
      story: 'grouped',
      run: async ({ page, expect }) => {
        await openByClick(page);
        expect(await page.locator('.p-select-option-group').count(), 'заголовки групп').toBe(2);

        await page.locator('.p-select-option-group', { hasText: 'Германия' }).click();
        await page.waitForTimeout(200);
        expect(await overlay(page).count(), 'оверлей после клика по заголовку').toBe(1);
        expect(await page.locator('.p-select-label').innerText(), 'значение после клика по заголовку').toBe('Выберите город...');

        await page.locator('.p-select-option', { hasText: 'Берлин' }).click();
        await waitClosed(page);
        expect(await page.locator('.p-select-label').innerText(), 'выбранное значение').toBe('Берлин');
      }
    },
    {
      name: 'Grouped: заголовки групп не объявляются опциями',
      story: 'grouped',
      knownIssue: 'PrimeNG рендерит заголовки групп как role=option без aria-selected: скринридер считает их выбираемыми',
      run: async ({ page, expect }) => {
        await openByClick(page);
        const roles = await page.locator('.p-select-option-group').evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('role'))
        );
        expect(roles, 'роли заголовков групп').toEqual(['presentation', 'presentation']);
      }
    },
    {
      name: 'Label: клик по лейблу фокусирует поле, имя поля — текст лейбла',
      story: 'labelPosition',
      knownIssue: 'label for указывает на span, а не на labelable-элемент; у combobox нет aria-labelledby, доступное имя — плейсхолдер',
      run: async ({ page, expect }) => {
        const firstLabel = page.locator('label.extra-select-label').first();
        await firstLabel.click();
        await page.waitForTimeout(100);

        expect(await page.evaluate(() => document.activeElement?.getAttribute('role')), 'фокус после клика по лейблу').toBe('combobox');

        const labelledBy = await combo(page).getAttribute('aria-labelledby');
        const ariaLabel = await combo(page).getAttribute('aria-label');
        expect(labelledBy !== null || ariaLabel === 'Город', 'доступное имя поля').toBe(true);
      }
    },
    {
      name: 'Размеры small/base/large различаются высотой',
      story: 'sizes',
      knownIssue: 'components.select.root.sm и .lg в tokens.json равны base (fontSize.300, space.400), поэтому small/base/large — 46px',
      run: async ({ page, expect }) => {
        const heights = await page
          .locator('.p-select')
          .evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().height)));

        expect(heights.length, 'количество селектов').toBe(4);
        expect(heights[0] < heights[1], 'small ниже base').toBe(true);
        expect(heights[1] < heights[2], 'base ниже large').toBe(true);
        expect(heights[2] < heights[3], 'large ниже xlarge').toBe(true);
      }
    },
    {
      name: 'Editable: поле ввода объявлено combobox с aria-expanded',
      story: 'editable',
      knownIssue: 'В editable-режиме PrimeNG рендерит input без role=combobox и aria-expanded',
      run: async ({ page, expect }) => {
        const input = page.locator('input.p-select-label').first();
        expect(await input.count(), 'поле ввода').toBe(1);

        expect(await input.getAttribute('role'), 'role поля').toBe('combobox');
        expect(await input.getAttribute('aria-expanded'), 'aria-expanded поля').toBe('false');
      }
    },
    {
      name: 'Клавиатурный фокус виден на поле',
      story: 'default',
      knownIssue: 'Фокус-кольцо выключено токеном select.root.focusRing.style = none, outline тоже none',
      run: async ({ page, expect }) => {
        await page.keyboard.press('Tab');
        const styles = await combo(page).evaluate((element) => {
          const computed = getComputedStyle(element);
          return {
            outline: `${computed.outlineStyle} ${computed.outlineWidth}`,
            boxShadow: computed.boxShadow
          };
        });

        const visible = styles.boxShadow !== 'none' || !styles.outline.startsWith('none');
        expect(visible, 'видимый индикатор фокуса').toBe(true);
      }
    },
    {
      name: 'Оверлей не уже поля и не выходит за вьюпорт',
      story: 'default',
      run: async ({ page, expect }) => {
        await openByClick(page);
        const field = await page.locator('.p-select').boundingBox();
        const list = await overlay(page).boundingBox();
        const viewport = page.viewportSize();

        expect(list.width >= field.width - 1, 'ширина оверлея').toBe(true);
        expect(list.x >= 0, 'левый край').toBe(true);
        expect(list.x + list.width <= viewport.width + 1, 'правый край').toBe(true);
      }
    },
    {
      name: 'A11y: структура открытого списка без critical/serious',
      story: 'default',
      run: async ({ page, expect, a11y, formatViolations }) => {
        await openByClick(page);
        const violations = await a11y({ rules: a11yRulesWithoutDocumentNoise });
        expect(violations, `нарушения axe: ${formatViolations(violations)}`).toEqual([]);
      }
    },
    {
      name: 'A11y: контраст текста поля в открытом списке',
      story: 'default',
      knownIssue: 'axe color-contrast: плейсхолдер поля не достигает 4.5:1',
      run: async ({ page, expect, a11y, formatViolations }) => {
        await openByClick(page);
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
    },
    {
      name: 'Тёмная тема: выбор значения и очистка работают',
      story: 'default',
      theme: 'dark',
      run: async ({ page, expect }) => {
        await openByClick(page);
        await optionByText(page, 'Екатеринбург').click();
        await waitClosed(page);

        expect(await page.locator('.p-select-label').innerText(), 'значение').toBe('Екатеринбург');
        await page.locator('.p-select-clear-icon').click();
        await page.waitForTimeout(200);
        expect(await page.locator('.p-select-label').innerText(), 'значение после очистки').toBe('Выберите город...');
      }
    }
  ]
};

/** Локальный wait для случая, когда нужен только предикат без ctx.wait. */
async function ctxWait(page, predicate, label) {
  const started = Date.now();
  while (Date.now() - started < 3000) {
    if (await predicate()) return;
    await page.waitForTimeout(50);
  }
  throw new Error(`${label}: не дождались за 3000ms`);
}
