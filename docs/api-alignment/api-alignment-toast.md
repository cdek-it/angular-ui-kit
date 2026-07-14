# toast

Angular: `src/lib/components/toast` — `ExtraToastComponent`  
Figma-узлов: 2 — [Toast](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15953-4478), [_Toast.ButtonClose](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15963-7837)

## Для разработчиков (Angular API)

**`ExtraToastComponent`** (`extra-toast`, `src/lib/components/toast/toast.component.ts`)

- Inputs:
  - `@Input() position: ExtraToastPosition = 'top-right'`
  - `@Input() key: string | undefined = undefined`
  - `@Input() life = 5000`
  - `@Input() pt: Record<string, any> | undefined = undefined`

## Соответствие по Figma-узлам

### Toast  ·  Figma nodeId `15953:4478`  ·  Messages  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15953-4478)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-footer` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-info` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-success` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-warning` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-danger` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-close` (BOOLEAN), default `True`
- `show-caption` (BOOLEAN), default `True`
- `show-footer` (BOOLEAN), default `True`
- `↳ change-layout-footer` (INSTANCE_SWAP), default `13110:34042`
- `change-icon-info` (INSTANCE_SWAP), default `428:1973`
- `change-icon-success` (INSTANCE_SWAP), default `428:1987`
- `change-icon-warning` (INSTANCE_SWAP), default `428:1977`
- `change-icon-danger` (INSTANCE_SWAP), default `428:1983`
- `show-layout-body` (BOOLEAN), default `True`
- `↳ change-layout-body` (INSTANCE_SWAP), default `18841:12539`
- `severity` (VARIANT): info | success | warning | danger, default `info`
- `timer` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### _Toast.ButtonClose  ·  Figma nodeId `15963:7837`  ·  Messages  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15963-7837)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `severity` (VARIANT): success | warn | danger | info, default `info`
- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
