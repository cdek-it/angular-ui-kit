# fileupload

Angular: `src/lib/components/fileupload` — `ExtraFileUploadComponent`  
Figma-узлов: 3 — [FileUpload](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1185-283), [FileUpload.Drag&Drop](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1353-2520), [Fileupload.File](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15712-82195)

## Для разработчиков (Angular API)

**`ExtraFileUploadComponent`** (`extra-fileupload`, `src/lib/components/fileupload/fileupload.component.ts`)

- Inputs:
  - `@Input() name = 'files[]'`
  - `@Input() url = '/api/upload'`
  - `@Input() multiple = true`
  - `@Input() accept = 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'`
  - `@Input() maxFileSize = 1000000`
  - `@Input() fileLimit: number | undefined = undefined`
  - `@Input() disabled = false`
  - `@Input() dropzoneTitle = 'Чтобы загрузить файлы кликните или перетащите их в эту область'`
  - `@Input() dropzoneCaption = 'Можно загрузить не более 10 файлов размером 1 MB'`
  - `@Input() invalidFileSizeMessageSummary = '{0}: Некорректный размер файла'`
  - `@Input() invalidFileSizeMessageDetail = 'Максимальный размер — {0}'`
  - `@Input() invalidFileTypeMessageSummary = '{0}: Некорректный тип файла'`
  - `@Input() invalidFileTypeMessageDetail = 'Допустимые типы: {0}'`
  - `@Input() invalidFileLimitMessageSummary = 'Превышен лимит файлов'`
  - `@Input() invalidFileLimitMessageDetail = 'Максимум: {0}'`
- Outputs:
  - `@Output() onSelectEvent: FileSelectEvent`
  - `@Output() onRemoveEvent: FileRemoveEvent`
  - `@Output() onClearEvent: void`
  - `@Output() onError: FileUploadErrorEvent`
  - `@Output() onUpload: FileUploadHandlerEvent`

## Соответствие по Figma-узлам

### FileUpload  ·  Figma nodeId `1185:283`  ·  File  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1185-283)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `↳ change-layout-list` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `show-body` (BOOLEAN), default `True`
- `↳ show-message` (BOOLEAN), default `True`
- `↳ change-layout-list` (INSTANCE_SWAP), default `13110:19798`
- `↳ show-info` (BOOLEAN), default `True`
- `↳ show-button-send` (BOOLEAN), default `True`
- `show-header` (BOOLEAN), default `True`
- `show-progress-bar` (BOOLEAN), default `True`
- `drag-and-drop` (VARIANT): false | true, default `false`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### FileUpload.Drag&Drop  ·  Figma nodeId `1353:2520`  ·  File  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=1353-2520)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| `change-icon` (INSTANCE_SWAP) | ограничен (компонент) | ⚠️ отсутствует |

#### Для дизайнеров (Figma API)

- `change-icon` (INSTANCE_SWAP), default `1353:2452`
- `state` (VARIANT): default | hover, default `default`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |

### Fileupload.File  ·  Figma nodeId `15712:82195`  ·  File  ·  [🔗 Figma](https://www.figma.com/design/Khh7arsuXss3ncqy1Dz3OZ/UI-Kit--DS--v2.0?node-id=15712-82195)

#### Слоты → Темплейты

| Слот (Figma) | Тип вложения | Реализация |
|---|---|---|
| — | — | Слотов нет |

#### Для дизайнеров (Figma API)

- `show-divider` (BOOLEAN), default `True`

#### Общие API

| Параметр | Тип | Комментарий |
|---|---|---|
| — | — | Полных совпадений по имени нет — параметры разнесены по разделам выше |
