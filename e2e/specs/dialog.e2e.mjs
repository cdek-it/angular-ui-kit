/**
 * E2E-спека Dialog: открытие, семантика, размеры, фичи и закрытие.
 */

const STORIES = [
  { id: 'components-overlay-dialog--basic', name: 'Basic' },
  { id: 'components-overlay-dialog--dynamic', name: 'Dynamic' },
  { id: 'components-overlay-dialog--features', name: 'Features' },
  { id: 'components-overlay-dialog--header', name: 'Header' },
  { id: 'components-overlay-dialog--sizes', name: 'Sizes' },
  { id: 'components-overlay-dialog--slots', name: 'Slots' },
  { id: 'components-overlay-dialog--properties', name: 'Properties' }
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

const openBasic = async (page) => {
  await page.locator('button', { hasText: 'Открыть окно' }).first().click();
  await page.waitForSelector('.p-dialog', { state: 'visible' });
};

const openProperties = async (page, url, args) => {
  const query = Object.entries(args).map(([key, value]) => `${key}:${value}`).join(';');
  await page.goto(`${url}&args=${query}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
};

export default {
  component: 'dialog',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Basic: диалог, заголовок и aria-modal',
      story: 'components-overlay-dialog--basic',
      run: async ({ page, expect }) => {
        await openBasic(page);
        const dialog = page.locator('[role=dialog]');
        expect(await dialog.count(), 'диалог').toBe(1);
        expect(await dialog.getAttribute('aria-modal'), 'aria-modal').toBe('true');
        expect(await dialog.getAttribute('aria-labelledby'), 'aria-labelledby').toBeTruthy();
        expect(await page.locator('.p-dialog-title').innerText(), 'заголовок').toBe('Подтверждение заявки');
      }
    },
    {
      name: 'Basic: Esc закрывает диалог',
      story: 'components-overlay-dialog--basic',
      run: async ({ page, expect }) => {
        await openBasic(page);
        await page.keyboard.press('Escape');
        await page.waitForSelector('.p-dialog', { state: 'detached' });
        expect(await page.locator('.p-dialog').count(), 'после Esc').toBe(0);
      }
    },
    {
      name: 'Sizes: кнопка SM открывает компактный диалог',
      story: 'components-overlay-dialog--sizes',
      run: async ({ page, expect }) => {
        await page.locator('button', { hasText: 'SM' }).first().click({ force: true });
        await page.waitForSelector('.p-dialog', { state: 'visible' });
        const className = await page.locator('.p-dialog').getAttribute('class');
        expect(className.includes('p-dialog-sm') || (await page.locator('.p-dialog').boundingBox()).width < 500, 'компактный').toBe(true);
      }
    },
    {
      name: 'Features: без showClose нет кнопки закрытия',
      story: 'components-overlay-dialog--features',
      run: async ({ page, expect }) => {
        await page.locator('button', { hasText: 'Без закрытия' }).click();
        await page.waitForSelector('.p-dialog', { state: 'visible' });
        expect(await page.locator('.p-dialog-close-button').count(), 'кнопка закрытия').toBe(0);
      }
    },
    {
      name: 'Фокус после открытия остаётся внутри диалога',
      story: 'components-overlay-dialog--basic',
      knownIssue: 'После открытия фокус остаётся на документе, а не внутри диалога',
      run: async ({ page, expect }) => {
        await openBasic(page);
        const inside = await page.evaluate(() => Boolean(document.activeElement?.closest('.p-dialog')));
        expect(inside, 'фокус в диалоге').toBe(true);
      }
    },
    {
      name: 'Properties: header меняет заголовок',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { header: 'CustomHeader', visible: true });
        expect(await page.locator('.p-dialog-title').innerText(), 'заголовок').toBe('CustomHeader');
      }
    },
    {
      name: 'Properties: showOverlay=true показывает маску',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showOverlay: true, visible: true });
        expect(await page.locator('.p-dialog-mask').count(), 'маска').toBeGreaterThan(0);
      }
    },
    {
      name: 'Properties: showOverlay=false убирает видимую маску',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showOverlay: false, visible: true });
        const mask = page.locator('.p-dialog-mask');
        expect(await mask.count(), 'маска в DOM').toBe(1);
        const styles = await mask.evaluate((element) => ({ background: getComputedStyle(element).backgroundColor, pointerEvents: getComputedStyle(element).pointerEvents }));
        expect(styles.background, 'фон маски').toBe('rgba(0, 0, 0, 0)');
        expect(styles.pointerEvents, 'клики через маску').toBe('none');
        expect(await page.locator('.p-dialog').count(), 'диалог').toBe(1);
      }
    },
    {
      name: 'Properties: showMaximize=true и onMaximize',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showMaximize: true, visible: true });
        const button = page.locator('.p-dialog-maximize-button');
        expect(await button.count(), 'кнопка разворота').toBe(1);
        await button.click();
        await page.waitForTimeout(300);
        expect((await page.locator('.p-dialog').getAttribute('class')) ?? '', 'класс maximized').toContain('p-dialog-maximized');
        expect(await page.locator('body').innerText(), 'onMaximize').toContain('onMaximize');
      }
    },
    {
      name: 'Properties: showMaximize=false скрывает кнопку',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showMaximize: false, visible: true });
        expect(await page.locator('.p-dialog-maximize-button').count(), 'кнопка разворота').toBe(0);
      }
    },
    {
      name: 'Properties: showClose=false скрывает крестик',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showClose: false, visible: true });
        expect(await page.locator('.p-dialog-close-button').count(), 'крестик').toBe(0);
      }
    },
    {
      name: 'Properties: showClose=true показывает крестик',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showClose: true, visible: true });
        expect(await page.locator('.p-dialog-close-button').count(), 'крестик').toBe(1);
      }
    },
    {
      name: 'Properties: size=sm применяет класс',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { size: 'sm', visible: true });
        expect((await page.locator('.p-dialog').getAttribute('class')) ?? '', 'sm').toContain('p-dialog-sm');
      }
    },
    {
      name: 'Properties: size=xlg применяет класс',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { size: 'xlg', visible: true });
        expect((await page.locator('.p-dialog').getAttribute('class')) ?? '', 'xlg').toContain('p-dialog-xlg');
      }
    },
    {
      name: 'Properties: dismissableMask=true закрывает по маске',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showOverlay: true, dismissableMask: true, visible: true });
        await page.mouse.click(5, 5);
        await page.waitForTimeout(500);
        expect(await page.locator('.p-dialog').count(), 'диалог').toBe(0);
      }
    },
    {
      name: 'Properties: dismissableMask=false не закрывает по маске',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { showOverlay: true, dismissableMask: false, visible: true });
        await page.mouse.click(5, 5);
        await page.waitForTimeout(500);
        expect(await page.locator('.p-dialog').count(), 'диалог').toBe(1);
      }
    },
    {
      name: 'Properties: closeOnEscape=false не закрывает по Esc',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { closeOnEscape: false, visible: true });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
        expect(await page.locator('.p-dialog').count(), 'диалог').toBe(1);
      }
    },
    {
      name: 'Properties: closeOnEscape=true закрывает по Esc',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { closeOnEscape: true, visible: true });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
        expect(await page.locator('.p-dialog').count(), 'диалог').toBe(0);
      }
    },
    {
      name: 'Properties: focusOnShow=true ставит фокус в диалог',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { focusOnShow: true, visible: true });
        const inside = await page.evaluate(() => Boolean(document.activeElement?.closest('.p-dialog')));
        expect(inside, 'фокус в диалоге').toBe(true);
      }
    },
    {
      name: 'Properties: appendTo=#storybook-root',
      story: 'components-overlay-dialog--properties',
      knownIssue: 'appendTo с CSS-селектором не резолвится: PrimeNG поддерживает body/HTMLElement',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { appendTo: '%23storybook-root', visible: true });
        expect(await page.locator('#storybook-root .p-dialog').count(), 'в root').toBe(1);
      }
    },
    {
      name: 'Properties: visible=true открывает, visible=false не открывает',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { visible: true });
        expect(await page.locator('.p-dialog').count(), 'visible=true').toBe(1);
        await openProperties(page, url, { visible: false });
        expect(await page.locator('.p-dialog').count(), 'visible=false').toBe(0);
      }
    },
    {
      name: 'Properties: onShow, onHide и visibleChange',
      story: 'components-overlay-dialog--properties',
      run: async ({ page, expect, url }) => {
        await openProperties(page, url, { visible: true });
        let log = await page.locator('body').innerText();
        expect(log, 'onShow').toContain('onShow');
        await page.locator('.p-dialog-close-button').click();
        await page.waitForTimeout(400);
        log = await page.locator('body').innerText();
        expect(log, 'onHide').toContain('onHide');
        expect(log, 'visibleChange false').toContain('visibleChange:false');
      }
    },
    {
      name: 'Basic: showMaximize из Controls',
      story: 'components-overlay-dialog--basic',
      run: async ({ page, expect, url }) => {
        await page.goto(`${url}&args=showMaximize:true`, { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Открыть окно' }).click();
        await page.waitForSelector('.p-dialog');
        const maximize = page.locator('.p-dialog-maximize-button');
        expect(await maximize.count(), 'кнопка разворота').toBe(1);
        await maximize.click();
        await page.waitForTimeout(300);
        expect((await page.locator('.p-dialog').getAttribute('class')) ?? '', 'maximized').toContain('p-dialog-maximized');
      }
    },
    {
      name: 'Header: showMaximize из Controls',
      story: 'components-overlay-dialog--header',
      run: async ({ page, expect, url }) => {
        await page.goto(`${url}&args=showMaximize:true`, { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Кастомный заголовок' }).click();
        await page.waitForSelector('.p-dialog');
        expect(await page.locator('.p-dialog-maximize-button').count(), 'max').toBe(1);
      }
    },
    {
      name: 'Slots: showMaximize из Controls',
      story: 'components-overlay-dialog--slots',
      run: async ({ page, expect, url }) => {
        await page.goto(`${url}&args=showMaximize:true`, { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Все слоты' }).click();
        await page.waitForSelector('.p-dialog');
        expect(await page.locator('.p-dialog-maximize-button').count(), 'max').toBe(1);
      }
    },
    {
      name: 'Dynamic: showMaximize из Controls',
      story: 'components-overlay-dialog--dynamic',
      run: async ({ page, expect, url }) => {
        await page.goto(`${url}&args=showMaximize:true`, { waitUntil: 'networkidle' });
        await page.getByRole('button', { name: 'Создать заявку' }).click();
        await page.waitForSelector('.p-dialog');
        expect(await page.locator('.p-dialog-maximize-button').count(), 'max').toBe(1);
      }
    },
    {
      name: 'Basic: visible из Controls',
      story: 'components-overlay-dialog--basic',
      run: async ({ page, expect, url }) => {
        await page.goto(`${url}&args=visible:true`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        expect(await page.locator('.p-dialog').count(), 'visible=true').toBe(1);
        await page.goto(`${url}&args=visible:false`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        expect(await page.locator('.p-dialog').count(), 'visible=false').toBe(0);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
