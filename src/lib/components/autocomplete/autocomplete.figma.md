---
component: ExtraAutoComplete
selector: extra-auto-complete
import:
  symbol: ExtraAutoCompleteComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '9370:42021'
  componentKey: 'bfe33336c5b6261f311895a42da1f3a8a92ae4d4'
  name: '<AutoComplete>'
status: stable
updated: '2026-09-28'
---

## Overview

`ExtraAutoCompleteComponent` — текстовое поле с выпадающим списком подсказок, фильтруемым по мере ввода (паттерн combobox). Подходит для свободного ввода с автодополнением, длинных списков, асинхронной подгрузки опций по вводу и множественного выбора тегами. Оборачивает PrimeNG `p-autocomplete`. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<AutoComplete>` (component set, nodeId `9370:42021`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.1»). Варианты задаются Figma-свойствами `type` (`dropdown | group | multi-select`) и `state` (`default | opened`).

В отличие от `<Select>`, список подсказок не задаётся статически: он наполняется обработчиком события `(completeMethod)`, который вызывается при вводе текста и должен заполнить `[suggestions]` отфильтрованными значениями.

Как и `<InputText>`/`<InputNumber>`/`<MultiSelect>`, умеет самостоятельно рисовать `label`/`caption`/`info`-тултип рядом с полем — оборачивать в `<extra-input-group>`/`<extra-form-field>` не обязательно.

## Props mapping

| Свойство                        | Тип                                                              | По умолчанию | Описание                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `placeholder`                   | `string \| undefined`                                            | `undefined`  | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder`                                           |
| `label`                         | `string`                                                         | `''`         | Текст названия поля                                                                                                                       |
| `labelPosition`                 | `'top' \| 'left'`                                                | `'top'`      | Положение лейбла относительно поля                                                                                                        |
| `floatLabel`                    | `boolean`                                                        | `false`      | Плавающий лейбл внутри поля (PrimeNG `p-floatlabel`)                                                                                      |
| `multiple`                      | `boolean`                                                        | `false`      | Режим множественного выбора тегами — соответствует Figma-свойству `type=multi-select`                                                     |
| `suggestions`                   | `ExtraAutoCompleteGroup[] \| ExtraAutoCompleteOption[] \| any[]` | `[]`         | Массив подсказок выпадающего списка; наполняется обработчиком `(completeMethod)`                                                          |
| `(completeMethod)`              | `EventEmitter<ExtraAutoCompleteCompleteEvent>`                   | —            | Событие запроса подсказок при вводе; обработчик заполняет `[suggestions]`                                                                 |
| `optionLabel`                   | `string \| undefined`                                            | `undefined`  | Имя поля опции, отображаемое как подпись                                                                                                  |
| `chipIcon`                      | `string \| undefined`                                            | `undefined`  | CSS-класс иконки удаления chip (при `multiple=true`) — рендерится через шаблон `removeicon`                                               |
| `chipClearable`                 | `boolean`                                                        | `true`       | Отображение иконки удаления chip; при `false` иконка скрывается только визуально (CSS-класс `extra-autocomplete-chips-locked`)            |
| `showCheckbox`                  | `boolean`                                                        | `false`      | Отображать чекбокс у каждой опции в выпадающем списке (реализовано через кастомный `itemTemplate`, у PrimeNG нет нативного переключателя) |
| `clearable`                     | `boolean`                                                        | `false`      | Отображение иконки для очистки поля — соответствует PrimeNG `showClear`                                                                   |
| `caption`                       | `string`                                                         | `''`         | Текст пояснения под полем                                                                                                                 |
| `info`                          | `string`                                                         | `''`         | Текст доп. информации в тултипе иконки `ti-info-circle` рядом с лейблом                                                                   |
| `size`                          | `'small' \| 'base' \| 'large' \| 'xlarge'`                       | `'base'`     | Размер поля; `large`/`xlarge` маппируются на CSS-классы `p-inputtext-lg` / `p-inputtext-xlg`                                              |
| `fluid`                         | `boolean`                                                        | `false`      | Растягивает поле на всю ширину контейнера                                                                                                 |
| `optionValue`                   | `string \| undefined`                                            | `undefined`  | Имя поля опции, используемое как значение модели                                                                                          |
| `optionDisabled`                | `string \| undefined`                                            | `undefined`  | Имя булева поля опции, отключающего её выбор                                                                                              |
| `optionGroupLabel`              | `string \| undefined`                                            | `undefined`  | Имя поля заголовка группы (при `group=true`) — соответствует Figma-свойству `type=group`                                                  |
| `optionGroupChildren`           | `string \| undefined`                                            | `undefined`  | Имя поля группы со списком дочерних опций                                                                                                 |
| `group`                         | `boolean`                                                        | `false`      | Включает группировку опций — соответствует Figma-свойству `type=group`                                                                    |
| `dropdown`                      | `boolean`                                                        | `false`      | Показывает кнопку раскрытия списка — соответствует Figma-свойству `type=dropdown`                                                         |
| `dropdownMode`                  | `'blank' \| 'current'`                                           | `'blank'`    | Поведение кнопки dropdown: показать все опции (`blank`) или подсказки по текущему вводу (`current`)                                       |
| `forceSelection`                | `boolean`                                                        | `false`      | Ограничивает ввод только значениями из списка подсказок                                                                                   |
| `completeOnFocus`               | `boolean`                                                        | `false`      | Запрашивает подсказки при получении фокуса                                                                                                |
| `minLength`                     | `number`                                                         | `1`          | Минимальная длина ввода для запроса подсказок                                                                                             |
| `delay`                         | `number`                                                         | `300`        | Задержка (мс) перед вызовом `(completeMethod)` после ввода                                                                                |
| `scrollHeight`                  | `string`                                                         | `'200px'`    | Максимальная высота выпадающей панели                                                                                                     |
| `emptyMessage`                  | `string \| undefined`                                            | `undefined`  | Сообщение при пустом списке подсказок                                                                                                     |
| `readonly`                      | `boolean`                                                        | `false`      | Только для чтения — соответствует Figma-состоянию `state=readonly`                                                                        |
| `unique`                        | `boolean`                                                        | `false`      | Запрещает повторный выбор одной опции (при `multiple=true`)                                                                               |
| `dataKey`                       | `string \| undefined`                                            | `undefined`  | Имя поля-идентификатора опции для сравнения значений                                                                                      |
| `ariaLabel`                     | `string \| undefined`                                            | `undefined`  | Метка для программ экранного доступа                                                                                                      |
| `ariaLabelledBy`                | `string \| undefined`                                            | `undefined`  | `id` внешнего элемента-метки для доступности                                                                                              |
| `autofocus`                     | `boolean`                                                        | `false`      | Автофокус при монтировании компонента                                                                                                     |
| `(onSelect)`                    | `EventEmitter<ExtraAutoCompleteSelectEvent>`                     | —            | Событие выбора подсказки                                                                                                                  |
| `(onUnselect)`                  | `EventEmitter<ExtraAutoCompleteUnselectEvent>`                   | —            | Событие снятия выбора (при `multiple=true`)                                                                                               |
| `(onDropdownClick)`             | `EventEmitter<ExtraAutoCompleteDropdownClickEvent>`              | —            | Событие клика по кнопке dropdown                                                                                                          |
| `(onShow)`                      | `EventEmitter<Event>`                                            | —            | Событие открытия оверлея с подсказками                                                                                                    |
| `(onHide)`                      | `EventEmitter<Event>`                                            | —            | Событие закрытия оверлея                                                                                                                  |
| `(onFocus)`                     | `EventEmitter<Event>`                                            | —            | Событие получения фокуса                                                                                                                  |
| `(onBlur)`                      | `EventEmitter<Event>`                                            | —            | Событие потери фокуса                                                                                                                     |
| `(onClear)`                     | `EventEmitter<void>`                                             | —            | Событие очистки значения (при `clearable=true`)                                                                                           |
| `[(ngModel)]` / `[formControl]` | `any`                                                            | `null`       | Выбранное значение через ControlValueAccessor                                                                                             |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

