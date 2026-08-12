[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24068-112138&m=dev)

# FileUpload

## Свойства

| Свойство       | Описание                                                        | Типизация                          |
| -------------- | -------------------------------------------------------------- | ---------------------------------- |
| `name`         | имя поля отправляемой формы                                    | `string`                           |
| `multiple`     | разрешить выбор нескольких файлов                              | `boolean`                          |
| `accept`       | допустимые типы файлов (MIME или расширения через запятую)     | `string`                           |
| `maxFileSize`  | максимальный размер одного файла в байтах                      | `number`                           |
| `fileLimit`    | максимальное количество файлов                                 | `number \| undefined`              |
| `dragAndDrop`  | включить область drag-and-drop                                 | `boolean`                          |
| `mode`         | режим загрузки; кнопка «Отправить» видна только в `manual`     | `'auto' \| 'manual' \| 'basic'`    |
| `url`          | endpoint загрузки (если компонент сам выполняет запрос)        | `string`                           |
| `labels`       | статические тексты интерфейса (сгруппированы)                  | `Labels`                           |
| `messages`     | шаблоны сообщений об ошибках (сгруппированы, заменяют 6 полей) | `Messages`                         |

## События

| Событие         | Описание                                             | Типизация                                 |
| --------------- | ---------------------------------------------------- | ----------------------------------------- |
| `onSelect`      | срабатывает при выборе файлов                        | `(event: FileSelectEvent) => void`        |
| `onRemove`      | срабатывает при удалении файла из списка             | `(event: FileRemoveEvent) => void`        |
| `onClear`       | срабатывает при очистке всего списка                 | `() => void`                              |
| `onUpload`      | срабатывает при отправке файлов (кастомная загрузка) | `(event: FileUploadHandlerEvent) => void` |
| `onError`       | срабатывает при ошибке загрузки                      | `(event: FileUploadErrorEvent) => void`   |

## Вложенные компоненты (делегирование)

Обёртка композирует существующие DS-компоненты и использует их **родной API** из их
собственной документации. Пропсы вложенных компонентов на `FileUpload` **не выносятся**.

| Вложенный (Figma)              | DS-компонент       | Документация                      | Кто управляет                                      |
| ------------------------------ | ------------------ | --------------------------------- | -------------------------------------------------- |
| `<Badge>` (статус файла)       | `ExtraBadge`       | [badge.md](./badge.md)            | внутренне, `severity`/`value` из статуса файла ⚠️  |
| `<Message>` (ошибки / успех)   | `ExtraMessage`     | [message.md](./message.md)        | внутренне, текст из `messages`, severity из состояния |
| `<ProgressBar>` (загрузка)     | `ExtraProgressBar` | [progressbar.md](./progressbar.md)| внутренне, `value` из прогресса, `show-value` off  |
| `<Button.Base/Danger>`         | `ExtraButton`      | ❗ нет `button.md`                 | внутренне, фикс. конфиг; тексты через `labels`     |

## Типы

```ts
// Статические локализуемые строки
interface Labels {
  dropzoneTitle?: string;
  dropzoneCaption?: string;   // подпись под заголовком
  chooseButton?: string;      // текст кнопки выбора
  uploadButton?: string;      // текст кнопки отправки (mode = 'manual')
  cancelButton?: string;      // текст кнопки очистки
}

// Шаблоны ошибок. `{0}` — токен подстановки (имя файла, лимит, …).
// Наличие записи управляет показом Message
interface Messages {
  invalidFileSize?:  { summary: string; detail: string }; // {0}=имя / {0}=макс. размер
  invalidFileType?:  { summary: string; detail: string }; // {0}=имя / {0}=типы
  invalidFileLimit?: { summary: string; detail: string }; // {0}=макс. количество
}

// Модель одного файла.
interface UploadFile {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;      // 0–100 → ExtraProgressBar.value;
  errorMessage?: string;  // наличие → рендер ExtraMessage;
}
```

## FileSelectEvent

Событие выбора файлов, передаётся в `onSelect`.

| Свойство        | Описание                       | Типизация |
| --------------- | ------------------------------ | --------- |
| `files`         | выбранные файлы                | `File[]`  |
| `currentFiles`  | все файлы, готовые к загрузке  | `File[]`  |
| `originalEvent` | исходное браузерное событие    | `Event`   |

## FileRemoveEvent

Событие удаления файла, передаётся в `onRemove`.

| Свойство        | Описание                    | Типизация |
| --------------- | --------------------------- | --------- |
| `file`          | удаляемый файл              | `File`    |
| `originalEvent` | исходное браузерное событие | `Event`   |

## FileUploadHandlerEvent

Событие отправки файлов в режиме кастомной загрузки, передаётся в `onUpload`.

| Свойство | Описание                | Типизация |
| -------- | ----------------------- | --------- |
| `files`  | список выбранных файлов | `File[]`  |

## FileUploadErrorEvent

Событие ошибки загрузки, передаётся в `onError`.

| Свойство | Описание                | Типизация    |
| -------- | ----------------------- | ------------ |
| `files`  | список выбранных файлов | `File[]`     |
| `error`  | объект ошибки           | `ErrorEvent` |
