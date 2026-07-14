# avatar

Angular: `src/lib/components/avatar` — `ExtraAvatarComponent`, `ExtraAvatarGroupComponent`  
Figma-узлов: 1 — [Avatar](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=36-1365)

## Для разработчиков (Angular API)

**`ExtraAvatarComponent`** (`extra-avatar`, `src/lib/components/avatar/avatar.component.ts`)

- Inputs:
  - `@Input() label = ''`
  - `@Input() icon = ''`
  - `@Input() image = ''`
  - `@Input() size: ExtraAvatarSize = 'base'`
  - `@Input() shape: ExtraAvatarShape = 'square'`

**`ExtraAvatarGroupComponent`** (`extra-avatar-group`, `src/lib/components/avatar/avatar.component.ts`)

- Проекция: `<ng-content>`

## Соответствие по Figma-узлам

### Avatar  ·  Figma nodeId `36:1365`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=36-1365)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:2003`
- `show-badge` (BOOLEAN), default `True`
- `size` (VARIANT): xlarge | large | base, default `xlarge`
- `shape` (VARIANT): square | circle, default `square`
- `type` (VARIANT): image | icon | label, default `label`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `shape` (Figma) ↔ `shape` (Angular) | enum / `ExtraAvatarShape` | именование совпадает; значения: square \| circle; дефолт совпадает: `square` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraAvatarSize` | именование совпадает; значения: xlarge \| large \| base; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
