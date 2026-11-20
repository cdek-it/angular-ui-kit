# E2E компонентов

Браузерные тесты Storybook-компонентов на Playwright: поведение, клавиатура, состояния,
доступность. Дополняют встроенный Storybook test-runner, не заменяют его.

```bash
npm ci
npx playwright install chromium

npm run storybook -- --port 6007           # отдельный терминал
npm run test:component -- select            # Storybook при необходимости поднимется сам
npm run test:e2e                            # все e2e-спеки
npm run test:e2e:builtin                    # встроенный runner по всем компонентам
```

Точечно:

```bash
node e2e/check.mjs select
node e2e/run.mjs select
node e2e/storybook-runner.mjs inputtext -- --maxWorkers=2
```

- Спеки: `e2e/specs/<component>.e2e.mjs`.
- Отчёты: `e2e/reports/`, скриншоты падений: `e2e/artifacts/`.
- Baseline создаётся первым прогоном; обновление — `UPDATE_STYLE_BASELINES=1`.
- В `main` 52 спеки: `image` добавляется после мержа PR #200.
- CI: `.github/workflows/component-tests.yml`.
