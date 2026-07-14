# megamenu

Angular: `src/lib/components/megamenu` — `ExtraMegaMenuComponent`  
Figma-узлов: 7 — [MegaMenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4401), [MegaMenu.Item.Group](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4408), [MegaMenu.ItemBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4410), [MegaMenu.ItemTemplate](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4450), [MegaMenu.MobileButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4508), [MegaMenu.Submenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4513), [_❌MegaMenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=882-5830)

## Для разработчиков (Angular API)

**`ExtraMegaMenuComponent`** (`extra-megamenu`, `src/lib/components/megamenu/megamenu.component.ts`)

- Inputs:
  - `@Input() model: ExtraMegaMenuItem[] = []`
  - `@Input() orientation: ExtraMegaMenuOrientation = 'horizontal'`
  - `@Input() breakpoint: string = '960px'`
  - `@Input() scrollHeight: string = ''`
  - `@Input() disabled: boolean = false`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() ariaLabelledBy: string | undefined = undefined`
  - `@Input() tabindex: number = 0`
- Слоты (ng-template):
  - `@ContentChild(ExtraMegaMenuItemDirective, read: TemplateRef) itemTemplate`

- Директивы:
  - `ExtraMegaMenuItemDirective` (`[extraMegaMenuItem]`)

## Соответствие по Figma-узлам

### MegaMenu  ·  Figma nodeId `16194:4401`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4401)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout-vertical` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-horizontal` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout-vertical` (INSTANCE_SWAP), default `13110:19798`
- `change-layout-horizontal` (INSTANCE_SWAP), default `13110:34042`
- `orientation` (VARIANT): horizontal | vertical | none, default `horizontal`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `orientation` (Figma) ↔ `orientation` (Angular) | enum / `ExtraMegaMenuOrientation` | именование совпадает; значения: horizontal \| vertical \| none; дефолт совпадает: `horizontal` |

### MegaMenu.Item.Group  ·  Figma nodeId `16194:4408`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4408)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### MegaMenu.ItemBase  ·  Figma nodeId `16194:4410`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4410)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `postfix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

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

### MegaMenu.ItemTemplate  ·  Figma nodeId `16194:4450`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4450)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `prefix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `postfix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

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

### MegaMenu.MobileButton  ·  Figma nodeId `16194:4508`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4508)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### MegaMenu.Submenu  ·  Figma nodeId `16194:4513`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4513)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### _❌MegaMenu  ·  Figma nodeId `882:5830`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=882-5830)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout-vertical` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-horizontal` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMegaMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout-vertical` (INSTANCE_SWAP), default `13110:19798`
- `change-layout-horizontal` (INSTANCE_SWAP), default `13110:34042`
- `orientation` (VARIANT): horizontal | vertical | none, default `horizontal`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `orientation` (Figma) ↔ `orientation` (Angular) | enum / `ExtraMegaMenuOrientation` | именование совпадает; значения: horizontal \| vertical \| none; дефолт совпадает: `horizontal` |
