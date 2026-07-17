---
component: ExtraDivider
selector: extra-divider
import:
  symbol: ExtraDividerComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '33:1543'
  componentKey: 'f0a942b71512215b9a6426076e2cbd56810bcd0e'
  name: '<Divider>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraDivider` — визуальный разделитель в виде тонкой линии для разделения и группировки смежного контента. Оборачивает PrimeNG `p-divider` и поддерживает горизонтальную и вертикальную ориентацию, стиль линии и выравнивание содержимого.

Компонент соответствует Figma-компоненту `<Divider>` (nodeId `33:1543`). Figma-свойства `layout`, `type` и `align` маппируются на Angular-инпуты, а содержимое внутри линии (текст или иконка) передаётся через слот по умолчанию.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация разделителя — соответствует Figma-свойству `layout` |
| `type` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Стиль линии — соответствует Figma-свойству `type` (`solid` / `dash`); значение `dotted` доступно только в коде |
| `align` | `'left' \| 'center' \| 'right' \| 'top' \| 'bottom'` | `'center'` | Выравнивание содержимого внутри разделителя — соответствует Figma-свойству `align` |

Notes:
- Figma-свойство `layout` совпадает с Angular-инпутом `layout` (`horizontal` / `vertical`).
- Figma-свойство `type` имеет варианты `solid` / `dash`; в коде `dash` соответствует значению `'dashed'`, а `'dotted'` — расширение PrimeNG без отдельного Figma-варианта.
- Figma-свойство `align` для горизонтального разделителя использует `left` / `center` / `right`, для вертикального — `top` / `center` / `bottom`.
- Figma-свойства `show-content`, `show-icon` и `change-icon` управляют содержимым внутри линии; в Angular это содержимое задаётся через слот по умолчанию (см. раздел Slots), а иконки берутся из [icons.md](../../figma-code-connect/icons.md).

## Variants

### Horizontal / Solid (по умолчанию)

Figma: `<Divider>`, layout=horizontal, type=solid, align=center

```html
<extra-divider></extra-divider>
```

### Vertical (вертикальный разделитель)

Figma: `<Divider>`, layout=vertical, type=solid, align=center

```html
<extra-divider layout="vertical"></extra-divider>
```

### Dashed (пунктирная линия)

Figma: `<Divider>`, layout=horizontal, type=dash, align=center

```html
<extra-divider type="dashed"></extra-divider>
```

### Dotted (точечная линия)

Расширение PrimeNG без отдельного Figma-варианта.

```html
<extra-divider type="dotted"></extra-divider>
```

### Align left (выравнивание содержимого по левому краю)

Figma: `<Divider>`, layout=horizontal, type=solid, align=left

```html
<extra-divider align="left">Секция</extra-divider>
```

### С текстом внутри линии

Figma: `<Divider>`, show-content=true — текст внутри разделителя

```html
<extra-divider align="center">или</extra-divider>
```

### С иконкой внутри линии

Figma: `<Divider>`, show-content=true, show-icon=true — иконка внутри разделителя (`change-icon`); доступные иконки — [icons.md](../../figma-code-connect/icons.md)

```html
<extra-divider align="center">
  <i class="pi pi-star"></i>
</extra-divider>
```

## Slots

- **`default`** — содержимое внутри линии разделителя (текст или иконка), проектируется через `<ng-content>`. Соответствует Figma-свойствам `show-content` / `show-icon`.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки для содержимого разделителя
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены линии разделителя
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `layout="vertical"` для разделения inline-элементов по горизонтали
- Задавайте `align` для позиционирования текста или иконки внутри линии
- Для содержимого внутри разделителя используйте слот по умолчанию; иконки берите из [icons.md](../../figma-code-connect/icons.md)
- Используйте разделитель внутри потока контента, а не как рамку контейнера

**Don't:**
- Не используйте `align="top"` / `align="bottom"` для горизонтального разделителя — они применимы только к `layout="vertical"`
- Не применяйте разделитель там, где достаточно пустого пространства (отступа)
- Не инлайньте CSS-классы иконок вручную в обход справочника [icons.md](../../figma-code-connect/icons.md)
- Не путайте разделитель с границей контейнера (`border` карточки)
