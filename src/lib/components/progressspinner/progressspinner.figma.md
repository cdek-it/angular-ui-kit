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

Компонент соответствует Figma-компоненту `<ProgressSpinner>` (nodeId `1219:3101`, подтверждённые варианты — `size: small | base | large | xlarge`, `fill: primary | white`). Figma-свойство `size` маппируется на одноимённый Angular-инпут, Figma-свойство `fill` — на одноимённый Angular-инпут `fill` (см. раздел Props mapping о коллизии имён с PrimeNG-пропом `fill`). Figma-свойство `keyframes` отражает фазы анимации (1/2/3 кадра shimmer) и не имеет соответствия в коде — анимация вращения реализована CSS-анимацией, не покадрово.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер спиннера — соответствует Figma-свойству `size` |
| `fill` | `'primary' \| 'white'` | `'primary'` | Цветовая схема — соответствует Figma-свойству `fill`. `primary` — многоцветная анимация (по умолчанию), `white` — монохромный режим для цветной/тёмной подложки |
| `strokeWidth` | `string` | `'2'` | Толщина линии дуги (передаётся в SVG `stroke-width`) |
| `circleFill` | `string` | `'none'` | Цвет заливки внутренней области круга (raw PrimeNG `[fill]`, SVG `fill`-атрибут) — не связан с цветовой схемой `fill` выше; назван `circleFill`, чтобы избежать коллизии имён (см. `ExtraTooltipDirective.disabled` → `tooltipDisabled` в корневом `CLAUDE.md` как прецедент) |
| `animationDuration` | `string` | `'2s'` | Длительность одной итерации анимации вращения |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |

> ⚠️ **Расхождение с Figma в CSS-токенах**: класс `.p-progressspinner-monochrome` (применяется при
> `fill="white"`) в `tokens/components/progressspinner.ts` красит дугу в `color.bg.brand.strong.default`
> (брендовый зелёный), а не в белый — хотя по скриншотам Figma `fill=white` даёт буквально белую дугу
> (предназначена для цветной/тёмной подложки, на белом фоне не видна). На коде это не чинится — файл
> токенов зона дизайнера (см. «Не трогать» в корневом `CLAUDE.md`), сверить и поправить CSS должен
> дизайнер.

## Variants

### Small (маленький размер)

Figma: `<ProgressSpinner>`, size=small

```html
<extra-progressspinner size="small"></extra-progressspinner>
```

### Base (базовый размер, по умолчанию)

Figma: `<ProgressSpinner>`, size=base

```html
<extra-progressspinner></extra-progressspinner>
```

### Large (большой размер)

Figma: `<ProgressSpinner>`, size=large

```html
<extra-progressspinner size="large"></extra-progressspinner>
```

### XLarge (увеличенный размер)

Figma: `<ProgressSpinner>`, size=xlarge

```html
<extra-progressspinner size="xlarge"></extra-progressspinner>
```

### White (монохромный режим)

Figma: `<ProgressSpinner>`, fill=white — одноцветная дуга вместо многоцветной анимации (см.
предупреждение о расхождении цвета с CSS-токеном выше)

```html
<extra-progressspinner fill="white"></extra-progressspinner>
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
- Задавайте `fill="white"` для монохромного режима на цветной подложке (Figma `fill=white`)
- Для доступности указывайте `ariaLabel`, описывающий выполняемую операцию
- Подбирайте `size` под контекст: меньшие значения — внутри кнопок и инпутов

**Don't:**
- Не используйте спиннер для измеримого прогресса к цели — для этого предназначен линейный ProgressBar
- Не заменяйте спиннером каркас-плейсхолдер (Skeleton) при загрузке разметки страницы
- Не инлайньте значения цветов вручную — опирайтесь на токены [tokens.md](../../figma-code-connect/tokens.md)
- Не размещайте несколько спиннеров одновременно в одной области
