# tabs

Angular: `src/lib/components/tabs` — `ExtraTabsComponent`  
Figma-узлов: 4 — [Tabs](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-7324), [Tabs.NavButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15927-59569), [Tabs.Tab](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-7248), [Tabs.Tabpanel](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15923-59551)

## Для разработчиков (Angular API)

**`ExtraTabsComponent`** (`extra-tabs`, `src/lib/components/tabs/tabs.component.ts`)

- Inputs:
  - `@Input() value: string | number | undefined = '0'`
  - `@Input() tabs: ExtraTabItem[] = []`
  - `@Input() scrollable = false`
  - `@Input() lazy = false`

## Соответствие по Figma-узлам

### Tabs  ·  Figma nodeId `884:7324`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-7324)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:38261`
- `show-nav-buttons` (BOOLEAN), default `False`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Tabs.NavButton  ·  Figma nodeId `15927:59569`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15927-59569)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Tabs.Tab  ·  Figma nodeId `884:7248`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=884-7248)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-tab` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:2003`
- `show-badge` (BOOLEAN), default `True`
- `text-tab` (TEXT), default `Tab`
- `state` (VARIANT): default | hover | active | disabled | focus, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Tabs.Tabpanel  ·  Figma nodeId `15923:59551`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15923-59551)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `focus` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
