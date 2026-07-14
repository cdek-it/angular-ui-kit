# divider

Angular: `src/lib/components/divider` — `ExtraDividerComponent`  
Figma-узлов: 1 — [Divider](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=33-1543)

## Для разработчиков (Angular API)

**`ExtraDividerComponent`** (`extra-divider`, `src/lib/components/divider/divider.component.ts`)

- Inputs:
  - `@Input() layout: ExtraDividerLayout = 'horizontal'`
  - `@Input() type: ExtraDividerType = 'solid'`
  - `@Input() align: ExtraDividerAlign = 'center'`
- Проекция: `<ng-content>`

## Соответствие по Figma-узлам

### Divider  ·  Figma nodeId `33:1543`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=33-1543)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `show-content` (BOOLEAN), default `True`
- `↳ show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1987`
- `layout` (VARIANT): horizontal | vertical, default `horizontal`
- `type` (VARIANT): solid | dash, default `solid`
- `align` (VARIANT): left | right | center | top | bottom, default `left`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `align` (Figma) ↔ `align` (Angular) | enum / `ExtraDividerAlign` | именование совпадает; значения: left \| right \| center \| top \| bottom; ⚠️ дефолт отличается: Figma `left` ↔ Angular `center` |
| `layout` (Figma) ↔ `layout` (Angular) | enum / `ExtraDividerLayout` | именование совпадает; значения: horizontal \| vertical; дефолт совпадает: `horizontal` |
| `type` (Figma) ↔ `type` (Angular) | enum / `ExtraDividerType` | именование совпадает; значения: solid \| dash; дефолт совпадает: `solid` |
