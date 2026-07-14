# dialog

Angular: `src/lib/components/dialog` — `ExtraDialogComponent`  
Figma-узлов: 2 — [Dialog](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=520-6620), [Modal window](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=17604-90243)

## Для разработчиков (Angular API)

**`ExtraDialogComponent`** (`extra-dialog`, `src/lib/components/dialog/dialog.component.ts`)

- Inputs:
  - `@Input() header = ''`
  - `@Input() visible = false`
  - `@Input() modal = true`
  - `@Input() size: ExtraDialogSize = 'default'`
  - `@Input() dismissableMask = false`
  - `@Input() closeOnEscape = true`
  - `@Input() showHeader = true`
  - `@Input() focusOnShow = false`
  - `@Input() appendTo: string = 'body'`
- Outputs:
  - `@Output() visibleChange: boolean`
- Слоты (ng-template):
  - `@ContentChild(ExtraDialogHeaderDirective, read: TemplateRef) headerTemplate`
  - `@ContentChild(ExtraDialogFooterDirective, read: TemplateRef) footerTemplate`
- Проекция: `<ng-content>`

- Директивы:
  - `ExtraDialogHeaderDirective` (`[extraDialogHeader]`)
  - `ExtraDialogFooterDirective` (`[extraDialogFooter]`)

## Соответствие по Figma-узлам

### Dialog  ·  Figma nodeId `520:6620`  ·  Overlay  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=520-6620)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-extra` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraDialogHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraDialogFooterDirective)` → `footerTemplate` |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `↳ show-extra` (BOOLEAN), default `True`
- `↳ change-layout-extra` (INSTANCE_SWAP), default `13110:31679`
- `change-layout-body` (INSTANCE_SWAP), default `18841:12539`
- `show-footer` (BOOLEAN), default `True`
- `↳ show-close` (BOOLEAN), default `True`
- `show-maximizable` (BOOLEAN), default `True`
- `show-header` (BOOLEAN), default `True`
- `modal` (VARIANT): true | false, default `true`
- `maximizable` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `modal` (Figma) ↔ `modal` (Angular) | enum | именование совпадает; значения: true \| false; дефолт совпадает: `true` |
| `show-header` (Figma) ↔ `showHeader` (Angular) | boolean | именование отличается (Figma `show-header` — kebab, Angular `showHeader` — camelCase); дефолт совпадает: `true` |

### Modal window  ·  Figma nodeId `17604:90243`  ·  Develop  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=17604-90243)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraDialogHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraDialogFooterDirective)` → `footerTemplate` |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
