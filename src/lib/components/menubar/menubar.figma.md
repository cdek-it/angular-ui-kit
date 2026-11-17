---
component: ExtraMenubar
selector: extra-menubar
import:
  symbol: ExtraMenubarComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Menubar>'
status: stable
updated: '2026-11-17'
---

# Menubar

Live Figma UI Kit DS v3.0: наборы `Menubar`, `Menubar.ItemBase` (state), `Menubar.Submenu`, `Menubar.MobileButton`,
`Menubar.MobileIndent`, `Menubar.Item.Group`, `Menubar.ItemTemplate`.

| Figma | API | Геометрия |
|---|---|---|
| `Menubar` | `model` | Верхняя панель, пункты с подменю |
| `ItemBase` state | наведение/выбор | Паддинг пункта 12×10, активный фон `neutral.medium.hover`, текст `fg.default` |
| `Submenu` | вложенные `items` | `submenu.padding` 8, тень `elevation.200` |
| `MobileButton` | `breakpoint` | Мобильная кнопка, focus ring кольцом 2 px |
| `ItemTemplate` | слот `extraMenubarItem` | Кастомный рендер пункта (описание, бейдж) |

## Отличия и ограничения

- **Иконки пунктов**: Figma задаёт 18 px (`extend.iconSize`), но в рендере глиф остаётся 16 px — класс Tabler `.ti`
  перекрывает кегль иконки. Записано как известное отклонение (нужен отдельный фикс специфичности `.ti`),
  матрица проверяет фактическое значение.
- Подменю в headless-прогоне не открывается по клику (поведение PrimeNG 20); матрица проверяет наличие подменю в DOM,
  открытие смотреть вручную при приёмке.
- `mobileButton`/`mobileIndent` проявляются только при ширине ниже `breakpoint`.

Описания всех 3 story и Controls скопированы из `origin/main` дословно.
