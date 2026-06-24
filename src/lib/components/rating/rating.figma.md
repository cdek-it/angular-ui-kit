---
component: ExtraRating
selector: extra-rating
import:
  symbol: ExtraRatingComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '384:1881'
  componentKey: '6c441f5ded02d0e5b053fbdcee752221af0d6d3d'
  name: '<Rating>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraRating` — компонент оценки звёздами: ввод оценки кликом или отображение готового значения в режиме только для чтения. Оборачивает PrimeNG `p-rating` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

Компонент соответствует Figma-компоненту `<Rating>` (nodeId `384:1881`). Значение оценки задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`. Figma-свойство `disabled` маппируется на одноимённый Angular-инпут (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `stars` | `number` | `5` | Количество звёзд (максимальная оценка) |
| `readonly` | `boolean` | `false` | Режим только для чтения: отображение готовой оценки без возможности изменения |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-свойству `disabled=true`; также управляется формой через `setDisabledState` |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |

Значение оценки (число выбранных звёзд) задаётся через модель: используйте `[(ngModel)]`, `formControl` или `formControlName`. Тип значения — `number | null` (`ExtraRatingValue`); `null` означает «оценка не выбрана».

## Variants

### Интерактивный (ввод оценки)

Figma: `disabled=false` — оценка задаётся кликом по звёздам

```html
<extra-rating [(ngModel)]="rating"></extra-rating>
```

В реактивных формах эквивалентно:

```html
<extra-rating [formControl]="ratingControl"></extra-rating>
```

### Readonly (отображение готовой оценки)

Figma: `disabled=false` — звёзды отражают значение модели без интерактивности

```html
<extra-rating [readonly]="true" [(ngModel)]="rating"></extra-rating>
```

### Disabled (отключён)

Figma: `disabled=true`

```html
<extra-rating [disabled]="true" [(ngModel)]="rating"></extra-rating>
```

### Произвольное количество звёзд

Figma: `disabled=false` — изменён максимум шкалы

```html
<extra-rating [stars]="10" [(ngModel)]="rating"></extra-rating>
```

## Slots

Не используются. Звёзды формируются компонентом по значению `stars`; подпись к шкале размещается рядом во внешнем шаблоне.

## Related

- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — компонент формы с похожим маппингом состояний через `ControlValueAccessor`
- [ExtraButton](../button/button.figma.md) — компонент с отключённым состоянием `disabled`

## Do / Don't

**Do:**
- Используйте `[(ngModel)]`, `formControl` или `formControlName` для чтения и записи оценки
- Для отображения готовой оценки задавайте `[readonly]="true"`
- Меняйте размер шкалы через `[stars]` (например `[stars]="10"`)
- Связывайте компонент с подписью во внешнем шаблоне для доступности

**Don't:**
- Не задавайте оценку через отдельный атрибут — значение идёт только через модель (`[(ngModel)]` / `formControl`)
- Не комбинируйте `[disabled]="true"` с интерактивными обработчиками `(onRate)` — события в этом состоянии не возникают
- Не используйте компонент для непрерывной шкалы с произвольным числом — для этого предназначен Slider
