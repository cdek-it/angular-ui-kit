# tieredmenu

Angular: `src/lib/components/tieredmenu` — `ExtraTieredMenuComponent`  
Figma-узлов: 6 — [TieredMenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=18204-57983), [TieredMenu.ItemBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4588), [TieredMenu.ItemTemplate](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4628), [TieredMenu.MobileIndent](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4688), [TieredMenu.Submenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4686), [_❌TieredMenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=882-5971)

## Для разработчиков (Angular API)

**`ExtraTieredMenuComponent`** (`extra-tieredmenu`, `src/lib/components/tieredmenu/tieredmenu.component.ts`)

- Inputs:
  - `@Input() model: ExtraMenuItem[] = []`
  - `@Input() autoDisplay = true`
  - `@Input() tabindex: number | undefined = undefined`

## Соответствие по Figma-узлам

### TieredMenu  ·  Figma nodeId `18204:57983`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=18204-57983)

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

### TieredMenu.ItemBase  ·  Figma nodeId `16194:4588`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4588)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `postfix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `text-menu-item` (TEXT), default `MenuItem`
- `prefix-icon-menu-item` (INSTANCE_SWAP), default `428:2003`
- `postfix-icon-menu` (INSTANCE_SWAP), default `428:1959`
- `state` (VARIANT): default | hover | selected, default `default`
- `separator` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### TieredMenu.ItemTemplate  ·  Figma nodeId `16194:4628`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4628)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `prefix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `postfix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `text-menu-item` (TEXT), default `MenuItem`
- `prefix-icon-menu-item` (INSTANCE_SWAP), default `428:2003`
- `prefix-icon-menu` (INSTANCE_SWAP), default `428:1959`
- `postfix-icon-menu` (INSTANCE_SWAP), default `1079:3084`
- `state` (VARIANT): default | hover | selected, default `default`
- `separator` (VARIANT): true | false | active, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### TieredMenu.MobileIndent  ·  Figma nodeId `16194:4688`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4688)

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

### TieredMenu.Submenu  ·  Figma nodeId `16194:4686`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4686)

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

### _❌TieredMenu  ·  Figma nodeId `882:5971`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=882-5971)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:19798`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
