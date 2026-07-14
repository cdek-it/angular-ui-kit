# message

Angular: `src/lib/components/message` — `ExtraMessageComponent`  
Figma-узлов: 4 — [Message](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15963-3163), [_Message.ButtonClose](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15963-3340), [_❌Message](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=560-490), [_Message.ButtonClose](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15957-3338)

## Для разработчиков (Angular API)

**`ExtraMessageComponent`** (`extra-message`, `src/lib/components/message/message.component.ts`)

- Inputs:
  - `@Input() severity: ExtraMessageSeverity = 'info'`
  - `@Input() summary = ''`
  - `@Input() detail = ''`
  - `@Input() icon: string | undefined = undefined`
  - `@Input() closable = false`
  - `@Input() life: number | undefined = undefined`
- Outputs:
  - `@Output() onClose: Event`
- Проекция: `<ng-content>`

## Соответствие по Figma-узлам

### Message  ·  Figma nodeId `15963:3163`  ·  Messages  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15963-3163)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-footer` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-info` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-success` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-warning` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-danger` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `show-close` (BOOLEAN), default `True`
- `show-caption` (BOOLEAN), default `True`
- `show-footer` (BOOLEAN), default `True`
- `↳ change-layout-footer` (INSTANCE_SWAP), default `13110:34042`
- `change-icon-info` (INSTANCE_SWAP), default `428:1973`
- `change-icon-success` (INSTANCE_SWAP), default `428:1987`
- `change-icon-warning` (INSTANCE_SWAP), default `428:1977`
- `change-icon-danger` (INSTANCE_SWAP), default `428:1983`
- `show-layout-body` (BOOLEAN), default `True`
- `↳ change-layout-body` (INSTANCE_SWAP), default `18841:12539`
- `severity` (VARIANT): info | success | warning | danger, default `info`
- `timer` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraMessageSeverity` | именование совпадает; значения: info \| success \| warning \| danger; дефолт совпадает: `info` |

### _Message.ButtonClose  ·  Figma nodeId `15963:3340`  ·  Messages  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15963-3340)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `severity` (VARIANT): success | warn | danger | info, default `info`
- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraMessageSeverity` | именование совпадает; значения: success \| warn \| danger \| info; дефолт совпадает: `info` |

### _❌Message  ·  Figma nodeId `560:490`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=560-490)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-footer` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-info` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-success` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-warning` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `change-icon-danger` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| `↳ change-layout-body` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `show-close` (BOOLEAN), default `True`
- `show-caption` (BOOLEAN), default `True`
- `show-footer` (BOOLEAN), default `True`
- `↳ change-layout-footer` (INSTANCE_SWAP), default `13110:34042`
- `change-icon-info` (INSTANCE_SWAP), default `428:1973`
- `change-icon-success` (INSTANCE_SWAP), default `428:1987`
- `change-icon-warning` (INSTANCE_SWAP), default `428:1977`
- `change-icon-danger` (INSTANCE_SWAP), default `428:1983`
- `show-layout-body` (BOOLEAN), default `True`
- `↳ change-layout-body` (INSTANCE_SWAP), default `18841:12539`
- `severity` (VARIANT): info | success | warning | danger, default `info`
- `toast` (VARIANT): true | false, default `false`
- `timer` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraMessageSeverity` | именование совпадает; значения: info \| success \| warning \| danger; дефолт совпадает: `info` |

### _Message.ButtonClose  ·  Figma nodeId `15957:3338`  ·  🔴 Deprecated  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15957-3338)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — (нет во Figma) | свободный | `<ng-content>` |

#### Для дизайнеров (Figma API)

- `severity` (VARIANT): success | warn | danger | info, default `info`
- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| `severity` (Figma) ↔ `severity` (Angular) | enum / `ExtraMessageSeverity` | именование совпадает; значения: success \| warn \| danger \| info; дефолт совпадает: `info` |
