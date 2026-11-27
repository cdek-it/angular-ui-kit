---
component: ExtraDivider
selector: extra-divider
import:
  symbol: ExtraDividerComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Divider>'
status: stable
updated: '2026-11-17'
---

# Divider

Live Figma UI Kit DS v3.0: набор `Divider` — ориентация horizontal/vertical, `type` solid/dash/dotted,
выравнивание контента и контент (текст, иконка).

| Figma | API | Геометрия |
|---|---|---|
| горизонтальный | `layout="horizontal"` | Паддинг 0/14, margin 14/0, контент 0/8 |
| вертикальный | `layout="vertical"` | Паддинг 14/0, margin 0/14, контент 8/0 |
| `type` | `type` | solid / dash / dotted |
| контент | проекция | Текст или иконка по центру, цвет `content.color` → `fg.muted` |
| линия | — | `root.borderColor` → `border.neutral.strong` (#cecfd2) |

## Ограничения

- `check-stories-source` не проходит на story с вертикальным разделителем: у него нет собственной высоты,
  и гейт ждёт видимый `extra-divider` (0 px). Это структурное ограничение гейта, а не дефект компонента;
  остальные 6 story проверку проходят.
- `align` управляет положением контента; в Figma это отдельные варианты.

Описания всех story и Controls скопированы из `origin/main` дословно.
