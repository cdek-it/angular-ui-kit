# inputmask

Angular: `src/lib/components/inputmask` — `ExtraInputMaskComponent`  
Figma-узлов: 1 — [InputMask](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=319-1690)

## Для разработчиков (Angular API)

**`ExtraInputMaskComponent`** (`extra-input-mask`, `src/lib/components/inputmask/inputmask.component.ts`)

- Inputs:
  - `@Input() mask = ''`
  - `@Input() slotChar = '_'`
  - `@Input() autoClear = true`
  - `@Input() showClear = false`
  - `@Input() unmask = false`
  - `@Input() placeholder = ''`
  - `@Input() size: ExtraInputMaskSize = 'base'`
  - `@Input() readonly = false`
  - `@Input() fluid = false`
  - `@Input() characterPattern = '[A-Za-z]'`
  - `@Input() keepBuffer = false`
  - `@Input() autocomplete = ''`
- Outputs:
  - `@Output() onComplete: void`
  - `@Output() onFocusEvent: Event`
  - `@Output() onBlurEvent: Event`
  - `@Output() onInputEvent: Event`
  - `@Output() onKeydownEvent: Event`
  - `@Output() onClearEvent: void`

## Соответствие по Figma-узлам

### InputMask  ·  Figma nodeId `319:1690`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=319-1690)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-input` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-clear` (BOOLEAN), default `True`
- `show-text-input` (BOOLEAN), default `True`
- `text-input` (TEXT), default `111-111-11-11`
- `text-placeholder` (TEXT), default `999-999-99-99`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `has-placeholder` (VARIANT): true | false, default `true`
- `has-floatlabel` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `show-clear` (Figma) ↔ `showClear` (Angular) | boolean | именование отличается (Figma `show-clear` — kebab, Angular `showClear` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
