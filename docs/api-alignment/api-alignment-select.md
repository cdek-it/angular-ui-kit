# select

Angular: `src/lib/components/select` — `ExtraSelectComponent`  
Figma-узлов: 4 — [Select.Overlay](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15762-27738), [Select](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=361-1561), [Select.Group](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15762-27737), [Select.Option](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15762-18325)

## Для разработчиков (Angular API)

**`ExtraSelectComponent`** (`extra-select`, `src/lib/components/select/select.component.ts`)

- Inputs:
  - `@Input() options: any[] | null | undefined`
  - `@Input() optionLabel: string | undefined`
  - `@Input() optionValue: string | undefined`
  - `@Input() optionDisabled: string | undefined`
  - `@Input() optionGroupLabel: string | undefined`
  - `@Input() optionGroupChildren = 'items'`
  - `@Input() group = false`
  - `@Input() placeholder = ''`
  - `@Input() size: ExtraSelectSize = 'base'`
  - `@Input() filter = false`
  - `@Input() showClear = false`
  - `@Input() editable = false`
  - `@Input() readonly = false`
  - `@Input() loading = false`
  - `@Input() inputId: string | undefined`
  - `@Input() appendTo: any = 'body'`
  - `@Input() floatLabel = false`
  - `@Input() label = ''`
  - `@Input() checkmark = true`
  - `@Input() checkmarkIcon = 'ea5e'`
  - `@Input() emptyMessage = 'Нет данных'`
  - `@Input() emptyFilterMessage = 'Результаты не найдены'`
- Outputs:
  - `@Output() onClear: Event`
  - `@Output() onFilter: ExtraSelectFilterEvent`
  - `@Output() onShow: ExtraAnimationEvent`
  - `@Output() onHide: ExtraAnimationEvent`
  - `@Output() onFocus: Event`
  - `@Output() onBlur: Event`
- Слоты (ng-template):
  - `@ContentChild(ExtraSelectOptionDirective, read: TemplateRef) optionTemplate`
  - `@ContentChild(ExtraSelectSelectedItemDirective, read: TemplateRef) selectedItemTemplate`
  - `@ContentChild(ExtraSelectOptionGroupDirective, read: TemplateRef) optionGroupTemplate`

- Директивы:
  - `ExtraSelectOptionDirective` (`[extraSelectOption]`)
  - `ExtraSelectSelectedItemDirective` (`[extraSelectSelectedItem]`)
  - `ExtraSelectOptionGroupDirective` (`[extraSelectOptionGroup]`)

## Соответствие по Figma-узлам

### Select.Overlay  ·  Figma nodeId `15762:27738`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15762-27738)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionDirective)` → `optionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectSelectedItemDirective)` → `selectedItemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionGroupDirective)` → `optionGroupTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Select  ·  Figma nodeId `361:1561`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=361-1561)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionDirective)` → `optionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectSelectedItemDirective)` → `selectedItemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionGroupDirective)` → `optionGroupTemplate` |

#### Для дизайнеров (Figma API)

- `show-clear` (BOOLEAN), default `True`
- `show-loader` (BOOLEAN), default `True`
- `show-value-input` (BOOLEAN), default `True`
- `↳ show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-placeholder` (TEXT), default `Placeholder`
- `text-option` (TEXT), default `Option`
- `show-text-input` (BOOLEAN), default `True`
- `text-float-label` (TEXT), default `FloatLabel`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `has-placeholder` (VARIANT): true | false, default `true`
- `has-floatlabel` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `show-clear` (Figma) ↔ `showClear` (Angular) | boolean | именование отличается (Figma `show-clear` — kebab, Angular `showClear` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |

### Select.Group  ·  Figma nodeId `15762:27737`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15762-27737)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionDirective)` → `optionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectSelectedItemDirective)` → `selectedItemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionGroupDirective)` → `optionGroupTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Select.Option  ·  Figma nodeId `15762:18325`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15762-18325)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionDirective)` → `optionTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectSelectedItemDirective)` → `selectedItemTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraSelectOptionGroupDirective)` → `optionGroupTemplate` |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-option` (TEXT), default `Option`
- `state` (VARIANT): default | hover | focus, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
