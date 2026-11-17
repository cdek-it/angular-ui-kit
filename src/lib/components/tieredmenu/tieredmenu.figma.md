---
component: ExtraTieredMenu
selector: extra-tieredmenu
import:
  symbol: ExtraTieredMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<TieredMenu>'
status: stable
updated: '2026-11-17'
---

# TieredMenu

Live Figma UI Kit DS v3.0: наборы `TieredMenu`, `ItemBase` (state), `Submenu`, `ItemTemplate`,
`ItemBase.Indent`, `ItemTemplate.Indent`.

| Figma | API | Геометрия |
|---|---|---|
| `TieredMenu` | `model` | Пункты и подменю; list.padding 8, паддинг пункта 12×10 |
| `ItemBase` state | наведение/выбор | Активный фон `neutral.medium.hover`, текст `fg.default` |
| `ItemBase` pressed | — | Фон нажатия `extend.extItem.pressedBackground` |
| `Submenu` | вложенные `items` | Вложенные оверлеи подменю |
| `Indent` | вложенность | Отступы уровней |
| `ItemTemplate` | — | Кастомный рендер пункта китом не поддержан (story Custom снята) |

## Отличия и ограничения

- Кастомный шаблон пункта (`ItemTemplate` в Figma) в китовом компоненте отсутствует — пример рисовал PrimeNG напрямую,
  story снята, поддержка слота — задача API.
- `autoDisplay`, `tabindex` — свойства кита/PrimeNG; `disabled` пункта — из `ExtraMenuItem.disabled`.
- Токены `extend.extSubmenu.background/borderColor` не используются CSS — гейт помечает их WARN (резерв дизайна).

Описания обеих story и Controls скопированы из `origin/main` дословно.
