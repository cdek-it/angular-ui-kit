---
component: ExtraMenu
selector: extra-menu
import:
  symbol: ExtraMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Menu>'
status: stable
updated: '2026-11-17'
---

# Menu

Live Figma UI Kit DS v3.0: наборы `Menu`, `Menu.ItemBase` (state default/hover/active/disabled), `Menu.Submenu`, `Menu.ItemTemplate`.

| Figma | API | Геометрия |
|---|---|---|
| `Menu` inline/popup | `items`, `popup` | Список пунктов; popup-режим — оверлей по клику |
| `ItemBase` state | наведение/выбор | Паддинг пункта 12×10 (`space.350 space.300`), активный фон `neutral.medium.hover`, текст `fg.default` |
| `ItemBase` pressed | — | Фон нажатия `extend.extItem.pressedBackground` |
| `Submenu` | вложенные `items` | Подменю-группы |
| `ItemTemplate` | слот `extraMenuTemplate="itemEnd"` | Контент в конце пункта (хоткей, badge) |
| иконки | `icon` в модели | Размер 18 px (`size.500`), caption с gap 2 |

## Отличия и ограничения

- `appendTo`, `open`, `ariaLabel`, `tabindex` — свойства контейнера/кита, в Figma их нет.
- Popup-режим скрывает inline-список до открытия, поэтому гейт `check-stories-source` для story `Popup`
  структурно неприменим (ждёт видимый `extra-menu`) — зафиксировано в CHANGES.md.
- `disabled` пункта берётся из `ExtraMenuItem.disabled`.

Описания всех 6 story и Controls скопированы из `origin/main` дословно.
