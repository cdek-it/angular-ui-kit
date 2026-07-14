# select-button

Angular: `src/lib/components/select-button` — `ExtraSelectButtonComponent`  
Figma-узлов: 2 — [SelectButton](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=317-1832), [SelectButton.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=218-1416)

## Для разработчиков (Angular API)

**`ExtraSelectButtonComponent`** (`extra-select-button`, `src/lib/components/select-button/select-button.component.ts`)

- Inputs:
  - `@Input() options: unknown[] = []`
  - `@Input() optionLabel = 'label'`
  - `@Input() optionValue = 'value'`
  - `@Input() optionDisabled = 'disabled'`
  - `@Input() size: 'base' | 'small' | 'large' | 'xlarge' = 'base'`
  - `@Input() multiple = false`
  - `@Input() allowEmpty = true`
- Outputs:
  - `@Output() valueChange: string | string[]`

## Соответствие по Figma-узлам

### SelectButton  ·  Figma nodeId `317:1832`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=317-1832)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:34042`
- `state` (VARIANT): default | disabled, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### SelectButton.Item  ·  Figma nodeId `218:1416`  ·  Form  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=218-1416)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-button` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-icon` (BOOLEAN), default `True`
- `↳ change-icon` (INSTANCE_SWAP), default `428:1975`
- `text-button` (TEXT), default `ButtonSelect`
- `state` (VARIANT): default | hover | active | disabled, default `default`
- `size` (VARIANT): xlarge | large | base | small, default `xlarge`
- `checked` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `size` (Figma) ↔ `size` (Angular) | enum / `'base' \| 'small' \| 'large' \| 'xlarge'` | именование совпадает; значения: xlarge \| large \| base \| small; ⚠️ дефолт отличается: Figma `xlarge` ↔ Angular `base` |
