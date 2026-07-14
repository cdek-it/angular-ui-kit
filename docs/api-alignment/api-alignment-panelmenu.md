# panelmenu

Angular: `src/lib/components/panelmenu` — `ExtraPanelMenuComponent`  
Figma-узлов: 5 — [PanelMenu.ItemBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4755), [PanelMenu.ItemTemplate](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4795), [PanelMenu.Panel](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4855), [PanelMenu.Submenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4853), [_❌PanelMenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-7089)

## Для разработчиков (Angular API)

**`ExtraPanelMenuComponent`** (`extra-panelmenu`, `src/lib/components/panelmenu/panelmenu.component.ts`)

- Inputs:
  - `@Input() model: ExtraMenuItem[] = []`
  - `@Input() multiple = false`
  - `@Input() tabindex: number | undefined = undefined`

## Соответствие по Figma-узлам

### PanelMenu.ItemBase  ·  Figma nodeId `16194:4755`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4755)

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

### PanelMenu.ItemTemplate  ·  Figma nodeId `16194:4795`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4795)

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

### PanelMenu.Panel  ·  Figma nodeId `16194:4855`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4855)

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

### PanelMenu.Submenu  ·  Figma nodeId `16194:4853`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4853)

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

### _❌PanelMenu  ·  Figma nodeId `884:7089`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-7089)

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
