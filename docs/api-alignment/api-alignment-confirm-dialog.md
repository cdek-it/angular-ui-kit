# confirm-dialog

Angular: `src/lib/components/confirm-dialog` — `ExtraConfirmDialogComponent`  
Figma-узлов: 1 — [ConfirmDialog](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=520-6928)

## Для разработчиков (Angular API)

**`ExtraConfirmDialogComponent`** (`extra-confirm-dialog`, `src/lib/components/confirm-dialog/confirm-dialog.component.ts`)

- Inputs:
  - `@Input() key = ''`
  - `@Input() size: ExtraConfirmDialogSize = 'default'`
  - `@Input() severity: ExtraConfirmDialogSeverity = 'default'`
- Слоты (ng-template):
  - `@ContentChild(ExtraConfirmDialogHeaderDirective, read: TemplateRef) headerTemplate`
  - `@ContentChild(ExtraConfirmDialogFooterDirective, read: TemplateRef) footerTemplate`

- Директивы:
  - `ExtraConfirmDialogHeaderDirective` (`[extraConfirmDialogHeader]`)
  - `ExtraConfirmDialogFooterDirective` (`[extraConfirmDialogFooter]`)

## Соответствие по Figma-узлам

### ConfirmDialog  ·  Figma nodeId `520:6928`  ·  Overlay  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=520-6928)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraConfirmDialogHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraConfirmDialogFooterDirective)` → `footerTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `18841:12539`
- `show-header` (BOOLEAN), default `True`
- `severity` (VARIANT): danger | warning | success | info | help, default `danger`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraConfirmDialogSeverity` | именование совпадает; значения: danger \| warning \| success \| info \| help; ⚠️ дефолт отличается: Figma `danger` ↔ Angular `default` |
