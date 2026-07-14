# progressspinner

Angular: `src/lib/components/progressspinner` — `ExtraProgressSpinnerComponent`  
Figma-узлов: 2 — [ProgressSpinner](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1219-3101), [ProgressSpinner.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1219-3111)

## Для разработчиков (Angular API)

**`ExtraProgressSpinnerComponent`** (`extra-progressspinner`, `src/lib/components/progressspinner/progressspinner.component.ts`)

- Inputs:
  - `@Input() size: ExtraProgressSpinnerSize = 'base'`
  - `@Input() multicolor = true`
  - `@Input() strokeWidth = '2'`
  - `@Input() fill = 'none'`
  - `@Input() animationDuration = '2s'`
  - `@Input() ariaLabel: string | undefined = undefined`

## Соответствие по Figma-узлам

### ProgressSpinner  ·  Figma nodeId `1219:3101`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1219-3101)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `keyframes` (VARIANT): 1 | 2 | 3, default `1`
- `size` (VARIANT): xlarge | base | large | small, default `xlarge`
- `fill` (VARIANT): primary | white, default `primary`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `fill` (Figma) ↔ `fill` (Angular) | enum | именование совпадает; значения: primary \| white; ⚠️ дефолт отличается: Figma `primary` ↔ Angular `none` |
| `size` (Figma) ↔ `size` (Angular) | enum / `ExtraProgressSpinnerSize` | именование совпадает; значения: xlarge \| base \| large \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |

### ProgressSpinner.Item  ·  Figma nodeId `1219:3111`  ·  Misc  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1219-3111)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `keyframes` (VARIANT): waxed | initial | waned, default `initial`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
