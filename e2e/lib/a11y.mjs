/**
 * Проверки доступности через axe-playwright.
 *
 * Гейтим только critical/serious: moderate и minor дают много спорных срабатываний
 * на декоративных иконках и контрасте второстепенного текста.
 */
import { getViolations, injectAxe } from 'axe-playwright';

const DEFAULT_IMPACTS = ['critical', 'serious'];

export async function scanA11y(page, { include, exclude, impacts = DEFAULT_IMPACTS, rules } = {}) {
  const context = {};
  if (include) context.include = [include];
  if (exclude) context.exclude = [exclude];

  const options = { resultTypes: ['violations'] };

  // Storybook addon-a11y тоже запускает axe на рендере story. Если сканы пересеклись,
  // axe кидает «Axe is already running» — ждём и повторяем, это гонка инструментов.
  const violations = await runWithRetry(async () => {
    await injectAxe(page);
    if (rules) options.rules = rules;
    return getViolations(page, Object.keys(context).length ? context : undefined, options);
  });

  return violations
    .filter((violation) => impacts.includes(violation.impact))
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        html: node.html,
        failureSummary: node.failureSummary
      }))
    }));
}

async function runWithRetry(action, attempts = 3) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      if (!/already running/i.test(error.message)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

/** Короткое представление нарушений для сообщения об ошибке. */
export const formatViolations = (violations) =>
  violations.map((violation) => `${violation.impact} ${violation.id}: ${violation.help}`).join('; ');
