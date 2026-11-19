/**
 * E2E-спека Image: рендер, размеры/обрезка, предпросмотр и его доступность.
 *
 * Smoke по всем story — внизу; глубокие сценарии проверяют то, что не видно
 * в закрытом состоянии: диалог предпросмотра, тулбар, Esc и alt оригинала.
 */

const STORIES = [
  { id: 'components-media-image--default', name: 'Default' },
  { id: 'components-media-image--crop', name: 'Crop' },
  { id: 'components-media-image--frame', name: 'Frame' },
  { id: 'components-media-image--preview', name: 'Preview' },
  { id: 'components-media-image--width', name: 'Width' }
];

const smoke = (story) => ({
  name: `Smoke: ${story.name}`,
  story: story.id,
  run: async ({ page, expect, errors }) => {
    expect(errors.filter((error) => error.type === 'pageerror').map((error) => error.text), 'ошибки страницы').toEqual([]);
    expect(await page.locator('#storybook-root > *').count(), 'корень story').toBeGreaterThan(0);
    const box = await page.locator('#storybook-root').boundingBox();
    expect(Boolean(box && box.height > 0), 'высота story').toBe(true);
  }
});

const previewMaskButton = (page) => page.locator('button[aria-label="Увеличить изображение"]');

export default {
  component: 'image',
  stories: Object.fromEntries(STORIES.map((story) => [story.id, story.id])),
  tests: [
    {
      name: 'Default: изображение, alt и натуральный размер',
      story: 'components-media-image--default',
      run: async ({ page, expect }) => {
        const image = page.locator('.p-image img').first();
        expect(await page.locator('.p-image').count(), 'обёртка p-image').toBe(1);
        expect(await image.getAttribute('alt'), 'alt').toBe('Аватар');
        expect(await image.evaluate((element) => element.naturalWidth > 0), 'картинка загрузилась').toBe(true);
      }
    },
    {
      name: 'Width: ширина ограничена 120px',
      story: 'components-media-image--width',
      run: async ({ page, expect }) => {
        const box = await page.locator('.p-image img').first().boundingBox();
        expect(Math.round(box.width), 'ширина картинки').toBe(120);
      }
    },
    {
      name: 'Crop: обрезка object-cover и размер 240×160',
      story: 'components-media-image--crop',
      run: async ({ page, expect }) => {
        const image = page.locator('.p-image img').first();
        const className = await image.getAttribute('class');
        expect(className, 'классы обрезки').toContain('object-cover');
        const box = await image.boundingBox();
        expect(Math.round(box.width), 'ширина').toBe(240);
        expect(Math.round(box.height), 'высота').toBe(160);
      }
    },
    {
      name: 'Frame: изображение в рамке 96×96',
      story: 'components-media-image--frame',
      run: async ({ page, expect }) => {
        const wrapperClass = await page.locator('.p-image').first().getAttribute('class');
        expect(wrapperClass, 'класс p-image').toContain('border');
        const box = await page.locator('.p-image img').first().boundingBox();
        expect(Math.round(box.width), 'ширина').toBe(96);
        expect(Math.round(box.height), 'высота').toBe(96);
      }
    },
    {
      name: 'Preview: диалог, тулбар из пяти кнопок и закрытие по Esc',
      story: 'components-media-image--preview',
      run: async ({ page, expect, wait }) => {
        await previewMaskButton(page).click();
        await page.waitForSelector('.p-image-mask', { state: 'visible' });

        const dialog = page.locator('.p-image-mask');
        expect(await dialog.getAttribute('role'), 'role диалога').toBe('dialog');
        expect(await dialog.getAttribute('aria-modal'), 'aria-modal').toBe('true');

        const toolbarLabels = await page.locator('.p-image-toolbar button').evaluateAll((buttons) =>
          buttons.map((button) => button.getAttribute('aria-label'))
        );
        expect(toolbarLabels, 'кнопки тулбара').toEqual([
          'Повернуть вправо',
          'Повернуть влево',
          'Уменьшить',
          'Увеличить',
          'Закрыть'
        ]);

        await page.keyboard.press('Escape');
        await page.waitForSelector('.p-image-mask', { state: 'detached' });
        // Фокус возвращается на триггер после завершения анимации закрытия.
        await page.waitForTimeout(300);
        await wait(
          async () => (await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))) === 'Увеличить изображение'
        );
        expect(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'фокус после Esc').toBe(
          'Увеличить изображение'
        );
      }
    },
    {
      name: 'Preview: у диалога есть доступное имя',
      story: 'components-media-image--preview',
      knownIssue: 'PrimeNG рендерит role=dialog + aria-modal без aria-label/aria-labelledby: скринридер не называет диалог',
      run: async ({ page, expect, wait }) => {
        await previewMaskButton(page).click();
        await page.waitForSelector('.p-image-mask', { state: 'visible' });

        const dialog = page.locator('.p-image-mask');
        const label = await dialog.getAttribute('aria-label');
        const labelledBy = await dialog.getAttribute('aria-labelledby');
        expect(Boolean(label || labelledBy), 'доступное имя диалога').toBe(true);
      }
    },
    {
      name: 'Preview: у оригинала сохраняется alt',
      story: 'components-media-image--preview',
      knownIssue: 'p-image-original рендерится без alt: изображение в предпросмотре озвучивается как декоративное',
      run: async ({ page, expect }) => {
        await previewMaskButton(page).click();
        await page.waitForSelector('.p-image-mask', { state: 'visible' });
        expect(await page.locator('.p-image-original').getAttribute('alt'), 'alt оригинала').toBe('Аватар');
      }
    },
    {
      name: 'A11y: открытый предпросмотр без critical/serious',
      story: 'components-media-image--preview',
      run: async ({ page, expect, a11y, formatViolations }) => {
        await previewMaskButton(page).click();
        await page.waitForSelector('.p-image-mask', { state: 'visible' });
        const violations = await a11y({
          rules: {
            'landmark-one-main': { enabled: false },
            region: { enabled: false },
            'page-has-heading-one': { enabled: false },
            'scrollable-region-focusable': { enabled: false },
            'color-contrast': { enabled: false },
            'aria-dialog-name': { enabled: false },
            'image-alt': { enabled: false }
          }
        });
        expect(violations, `нарушения axe: ${formatViolations(violations)}`).toEqual([]);
      }
    },
    ...STORIES.map(smoke),
    { ...smoke(STORIES[0]), name: `Smoke: ${STORIES[0].name} (тёмная тема)`, theme: 'dark' }
  ]
};
