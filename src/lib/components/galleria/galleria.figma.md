---
component: ExtraGalleria
selector: extra-galleria
import:
  symbol: ExtraGalleriaComponent
  from: '@cdek-it/angular-ui-kit/components/galleria'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Galleria>'
status: stable
updated: '2026-11-18'
---

# Galleria

Live Figma UI Kit DS v3.0: наборы `Galleria`, `Galleria.Indicator`, `NavigatorButton`, `ThumbnailButton`, `ThumbnailImage`.

| Figma | API | Геометрия |
|---|---|---|
| галерея | `value` (изображения) | Полноэкранный просмотр, миниатюры |
| `caption` | `showCaption` | Подпись на полупрозрачной подложке `bg.surface.backdrop` |
| `Indicator` | `showIndicators` | Точки; focus ring кольцом 2 px |
| навигация | `showNavigators`, `circular` | Кнопки пред./след., миниатюры |
| автопрокрутка | `autoplayInterval` | Интервал в мс |
| fullScreen | `fullScreen` | Открытие на весь экран |

## Ограничения

- Компонент рендерится скрытым до открытия просмотра, поэтому `check-stories-source` не может сопоставить сниппет с UI
  (та же структурная особенность, что у toast и menu `Popup`).
- `check-stories-controls`: `containerStyle` и `responsiveOptions` объявлены как скрытые (`table.disable`) —
  нужно найти источник (вероятно, story-level `argTypes`) и раскрыть.

Описания story и Controls скопированы из `origin/main` дословно.
