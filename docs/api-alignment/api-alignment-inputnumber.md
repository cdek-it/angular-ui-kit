# inputnumber

Angular: `src/lib/components/inputnumber` — `ExtraInputNumberComponent`  
Figma-узлов: 2 — [InputNumber](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=320-1754), [InputNumber.Buttons](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=379-1695)

## Для разработчиков (Angular API)

**`ExtraInputNumberComponent`** (`extra-input-number`, `src/lib/components/inputnumber/inputnumber.component.ts`)

- Inputs:
  - `@Input() size: ExtraInputNumberSize = 'base'`
  - `@Input() showButtons = false`
  - `@Input() buttonLayout: ExtraInputNumberButtonLayout = 'stacked'`
  - `@Input() mode = 'decimal'`
  - `@Input() currency: string | undefined`
  - `@Input() locale: string | undefined`
  - `@Input() placeholder = ''`
  - `@Input() readonly = false`
  - `@Input() fluid = false`
  - `@Input() min: number | undefined`
  - `@Input() max: number | undefined`
  - `@Input() step = 1`
  - `@Input() prefix: string | undefined`
  - `@Input() suffix: string | undefined`
  - `@Input() minFractionDigits: number | undefined`
  - `@Input() maxFractionDigits: number | undefined`
  - `@Input() useGrouping = true`
  - `@Input() incrementButtonIcon: string | undefined`
  - `@Input() decrementButtonIcon: string | undefined`
- Outputs:
  - `@Output() onInput: { value: number | null }`

## Соответствие по Figma-узлам

### InputNumber  ·  Figma nodeId `320:1754`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=320-1754)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ text-prefix` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `↳ text-suffix` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-inputnumber` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-clear` (BOOLEAN), default `True`
- `show-text-prefix` (BOOLEAN), default `True`
- `↳ text-prefix` (TEXT), default `₽`
- `show-text-suffix` (BOOLEAN), default `True`
- `↳ text-suffix` (TEXT), default `₽`
- `show-text-input` (BOOLEAN), default `True`
- `text-inputnumber` (TEXT), default `InputNumber`
- `text-placeholder` (TEXT), default `Placeholder`
- `text-float-label` (TEXT), default `FloatLabel`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `buttons` (VARIANT): false | true, default `false`
- `has-floatlabel` (VARIANT): true | false, default `false`
- `has-placeholder` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### InputNumber.Buttons  ·  Figma nodeId `379:1695`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=379-1695)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-icon` (INSTANCE_SWAP), default `428:2001`
- `state` (VARIANT): default | hover | disabled, default `default`
- `type` (VARIANT): up | down, default `down`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
