# checkbox

Angular: `src/lib/components/checkbox` — `ExtraCheckboxComponent`  
Figma-узлов: 1 — [Checkbox](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16-13529)

## Для разработчиков (Angular API)

**`ExtraCheckboxComponent`** (`extra-checkbox`, `src/lib/components/checkbox/checkbox.component.ts`)

- Inputs:
  - `@Input() value: any = null`
  - `@Input() binary = false`
  - `@Input() disabled = false`
  - `@Input() readonly = false`
  - `@Input() indeterminate = false`
  - `@Input() invalid = false`
  - `@Input() size: ExtraCheckboxSize = 'base'`
  - `@Input() variant: ExtraCheckboxVariant = 'outlined'`
  - `@Input() checkboxIcon: string | undefined = undefined`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() ariaLabelledBy: string | undefined = undefined`
  - `@Input() tabindex: number | undefined = undefined`
  - `@Input() inputId: string | undefined = undefined`
  - `@Input() trueValue: any = true`
  - `@Input() falseValue: any = false`
  - `@Input() autofocus = false`
- Outputs:
  - `@Output() onChange: ExtraCheckboxChangeEvent`
  - `@Output() onFocus: Event`
  - `@Output() onBlur: Event`

## Соответствие по Figma-узлам

### Checkbox  ·  Figma nodeId `16:13529`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=16-13529)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | focus | hover | danger | disabled, default `default`
- `checked` (VARIANT): false | true, default `false`
- `indeterminate` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `indeterminate` (Figma) ↔ `indeterminate` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
