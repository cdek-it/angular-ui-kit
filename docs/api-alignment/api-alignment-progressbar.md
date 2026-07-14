# progressbar

Angular: `src/lib/components/progressbar` — `ExtraProgressBarComponent`  
Figma-узлов: 1 — [ProgressBar](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=113-1004)

## Для разработчиков (Angular API)

**`ExtraProgressBarComponent`** (`extra-progressbar`, `src/lib/components/progressbar/progressbar.component.ts`)

- Inputs:
  - `@Input() value = 0`
  - `@Input() mode: ExtraProgressBarMode = 'determinate'`
  - `@Input() showValue = true`

## Соответствие по Figma-узлам

### ProgressBar  ·  Figma nodeId `113:1004`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=113-1004)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `value` (TEXT) | ограничен (текст) | Input `value` |

#### Для дизайнеров (Figma API)

- `value` (TEXT), default `{value}%`
- `progress` (VARIANT): 25 | 50 | 85, default `25`
- `hasValue` (VARIANT): true | false, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `value` (Figma) ↔ `value` (Angular) | string | именование совпадает; ⚠️ дефолт отличается: Figma `{value}%` ↔ Angular `0` |
