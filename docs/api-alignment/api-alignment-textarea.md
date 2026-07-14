# textarea

Angular: `src/lib/components/textarea` — `ExtraTextareaComponent`  
Figma-узлов: 1 — [Textarea](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=309-1582)

## Для разработчиков (Angular API)

**`ExtraTextareaComponent`** (`extra-textarea`, `src/lib/components/textarea/textarea.component.ts`)

- Inputs:
  - `@Input() placeholder = ''`
  - `@Input() size: ExtraTextareaSize = 'base'`
  - `@Input() readonly = false`
  - `@Input() showClear = false`
  - `@Input() fluid = false`
  - `@Input() autoResize = false`
  - `@Input() rows = 3`
  - `@Input() cols: number`
- Outputs:
  - `@Output() onResize: { height: string } | {}`
  - `@Output() onClear: void`

## Соответствие по Figma-узлам

### Textarea  ·  Figma nodeId `309:1582`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=309-1582)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `text-inputarea` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-placeholder` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-float-label` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-clear` (BOOLEAN), default `True`
- `show-resize` (BOOLEAN), default `True`
- `show-text-input` (BOOLEAN), default `True`
- `text-inputarea` (TEXT), default `InputTextarea`
- `text-placeholder` (TEXT), default `Placeholder`
- `text-float-label` (TEXT), default `FloatLabel`
- `state` (VARIANT): default | hover | focus | danger | disabled | readonly, default `default`
- `placeholder` (VARIANT): true | false, default `true`
- `has-floatlabel` (VARIANT): true | false, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `placeholder` (Figma) ↔ `placeholder` (Angular) | enum | именование совпадает; значения: true \| false; ⚠️ дефолт отличается: Figma `true` ↔ Angular `` |
| `show-clear` (Figma) ↔ `showClear` (Angular) | boolean | именование отличается (Figma `show-clear` — kebab, Angular `showClear` — camelCase); ⚠️ дефолт отличается: Figma `true` ↔ Angular `false` |
