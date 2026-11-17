---
component: ExtraTimeline
selector: extra-timeline
import:
  symbol: ExtraTimelineComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Timeline>'
status: stable
updated: '2026-11-17'
---

# Timeline

Live Figma UI Kit DS v3.0: четыре набора — `Timeline` (ось `layout` horizontal/vertical, слот `<Slot.Content>`),
`Timeline.ItemHorizontal` (оси `align` opposite/top/bottom и `line` true/false, props `show-caption`),
`Timeline.ItemVertical` (оси `align` opposite/left/right и `line`), `Timeline.Marker` (оси `color` и `icon`).

| Figma                   | API                                              | Геометрия                                                                                    |
| ----------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `Timeline.layout`       | `layout="vertical" \| "horizontal"`              | Вертикальная/горизонтальная раскладка, паддинги контента 0/20 и 20/0                         |
| `Item*.align`           | `align`                                          | `left`/`right`/`top`/`bottom`/`opposite`; `opposite` показывает слот `extraTimelineOpposite` |
| `Item*.line=true/false` | `line="solid" \| "dashed" \| "dotted" \| "none"` | Стиль коннектора через `data-line` на хосте                                                  |
| `Item.show-caption`     | `showCaption`                                    | Подпись события (`<small>`)                                                                  |
| `Marker.color`          | `markerColor`                                    | CSS-переменная `--timeline-marker-color`: цвет рамки и иконки                                |
| `Marker.icon`           | `icon`                                           | Класс иконки Tabler в маркере                                                                |
| слот маркера            | `extraTimelineMarker`                            | Полностью кастомный маркер                                                                   |

## Отличия и ограничения

- В Figma `line` — булево (линия есть/нет); в ките расширено до `solid/dashed/dotted/none`.
- `markerColor` красит рамку и иконку маркера, а не фон: фон задан токеном `timeline.eventMarker.background`.
- Токены `timeline.horizontal/vertical.eventContent.padding` проверены — совпадают с Figma (только ссылки, значения те же).

## Найденный дефект

CSS-правила стиля линии и кастомного цвета маркера были написаны селектором `timeline[...]`, тогда как селектор
компонента — `extra-timeline`. Из-за этого `line="dashed"/"dotted"/"none"` и `markerColor` не применялись.
Селекторы исправлены на `extra-timeline[...]`; проверено матрицей API-TESTS (dashed = пунктир, markerColor = цвет рамки).

Описания всех 7 story и Controls скопированы из `origin/main` дословно.
