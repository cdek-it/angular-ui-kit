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
updated: '2026-06-22'
---

## Overview

`ExtraAutoCompleteComponent` — текстовое поле с выпадающим списком подсказок, фильтруемым по мере ввода (паттерн combobox). Подходит для свободного ввода с автодополнением, длинных списков, асинхронной подгрузки опций по вводу и множественного выбора тегами. Оборачивает PrimeNG `p-autocomplete` и расширяет его размерами и режимом `fluid`. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<AutoComplete>` (component set, nodeId `9370:42021`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Варианты задаются Figma-свойствами `type` (`dropdown | group | multi-select`) и `state` (`default | opened`). Выпадающая панель, пункты и группы вынесены в отдельные Figma-узлы `<AutoComplete.Overlay>`, `<AutoComplete.Option>` и `<AutoComplete.Group>`.

В отличие от `<Select>`, список подсказок не задаётся статически: он наполняется обработчиком события `(completeMethod)`, который вызывается при вводе текста и должен заполнить `[suggestions]` отфильтрованными значениями.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `suggestions` | `any[]` | `[]` | Массив подсказок выпадающего списка; наполняется обработчиком `(completeMethod)` |
| `optionLabel` | `string \| undefined` | `undefined` | Имя поля опции, отображаемое как подпись |
| `optionValue` | `string \| undefined` | `undefined` | Имя поля опции, используемое как значение модели |
| `optionDisabled` | `string \| undefined` | `undefined` | Имя булева поля опции, отключающего её выбор |
| `optionGroupLabel` | `string \| undefined` | `undefined` | Имя поля заголовка группы (при `group=true`) — соответствует Figma-свойству `type=group` |
| `optionGroupChildren` | `string \| undefined` | `undefined` | Имя поля группы со списком дочерних опций |
| `group` | `boolean` | `false` | Включает группировку опций — соответствует Figma-свойству `type=group` |
| `multiple` | `boolean` | `false` | Режим множественного выбора тегами — соответствует Figma-свойству `type=multi-select` |
| `dropdown` | `boolean` | `false` | Показывает кнопку раскрытия списка — соответствует Figma-свойству `type=dropdown` |
| `dropdownMode` | `'blank' \| 'current'` | `'blank'` | Поведение кнопки dropdown: показать все опции (`blank`) или подсказки по текущему вводу (`current`) |
| `showClear` | `boolean` | `false` | Показывает иконку очистки (×) при наличии значения — соответствует Figma-свойству `show-clear` |
| `forceSelection` | `boolean` | `false` | Ограничивает ввод только значениями из списка подсказок |
| `completeOnFocus` | `boolean` | `false` | Запрашивает подсказки при получении фокуса |
| `placeholder` | `string \| undefined` | `undefined` | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder` |
| `minLength` | `number` | `1` | Минимальная длина ввода для запроса подсказок |
| `delay` | `number` | `300` | Задержка (мс) перед вызовом `(completeMethod)` после ввода |
| `scrollHeight` | `string` | `'200px'` | Максимальная высота выпадающей панели |
| `emptyMessage` | `string \| undefined` | `undefined` | Сообщение при пустом списке подсказок |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля; `large`/`xlarge` маппируются на CSS-классы `p-inputtext-lg` / `p-inputtext-xlg` |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `invalid` | `boolean` | `false` | Невалидное состояние — соответствует Figma-состоянию `state=danger` |
| `fluid` | `boolean` | `false` | Растягивает поле на всю ширину контейнера |
| `unique` | `boolean` | `false` | Запрещает повторный выбор одной опции (при `multiple=true`) |
| `dataKey` | `string \| undefined` | `undefined` | Имя поля-идентификатора опции для сравнения значений |
| `inputId` | `string \| undefined` | `undefined` | `id` нативного инпута для связи с внешним `<label>` |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | `id` внешнего элемента-метки для доступности |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |
| `disabled` | `boolean` | `false` | Отключённое состояние — управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; соответствует Figma-состоянию `state=disabled` |
| `(completeMethod)` | `EventEmitter<ExtraAutoCompleteCompleteEvent>` | — | Событие запроса подсказок при вводе; обработчик заполняет `[suggestions]` |
| `(onSelect)` | `EventEmitter<ExtraAutoCompleteSelectEvent>` | — | Событие выбора подсказки |
| `(onUnselect)` | `EventEmitter<ExtraAutoCompleteUnselectEvent>` | — | Событие снятия выбора (при `multiple=true`) |
| `(onDropdownClick)` | `EventEmitter<ExtraAutoCompleteDropdownClickEvent>` | — | Событие клика по кнопке dropdown |
| `(onFocus)` | `EventEmitter<Event>` | — | Событие получения фокуса |
| `(onBlur)` | `EventEmitter<Event>` | — | Событие потери фокуса |
| `(onClear)` | `EventEmitter<void>` | — | Событие очистки значения (при `showClear=true`) |
| `[(ngModel)]` / `[formControl]` | `any` | `null` | Выбранное значение через ControlValueAccessor |

## Variants

### Basic (поле с автодополнением)

Figma: `<AutoComplete>`, type=dropdown, state=default — nodeId `9370:42022`

Базовый ввод без кнопки раскрытия: подсказки появляются по мере набора текста.

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

### С привязкой объектов (optionLabel / optionValue)

Figma: `<AutoComplete>`, type=dropdown, state=default — nodeId `9370:42022`

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

Figma: `<AutoComplete>`, type=dropdown, state=default — nodeId `9370:42022`

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

### Large / xlarge (увеличенный размер, на всю ширину)

Figma: `<AutoComplete>`, type=dropdown, state=default

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

### Disabled (отключённое поле)

Figma: `<AutoComplete>`, state=disabled

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  [formControl]="disabledControl"
></extra-auto-complete>
```

```ts
// Управляется через FormControl:
disabledControl = new FormControl({ value: null, disabled: true });
```

### Невалидное состояние (formControl + валидация)

Figma: `<AutoComplete>`, state=danger

```ts
cityControl = new FormControl(null, [Validators.required]);
```

```html
<extra-auto-complete
  [suggestions]="filtered"
  (completeMethod)="search($event)"
  placeholder="Обязательное поле"
  [invalid]="cityControl.invalid && cityControl.touched"
  [formControl]="cityControl"
></extra-auto-complete>
```

## Slots

Проекция содержимого пунктов выполняется средствами PrimeNG `p-autocomplete` и соответствует отдельным Figma-узлам выпадающей панели:

- **Шаблон подсказки** — кастомный вид элемента выпадающего списка; соответствует Figma-узлу `<AutoComplete.Option>`.
- **Шаблон группы** — заголовок группы опций (при `group=true`); соответствует Figma-узлу `<AutoComplete.Group>`.
- **Шаблон выпадающей панели** — контейнер списка подсказок; соответствует Figma-узлу `<AutoComplete.Overlay>`.

Собственных `extra*`-директив компонент не объявляет: его шаблон фиксирован и проксирует значения в `p-autocomplete`. Для базовых сценариев достаточно `optionLabel` и `(completeMethod)`.

## Related

- [Select](../select/select.figma.md) — выбор одного значения из фиксированного списка без свободного ввода
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
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.

**Don't:**
- Не используйте поле без обработчика `(completeMethod)` — без него выпадающий список останется пустым.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки выбранное значение не синхронизируется с моделью.
- Не включайте `[group]="true"` без `optionGroupLabel` и `optionGroupChildren` — группы не отрисуются корректно.
- Не применяйте AutoComplete для коротких фиксированных списков — для них используйте [Select](../select/select.figma.md) или radio-группу.
