/**
 * Открытие story в Storybook и ожидание готовности Angular-рендера.
 *
 * Storybook отдаёт каждую story в iframe.html без менеджера, поэтому страница —
 * сразу целевой документ: оверлеи PrimeNG (appendTo body) и фокус видны без обхода iframe.
 */

export const DEFAULT_STORYBOOK_URL = process.env.E2E_STORYBOOK_URL || 'http://localhost:6007';

export function normalizeBaseUrl(url) {
  return String(url || DEFAULT_STORYBOOK_URL).replace(/\/+$/, '');
}

/**
 * URL story. `args` передаются строкой Storybook (`key:value,key2:value2`),
 * тема — через globals аддона themes (`theme:dark`).
 */
export function storyUrl(baseUrl, { id, theme = 'light', args, viewMode = 'story' } = {}) {
  if (!id) throw new Error('storyUrl: не передан id story');
  const url = new URL(`${normalizeBaseUrl(baseUrl)}/iframe.html`);
  url.searchParams.set('id', id);
  url.searchParams.set('viewMode', viewMode);
  if (theme) url.searchParams.set('globals', `theme:${theme}`);
  if (args) url.searchParams.set('args', args);
  return url.toString();
}

const settle = async (page) => {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      })
  );
  await page.waitForTimeout(50);
};

export function collectPageErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push({ type: 'pageerror', text: error.message }));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push({ type: 'console', text: message.text() });
  });
  return errors;
}

/**
 * Переход на story и ожидание, что Angular отрисовал непустой корень.
 * Возвращает `errors` — накопленные ошибки страницы и консоли.
 */
export async function openStory(page, baseUrl, options = {}) {
  const errors = collectPageErrors(page);
  const timeout = options.timeout ?? 20000;

  await page.goto(storyUrl(baseUrl, options), { waitUntil: 'domcontentloaded', timeout });
  // Корень может быть нулевой высоты (горизонтальный разделитель) — ждём attached, не visible.
  await page.waitForSelector('#storybook-root', { state: 'attached', timeout });

  if (await page.locator('.sb-show-errordisplay').isVisible().catch(() => false)) {
    const message = (await page.locator('body').innerText()).slice(0, 300);
    throw new Error(`Storybook не отрендерил story: ${message}`);
  }

  // Пустой корень — story ещё компилируется/монтируется; нулевая высота — упавший рендер.
  await page.waitForFunction(
    () => {
      const root = document.querySelector('#storybook-root');
      if (!root || root.children.length === 0) return false;
      const rect = root.getBoundingClientRect();
      // Высота может быть нулевой у горизонтального разделителя: линию рисует border/::before.
      return rect.width > 0;
    },
    undefined,
    { timeout }
  );

  await page.evaluate(() => document.fonts.ready);
  await settle(page);

  if (options.waitFor) {
    await page.waitForSelector(options.waitFor, { timeout });
    await settle(page);
  }

  return { errors };
}

/** Корень story — единственная точка монтирования, не зависит от менеджера. */
export const storyRoot = (page) => page.locator('#storybook-root');

export async function setTheme(page, theme) {
  await page.evaluate((next) => {
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, theme);
  await settle(page);
}
