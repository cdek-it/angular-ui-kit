# metergroup

Angular: `src/lib/components/metergroup` — `ExtraMeterGroupComponent`  
Figma-узлов: 3 — [MeterGroup](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=222-1489), [MeterGroup.LabelIcon](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15909-10434), [MeterGroup.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=117-965)

## Для разработчиков (Angular API)

**`ExtraMeterGroupComponent`** (`extra-metergroup`, `src/lib/components/metergroup/metergroup.component.ts`)

- Inputs:
  - `@Input() value: ExtraMeterItem[] = []`
  - `@Input() orientation: ExtraMeterGroupOrientation = 'horizontal'`
  - `@Input() labelPosition: ExtraMeterGroupLabelPosition = 'end'`
  - `@Input() labelOrientation: ExtraMeterGroupLabelOrientation = 'horizontal'`

## Соответствие по Figma-узлам

### MeterGroup  ·  Figma nodeId `222:1489`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=222-1489)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `show-item-3` (BOOLEAN), default `True`
- `show-item-2` (BOOLEAN), default `True`
- `show-item-4` (BOOLEAN), default `True`
- `show-item-1` (BOOLEAN), default `True`
- `label-position` (VARIANT): start | end, default `end`
- `label-orientation` (VARIANT): horizontal | vertical, default `horizontal`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `label-orientation` (Figma) ↔ `labelOrientation` (Angular) | enum / `ExtraMeterGroupLabelOrientation` | именование отличается (Figma `label-orientation` — kebab, Angular `labelOrientation` — camelCase); значения: horizontal \| vertical; дефолт совпадает: `horizontal` |
| `label-position` (Figma) ↔ `labelPosition` (Angular) | enum / `ExtraMeterGroupLabelPosition` | именование отличается (Figma `label-position` — kebab, Angular `labelPosition` — camelCase); значения: start \| end; дефолт совпадает: `end` |

### MeterGroup.LabelIcon  ·  Figma nodeId `15909:10434`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15909-10434)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `label-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `label-icon` (INSTANCE_SWAP), default `9195:28214`
- `color` (VARIANT): green | blue | yellow | red, default `green`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### MeterGroup.Item  ·  Figma nodeId `117:965`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=117-965)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `value` (TEXT) | ограничен (текст) | Input `value` |

#### Для дизайнеров (Figma API)

- `value` (TEXT), default `{value}`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `value` (Figma) ↔ `value` (Angular) | string / `ExtraMeterItem[]` | именование совпадает; ⚠️ дефолт отличается: Figma `{value}` ↔ Angular `[]` |
