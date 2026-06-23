---
component: ExtraProgressSpinner
selector: extra-progressspinner
import:
  symbol: ExtraProgressSpinnerComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1219:3101'
  componentKey: '1ab76ee6c518796317b9e0f4634217b61bd553c3'
  name: '<ProgressSpinner>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraProgressSpinner` — круговой индикатор загрузки неопределённой длительности: вращающаяся дуга сообщает, что процесс идёт, но не показывает процент выполнения. Оборачивает PrimeNG `p-progressSpinner` и добавляет фиксированные размеры и переключение между многоцветным и монохромным режимами.

Компонент соответствует Figma-компоненту `<ProgressSpinner>` (nodeId `1219:3101`). Figma-свойство `size` маппируется на Angular-инпут `size`, а Figma-свойство `fill` (`primary` / `white`) — на режим окраски (`multicolor`). Figma-свойство `keyframes` отражает фазы анимации и не имеет соответствия в коде.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Размер спиннера — соответствует Figma-свойству `size` (`sm` / `md` / `lg` / `xl`) |
| `multicolor` | `boolean` | `true` | Многоцветная анимация; `false` — монохромный режим. Связано с Figma-свойством `fill` (`primary` / `white`) |
| `strokeWidth` | `string` | `'2'` | Толщина линии дуги (передаётся в SVG `stroke-width`) |
| `fill` | `string` | `'none'` | Цвет заливки внутренней области круга (SVG `fill`) |
| `animationDuration` | `string` | `'2s'` | Длительность одной итерации анимации вращения |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |

## Variants

### Small (маленький размер)

Figma: `<ProgressSpinner>`, size=sm

```html
<extra-progressspinner size="small"></extra-progressspinner>
```

### Medium (средний размер, по умолчанию)

Figma: `<ProgressSpinner>`, size=md

```html
<extra-progressspinner></extra-progressspinner>
```

### Large (большой размер)

Figma: `<ProgressSpinner>`, size=lg

```html
<extra-progressspinner size="large"></extra-progressspinner>
```

### XLarge (увеличенный размер)

Figma: `<ProgressSpinner>`, size=xl

```html
<extra-progressspinner size="xlarge"></extra-progressspinner>
```

### Monochrome (монохромный режим)

Figma: `<ProgressSpinner>`, fill=white — одноцветная дуга вместо многоцветной анимации

```html
<extra-progressspinner [multicolor]="false"></extra-progressspinner>
```

## Slots

Не используются. Компонент рендерит только индикатор и не принимает проектируемое содержимое.

## Related

- [Токены](../../figma-code-connect/tokens.md) — цветовые токены дуги и режима `fill`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraButton](../button/button.figma.md) — кнопка с состоянием `loading`, использующим встроенный спиннер

## Do / Don't

**Do:**
- Используйте спиннер для действий с неизвестной длительностью (порог ~1–3с) и держите один индикатор на экран
- Задавайте `[multicolor]="false"` для монохромного режима на цветной подложке (Figma `fill=white`)
- Для доступности указывайте `ariaLabel`, описывающий выполняемую операцию
- Подбирайте `size` под контекст: меньшие значения — внутри кнопок и инпутов

**Don't:**
- Не используйте спиннер для измеримого прогресса к цели — для этого предназначен линейный ProgressBar
- Не заменяйте спиннером каркас-плейсхолдер (Skeleton) при загрузке разметки страницы
- Не инлайньте значения цветов вручную — опирайтесь на токены [tokens.md](../../figma-code-connect/tokens.md)
- Не размещайте несколько спиннеров одновременно в одной области
