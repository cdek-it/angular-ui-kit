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

Компонент соответствует Figma-компоненту `<Rating>` (nodeId `384:1881`). Значение оценки задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`. Figma-свойство `disabled` управляет отключённым состоянием, но на коде это не публичный `@Input()` — `disabled` всегда обычное поле класса, выставляемое только формой через `setDisabledState` (см. `docs/components-api/common-info.md` и чеклист в корневом `CLAUDE.md`, п.5), а не напрямую атрибутом в шаблоне.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `stars` | `number` | `5` | Количество звёзд (максимальная оценка) |
| `readonly` | `boolean` | `false` | Режим только для чтения: отображение готовой оценки без возможности изменения |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |
| `clearable` | `boolean` | `false` | Показывает кнопку сброса оценки слева от звёзд — соответствует Figma-саб-компоненту `<Rating.Clear>` (иконка `ti-ban`, instance `2119:4267`); в PrimeNG `p-rating` v20.4.0 своего аналога нет (убран из библиотеки), реализовано отдельной кнопкой в шаблоне `ExtraRatingComponent` |

Значение оценки (число выбранных звёзд) задаётся через модель: используйте `[(ngModel)]`, `formControl` или `formControlName`. Тип значения — `number | null` (`ExtraRatingValue`); `null` означает «оценка не выбрана». Клик по кнопке сброса (`clearable=true`) переводит значение в `null` через `ControlValueAccessor`, но не эмитит `(onRate)` — тип `ExtraRatingRateEvent.value` строго `number`, сброс к `null` событием не считается.

> ⚠️ В самой Figma саб-компонент называется `<🚧Rating.Clear>` — префикс 🚧 обычно означает незавершённый/нестабильный компонент библиотеки. Визуально и по составу (иконка `ti-ban`) реализация ниже ему соответствует, но при следующей ревизии дизайна стоит сверить с дизайнером, не поменялся ли вид кнопки сброса.

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

Figma: `disabled=true`. Отключается не атрибутом, а формой — через `formControl`/`formControlName`
(`disabled` не публичный `@Input()`, см. раздел Props mapping):

```html
<extra-rating [formControl]="ratingControl"></extra-rating>
```

```ts
ratingControl = new FormControl({ value: 3, disabled: true });
```

### Со сбросом оценки (clearable)

Figma: `<🚧Rating.Clear>` — кнопка `ti-ban` слева от звёзд, сбрасывает оценку в `null`

```html
<extra-rating [clearable]="true" [(ngModel)]="rating"></extra-rating>
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
- Используйте `[clearable]="true"`, когда пользователю нужно явно убрать уже выставленную оценку

**Don't:**
- Не задавайте оценку через отдельный атрибут — значение идёт только через модель (`[(ngModel)]` / `formControl`)
- Не отключайте компонент атрибутом — `disabled` не публичный `@Input()`, используйте `formControl`/`formControlName` с `disabled: true`
- Не комбинируйте отключённое состояние с интерактивными обработчиками `(onRate)` — события в этом состоянии не возникают
- Не используйте компонент для непрерывной шкалы с произвольным числом — для этого предназначен Slider
