# breadcrumb

Angular: `src/lib/components/breadcrumb` — `ExtraBreadcrumbComponent`  
Figma-узлов: 2 — [Breadcrumb](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=735-7985), [Breadcrumb.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=734-7859)

## Для разработчиков (Angular API)

**`ExtraBreadcrumbComponent`** (`extra-breadcrumb`, `src/lib/components/breadcrumb/breadcrumb.component.ts`)

- Inputs:
  - `@Input() model: ExtraMenuItem[] = []`
  - `@Input() home: ExtraMenuItem | undefined = undefined`

## Соответствие по Figma-узлам

### Breadcrumb  ·  Figma nodeId `735:7985`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=735-7985)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:34042`
- `home` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `home` (Figma) ↔ `home` (Angular) | enum / `ExtraMenuItem \| undefined` | именование совпадает; значения: true \| false; ⚠️ дефолт отличается: Figma `true` ↔ Angular `undefined` |

### Breadcrumb.Item  ·  Figma nodeId `734:7859`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=734-7859)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-breadcrumb` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-separator` (BOOLEAN), default `True`
- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:2003`
- `show-label` (BOOLEAN), default `True`
- `text-breadcrumb` (TEXT), default `Breadcrum`
- `state` (VARIANT): default | hover | disabled, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
