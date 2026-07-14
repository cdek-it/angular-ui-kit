# inputotp

Angular: `src/lib/components/inputotp` — `ExtraInputOtpComponent`  
Figma-узлов: 2 — [InputOtp](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=318-1373), [InputOtp.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=318-1315)

## Для разработчиков (Angular API)

**`ExtraInputOtpComponent`** (`extra-input-otp`, `src/lib/components/inputotp/inputotp.component.ts`)

- Inputs:
  - `@Input() length = 4`
  - `@Input() mask = false`
  - `@Input() integerOnly = false`
  - `@Input() readonly = false`
  - `@Input() size: ExtraInputOtpSize = 'base'`
  - `@Input() tabindex: number | null = null`
  - `@Input() autofocus = false`
- Outputs:
  - `@Output() onChange: ExtraInputOtpChangeEvent`
  - `@Output() onFocus: Event`
  - `@Output() onBlur: Event`

## Соответствие по Figma-узлам

### InputOtp  ·  Figma nodeId `318:1373`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=318-1373)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:34105`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### InputOtp.Item  ·  Figma nodeId `318:1315`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=318-1315)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-number` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-text-input` (BOOLEAN), default `True`
- `text-number` (TEXT), default `0`
- `state` (VARIANT): default | hover | focus | danger | disabled, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
