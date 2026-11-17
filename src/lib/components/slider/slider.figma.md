---
component: ExtraSlider
selector: extra-slider
import:
  symbol: ExtraSliderComponent
  from: '@cdek-it/angular-ui-kit/components/slider'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '383:1844'
  name: '<Slider>'
status: stable
updated: '2026-11-17'
---

# Slider

Live Figma UI Kit DS v3.0: страница Slider 📱, набор `383:1844` — 6 вариантов (`state` default/hover/disabled × `range` true/false).

| Figma | API | Геометрия |
|---|---|---|
| `state=default` | значение через CVA | Шкала 4 px, радиус 12; бегунок 20×20 с точкой 12×12 |
| `state=hover` | указатель над бегунком | Точка сливается с бегунком (цвет `hoverBackground`) |
| `state=disabled` | `FormControl.disable()` | Прозрачность 0.5 на компоненте, бегунок вне Tab, курсор `default` |
| `range=false` | `value: number` | Один бегунок и один заполненный отрезок |
| `range=true` | `value: number[]` | Два бегунка и отрезок между ними |
| `min` / `max` | `min` / `max` | Границы уходят в `aria-valuemin`/`aria-valuemax` |

Цвета: шкала `track.background`, заполнение `range.background`, бегунок `handle.background`, точка `colorScheme.*.handle.content.background`;
на hover точка получает `handle.content.hoverBackground` (в обеих темах совпадает с цветом бегунка). Focus ring — 2 px solid `color.border.focus`
через outline, как в остальных компонентах кита.

## Отличия и ограничения

- В Figma нет оси `orientation`: вертикальный слайдер — расширение кита, высота задаётся на хосте `<extra-slider>` (в story 200 px).
- В Figma нет `step` и `animate`: это свойства поведения, проверяются матрицей API-TESTS.md.
- `aria-valuenow` в режиме range PrimeNG не проставляет — компонент дополняет его сам.
- `tabindex`/`autofocus` пробрасываются PrimeNG напрямую; при `disabled` бегунок получает `tabindex=null` и выпадает из Tab.
- Внешняя программная запись (`formControl.setValue`) обновляет бегунок, но не эмитит `onChange` — событие только на действие пользователя.

Четыре исходных example-файла сохранены (Range, Step, Vertical, Disabled), декоративные подложки сняты; story `Step` заменена Controls.
Описания stories и Controls скопированы дословно из `origin/main`.
