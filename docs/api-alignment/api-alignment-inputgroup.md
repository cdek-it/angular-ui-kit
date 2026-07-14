# inputgroup

Angular: `src/lib/components/inputgroup` — `ExtraInputGroupAddonComponent`, `ExtraInputGroupComponent`  
Figma-узлов: 2 — [InputGroup](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=437-3505), [InputGroup.Addon](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=436-3089)

## Для разработчиков (Angular API)

**`ExtraInputGroupAddonComponent`** (`extra-input-group-addon`, `src/lib/components/inputgroup/input-group-addon.component.ts`)

- Проекция: `<ng-content>`

**`ExtraInputGroupComponent`** (`extra-input-group`, `src/lib/components/inputgroup/input-group.component.ts`)

- Inputs:
  - `@Input() size: ExtraInputGroupSize = 'base'`
- Проекция: `<ng-content>`

## Соответствие по Figma-узлам

### InputGroup  ·  Figma nodeId `437:3505`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=437-3505)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-field` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `change-field` (INSTANCE_SWAP), default `15:13443`
- `addon-position` (VARIANT): left | right | left & right, default `left`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### InputGroup.Addon  ·  Figma nodeId `436:3089`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=436-3089)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `change-icon` (INSTANCE_SWAP), default `428:2003`
- `disabled` (VARIANT): false | true, default `false`
- `position` (VARIANT): left | right, default `left`
- `type` (VARIANT): text | icon, default `icon`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
