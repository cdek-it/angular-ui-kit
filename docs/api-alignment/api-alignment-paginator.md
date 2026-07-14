# paginator

Angular: `src/lib/components/paginator` — `ExtraPaginatorComponent`  
Figma-узлов: 2 — [Paginator](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1284-1732), [Paginator.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1284-649)

## Для разработчиков (Angular API)

**`ExtraPaginatorComponent`** (`extra-paginator`, `src/lib/components/paginator/paginator.component.ts`)

- Inputs:
  - `@Input() first = 0`
  - `@Input() rows = 10`
  - `@Input() totalRecords = 0`
  - `@Input() rowsPerPageOptions: any[] | undefined`
  - `@Input() currentPageReportTemplate = '{currentPage} из {totalPages}'`
  - `@Input() showCurrentPageReport = false`
  - `@Input() showFirstLastIcon = true`
  - `@Input() showJumpToPageDropdown = false`
  - `@Input() showJumpToPageInput = false`
  - `@Input() showPageLinks = true`
  - `@Input() pageLinkSize = 5`
  - `@Input() alwaysShow = true`
- Outputs:
  - `@Output() onPageChange: ExtraPaginatorState`

## Соответствие по Figma-узлам

### Paginator  ·  Figma nodeId `1284:1732`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1284-1732)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-jump` (BOOLEAN), default `True`
- `change-layout` (INSTANCE_SWAP), default `13110:38261`
- `show-dropdown` (BOOLEAN), default `True`
- `template` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Paginator.Item  ·  Figma nodeId `1284:649`  ·  Data  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1284-649)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `number` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1981`
- `number` (TEXT), default `0`
- `state` (VARIANT): default | hover | disabled, default `default`
- `checked` (VARIANT): false | true, default `false`
- `icon` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
