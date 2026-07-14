# inputtext

Angular: `src/lib/components/inputtext` — `ExtraInputTextComponent`  
Figma-узлов: 1 — [InputText](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15-13444)

## Для разработчиков (Angular API)

**`ExtraInputTextComponent`** (`extra-input-text`, `src/lib/components/inputtext/inputtext.component.ts`)

- Inputs:
  - `@Input() placeholder = ''`
  - `@Input() size: ExtraInputTextSize = 'base'`
  - `@Input() readonly = false`
  - `@Input() showClear = false`
  - `@Input() fluid = false`
- Outputs:
  - `@Output() onClear: void`

## Соответствие по Figma-узлам

### InputText  ·  Figma nodeId `15:13444`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15-13444)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-input` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-clear` (BOOLEAN), default `True`
- `show-text-input` (BOOLEAN), default `True`
- `text-input` (TEXT), default `InputText`
- `text-placeholder` (TEXT), default `Placeholder`
- `text-float-label` (TEXT), default `FloatLabel`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `has-placeholder` (VARIANT): true | false, default `true`
- `has-floatlabel` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `show-clear` (Figma) ↔ `showClear` (Angular) | boolean | именование отличается (Figma `show-clear` — kebab, Angular `showClear` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
