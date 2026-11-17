---
component: ExtraProgressSpinner
selector: extra-progressspinner
import:
  symbol: ExtraProgressSpinnerComponent
  from: '@cdek-it/angular-ui-kit/components/progressspinner'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<ProgressSpinner>'
status: stable
updated: '2026-11-17'
---

# ProgressSpinner

Live Figma UI Kit DS v3.0: наборы `ProgressSpinner`, `ProgressSpinner.Item`.

| Figma | API | Геометрия |
|---|---|---|
| `ProgressSpinner` | `<extra-progressspinner>` | Кольцо-спиннер, вращение |
| `Item` | — | Сегменты кольца (толщина, цвет) |
| размеры | `strokeWidth`, `animationDuration`, `size` | Через токены `progressspinner.*` |
| доступность | `ariaLabel` | Подпись для скринридеров |

## Ограничения

- Токены уже совпадали с Figma — правок не потребовалось (6/6 и 2/2 в обеих темах).
- Витрины `Sizes` и `Monochrome` сняты (несколько спиннеров в story); состояния через Controls и матрицу.

Описания story и Controls скопированы из `origin/main` дословно.
