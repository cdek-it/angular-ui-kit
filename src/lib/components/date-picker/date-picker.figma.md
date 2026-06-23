---
component: ExtraDatePicker
selector: extra-date-picker
import:
  symbol: ExtraDatePickerComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '431:3069'
  componentKey: '186776f4f5b0f28244809844575073296ec8c383'
  name: '<Calendar>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraDatePickerComponent` — поле выбора даты с раскрывающимся календарём: выбор одной даты, диапазона или нескольких значений, ввод даты со временем и inline-режим. Оборачивает PrimeNG `p-datepicker`, добавляя кастомную шапку с выпадающими списками месяца и года, предпросмотр диапазона при наведении и поля ручного ввода времени. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<Calendar>` (component set, nodeId `431:3069`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Варианты поля задаются Figma-свойствами `state` (`default | hover | focus | danger | disabled | readonly`), `has-placeholder` и `has-floatlabel`. Раскрывающаяся панель календаря описана отдельным Figma-узлом `<Calendar.DatePicker>` / `<DatePicker.Panel>` и в коде рендерится PrimeNG автоматически.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `selectionMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Режим выбора: одна дата, несколько дат или диапазон |
| `dateFormat` | `string` | `'dd.mm.yy'` | Маска формата отображаемой даты |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Размер поля; `large` и `xlarge` маппируются на PrimeNG `size="large"` |
| `showIcon` | `boolean` | `true` | Показывать иконку календаря в поле |
| `iconDisplay` | `'input' \| 'button'` | `'input'` | Расположение иконки: внутри поля или отдельной кнопкой |
| `inline` | `boolean` | `false` | Встроенный календарь без раскрывающейся панели |
| `showButtonBar` | `boolean` | `false` | Показывать панель кнопок «Сегодня» / «Очистить» |
| `showTime` | `boolean` | `false` | Включает выбор времени (часы и минуты) |
| `hourFormat` | `string` | `'24'` | Формат часов при `showTime=true` (`'24'` или `'12'`) |
| `showClear` | `boolean` | `false` | Показывает иконку очистки (×) — соответствует Figma-свойству `show-clear` |
| `placeholder` | `string \| undefined` | `undefined` | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder` |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `minDate` | `Date \| undefined` | `undefined` | Минимальная доступная для выбора дата |
| `maxDate` | `Date \| undefined` | `undefined` | Максимальная доступная для выбора дата |
| `view` | `'date' \| 'month' \| 'year'` | `'date'` | Начальный режим панели: дни, месяцы или годы |
| `showOtherMonths` | `boolean` | `true` | Показывать даты соседних месяцев в сетке |
| `selectOtherMonths` | `boolean` | `false` | Разрешить выбор дат соседних месяцев |
| `(onSelect)` | `EventEmitter<Date>` | — | Событие выбора даты в сетке |
| `(onMonthChange)` | `EventEmitter<any>` | — | Событие смены отображаемого месяца |
| `(onYearChange)` | `EventEmitter<any>` | — | Событие смены отображаемого года |
| `(onClear)` | `EventEmitter<any>` | — | Событие очистки значения (при `showClear=true`) |
| `[(ngModel)]` / `[formControl]` | `Date \| Date[] \| null` | `null` | Выбранное значение через ControlValueAccessor |

> `invalid` — управляется через связанный `NgControl` (соответствует Figma-состоянию `state=danger`). При работе с реактивными формами невалидное состояние подтягивается из валидаторов автоматически.

> `disabled` — компонент не объявляет `@Input() disabled`; отключённое состояние (Figma `state=disabled`) задаётся через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`.

## Variants

### Single / Default (одна дата)

Figma: `<Calendar>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `431:3111`

```html
<extra-date-picker
  placeholder="дд.мм.гггг"
  [(ngModel)]="selectedDate"
  name="date"
></extra-date-picker>
```

### Range (выбор диапазона)

Figma: `<Calendar>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `431:3111`