> `disabled` — управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; компонент не объявляет `@Input() disabled`. Соответствует Figma-состоянию `state=disabled`.

> Индикатор загрузки — не отдельный `@Input()`. PrimeNG включает его при вызове `completeMethod` и выключает сам, как только меняется `[suggestions]` — для асинхронных источников данных просто обновляйте `suggestions` по завершении запроса.

## ExtraAutoCompleteCompleteEvent

| Свойство        | Тип      | Описание                         |
| --------------- | -------- | -------------------------------- |
| `query`         | `string` | Введённое пользователем значение |
| `originalEvent` | `Event`  | Исходное браузерное событие      |

## ExtraAutoCompleteSelectEvent / ExtraAutoCompleteUnselectEvent

| Свойство        | Тип     | Описание                 |
| --------------- | ------- | ------------------------ |
| `value`         | `any`   | Выбранный/снятый вариант |
| `originalEvent` | `Event` | Исходное событие         |

## ExtraAutoCompleteDropdownClickEvent

| Свойство        | Тип      | Описание                           |
| --------------- | -------- | ---------------------------------- |
| `query`         | `string` | Введённое значение на момент клика |
| `originalEvent` | `Event`  | Исходное событие                   |

## ExtraAutoCompleteOption

| Свойство | Тип                | Описание       |
| -------- | ------------------ | -------------- |
| `name`   | `string`           | Текст варианта |
| `code`   | `string \| number` | Идентификатор  |

## ExtraAutoCompleteGroup

| Свойство  | Тип                                  | Описание                |
| --------- | ------------------------------------ | ----------------------- |
| `name`    | `string`                             | Наименование группы     |
| `options` | `ExtraAutoCompleteOption[] \| any[]` | Список элементов группы |

