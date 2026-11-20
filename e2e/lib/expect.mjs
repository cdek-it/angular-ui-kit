/**
 * Минимальные ассерты для e2e без @playwright/test.
 *
 * Сообщение всегда содержит имя проверяемого значения, ожидание и факт — по нему
 * можно починить тест, не открывая отчёт.
 */

export class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AssertionError';
  }
}

const stringify = (value) => {
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'function') return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const deepEqual = (a, b) => {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ak = Object.keys(a);
  const bk = Object.keys(b);
  if (ak.length !== bk.length) return false;
  return ak.every((key) => deepEqual(a[key], b[key]));
};

export function expect(actual, label = 'значение') {
  const fail = (expected, hint = '') => {
    throw new AssertionError(`${label}: ожидалось ${expected}, получено ${stringify(actual)}${hint ? ` (${hint})` : ''}`);
  };

  return {
    toBe(expected) {
      if (!Object.is(actual, expected)) fail(stringify(expected));
    },
    toEqual(expected) {
      if (!deepEqual(actual, expected)) fail(stringify(expected));
    },
    toBeTruthy() {
      if (!actual) fail('truthy');
    },
    toBeFalsy() {
      if (actual) fail('falsy');
    },
    toContain(expected) {
      const ok = typeof actual === 'string' ? actual.includes(expected) : Array.isArray(actual) && actual.includes(expected);
      if (!ok) fail(`содержащее ${stringify(expected)}`);
    },
    toMatch(regexp) {
      if (!regexp.test(String(actual))) fail(`соответствующее ${regexp}`);
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) fail(`> ${expected}`);
    },
    toBeGreaterThanOrEqual(expected) {
      if (!(actual >= expected)) fail(`>= ${expected}`);
    },
    toBeLessThan(expected) {
      if (!(actual < expected)) fail(`< ${expected}`);
    },
    toBeLessThanOrEqual(expected) {
      if (!(actual <= expected)) fail(`<= ${expected}`);
    }
  };
}

export const isAssertionError = (error) => error instanceof AssertionError;
