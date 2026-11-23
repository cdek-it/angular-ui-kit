/**
 * Ожидание асинхронного условия с понятным сообщением об ошибке.
 *
 * Playwright-локторы умеют ждать сами, но состояние PrimeNG (оверлей, фокус, значение)
 * удобнее проверять одной функцией и получать последнее фактическое значение в тексте ошибки.
 */

export class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export async function poll(check, { timeout = 3000, interval = 50, label = 'условие' } = {}) {
  const started = Date.now();
  let lastValue;
  let lastError;

  while (Date.now() - started < timeout) {
    try {
      const value = await check();
      if (value) return value;
      lastValue = value;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  const elapsed = Date.now() - started;
  const details = lastError ? `последняя ошибка: ${lastError.message}` : `последнее значение: ${JSON.stringify(lastValue)}`;
  throw new TimeoutError(`${label}: не дождались за ${elapsed}ms (${details})`);
}

/** Ждёт, пока функция вернёт true, и возвращает её значение (для цепочек). */
export async function waitForValue(read, options) {
  let value;
  await poll(async () => {
    value = await read();
    return value;
  }, options);
  return value;
}
