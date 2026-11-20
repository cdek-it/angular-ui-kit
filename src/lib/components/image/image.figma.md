---
component: ExtraImage
selector: extra-image
import:
  symbol: ExtraImageComponent
  from: '@cdek-it/angular-ui-kit/components/image'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: ''
  name: ''
status: experimental
updated: '2026-11-19'
---

# Image

**Эталон в Figma отсутствует.** В UI Kit DS v3.0 нет набора `<Image>`, поэтому компонент добавлен как обёртка над
PrimeNG `p-image` и **не сверяется** гейтом `check-figma-values`.

Токены `components.image` собраны вручную из семантического уровня (не из макета):

| Токен | Значение (семантика) | Где применён |
|---|---|---|
| `root.borderRadius` | `dimension.borderRadius.300` | скругление изображения |
| `preview.mask.background` | `color.bg.neutral.medium.default` | маска предпросмотра |
| `preview.mask.color` | `color.fg.default` | иконка предпросмотра |
| `mask.background` | `color.bg.surface.backdrop` | фон оверлея предпросмотра |
| `toolbar.background` | `color.bg.surface.raised.default` | тулбар предпросмотра |
| `toolbar.borderColor` | `color.border.neutral.default` | рамка тулбара |
| `toolbar.borderWidth` | `dimension.borderWidth.100` | толщина рамки тулбара |
| `toolbar.borderRadius` | `dimension.borderRadius.300` | радиус тулбара |
| `toolbar.padding` | `dimension.space.200` | внутренние отступы тулбара |
| `toolbar.gap` | `dimension.space.200` | расстояние между кнопками |
| `toolbar.shadow` | `effects.elevation.300` | тень тулбара |
| `action.size` | `dimension.size.1000` | размер кнопки (36px) |
| `action.iconSize` | `dimension.size.450` | размер иконки (16px) |
| `action.borderRadius` | `dimension.borderRadius.max` | скругление кнопки |
| `action.color` | `color.fg.default` | цвет иконки |
| `action.hoverBackground` | `color.bg.neutral.medium.default` | фон кнопки при наведении |
| `action.hoverColor` | `color.fg.default` | цвет иконки при наведении |
| `action.focusRing.width` | `dimension.focusRing.width` | толщина кольца фокуса |
| `action.focusRing.color` | `color.fg.brand.active` | цвет кольца фокуса |

Когда появится эталон в Figma — заменить значения на макетные и прогнать `check-figma-values`.
