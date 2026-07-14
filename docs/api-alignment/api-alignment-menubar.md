# menubar

Angular: `src/lib/components/menubar` — `ExtraMenubarComponent`  
Figma-узлов: 8 — [Menubar](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4260), [Menubar.Item.Group](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4363), [Menubar.ItemBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4265), [Menubar.ItemTemplate](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4305), [Menubar.MobileButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4369), [Menubar.MobileIndent](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4367), [Menubar.Submenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4365), [_❌Menubar](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=882-5234)

## Для разработчиков (Angular API)

**`ExtraMenubarComponent`** (`extra-menubar`, `src/lib/components/menubar/menubar.component.ts`)

- Inputs:
  - `@Input() model: ExtraMenuItem[] = []`
- Слоты (ng-template):
  - `@ContentChild(ExtraMenubarItemDirective, read: TemplateRef) itemTemplate`

- Директивы:
  - `ExtraMenubarItemDirective` (`[extraMenubarItem]`)

## Соответствие по Figma-узлам

### Menubar  ·  Figma nodeId `16194:4260`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4260)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:34042`
- `orientation` (VARIANT): horizontal | none, default `horizontal`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menubar.Item.Group  ·  Figma nodeId `16194:4363`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4363)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menubar.ItemBase  ·  Figma nodeId `16194:4265`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4265)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `postfix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `text-menu-item` (TEXT), default `MenuItem`
- `prefix-icon-menu-item` (INSTANCE_SWAP), default `428:2003`
- `postfix-icon-menu-item` (INSTANCE_SWAP), default `428:1959`
- `state` (VARIANT): default | hover | selected, default `default`
- `separator` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menubar.ItemTemplate  ·  Figma nodeId `16194:4305`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4305)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `prefix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `postfix-icon-menu` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

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

### Menubar.MobileButton  ·  Figma nodeId `16194:4369`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4369)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menubar.MobileIndent  ·  Figma nodeId `16194:4367`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4367)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menubar.Submenu  ·  Figma nodeId `16194:4365`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16194-4365)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- Свойств нет

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### _❌Menubar  ·  Figma nodeId `882:5234`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=882-5234)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenubarItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:34042`
- `orientation` (VARIANT): horizontal | none, default `horizontal`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
