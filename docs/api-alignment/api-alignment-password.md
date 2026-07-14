# password

Angular: `src/lib/components/password` — `ExtraPasswordComponent`  
Figma-узлов: 4 — [Password.Feedback](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=378-1776), [Password](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=375-1701), [Password.TextFeedback](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=376-2000), [Password.Meter](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=376-1809)

## Для разработчиков (Angular API)

**`ExtraPasswordComponent`** (`extra-password`, `src/lib/components/password/password.component.ts`)

- Inputs:
  - `@Input() feedback = true`
  - `@Input() toggleMask = false`
  - `@Input() disabled = false`
  - `@Input() placeholder: string | undefined = undefined`
  - `@Input() size: ExtraPasswordSize = 'base'`
  - `@Input() variant: 'filled' | 'outlined' = 'outlined'`
  - `@Input() fluid = false`
  - `@Input() invalid = false`
  - `@Input() floatLabel = false`
  - `@Input() label = ''`
  - `@Input() promptLabel = 'Введите пароль'`
  - `@Input() weakLabel = 'Слабый'`
  - `@Input() mediumLabel = 'Средний'`
  - `@Input() strongLabel = 'Надёжный'`
  - `@Input() inputId: string | undefined = undefined`
  - `@Input() inputStyleClass: string | undefined = undefined`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() ariaLabelledBy: string | undefined = undefined`
  - `@Input() appendTo: any = 'body'`
  - `@Input() autofocus = false`
- Outputs:
  - `@Output() onFocus: Event`
  - `@Output() onBlur: Event`
- Слоты (ng-template):
  - `@ContentChild(ExtraPasswordHeaderDirective, read: TemplateRef) headerTemplate`
  - `@ContentChild(ExtraPasswordFooterDirective, read: TemplateRef) footerTemplate`

- Директивы:
  - `ExtraPasswordHeaderDirective` (`[extraPasswordHeader]`)
  - `ExtraPasswordFooterDirective` (`[extraPasswordFooter]`)

## Соответствие по Figma-узлам

### Password.Feedback  ·  Figma nodeId `378:1776`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=378-1776)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `show-template` (BOOLEAN), default `True`
- `↳ change-layout` (INSTANCE_SWAP), default `13110:38274`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Password  ·  Figma nodeId `375:1701`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=375-1701)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-eye` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-input` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `show-eye` (BOOLEAN), default `True`
- `↳ change-eye` (INSTANCE_SWAP), default `428:1991`
- `show-text-input` (BOOLEAN), default `True`
- `text-placeholder` (TEXT), default `Password`
- `show-clear` (BOOLEAN), default `False`
- `text-input` (TEXT), default `●●●●●`
- `text-float-label` (TEXT), default `FloatLabel`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `has-placeholder` (VARIANT): false | true, default `true`
- `has-floatlabel` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Password.TextFeedback  ·  Figma nodeId `376:2000`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=376-2000)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-feedback` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `text-feedback` (TEXT), default `text feedback`
- `state` (VARIANT): default | success | danger, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Password.Meter  ·  Figma nodeId `376:1809`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=376-1809)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraPasswordFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): enter | weak | medium | strong, default `enter`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
