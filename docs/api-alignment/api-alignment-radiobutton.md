# radiobutton

Angular: `src/lib/components/radiobutton` — `ExtraRadiobuttonComponent`  
Figma-узлов: 1 — [RadioButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=17-13535)

## Для разработчиков (Angular API)

**`ExtraRadiobuttonComponent`** (`extra-radiobutton`, `src/lib/components/radiobutton/radiobutton.component.ts`)

- Inputs:
  - `@Input() value: any = null`
  - `@Input() name: string | undefined = undefined`
  - `@Input() disabled = false`
  - `@Input() invalid = false`
  - `@Input() variant: ExtraRadiobuttonVariant = 'outlined'`
  - `@Input() size: ExtraRadiobuttonSize = 'base'`
  - `@Input() inputId: string | undefined = undefined`
  - `@Input() tabindex: number | undefined = undefined`
  - `@Input() ariaLabel: string | undefined = undefined`
  - `@Input() ariaLabelledBy: string | undefined = undefined`
  - `@Input() autofocus = false`
- Outputs:
  - `@Output() onClick: ExtraRadioButtonClickEvent`
  - `@Output() onFocus: Event`
  - `@Output() onBlur: Event`

## Соответствие по Figma-узлам

### RadioButton  ·  Figma nodeId `17:13535`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=17-13535)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | focus | hover | danger | disabled, default `default`
- `checked` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
