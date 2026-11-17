---
component: ExtraChip
selector: extra-chip
import:
  symbol: ExtraChipComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Chip>'
status: stable
updated: '2026-11-17'
---

# Chip

Live Figma UI Kit DS v3.0: набор `Chip` — чип с иконкой, кнопкой удаления, отключённый.

| Figma | API | Геометрия |
|---|---|---|
| `root.paddingY` | — | Вертикальный паддинг 6 (`space.150`) |
| `removeIcon` | `removable` | Кнопка удаления, focus ring кольцом 2 px (было elevation) |
| `icon` | `icon` | Иконка внутри чипа |
| disabled | `disabled` | Отключённое состояние |

## Ограничения

- Витрины Chip не снимались: каждая story — один компонент.
- Гейты `single`/`source` ожидают перезапуска dev-сервера Storybook: `index.json` отдаёт устаревший список story.

Описания story и Controls скопированы из `origin/main` дословно.
