---
component: ExtraMultiSelect
selector: extra-multi-select
import:
  symbol: ExtraMultiSelectComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '484:5726'
  componentKey: 'TBD-see-figma-multiselect'
  name: '<MultiSelect>'
status: stable
updated: '2026-09-20'
---

## Overview

`ExtraMultiSelectComponent` — выбор нескольких значений из списка, с опциональной группировкой опций. В отличие от `<Select>`, у опций есть чекбоксы (`showCheckbox`), а выбранные значения можно отображать как chips (`showChips`) или через запятую. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<MultiSelect>` (nodeId `484:5726`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.1»). Как и `<InputText>`/`<InputNumber>`/`<InputMask>`, умеет самостоятельно рисовать `label`/`caption`/`info`-тултип рядом с полем — оборачивать в `<extra-input-group>`/`<extra-form-field>` не обязательно.

## Props mapping

| Свойство                        | Тип                                                                         | По умолчанию              | Описание                                                                                                            |
| ------------------------------- | --------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `placeholder`                   | `string`                                                                    | `''`                      | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder`                     |
| `label`                         | `string`                                                                    | `''`                      | Текст названия поля                                                                                                 |
| `labelPosition`                 | `'top' \| 'left'`                                                           | `'top'`                   | Положение лейбла относительно поля                                                                                  |
| `floatLabel`                    | `boolean`                                                                   | `false`                   | Плавающий лейбл внутри поля (PrimeNG `p-floatlabel`)                                                                |
| `showChips`                     | `boolean`                                                                   | `false`                   | Отображать выбранные значения в виде chips вместо списка через запятую                                              |
| `chipIcon`                      | `string \| undefined`                                                       | `undefined`               | CSS-класс иконки удаления chip (при `showChips=true`)                                                               |
| `chipClearable`                 | `boolean`                                                                   | `true`                    | Отображение иконки удаления chip; при `false` иконка скрывается (только визуально — снять выбор можно через панель) |
| `clearable`                     | `boolean`                                                                   | `false`                   | Отображение иконки для очистки всего поля — соответствует PrimeNG `showClear`                                       |
| `showCheckbox`                  | `boolean`                                                                   | `true`                    | Отображать чекбокс у каждой опции в панели                                                                          |
| `showFilter`                    | `boolean`                                                                   | `false`                   | Отображать строку поиска в выпадающей панели — соответствует PrimeNG `filter`                                       |
| `filterPlaceholder`             | `string \| undefined`                                                       | `undefined`               | Текст подсказки в строке фильтра                                                                                    |
| `options`                       | `ExtraMultiSelectGroup[] \| ExtraMultiSelectOption[] \| any[] \| undefined` | `undefined`               | Список элементов или список групп с элементами                                                                      |
| `optionLabel`                   | `string \| undefined`                                                       | `undefined`               | Наименование поля, содержащего отображаемое значение                                                                |
| `optionValue`                   | `string \| undefined`                                                       | `undefined`               | Наименование поля, значение которого используется как значение модели                                               |
| `optionDisabled`                | `string \| undefined`                                                       | `undefined`               | Наименование булева поля опции, отключающего её выбор                                                               |
| `optionGroupLabel`              | `string \| undefined`                                                       | `undefined`               | Наименование поля группы, содержащего её название (при `group=true`)                                                |
| `optionGroupChildren`           | `string`                                                                    | `'items'`                 | Наименование поля группы со списком дочерних опций                                                                  |
| `group`                         | `boolean`                                                                   | `false`                   | Включает группировку опций (данные — `ExtraMultiSelectGroup[]`)                                                     |
| `caption`                       | `string`                                                                    | `''`                      | Текст пояснения под полем                                                                                           |
| `info`                          | `string`                                                                    | `''`                      | Текст доп. информации в тултипе иконки `ti-info-circle` рядом с лейблом                                             |
| `size`                          | `'small' \| 'base' \| 'large' \| 'xlarge'`                                  | `'base'`                  | Размер поля                                                                                                         |
| `readonly`                      | `boolean`                                                                   | `false`                   | Только для чтения                                                                                                   |
| `loading`                       | `boolean`                                                                   | `false`                   | Состояние загрузки опций                                                                                            |
| `fluid`                         | `boolean`                                                                   | `false`                   | Растягивает поле на всю ширину контейнера                                                                           |
| `appendTo`                      | `any`                                                                       | `'body'`                  | Контейнер для отрисовки выпадающей панели                                                                           |
| `emptyMessage`                  | `string`                                                                    | `'Нет данных'`            | Сообщение при пустом списке опций                                                                                   |
| `emptyFilterMessage`            | `string`                                                                    | `'Результаты не найдены'` | Сообщение при отсутствии результатов фильтрации                                                                     |
| `(onChange)`                    | `EventEmitter<ExtraMultiSelectChangeEvent>`                                 | —                         | Событие при изменении выбора                                                                                        |
| `(onFilter)`                    | `EventEmitter<ExtraMultiSelectFilterEvent>`                                 | —                         | Событие при вводе в строку фильтра                                                                                  |
| `(onClear)`                     | `EventEmitter<void>`                                                        | —                         | Событие при очистке всех значений                                                                                   |
| `(onShow)`                      | `EventEmitter<ExtraMultiSelectAnimationEvent>`                              | —                         | Событие при открытии панели                                                                                         |
| `(onHide)`                      | `EventEmitter<ExtraMultiSelectAnimationEvent>`                              | —                         | Событие при закрытии панели                                                                                         |
| `(onRemove)`                    | `EventEmitter<ExtraMultiSelectRemoveEvent>`                                 | —                         | Событие при удалении значения (например, через chip)                                                                |
| `(onFocus)`                     | `EventEmitter<Event>`                                                       | —                         | Событие фокусировки поля                                                                                            |
| `(onBlur)`                      | `EventEmitter<Event>`                                                       | —                         | Событие потери фокуса                                                                                               |
| `[(ngModel)]` / `[formControl]` | `any[] \| null`                                                             | `null`                    | Выбранные значения через ControlValueAccessor                                                                       |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