```html
<extra-date-picker
  selectionMode="range"
  placeholder="с … по …"
  [(ngModel)]="dateRange"
  name="period"
></extra-date-picker>
```

```ts
dateRange: Date[] | null = null;
```

### Multiple (несколько дат)

Figma: `<Calendar>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `431:3111`

```html
<extra-date-picker
  selectionMode="multiple"
  placeholder="Выберите даты"
  [(ngModel)]="selectedDates"
  name="dates"
></extra-date-picker>
```

```ts
selectedDates: Date[] | null = null;
```

### With time (дата и время)

Figma: `<Calendar>`, show-time=true — раскрывающаяся панель с выбором часов и минут

```html
<extra-date-picker
  [showTime]="true"
  hourFormat="24"
  placeholder="дд.мм.гггг чч:мм"
  [(ngModel)]="dateTime"
  name="dateTime"
></extra-date-picker>
```

### Inline (встроенный календарь)

Figma: `<Calendar.DatePicker>` — раскрытая панель календаря

```html
<extra-date-picker
  [inline]="true"
  [(ngModel)]="selectedDate"
  name="inlineDate"
></extra-date-picker>
```

### С границами min/max

Figma: `<Calendar>`, state=default

```html
<extra-date-picker
  [minDate]="today"
  [maxDate]="maxBookingDate"
  placeholder="Дата в пределах диапазона"
  [(ngModel)]="bookingDate"
  name="booking"
></extra-date-picker>
```

```ts
today = new Date();
maxBookingDate = new Date(2035, 11, 31);
```

### С кнопкой очистки (show-clear)

Figma: `<Calendar>`, show-clear=true

```html
<extra-date-picker
  [showClear]="true"
  placeholder="Можно очистить"
  [(ngModel)]="selectedDate"
  name="dateClearable"
></extra-date-picker>
```

### Readonly (только для чтения)

Figma: `<Calendar>`, state=readonly, has-placeholder=true, has-floatlabel=false — nodeId `14980:36452`

```html
<extra-date-picker
  [readonly]="true"
  [(ngModel)]="selectedDate"
  name="dateReadonly"
></extra-date-picker>
```

### Disabled (отключённое поле)

Figma: `<Calendar>`, state=disabled, has-placeholder=true, has-floatlabel=false — nodeId `431:3070`

```html
<extra-date-picker [formControl]="disabledControl"></extra-date-picker>
```

```ts
// Управляется через FormControl:
disabledControl = new FormControl({ value: null, disabled: true });
```

### Невалидное состояние (formControl + валидация)

Figma: `<Calendar>`, state=danger, has-placeholder=true, has-floatlabel=false — nodeId `431:3080` (невалидное состояние определяется через NgControl автоматически)

```ts
dateControl = new FormControl<Date | null>(null, [Validators.required]);
```

```html
<extra-date-picker
  placeholder="Обязательное поле"
  [formControl]="dateControl"
></extra-date-picker>
```

## Slots

Не используются. Содержимое поля и панели календаря (шапка с выбором месяца/года, поля времени, иконки) формируется внутри компонента. Внешняя проекция содержимого не поддерживается.

## Related

- [InputText](../inputtext/inputtext.figma.md) — атомарное поле ввода текста без календаря и валидации даты
- [Select](../select/select.figma.md) — выбор из готового списка значений
- [Button](../button/button.figma.md) — кнопки навигации и действий в формах
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся выбранное значение.
- Для диапазона и нескольких дат задавайте `selectionMode="range"` / `selectionMode="multiple"` и храните значение как `Date[]`.
- Ограничивайте доступные даты через `minDate` / `maxDate` для бронирований и дедлайнов.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Включайте `[showTime]="true"`, когда нужно выбрать дату вместе со временем.

**Don't:**
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки выбранное значение не синхронизируется с моделью.
- Не задавайте `invalid` вручную — невалидное состояние вычисляется из связанного `NgControl`.
- Не применяйте date-picker для свободного текста или приблизительной даты — используйте [InputText](../inputtext/inputtext.figma.md).
