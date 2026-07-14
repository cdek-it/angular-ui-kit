# rating

Angular: `src/lib/components/rating` — `ExtraRatingComponent`  
Figma-узлов: 3 — [Rating](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=384-1881), [Rating.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=384-1735), [Rating.Clear](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=2119-3782)

## Для разработчиков (Angular API)

**`ExtraRatingComponent`** (`extra-rating`, `src/lib/components/rating/rating.component.ts`)

- Inputs:
  - `@Input() stars = 5`
  - `@Input() readonly = false`
  - `@Input() disabled = false`
  - `@Input() autofocus = false`
- Outputs:
  - `@Output() onRate: any`
  - `@Output() onFocus: FocusEvent`
  - `@Output() onBlur: FocusEvent`

## Соответствие по Figma-узлам

### Rating  ·  Figma nodeId `384:1881`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=384-1881)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:38250`
- `show-clear` (BOOLEAN), default `True`
- `disabled` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `disabled` (Figma) ↔ `disabled` (Angular) | enum | именование совпадает; значения: false \| true; дефолт совпадает: `false` |

### Rating.Item  ·  Figma nodeId `384:1735`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=384-1735)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `checked` (VARIANT): false | true, default `false`
- `hover` (VARIANT): true | false, default `false`
- `paddings` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Rating.Clear  ·  Figma nodeId `2119:3782`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=2119-3782)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `paddings` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
