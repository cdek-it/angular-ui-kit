# togglebutton

Angular: `src/lib/components/togglebutton` — `ExtraToggleButtonComponent`  
Figma-узлов: 1 — [ToggleButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=174-1363)

## Для разработчиков (Angular API)

**`ExtraToggleButtonComponent`** (`extra-toggle-button`, `src/lib/components/togglebutton/togglebutton.component.ts`)

- Inputs:
  - `@Input() onLabel = 'Вкл'`
  - `@Input() offLabel = 'Выкл'`
  - `@Input() onIcon: string | undefined = undefined`
  - `@Input() offIcon: string | undefined = undefined`
  - `@Input() iconPos: 'left' | 'right' = 'left'`
  - `@Input() size: ExtraToggleButtonSize = 'base'`
  - `@Input() disabled = false`
  - `@Input() iconOnly = false`
  - `@Input() allowEmpty: boolean | undefined = undefined`
  - `@Input() fluid = false`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() ariaLabelledBy: string | undefined = undefined`
  - `@Input() inputId: string | undefined = undefined`
  - `@Input() tabindex: number | undefined = undefined`
  - `@Input() autofocus: boolean | undefined = undefined`
- Outputs:
  - `@Output() onChange: ToggleButtonChangeEvent`

## Соответствие по Figma-узлам

### ToggleButton  ·  Figma nodeId `174:1363`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=174-1363)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `428:1975`
- `text-button` (TEXT), default `ButtonToggle`
- `state` (VARIANT): default | focus | hover | disabled, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `checked` (VARIANT): false | true, default `false`
- `icon-position` (VARIANT): null | left | right, default `null`
- `icon-only` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `icon-only` (Figma) ↔ `iconOnly` (Angular) | enum | именование отличается (Figma `icon-only` — kebab, Angular `iconOnly` — camelCase); значения: false \| true; ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraToggleButtonSize` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
