# drawer

Angular: `src/lib/components/drawer` — `ExtraDrawerComponent`  
Figma-узлов: 1 — [Drawer](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=536-340)

## Для разработчиков (Angular API)

**`ExtraDrawerComponent`** (`extra-drawer`, `src/lib/components/drawer/drawer.component.ts`)

- Inputs:
  - `@Input() visible = false`
  - `@Input() header: string | undefined`
  - `@Input() position: 'left' | 'right' | 'top' | 'bottom' = 'right'`
  - `@Input() size: 'default' | 'sm' | 'lg' | 'xlg' = 'default'`
  - `@Input() modal = true`
  - `@Input() fullScreen = false`
  - `@Input() dismissible = true`
  - `@Input() showCloseIcon = true`
  - `@Input() closeOnEscape = true`
  - `@Input() blockScroll = true`
- Outputs:
  - `@Output() visibleChange: boolean`
  - `@Output() onShow: void`
  - `@Output() onHide: void`
- Слоты (ng-template):
  - `@ContentChild(ExtraDrawerHeaderDirective, read: TemplateRef) headerTemplate`
  - `@ContentChild(ExtraDrawerFooterDirective, read: TemplateRef) footerTemplate`
- Проекция: `<ng-content>`

- Директивы:
  - `ExtraDrawerHeaderDirective` (`[extraDrawerHeader]`)
  - `ExtraDrawerFooterDirective` (`[extraDrawerFooter]`)

## Соответствие по Figma-узлам

### Drawer  ·  Figma nodeId `536:340`  ·  Overlay  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=536-340)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-extra` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraDrawerHeaderDirective)` → `headerTemplate` |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraDrawerFooterDirective)` → `footerTemplate` |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `↳ show-extra` (BOOLEAN), default `True`
- `↳ change-layout-extra` (INSTANCE_SWAP), default `13110:31679`
- `show-footer` (BOOLEAN), default `True`
- `change-layout-body` (INSTANCE_SWAP), default `18841:12539`
- `↳ show-back` (BOOLEAN), default `True`
- `show-header` (BOOLEAN), default `True`
- `modal` (VARIANT): false | true, default `true`
- `position` (VARIANT): left | right | top | bottom, default `left`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `modal` (Figma) ↔ `modal` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `true` |
| `position` (Figma) ↔ `position` (Angular) | enum / `'left' \| 'right' \| 'top' \| 'bottom'` | именование совпадает; значения: left \| right \| top \| bottom; ⚠️ дефолт отличается: Figma `left` ↔ Angular `right` |