## Variants

### Basic (поле с автодополнением)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  placeholder="Начните ввод..."
  [(ngModel)]="value"
  name="city"
></extra-auto-complete>
```

```ts
search(event: ExtraAutoCompleteCompleteEvent): void {
  this.filtered = this.cities.filter(c =>
    c.toLowerCase().includes((event.query || '').toLowerCase())
  );
}
```

### С лейблом (label / labelPosition)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  label="Город"
  labelPosition="left"
  caption="Начните вводить название"
  info="Список городов зависит от выбранного региона"
  [(ngModel)]="value"
  name="city"
></extra-auto-complete>
```

### С плавающим лейблом (floatLabel)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  label="Город"
  [floatLabel]="true"
  [(ngModel)]="value"
  name="city"
></extra-auto-complete>
```

### Dropdown (с кнопкой раскрытия списка)

Figma: `<AutoComplete>`, type=dropdown, state=opened — nodeId `9370:42028`

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [dropdown]="true"
  placeholder="Выберите город..."
  [(ngModel)]="value"
  name="cityDropdown"
></extra-auto-complete>
```

### Multiple (множественный выбор тегами)

Figma: `<AutoComplete>`, type=multi-select, state=default — nodeId `9370:42024`

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [multiple]="true"
  [unique]="true"
  placeholder="Добавьте города..."
  [(ngModel)]="selectedCities"
  name="cities"
></extra-auto-complete>
```

### С чекбоксом у опции (showCheckbox)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [multiple]="true"
  [showCheckbox]="true"
  optionLabel="name"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-auto-complete>
```

### С очисткой (clearable)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [clearable]="true"
  [(ngModel)]="value"
  name="city"
></extra-auto-complete>
```

### С привязкой объектов (optionLabel / optionValue)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  optionLabel="name"
  optionValue="code"
  [dropdown]="true"
  [(ngModel)]="selectedCode"
  name="cityCode"
></extra-auto-complete>
```

### С группировкой опций (group)

Figma: `<AutoComplete>`, type=group, state=default — nodeId `9370:42026`

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [group]="true"
  optionGroupLabel="region"
  optionGroupChildren="items"
  optionLabel="name"
  [(ngModel)]="selectedCity"
  name="cityGrouped"
></extra-auto-complete>
```

### С обязательным выбором из списка (forceSelection)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [forceSelection]="true"
  placeholder="Только из списка"
  [(ngModel)]="value"
  name="cityStrict"
></extra-auto-complete>
```

### Disabled (отключённое поле)

```ts
disabledControl = new FormControl({ value: null, disabled: true });
```

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [formControl]="disabledControl"
></extra-auto-complete>
```

### С реактивной формой (formControl + валидация)

```ts
cityControl = new FormControl(null, [Validators.required]);
```

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  placeholder="Обязательное поле"
  [formControl]="cityControl"
></extra-auto-complete>
```

### Fluid / Large (на всю ширину, большой размер)

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  size="large"
  [fluid]="true"
  placeholder="Широкое поле"
  [(ngModel)]="value"
  name="cityWide"
></extra-auto-complete>
```

## Slots

Нет собственных `extra*`-слотов content projection — шаблон фиксирован и проксирует значения в `p-autocomplete`. Кастомизация пункта списка выполняется внутренне через `showCheckbox`; для более глубокой кастомизации используйте нативный `p-autocomplete` напрямую.

## Related

- [Select](../select/select.figma.md) — выбор одного значения из фиксированного списка без свободного ввода
- [MultiSelect](../multiselect/multiselect.figma.md) — множественный выбор из фиксированного списка (без свободного ввода)
- [InputText](../inputtext/inputtext.figma.md) — атомарное поле ввода текста без подсказок
- [Button](../button/button.figma.md) — кнопки действий в формах
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**

- Заполняйте `[suggestions]` в обработчике `(completeMethod)` — список подсказок наполняется по мере ввода, а не задаётся статически.
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся выбранное значение.
- Задавайте `optionLabel` для отображаемой подписи и `optionValue`, когда в модели нужно хранить примитив, а не весь объект опции.
- Включайте `[dropdown]="true"`, если пользователю нужно видеть весь список без предварительного ввода.
- Используйте `[multiple]="true"` совместно с `[unique]="true"` для выбора тегами без дубликатов.
- Для асинхронных источников подсказок просто обновляйте `[suggestions]` по завершении запроса — индикатор загрузки выключится сам.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.

**Don't:**

- Не используйте поле без обработчика `(completeMethod)` — без него выпадающий список останется пустым.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки выбранное значение не синхронизируется с моделью.
- Не включайте `[group]="true"` без `optionGroupLabel` и `optionGroupChildren` — группы не отрисуются корректно.
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не применяйте AutoComplete для коротких фиксированных списков — для них используйте [Select](../select/select.figma.md) / [MultiSelect](../multiselect/multiselect.figma.md) или radio-группу.
