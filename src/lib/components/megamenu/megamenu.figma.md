---
component: ExtraMegaMenu
selector: extra-megamenu
import:
  symbol: ExtraMegaMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<MegaMenu>'
status: stable
updated: '2026-11-17'
---

# MegaMenu

Live Figma UI Kit DS v3.0: 6 наборов — `MegaMenu`, `MegaMenu.ItemBase` (state default/hover/active/disabled),
`MegaMenu.Submenu`, `MegaMenu.MobileButton`, `MegaMenu.Item.Group`, `MegaMenu.ItemTemplate`.

| Figma | API | Геометрия |
|---|---|---|
| `MegaMenu` horizontal/vertical | `orientation` | Раскладка меню, оверлей субменю |
| `ItemBase` default/hover/active | наведение/выбор | Паддинг пункта 12×10 (`space.350 space.300`), активный фон `neutral.medium.hover` |
| `ItemBase` disabled | `disabled` | PrimeNG не даёт disabled-состояния корня (см. ограничения) |
| `Submenu` | вложенные `items` | `submenu.padding` 8, оверлей с рамкой `border.neutral.strong` и тенью `elevation.200` |
| `MobileButton` | `breakpoint` | Кнопка-бургер, focus ring кольцом 2 px |
| `ItemTemplate` | слот `extraMegaMenuItem` | Кастомный рендер пункта (description, badge) |
| иконки | `icon` в модели | Размер иконки 18 px (`size.500`) |

## Отличия и ограничения

- `disabled` принимается, но PrimeNG 20 не переводит корень мегаменю в disabled-состояние — проверено матрицей
  (корень сохраняет классы, пункты остаются активными); при необходимости блокировки используется `[model]` без ссылок.
- Оверлей открывается по клику, не по наведению (поведение PrimeNG 20); матрица проверяет именно клик.
- Слот `extraMegaMenuItem` подменяет только содержимое пункта, структуру субменю рисует PrimeNG.

Описания всех 5 story и Controls скопированы из `origin/main` дословно.
