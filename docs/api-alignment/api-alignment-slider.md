# slider

Angular: `src/lib/components/slider` — `ExtraSliderComponent`  
Figma-узлов: 1 — [Slider](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=383-1844)

## Для разработчиков (Angular API)

**`ExtraSliderComponent`** (`extra-slider`, `src/lib/components/slider/slider.component.ts`)

- Inputs:
  - `@Input() min = 0`
  - `@Input() max = 100`
  - `@Input() step: number | undefined = undefined`
  - `@Input() range = false`
  - `@Input() orientation: ExtraSliderOrientation = 'horizontal'`
  - `@Input() disabled: boolean`
- Outputs:
  - `@Output() onSlideEnd: ExtraSliderSlideEndEvent`

## Соответствие по Figma-узлам

### Slider  ·  Figma nodeId `383:1844`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=383-1844)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `state` (VARIANT): default | hover | disabled, default `default`
- `range` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `range` (Figma) ↔ `range` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |
