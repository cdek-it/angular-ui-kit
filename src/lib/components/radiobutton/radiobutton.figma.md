---
component: ExtraRadiobutton
selector: extra-radiobutton
import:
  symbol: ExtraRadiobuttonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '17:13535'
  name: '<RadioButton>'
status: stable
updated: '2026-11-17'
---

## Модель и состояния

`ExtraRadiobuttonComponent` оборачивает PrimeNG RadioButton и реализует ControlValueAccessor. Значение опции задаётся через `value`; выбранное значение группы — через `[(ngModel)]`, `formControl` или `formControlName`. Несколько радиокнопок используют общее значение формы и одинаковый `name`. Разные группы используют разные имена и модели.

| Figma                      | Angular                                     |
| -------------------------- | ------------------------------------------- |
| `checked`                  | Значение формы совпадает с `value`          |
| `state=disabled`           | Отключённый FormControl                     |
| `state=danger`             | Невалидный контрол после touched или dirty  |
| `state=hover/focus`        | Наведение / клавиатурный фокус              |
| `text-label`, `show-label` | `label`; пустая строка скрывает подпись     |
| `show-caption`             | `caption`; пустая строка скрывает пояснение |

Все десять входов и три события перечислены в [API](../../../../docs/components-api/radiobutton.md). `disabled` и `invalid` определяются формой. Размер и readonly не входят в API обёртки.

```html
<extra-radiobutton
  [formControl]="delivery"
  name="delivery"
  value="pickup"
  label="Самовывоз"
  caption="Заберите заказ в пункте выдачи"
  (onClick)="onDeliveryClick($event)"
></extra-radiobutton>
```

`required` проверяет наличие выбранного значения через `Validators.required`. Внешние изменения формы обновляют OnPush-представление; `valueChanges` синхронизирует соседние элементы общего контрола. Blur отмечает контрол touched и вызывает `onBlur`; выбор вызывает `onClick` с `{ value, originalEvent }`, фокус — `onFocus`.

## Геометрия и токены

Проверены десять вариантов (default, hover, focus, disabled, danger × checked false/true) в светлой и тёмной темах. Индикатор 24×24, точка 12×12, gap 10, верхний отступ текстового блока 2. Label Noto Sans Regular 14/20, общий Caption 14/14. Focus и danger используют единственное внешнее кольцо 2 без рамки; скрытая внутренняя тень из Figma не воспроизводится.

Дубли `root.focusRing`/`focusRing` и `root.sm`/`sm`, `root.lg`/`lg` устранены в пользу единственного пути под root. Размер sm сохранён 16 по прежней реализации; значение 8 из конфликтующего токена не применяется. В API обёртки size отсутствует. Выбранная точка инвертирует цвет в тёмной теме, hover использует active-токены из live Figma.

С подписью `label` и Caption общая ширина браузера около 98,7 px против 100 в Figma из-за метрик шрифта и иконки общего Caption. Размеры индикатора, отступы и высота совпадают; ширина остаётся по содержимому.

## Доступность

Уникальный input id связывает label и поле, `aria-describedby` связывает Caption. Без label доступное имя по умолчанию — «Выбор»; `ariaLabel` и `ariaLabelledBy` позволяют заменить его. Disabled исключает поле из Tab-порядка и не получает autofocus. Доступное поле поддерживает autofocus и tabindex.
