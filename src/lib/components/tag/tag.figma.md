---
component: ExtraTag
selector: extra-tag
import:
  symbol: ExtraTagComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Tag>'
status: stable
updated: '2026-11-17'
---

# Tag

Live Figma UI Kit DS v3.0: набор `Tag` — severity-цвета, иконка, размеры.

| Figma | API | Геометрия |
|---|---|---|
| `root.padding` | — | 4×8 (`space.100 space.200`) |
| `root.fontWeight` | — | 600 (`fontWeight.demibold`) |
| `colorScheme.*.primary.color` | `severity` | `fg.on.brand.default` на брендовом фоне |
| `icon` | `icon` | Иконка в теге |

## Ограничения

- `single`/`source` не прогнаны: сервер Storybook на 6007 в CI-режиме без watch.

Описания story и Controls скопированы из `origin/main` дословно.
