# date-picker

Angular: `src/lib/components/date-picker` — `ExtraDatePickerComponent`  
Figma-узлов: 4 — [DatePicker.Panel](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=412-2165), [DatePicker](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=431-3069), [DatePicker.Date](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=398-2226), [DatePicker.TimePicker](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=456-3180)

## Для разработчиков (Angular API)

**`ExtraDatePickerComponent`** (`extra-date-picker`, `src/lib/components/date-picker/date-picker.component.ts`)

- Inputs:
  - `@Input() dateFormat = 'dd.mm.yy'`
  - `@Input() selectionMode: ExtraDatePickerSelectionMode = 'single'`
  - `@Input() size: ExtraDatePickerSize = 'medium'`
  - `@Input() showIcon = true`
  - `@Input() iconDisplay: ExtraDatePickerIconDisplay = 'input'`
  - `@Input() inline = false`
  - `@Input() showButtonBar = false`
  - `@Input() showTime = false`
  - `@Input() hourFormat = '24'`
  - `@Input() showClear = false`
  - `@Input() placeholder: string | undefined = undefined`
  - `@Input() readonly = false`
  - `@Input() invalid = false`
  - `@Input() minDate: Date | undefined = undefined`
  - `@Input() maxDate: Date | undefined = undefined`
  - `@Input() view: 'date' | 'month' | 'year' = 'date'`
  - `@Input() showOtherMonths = true`
  - `@Input() selectOtherMonths = false`
- Outputs:
  - `@Output() onSelect: Date`
  - `@Output() onMonthChange: any`
  - `@Output() onYearChange: any`
  - `@Output() onClear: any`

## Соответствие по Figma-узлам

### DatePicker.Panel  ·  Figma nodeId `412:2165`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=412-2165)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `show-footer` (BOOLEAN), default `True`
- `show-timepicker` (BOOLEAN), default `True`
- `datepicker` (VARIANT): day | month | year | time, default `day`
- `disabled` (VARIANT): false | true, default `false`
- `overlay` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DatePicker  ·  Figma nodeId `431:3069`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=431-3069)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-day` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-month` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-year` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-hours` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-minutes` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-clear` (BOOLEAN), default `True`
- `show-input-text` (BOOLEAN), default `True`
- `↳ show-date` (BOOLEAN), default `True`
- `↳ show-time` (BOOLEAN), default `True`
- `text-placeholder` (TEXT), default `Calendar`
- `text-day` (TEXT), default `day`
- `text-month` (TEXT), default `month`
- `text-year` (TEXT), default `year`
- `text-hours` (TEXT), default `00`
- `text-minutes` (TEXT), default `00`
- `text-float-label` (TEXT), default `FloatLabel`
- `is-required` (BOOLEAN), default `True`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `has-placeholder` (VARIANT): true | false, default `true`
- `has-floatlabel` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `show-clear` (Figma) ↔ `showClear` (Angular) | boolean | именование отличается (Figma `show-clear` — kebab, Angular `showClear` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `↳ show-time` (Figma) ↔ `showTime` (Angular) | boolean | именование отличается (Figma `↳ show-time` — kebab, Angular `showTime` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |

### DatePicker.Date  ·  Figma nodeId `398:2226`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=398-2226)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-cell` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `text-cell` (TEXT), default `0`
- `state` (VARIANT): default | hover | disabled, default `default`
- `cell` (VARIANT): default | today | selected, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DatePicker.TimePicker  ·  Figma nodeId `456:3180`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=456-3180)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
