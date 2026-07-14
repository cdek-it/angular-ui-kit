# autocomplete

Angular: `src/lib/components/autocomplete` — `ExtraAutoCompleteComponent`  
Figma-узлов: 4 — [AutoComplete](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=9370-42021), [AutoComplete.Group](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15742-16726), [AutoComplete.Option](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15739-16674), [AutoComplete.Overlay](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15732-84917)

## Для разработчиков (Angular API)

**`ExtraAutoCompleteComponent`** (`extra-auto-complete`, `src/lib/components/autocomplete/autocomplete.component.ts`)

- Inputs:
  - `@Input() suggestions: any[] = []`
  - `@Input() optionLabel: string | undefined = undefined`
  - `@Input() optionValue: string | undefined = undefined`
  - `@Input() optionDisabled: string | undefined = undefined`
  - `@Input() optionGroupLabel: string | undefined = undefined`
  - `@Input() optionGroupChildren: string | undefined = undefined`
  - `@Input() group = false`
  - `@Input() multiple = false`
  - `@Input() dropdown = false`
  - `@Input() dropdownMode: 'blank' | 'current' = 'blank'`
  - `@Input() showClear = false`
  - `@Input() forceSelection = false`
  - `@Input() completeOnFocus = false`
  - `@Input() placeholder: string | undefined = undefined`
  - `@Input() minLength = 1`
  - `@Input() delay = 300`
  - `@Input() scrollHeight = '200px'`
  - `@Input() emptyMessage: string | undefined = undefined`
  - `@Input() disabled = false`
  - `@Input() readonly = false`
  - `@Input() invalid = false`
  - `@Input() fluid = false`
  - `@Input() unique = false`
  - `@Input() dataKey: string | undefined = undefined`
  - `@Input() inputStyleClass: string | undefined = undefined`
  - `@Input() inputId: string | undefined = undefined`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() ariaLabelledBy: string | undefined = undefined`
  - `@Input() autofocus = false`
  - `@Input() size: ExtraAutoCompleteSize`
- Outputs:
  - `@Output() completeMethod: ExtraAutoCompleteCompleteEvent`
  - `@Output() onSelect: ExtraAutoCompleteSelectEvent`
  - `@Output() onUnselect: ExtraAutoCompleteUnselectEvent`
  - `@Output() onDropdownClick: ExtraAutoCompleteDropdownClickEvent`
  - `@Output() onFocus: Event`
  - `@Output() onBlur: Event`
  - `@Output() onClear: void`

## Соответствие по Figma-узлам

### AutoComplete  ·  Figma nodeId `9370:42021`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=9370-42021)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `type` (VARIANT): dropdown | group | multi-select, default `dropdown`
- `state` (VARIANT): default | opened, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### AutoComplete.Group  ·  Figma nodeId `15742:16726`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15742-16726)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-group-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `text-group-option` (TEXT), default `subtitle`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### AutoComplete.Option  ·  Figma nodeId `15739:16674`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15739-16674)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-option` (TEXT), default `Option`
- `state` (VARIANT): default | hover, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### AutoComplete.Overlay  ·  Figma nodeId `15732:84917`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15732-84917)

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
