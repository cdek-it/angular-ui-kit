# accordion

Angular: `src/lib/components/accordion` — `ExtraAccordionComponent`  
Figma-узлов: 2 — [Accordion](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1153-3084), [Accordion.Panel](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1135-5538)

## Для разработчиков (Angular API)

**`ExtraAccordionComponent`** (`extra-accordion`, `src/lib/components/accordion/accordion.component.ts`)

- Inputs:
  - `@Input() items: ExtraAccordionItem[] = []`
  - `@Input() multiple = false`
  - `@Input() activeValue: string | null = '0'`
- Outputs:
  - `@Output() activeValueChange: string | number | string[] | number[] | null | undefined`

## Соответствие по Figma-узлам

### Accordion  ·  Figma nodeId `1153:3084`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1153-3084)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:19798`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Accordion.Panel  ·  Figma nodeId `1135:5538`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1135-5538)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout-extra` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-accordion` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:2003`
- `show-extra` (BOOLEAN), default `True`
- `↳ change-layout-extra` (INSTANCE_SWAP), default `13110:31679`
- `change-layout-body` (INSTANCE_SWAP), default `18841:12539`
- `text-accordion` (TEXT), default `Accordion`
- `state` (VARIANT): default | hover | disabled, default `default`
- `expanded` (VARIANT): false | true, default `false`
- `first-of-type` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
