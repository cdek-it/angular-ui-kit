# menu

Angular: `src/lib/components/menu` — `ExtraMenuComponent`  
Figma-узлов: 5 — [Menu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-21803), [Menu.ItemBase](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-24594), [Menu.ItemTemplate](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-24612), [Menu.Submenu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-25381), [_❌Menu](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-6762)

## Для разработчиков (Angular API)

**`ExtraMenuComponent`** (`extra-menu`, `src/lib/components/menu/menu.component.ts`)

- Inputs:
  - `@Input() model: ExtraMenuModel[] = []`
  - `@Input() popup = false`
- Слоты (ng-template):
  - `@ContentChild(ExtraMenuItemDirective, read: TemplateRef) itemTemplate`

- Директивы:
  - `ExtraMenuItemDirective` (`[extraMenuItem]`)

## Соответствие по Figma-узлам

### Menu  ·  Figma nodeId `16005:21803`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-21803)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `popup` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `popup` (Figma) ↔ `popup` (Angular) | enum | именование совпадает; значения: true \| false; дефолт совпадает: `false` |

### Menu.ItemBase  ·  Figma nodeId `16005:24594`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-24594)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `text-menu-item` (TEXT), default `MenuItem`
- `icon-menu-item` (INSTANCE_SWAP), default `428:2003`
- `state` (VARIANT): default | hover | selected, default `default`
- `separator` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menu.ItemTemplate  ·  Figma nodeId `16005:24612`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-24612)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `prefix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `posfix-icon-menu-item` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `text-menu-item` (TEXT), default `MenuItem`
- `prefix-icon-menu-item` (INSTANCE_SWAP), default `428:2003`
- `posfix-icon-menu-item` (INSTANCE_SWAP), default `13498:25109`
- `state` (VARIANT): default | hover | selected, default `default`
- `separator` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Menu.Submenu  ·  Figma nodeId `16005:25381`  ·  Menu  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16005-25381)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-menu-item` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `text-menu-item` (TEXT), default `Menuitem`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### _❌Menu  ·  Figma nodeId `884:6762`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-6762)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `ng-template` через `@ContentChild(ExtraMenuItemDirective)` → `itemTemplate` |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:36319`
- `popup` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `popup` (Figma) ↔ `popup` (Angular) | enum | именование совпадает; значения: true \| false; дефолт совпадает: `false` |
