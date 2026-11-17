---
component: ExtraMeterGroup
selector: extra-metergroup
import:
  symbol: ExtraMeterGroupComponent
  from: '@cdek-it/angular-ui-kit/components/metergroup'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<MeterGroup>'
status: stable
updated: '2026-11-18'
---

# MeterGroup

Live Figma UI Kit DS v3.0: наборы `MeterGroup`, `MeterGroup.Item`, `MeterGroup.LabelIcon`.

| Figma | API | Геометрия |
|---|---|---|
| `MeterGroup` | `value` (массив элементов) | Общая полоса прогресса и метки |
| `Item` | `{ label, color, value, icon? }` | Сегмент полосы |
| `LabelIcon` | `icon` в элементе | Иконка в метке |
| ориентация | `orientation` | `horizontal` / `vertical` |
| метки | `labelPosition`, `labelOrientation` | `start`/`end`, `horizontal`/`vertical` |
| доступность | `ariaLabel`, `ariaLabelledBy` | Подпись диаграммы |

## Ограничения

- Токены уже совпадали с Figma — правок не потребовалось (9/9, 3/3, 1/1 в обеих темах).

Описания story и Controls скопированы из `origin/main` дословно.
