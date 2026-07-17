---
component: ExtraSkeleton
selector: extra-skeleton
import:
  symbol: ExtraSkeletonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '5221:12465'
  componentKey: '50cb1fdbaa98c8b72ac1342d28b7fc8fed5adbcf'
  name: '<Skeleton>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraSkeleton` — плейсхолдер-каркас контента на время загрузки данных. Низкофиделити-фигура занимает место будущего текста, аватара или изображения, имитирует финальный макет и снижает layout shift. Оборачивает PrimeNG `p-skeleton` и поддерживает прямоугольную и круглую форму, а также волновую анимацию.

Компонент соответствует Figma-компоненту `<Skeleton>` (nodeId `5221:12465`). В Figma форма и анимация заданы внутренней раскадровкой (Figma-свойство `keyframes` со значениями `1` / `2` — это кадры shimmer-анимации, а не дизайн-проп), поэтому форма, размеры и тип анимации настраиваются через Angular-инпуты (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `shape` | `'rectangle' \| 'circle'` | `'rectangle'` | Форма каркаса — прямоугольник или круг |
| `animation` | `'wave' \| 'none'` | `'wave'` | Тип анимации: волновой шиммер или без анимации |
| `width` | `string` | `'100%'` | Ширина элемента (CSS-значение, например `'8rem'`); игнорируется при заданном `size` |
| `height` | `string` | `'1rem'` | Высота элемента (CSS-значение, например `'1rem'`); игнорируется при заданном `size` |
| `size` | `string \| undefined` | `undefined` | Размер элемента, задаёт ширину и высоту одновременно; используется для круглой формы (`shape='circle'`) |
| `borderRadius` | `string \| undefined` | `undefined` | Скругление углов (CSS-значение); переопределяет значение темы |

Notes:
- `size` имеет приоритет над парой `width` / `height`: при заданном `size` ширина и высота берутся из него.
- Для `shape='circle'` задавайте `size`, чтобы получить ровный круг (одинаковые ширина и высота).
- Цвет и базовое скругление наследуются из темы — см. [tokens.md](../../figma-code-connect/tokens.md); `borderRadius` переопределяет только скругление.

## Variants

### Rectangle (прямоугольник, по умолчанию)

Figma: `<Skeleton>`, форма прямоугольная — nodeId `5221:12465`

```html
<extra-skeleton width="12rem" height="1rem"></extra-skeleton>
```

### Circle (круг)

Figma: `<Skeleton>`, форма круглая

```html
<extra-skeleton shape="circle" size="4rem"></extra-skeleton>
```

### Без анимации (animation=none)

Figma: `<Skeleton>`, статичный кадр без shimmer

```html
<extra-skeleton animation="none" width="100%" height="2rem"></extra-skeleton>
```

### Со скруглением (borderRadius)

Figma: `<Skeleton>`, переопределённое скругление углов

```html
<extra-skeleton width="8rem" height="2.5rem" borderRadius="0.75rem"></extra-skeleton>
```

## Slots

Не используются. Каркас не проектирует содержимое — форма и размеры задаются через `@Input()` (`shape`, `size`, `width`, `height`).

## Related

- [Токены](../../figma-code-connect/tokens.md) — цвет и базовое скругление каркаса
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `shape='circle'` с `size` для круглых плейсхолдеров (аватары, иконки)
- Резервируйте место под реальный контент — задавайте `width` / `height`, близкие к финальным размерам, чтобы снизить layout shift
- Используйте `animation='none'` для статичных каркасов или при предпочтении пользователя «уменьшить движение»
- Комбинируйте несколько `extra-skeleton` для имитации структуры карточек, списков и таблиц

**Don't:**
- Не используйте Skeleton для измеримого прогресса — для этого предназначен ProgressBar
- Не используйте Skeleton вместо ProgressSpinner для короткого ожидания контента непредсказуемой формы
- Не инлайньте значения цвета вручную — цвет наследуется из темы, см. [tokens.md](../../figma-code-connect/tokens.md)
- Не задавайте одновременно `size` и `width` / `height` — `size` переопределит обе размерные величины
