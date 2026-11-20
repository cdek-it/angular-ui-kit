/** Частые DOM-чтения в одну строку, чтобы спека читалась как сценарий. */

export const count = (page, selector) => page.locator(selector).count();

export const exists = async (page, selector) => (await page.locator(selector).count()) > 0;

export const visible = (page, selector) => page.locator(selector).first().isVisible();

export const text = (page, selector) => page.locator(selector).first().innerText();

export const attr = (page, selector, name) => page.locator(selector).first().getAttribute(name);

export const computed = (page, selector, property) =>
  page.locator(selector).first().evaluate((element, prop) => getComputedStyle(element).getPropertyValue(prop), property);

export const box = (page, selector) => page.locator(selector).first().boundingBox();

/** Что реально в фокусе: тег, классы, id и ARIA-роль. */
export const focused = (page) =>
  page.evaluate(() => {
    const element = document.activeElement;
    if (!element || element === document.body) return { tag: 'BODY', className: '', id: '', role: null };
    return {
      tag: element.tagName,
      className: typeof element.className === 'string' ? element.className : '',
      id: element.id,
      role: element.getAttribute('role')
    };
  });

/** Видимые элементы по селектору — для проверок списков, где часть скрыта фильтром. */
export const visibleTexts = (page, selector) =>
  page.locator(selector).evaluateAll((elements) =>
    elements.filter((element) => element.offsetParent !== null).map((element) => element.textContent.trim())
  );
