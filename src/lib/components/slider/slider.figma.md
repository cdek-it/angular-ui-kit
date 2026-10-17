---
component: ExtraSlider
selector: extra-slider
import:
  symbol: ExtraSliderComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '383:1844'
  componentKey: '06f2d9890eea51bccebbb9140db19d29c4b25dbf'
  name: '<Slider>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraSlider` — компонент-ползунок для выбора числового значения или диапазона перетаскиванием бегунка по шкале в границах `min`/`max` с заданным шагом. Оборачивает PrimeNG `p-slider` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

Компонент соответствует Figma-компоненту `<Slider>` (nodeId `383:1844`). Figma-свойство `range`
(false / true) маппируется на одноимённый инпут и модель значения; `state=disabled` — на
`FormControl`/`ControlValueAccessor` (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `min` | `number` | `0` | Минимальное значение шкалы |
| `max` | `number` | `100` | Максимальное значение шкалы |
| `step` | `number \| undefined` | `undefined` | Шаг изменения значения; `undefined` — плавное перемещение |
| `range` | `boolean` | `false` | Режим выбора диапазона с двумя бегунками — соответствует Figma-свойству `range=true`; модель становится массивом `[from, to]` |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация шкалы |
| `animate` | `boolean` | `false` | Анимация прыжка бегунка при клике по шкале |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Идентификатор элемента с меткой для доступности |
| `tabindex` | `number` | `0` | Порядок перехода по Tab |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |

Текущее значение (положение бегунка) задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`: используйте `[(ngModel)]`, `formControl` или `formControlName`. В одиночном режиме модель — `number`, в режиме `[range]="true"` — массив `number[]` вида `[from, to]`. Состояние Figma `state=hover` — это интерактивное состояние наведения, отдельного инпута не имеет.

Отключённое состояние (Figma `state=disabled`) задаётся не отдельным `@Input()`, а через форму —
`FormControl.disable()` / `ControlValueAccessor.setDisabledState` (см. чеклист в `CLAUDE.md`, п.5).
В более ранней версии компонента был публичный `@Input() set disabled` — убран как нарушающий это
правило; передавайте отключение через `FormControl`.

## События

| Событие | Тип | Описание |
|---------|-----|---------|
| `onChange` | `EventEmitter<ExtraSliderChangeEvent>` | Срабатывает при каждом изменении значения во время перетаскивания — свой тип, не `SliderChangeEvent` PrimeNG (переименовано поле `event` → `originalEvent` под конвенцию) |
| `onSlideEnd` | `EventEmitter<void>` | Срабатывает после завершения перетаскивания — по спеке без полезной нагрузки (в более ранней версии передавал `SliderSlideEndEvent` PrimeNG напрямую — протечка типа и лишние данные, не предусмотренные спекой) |

`ExtraSliderChangeEvent`:

| Свойство | Тип | Описание |
|----------|-----|---------|
| `value` | `number \| undefined` | Новое значение в одиночном режиме |
| `values` | `number[] \| undefined` | Новые значения в режиме `range` |
| `originalEvent` | `Event` | Исходное браузерное событие |

## Variants

### Single (одиночное значение)

Figma: state=default, range=false

```html
<extra-slider [(ngModel)]="volume"></extra-slider>
```

В реактивных формах эквивалентно:

```html
<extra-slider [formControl]="volumeControl"></extra-slider>
```

### Range (выбор диапазона)

Figma: state=default, range=true

```html
<extra-slider [range]="true" [(ngModel)]="priceRange"></extra-slider>
```

Модель — массив `[from, to]`, например `[20, 80]`.

### Vertical (вертикальная ориентация)

Figma: state=default, range=false — ориентация задаётся инпутом `orientation`

```html
<extra-slider orientation="vertical" [(ngModel)]="brightness"></extra-slider>
```

### Step (дискретный шаг)

Figma: state=default, range=false — шаг задаётся инпутом `step`

```html
<extra-slider [min]="0" [max]="50" [step]="5" [(ngModel)]="zoom"></extra-slider>
```

### Disabled (отключён)

Figma: state=disabled, range=false

```html
<extra-slider [formControl]="disabledControl"></extra-slider>
```

```ts
disabledControl = new FormControl({ value: 0, disabled: true });
```

## Slots

Не используются. Подпись к ползунку размещается рядом во внешнем шаблоне.

## Related

- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — пример компонента формы с `ControlValueAccessor`
- [ExtraButton](../button/button.figma.md) — пример компонента-обёртки над PrimeNG

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `formControl` для привязки текущего значения — отдельного инпута значения нет
- Для диапазона задавайте `[range]="true"` и связывайте модель-массив `[from, to]` (Figma `range=true`)
- Задавайте `[step]` для дискретного выбора (громкость, масштаб, рейтинг шагами)
- Для отключённого состояния используйте `FormControl` в состоянии `disabled` (Figma `state=disabled`)
- Подписывайтесь на `(onChange)`, чтобы реагировать на каждое промежуточное изменение, и на `(onSlideEnd)` — только на завершение перетаскивания

**Don't:**
- Не задавайте значение через атрибут — состояние идёт только через модель (`[(ngModel)]` / `formControl`)
- Не используйте `range` для точного ручного ввода числа — для этого предназначен `ExtraInputNumber`
- Не передавайте скалярную модель в режиме `[range]="true"` — модель должна быть массивом `[from, to]`
- Не задавайте `[disabled]="true"` как `@Input` — компонент его не объявляет; передавайте через `FormControl`
- Не ждите полезную нагрузку в `(onSlideEnd)` — по спеке это `() => void`; данные изменения берите из `(onChange)` или модели