> `disabled` — управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; компонент не объявляет `@Input() disabled`. Соответствует Figma-состоянию `state=disabled`.

> `showCheckbox=false` и `chipClearable=false` скрывают чекбокс опции / иконку удаления chip только визуально (через CSS-класс на компоненте — `extra-multiselect-no-checkbox` / `extra-multiselect-chips-locked`); PrimeNG не даёт нативного переключателя для этого. Правило скрытия — зона дизайнера в `tokens/components/multiselect.ts`.

## ExtraMultiSelectChangeEvent

| Свойство        | Тип     | Описание                           |
| --------------- | ------- | ---------------------------------- |
| `value`         | `any`   | Выбранные значения после изменения |
| `originalEvent` | `Event` | Исходное событие                   |

## ExtraMultiSelectFilterEvent

| Свойство        | Тип      | Описание                |
| --------------- | -------- | ----------------------- |
| `filter`        | `string` | Введённый текст фильтра |
| `originalEvent` | `Event`  | Исходное событие        |

## ExtraMultiSelectRemoveEvent

| Свойство  | Тип   | Описание                |
| --------- | ----- | ----------------------- |
| `value`   | `any` | Значения после удаления |
| `removed` | `any` | Удалённое значение      |

## ExtraMultiSelectOption

| Свойство | Тип                | Описание       |
| -------- | ------------------ | -------------- |
| `name`   | `string`           | Текст элемента |
| `code`   | `string \| number` | Идентификатор  |

## ExtraMultiSelectGroup

| Свойство  | Тип                                 | Описание                |
| --------- | ----------------------------------- | ----------------------- |
| `name`    | `string`                            | Наименование группы     |
| `options` | `ExtraMultiSelectOption[] \| any[]` | Список элементов группы |

## Variants

### Default (базовый выбор через запятую)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  placeholder="Выберите города"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### С лейблом (label / labelPosition)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  label="Города"
  labelPosition="left"
  caption="Можно выбрать несколько"
  info="Список зависит от выбранного региона"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### С плавающим лейблом (floatLabel)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  label="Города"
  [floatLabel]="true"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### С chips (showChips)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  [showChips]="true"
  placeholder="Выберите города"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### С группировкой (group)

```html
<extra-multi-select
  [options]="groupedCities"
  [group]="true"
  optionLabel="name"
  optionGroupLabel="name"
  optionGroupChildren="options"
  placeholder="Выберите города"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### С фильтром (showFilter)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  [showFilter]="true"
  filterPlaceholder="Поиск..."
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### С очисткой (clearable)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  [clearable]="true"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

### Disabled (отключённое поле)

```ts
disabledControl = new FormControl({ value: [], disabled: true });
```

```html
<extra-multi-select [options]="cities" optionLabel="name" [formControl]="disabledControl"></extra-multi-select>
```

### С реактивной формой (formControl + валидация)

```ts
citiesControl = new FormControl<any[]>([], [Validators.required]);
```

```html
<extra-multi-select [options]="cities" optionLabel="name" [formControl]="citiesControl"></extra-multi-select>
```

### Fluid / Large (на всю ширину, большой размер)

```html
<extra-multi-select
  [options]="cities"
  optionLabel="name"
  size="large"
  [fluid]="true"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-multi-select>
```

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Для кастомизации отображения опций/группы используйте нативные `p-multiSelect` templates через прямое использование PrimeNG, если встроенного API недостаточно.

## Related

- [Select](../select/select.figma.md) — выбор одного значения из списка
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**

- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Задавайте `optionLabel` (и `optionValue`, если значение модели должно отличаться от самого объекта опции).
- Для длинных списков включайте `[showFilter]="true"`.
- Используйте `[group]="true"` + `optionGroupLabel`/`optionGroupChildren` для группировки, передавая данные в форме `ExtraMultiSelectGroup[]`.
- Используйте `[fluid]="true"` в формах на всю ширину и мобильных макетах.

**Don't:**

- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
- Не путайте с `<Select>` — для выбора одного значения без чекбоксов используйте [Select](../select/select.figma.md).
