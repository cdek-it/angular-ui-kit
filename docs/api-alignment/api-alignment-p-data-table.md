# p-data-table

Angular: `src/stories/components/p-data-table` — ⚠️ реализация не найдена (нет `@Component`)  
Figma-узлов: 9 — [DataTable.BodyCellBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1308-3489), [DataTable.FooterCellBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1308-4667), [DataTable.HeaderCellBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1292-407), [DataTable.HeaderCellFilter](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1292-1490), [DataTable.Constraint](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15822-18865), [DataTable.ConstraintList](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15822-18926), [DataTable.OverlayPopover](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15824-6992), [DataTable.OverlaySelect](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15824-6953), [DataTable.RowToggleButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15819-10738)

## Для разработчиков (Angular API)

⚠️ компонент не найден в коде

_(`repo.angular` указывает на `src/stories/components/p-data-table`, но там нет `@Component`)_

## Соответствие по Figma-узлам

### DataTable.BodyCellBase  ·  Figma nodeId `1308:3489`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1308-3489)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-layout` (INSTANCE_SWAP), default `13110:31679`
- `state` (VARIANT): default | hover | disabled, default `default`
- `size` (VARIANT): large | small | base, default `large`
- `selection` (VARIANT): false | true, default `false`
- `striped-rows` (VARIANT): false | true, default `false`
- `gridlines` (VARIANT): true | false, default `false`
- `variant` (VARIANT): string | number | link | null | checkbox | expanded | order | edit | layout, default `string`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.FooterCellBase  ·  Figma nodeId `1308:4667`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1308-4667)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-layout` (INSTANCE_SWAP), default `13110:31679`
- `↳ show-layout` (BOOLEAN), default `True`
- `state` (VARIANT): default | disabled, default `default`
- `size` (VARIANT): large | small | base, default `large`
- `gridlines` (VARIANT): false | true, default `false`
- `variant` (VARIANT): base | layout, default `base`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.HeaderCellBase  ·  Figma nodeId `1292:407`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1292-407)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon-sort` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-filter` (BOOLEAN), default `True`
- `show-filter-reset` (BOOLEAN), default `True`
- `show-icon-sort` (BOOLEAN), default `True`
- `↳ change-icon-sort` (INSTANCE_SWAP), default `1287:2060`
- `↳ show-layout` (BOOLEAN), default `True`
- `↳ change-layout` (INSTANCE_SWAP), default `13110:31679`
- `state` (VARIANT): default | hover | disabled, default `default`
- `size` (VARIANT): large | base | small, default `large`
- `selection` (VARIANT): false | true, default `false`
- `gridlines` (VARIANT): false | true, default `false`
- `variant` (VARIANT): base | checkbox | layout, default `base`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.HeaderCellFilter  ·  Figma nodeId `1292:1490`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1292-1490)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-field` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-filter` (BOOLEAN), default `True`
- `show-filter-reset` (BOOLEAN), default `True`
- `change-field` (INSTANCE_SWAP), default `15:13443`
- `state` (VARIANT): default | hover | disabled, default `default`
- `size` (VARIANT): large | small | base, default `large`
- `gridlines` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.Constraint  ·  Figma nodeId `15822:18865`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15822-18865)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-option` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1989`
- `text-option` (TEXT), default `Option`
- `state` (VARIANT): default | hover, default `default`
- `checked` (VARIANT): false | true, default `false`
- `separator` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.ConstraintList  ·  Figma nodeId `15822:18926`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15822-18926)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.OverlayPopover  ·  Figma nodeId `15824:6992`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15824-6992)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.OverlaySelect  ·  Figma nodeId `15824:6953`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15824-6953)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### DataTable.RowToggleButton  ·  Figma nodeId `15819:10738`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15819-10738)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | hover, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
