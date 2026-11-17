---
component: ExtraProgressBar
selector: extra-progressbar
import:
  symbol: ExtraProgressBarComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<ProgressBar>'
status: stable
updated: '2026-11-17'
---

# ProgressBar

Live Figma UI Kit DS v3.0: набор `ProgressBar` — детерминированный и индетерминированный режимы, подпись значения.

| Figma | API | Геометрия |
|---|---|---|
| `label.color` | `showValue` | Подпись `fg.on.brand.default` |
| `label.fontSize` | — | 14 (`fontSize.200`) |
| indeterminate | `mode="indeterminate"` | Бегущая полоса |
| доступность | `ariaLabelledBy` | id подписи прогресс-бара |

## Ограничения

- `single`/`source` не прогнаны: сервер Storybook на 6007 в CI-режиме без watch.

Описания story и Controls скопированы из `origin/main` дословно.
