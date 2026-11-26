---
component: ExtraCheckbox
selector: extra-checkbox
import:
  symbol: ExtraCheckboxComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '16:13529'
  name: '<Checkbox>'
status: stable
updated: '2026-11-17'
---

## Модель и состояния

`ExtraCheckboxComponent` оборачивает бинарный PrimeNG Checkbox. Значение — `boolean`, передаётся через `[(ngModel)]`, `formControl` или `formControlName`. Изменение пользователем вызывает `onChange` с `{ checked, originalEvent }`.

| Figma                      | Angular                                     |
| -------------------------- | ------------------------------------------- |
| `checked`                  | Значение формы                              |
| `indeterminate`            | `[indeterminate]`                           |
| `state=disabled`           | Отключённый FormControl                     |
| `state=danger`             | Невалидный контрол после touched или dirty  |
| `state=hover/focus`        | Наведение / клавиатурный фокус              |
| `show-label`, `label-text` | `label`; пустая строка скрывает подпись     |
| `show-caption`             | `caption`; пустая строка скрывает пояснение |

Все десять входов перечислены в [API](../../../../docs/components-api/checkbox.md). `disabled` и `invalid` определяются формой; `binary`, `value`, `size`, `variant` и `checkboxIcon` не входят в API обёртки.

## Пример

```html
<extra-checkbox
  [formControl]="acceptControl"
  label="Согласен с условиями"
  caption="Подтвердите согласие"
  [required]="true"
  (onChange)="onAcceptChange($event)"
></extra-checkbox>
```

`required` использует `Validators.requiredTrue`. Отключение задаётся при создании контрола или через `control.disable()`. `readonly` оставляет элемент доступным для фокуса, запрещая изменение значения. Blur отмечает контрол touched. `autofocus` применяется после рендера к доступному полю.

## Геометрия и иконки

Проверены 15 вариантов в каждой теме: default, hover, focus, disabled, danger для пустого, отмеченного и неопределённого состояния. Квадрат 24×24, радиус 8, расстояние до подписи 12, верхний отступ текста 2, label 14/20. Caption использует общий `ExtraCaptionComponent` с типографикой 14/14. При фокусе и ошибке рамка заменяется внешним кольцом 2.

Галочка и минус — glyphs Tabler Icons размером 16. Сохранено решение [PR #190](https://github.com/cdek-it/angular-ui-kit/pull/190): встроенный SVG скрывается, glyph выбирается по фактической SVG-иконке PrimeNG. Это также работает для вложенных PrimeNG Checkbox. Пользовательские шаблоны иконок не заменяются.

Общая ширина при `label="label"`, `caption="Caption"` около 100,7 px против 102 в Figma: разница возникает в метриках текста и шрифтовой иконки общего Caption. Ширина остаётся по содержимому, чтобы поддерживать произвольные подписи.

## Доступность

Label связан с внутренним input уникальным id. Caption подключён через `aria-describedby`. Без label используется доступное имя «Выбор», которое можно заменить через `ariaLabel` или `ariaLabelledBy`. Отключённое поле исключается из Tab-порядка; `tabindex` применяется к доступному полю.
