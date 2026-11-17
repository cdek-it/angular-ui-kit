---
component: ExtraPanelMenu
selector: extra-panelmenu
import:
  symbol: ExtraPanelMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<PanelMenu>'
status: stable
updated: '2026-11-17'
---

# PanelMenu

Live Figma UI Kit DS v3.0: наборы `PanelMenu.Panel`, `PanelMenu.ItemBase`, `PanelMenu.ItemBase.Indent`,
`PanelMenu.ItemTemplate`, `PanelMenu.ItemTemplate.Indent`.

| Figma | API | Геометрия |
|---|---|---|
| `PanelMenu.Panel` | `model` | Аккордеон: заголовки панелей и пункты, паддинг 12×10 |
| `ItemBase` state | наведение/выбор | Активный фон `neutral.medium.hover`, текст `fg.default` |
| `ItemBase` pressed | — | Фон нажатия `extend.extItem.pressedBackground` |
| `Indent` | вложенные `items` | Отступы вложенности — токенами Indent |
| `ItemTemplate` | — | Кастомный рендер пункта **не поддержан** китом (см. ограничения) |

## Отличия и ограничения

- Кастомный рендер пункта (`ItemTemplate` в Figma) в `ExtraPanelMenuComponent` отсутствует: компонент — тонкая
  обёртка над `p-panelmenu` с `[model]`. Story `Custom` снята, поддержка слота — отдельная задача API.
- `separator.borderColor`: Figma задаёт `#cccccc`, такого значения нет в базе ролей (outlier макета) — токен
  не менялся, вопрос к дизайну; гейт компонента помечает его WARN.
- `multiple` и `tabindex` — свойства кита; `disabled` пункта — из `ExtraMenuItem.disabled`.

Описания всех story и Controls скопированы из `origin/main` дословно.
