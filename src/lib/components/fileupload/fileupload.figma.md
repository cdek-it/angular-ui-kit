---
component: ExtraFileUpload
selector: extra-fileupload
import:
  symbol: ExtraFileUploadComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '24068:112138'
  name: '<FileUpload> API'
status: stable
updated: '2026-09-29'
---

## Overview

`ExtraFileUpload` — загрузчик файлов с drag-and-drop, очередью, прогресс-баром на пачку и
предпросмотром. Оборачивает PrimeNG `p-fileupload` в режиме `advanced`+`customUpload`: реальный
HTTP-запрос компонент не делает, отправку выполняет вызывающее приложение через событие `upload`
(`uploadHandler` PrimeNG). Композирует DS-компоненты `ExtraBadge` (статус строки файла),
`ExtraMessage` (ошибки валидации и сообщение об успехе) и `ExtraProgressBar` (общий прогресс
пачки) — их собственный API не выносится на `ExtraFileUpload`, см. `docs/components-api/fileupload.md`.

Соответствует Figma-компоненту `<FileUpload>`; полная API-таблица — на фрейме `<FileUpload> API`
(nodeId `24068:112138`), живые примеры состояний — на фрейме «FileUpload — живые примеры»
(nodeId `24805:11571`).

`componentKey` не указан: аккаунт, на котором работал агент, не имеет прав Dev/Full seat на
Organization/Enterprise-плане, необходимых для Code Connect API Figma — значение недоступно для
выгрузки, а не забыто.

## Props mapping

| Свойство      | Тип                              | По умолчанию | Описание |
|---------------|-----------------------------------|--------------|----------|
| `mode`        | `'auto' \| 'manual' \| 'basic'`   | `'manual'`   | Композитное поле кода — в Figma нет единого variant-свойства `mode`; в макете это комбинация независимых булевых слоёв `show-header`/`show-body`/`show-message`/`show-progress-bar`/`show-button-send` из API-таблицы. `manual` показывает кнопку «Отправить» (`show-button-send=true`), `auto` — нет (отправка сразу после выбора), `basic` — только кнопка выбора, без зоны дропа/списка/прогресса (`show-body=false`) |
| `dragAndDrop` | `boolean`                          | `true`       | Соответствует Figma-свойству `drag-and-drop`. `true` — зона дропа рисуется **внутри** `p-fileupload-content` (нативный `#content`-враппер PrimeNG), чтобы получить встроенную подсветку `.p-fileupload-highlight` на `dragenter`/`dragover`, без своих обработчиков. `false` — в шапке вместо зоны только кнопка «Выбрать файл», вне `#content`, поэтому drag-and-drop над ней не реагирует (осознанное отключение, а не баг) |
| `labels`      | `Labels`                           | см. спеку    | Сгруппированные статические тексты (`dropzoneTitle`/`dropzoneCaption`/`chooseButton`/`uploadButton`/`cancelButton`); в Figma текстовые слои внутри `<🚧FileUpload.Drag-and-Drop>` и кнопок |
| `messages`    | `Messages`                        | см. спеку    | Шаблоны текста ошибок валидации (`invalidFileSize`/`invalidFileType`/`invalidFileLimit`), прокидываются в одноимённые `invalid*MessageSummary/Detail` PrimeNG |
| `uploadError` | `string \| null`                   | `null`       | Сообщение об ошибке реальной отправки (nodeId `24805:58632`, «Повтор после сбоя отправки»). Рисуется компонентом на том же месте, что и success-сообщение — сразу после зоны дропа/прогресса, перед списком файлов; выставляет и сбрасывает его приложение (компонент никогда не устанавливает его сам, т.к. всегда работает в `customUpload` и не видит результат реального запроса) |

Остальные свойства (`name`, `multiple`, `accept`, `maxFileSize`, `fileLimit`, `url`) — 1:1 с
PrimeNG, без переименований.

## Вложенные компоненты и статус файла

Каждый файл в очереди хранится как `{ file, status: 'pending'|'uploading'|'success'|'error' }`
(тип `UploadFile` в спеке). Строка рендерит `<extra-badge>` рядом с именем/размером:

| `status`              | `severity` бейджа | Текст       |
|------------------------|-------------------|-------------|
| `pending` / `uploading` | `info`            | «Ожидает»   |
| `success`               | `success`         | «Загружено» |
| `error`                 | `danger`          | «Ошибка»    |

Вся пачка `pending`-файлов переходит в `uploading` одним махом по клику «Отправить»
(`mode='manual'`) или автоматически (`mode='auto'`) — соответствует Figma-аннотации «Все выбранные
файлы уходят одним XHR, поэтому ProgressBar показывает процент всей отправки, а не отдельного
файла» (фрейм «Идёт загрузка», nodeId `24805:56172`).

## Известные ограничения кита (не реализуются)

Задокументированы прямо на фрейме «FileUpload — живые примеры» как варианты, для которых нет
рабочего аналога — сознательно не реализованы, а не забыты:

- **Событие `error`** объявлено по спеке и подключено к PrimeNG `onError`, но поскольку компонент
  всегда работает в `customUpload`, встроенный HTTP-путь PrimeNG, который единственный эмитит
  `onError`, никогда не выполняется — у этого события нет живого триггера. Показ самой ошибки
  реальной отправки при этом **поддержан** через `uploadError` (см. Props mapping выше) — приложение
  ловит сбой своего HTTP-вызова и передаёт текст через проп, а не эмитит его само.
- **Пофайловый прогресс и повтор строки** (nodeId `24805:59170`) — `<🚧FileUpload.File>` даёт
  только бейдж и кнопку удаления, полосы прогресса или кнопки повтора на уровне строки в ките нет.
- **Молча отброшенный дубликат** (nodeId `24805:59173`) — дедупликация по `name+type+size`
  (родная логика PrimeNG `isFileSelected`) не сопровождается никаким сообщением в UI.

## Do / Don't

```html
<!-- ✓ Зона дропа + ручная отправка (по умолчанию) -->
<extra-fileupload [multiple]="true" [maxFileSize]="1000000"></extra-fileupload>

<!-- ✓ Без зоны дропа — только кнопка выбора -->
<extra-fileupload [dragAndDrop]="false"></extra-fileupload>

<!-- ✓ Basic: одна кнопка, приложение само рисует список/статусы -->
<extra-fileupload mode="basic" (onSelect)="handleFiles($event)"></extra-fileupload>

<!-- ✗ Не читать статус загрузки из PrimeNG-типов напрямую — только через ExtraFileUploadFile -->
```
