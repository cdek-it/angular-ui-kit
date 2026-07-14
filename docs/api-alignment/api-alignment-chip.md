# chip

Angular: `src/lib/components/chip` — `ExtraChipComponent`  
Figma-узлов: 2 — [Chip](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=312-1298), [_❌Chips](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=312-1306)

## Для разработчиков (Angular API)

**`ExtraChipComponent`** (`extra-chip`, `src/lib/components/chip/chip.component.ts`)

- Inputs:
  - `@Input() label = ''`
  - `@Input() icon = ''`
  - `@Input() removable = false`
  - `@Input() disabled = false`
- Outputs:
  - `@Output() onRemove: MouseEvent`

## Соответствие по Figma-узлам

### Chip  ·  Figma nodeId `312:1298`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=312-1298)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-chip` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `show-close` (BOOLEAN), default `True`
- `text-chip` (TEXT), default `Chip`
- `state` (VARIANT): default | focus | disabled, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### _❌Chips  ·  Figma nodeId `312:1306`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=312-1306)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-chips` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-input` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-text-input` (BOOLEAN), default `True`
- `show-chips` (BOOLEAN), default `True`
- `↳ change-layout-chips` (INSTANCE_SWAP), default `13110:31679`
- `text-input` (TEXT), default `Chips`
- `text-placeholder` (TEXT), default `Placeholder`
- `show-clear` (BOOLEAN), default `True`
- `text-float-label` (TEXT), default `FloatLabel`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `has-placeholder` (VARIANT): true | false, default `true`
- `has-floatlabel` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
