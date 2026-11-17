---
component: ExtraFileUpload
selector: extra-fileupload
import:
  symbol: ExtraFileUploadComponent
  from: '@cdek-it/angular-ui-kit/components/fileupload'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<FileUpload>'
status: stable
updated: '2026-11-18'
---

# FileUpload

Live Figma UI Kit DS v3.0: наборы `FileUpload`, `Drag-and-Drop`, `File`, `ImagePreview`.

| Figma | API | Геометрия |
|---|---|---|
| `FileUpload` | `mode` (`advanced` / `basic` / `auto`) | Зона дропа, список файлов, прогресс |
| `Drag-and-Drop` | `dragAndDrop` | Перетаскивание файлов |
| `File` | `labels`, `messages` | Подписи и сообщения статусов |
| `ImagePreview` | `accept` | Превью изображений |
| ограничения | `maxFileSize`, `fileLimit` | Лимиты размера и количества |
| доступность | `ariaLabel`, `ariaLabelledBy`, `tabindex`, `autofocus`, `required` | Атрибуты доступности |

## Ограничения

- Story `WithForm` снята: её сниппет — форма, HTML-кодом не описывается.
- События (`onSelect`, `onRemove`, `onClear`, `onError`, `onUpload`) остаются без Controls — это выходы, а не входы.

Описания story и Controls скопированы из `origin/main` дословно.
