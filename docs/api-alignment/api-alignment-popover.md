# popover

Angular: `src/lib/components/popover` — `ExtraPopoverComponent`  
Figma-узлов: 1 — [Popover](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=920-1239)

## Для разработчиков (Angular API)

**`ExtraPopoverComponent`** (`extra-popover`, `src/lib/components/popover/popover.component.ts`)

- Inputs:
  - `@Input() dismissable = true`
  - `@Input() appendTo: string | HTMLElement = 'body'`
- Проекция: `<ng-content>`

## Соответствие по Figma-узлам

### Popover  ·  Figma nodeId `920:1239`  ·  Overlay  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=920-1239)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `18841:12539`
- `position` (VARIANT): top | bottom, default `top`
- `alignment` (VARIANT): left | center | right, default `left`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
