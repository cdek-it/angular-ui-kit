# stepper

Angular: `src/lib/components/stepper` — `ExtraStepperComponent`  
Figma-узлов: 4 — [Stepper](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1079-7496), [Stepper.Item](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1079-3244), [Stepper.StepPanel](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15931-6211), [Stepper.Separator](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1082-1671)

## Для разработчиков (Angular API)

**`ExtraStepperComponent`** (`extra-stepper`, `src/lib/components/stepper/stepper.component.ts`)

- Inputs:
  - `@Input() value: number | undefined = 1`
  - `@Input() steps: ExtraStepperItem[] = []`
  - `@Input() linear = false`
  - `@Input() orientation: 'horizontal' | 'vertical' = 'horizontal'`
  - `@Input() showPanels = true`
- Outputs:
  - `@Output() valueChange: number | undefined`

## Соответствие по Figma-узлам

### Stepper  ·  Figma nodeId `1079:7496`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1079-7496)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-layout` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-layout` (INSTANCE_SWAP), default `13110:38261`
- `steps-only` (BOOLEAN), default `False`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Stepper.Item  ·  Figma nodeId `1079:3244`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1079-3244)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `text-number` (TEXT) | ограничен (текст) | ⚠️ отсутствует |
| `text-stepper` (TEXT) | ограничен (текст) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `↳ change-icon` (INSTANCE_SWAP), default `1079:3084`
- `show-caption` (BOOLEAN), default `True`
- `text-number` (TEXT), default `0`
- `text-stepper` (TEXT), default `Stepper`
- `state` (VARIANT): default | checked | danger, default `default`
- `line` (VARIANT): true | false, default `true`
- `disabled` (VARIANT): true | false, default `false`
- `icon` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Stepper.StepPanel  ·  Figma nodeId `15931:6211`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15931-6211)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `show-prev-button` (BOOLEAN), default `True`
- `show-next-button` (BOOLEAN), default `True`
- `show-nav-buttons` (BOOLEAN), default `True`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Stepper.Separator  ·  Figma nodeId `1082:1671`  ·  Panel  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1082-1671)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `checked` (VARIANT): false | true, default `true`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
