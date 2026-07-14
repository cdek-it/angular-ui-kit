# listbox

Angular: `src/lib/components/listbox` — `ExtraListboxComponent`  
Figma-узлов: 7 — [Listbox](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=349-2649), [Listbox.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=18170-14940), [Listbox.ItemCheckbox](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=352-3040), [Listbox.ItemGroup](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=349-1454), [Listbox.ItemIcon](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=349-1401), [Listbox.ItemTemplate](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=885-11612), [Listbox.Filter](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=348-1639)

## Для разработчиков (Angular API)

**`ExtraListboxComponent`** (`extra-listbox`, `src/lib/components/listbox/listbox.component.ts`)

- Inputs:
  - `@Input() options: any[] = []`
  - `@Input() optionLabel = 'label'`
  - `@Input() optionValue: string | undefined = undefined`
  - `@Input() multiple = false`
  - `@Input() filter = false`
  - `@Input() filterPlaceHolder: string | undefined = undefined`
  - `@Input() checkmark = false`
  - `@Input() group = false`
  - `@Input() optionGroupLabel: string | undefined = undefined`
  - `@Input() optionGroupChildren: string | undefined = undefined`
  - `@Input() scrollHeight = '200px'`
  - `@Input() emptyMessage: string | undefined = undefined`
- Outputs:
  - `@Output() onFocus: FocusEvent`
  - `@Output() onBlur: FocusEvent`
- Слоты (ng-template):
  - `@ContentChild(ExtraListboxItemDirective, read: TemplateRef) itemTemplate`

- Директивы:
  - `ExtraListboxItemDirective` (`[extraListboxItem]`)

## Соответствие по Figma-узлам

### Listbox  ·  Figma nodeId `349:2649`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=349-2649)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:19798`
- `↳ show-checkbox` (BOOLEAN), default `True`
- `↳ show-close` (BOOLEAN), default `True`
- `↳ show-filter` (BOOLEAN), default `True`
- `state` (VARIANT): default | disabled, default `default`
- `empty` (VARIANT): false | true, default `false`
- `overlay` (VARIANT): false | true, default `false`
- `header` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Listbox.Item  ·  Figma nodeId `18170:14940`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=18170-14940)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-option` (TEXT), default `Option`
- `state` (VARIANT): default | hover | striped, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Listbox.ItemCheckbox  ·  Figma nodeId `352:3040`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=352-3040)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `text-option` (TEXT), default `Option`
- `state` (VARIANT): default | hover | striped, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Listbox.ItemGroup  ·  Figma nodeId `349:1454`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=349-1454)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-subtitle` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-subtitle` (TEXT), default `subtitle sm`
- `disabled` (VARIANT): false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Listbox.ItemIcon  ·  Figma nodeId `349:1401`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=349-1401)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-option` (TEXT), default `Option`
- `state` (VARIANT): default | hover | striped, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Listbox.ItemTemplate  ·  Figma nodeId `885:11612`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=885-11612)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-caption` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:2003`
- `show-caption` (BOOLEAN), default `True`
- `text-option` (TEXT), default `Option`
- `text-caption` (TEXT), default `caption`
- `state` (VARIANT): default | hover | striped, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Listbox.Filter  ·  Figma nodeId `348:1639`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=348-1639)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-input` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraListboxItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1967`
- `show-icon` (BOOLEAN), default `True`
- `show-input-text` (BOOLEAN), default `True`
- `text-placeholder` (TEXT), default `Filter`
- `text-input` (TEXT), default `text input`
- `state` (VARIANT): default | hover | focus | danger | disabled, default `default`
- `has-placeholder` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
