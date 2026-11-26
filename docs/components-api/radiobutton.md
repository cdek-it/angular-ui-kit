[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=17-13535&m=dev)

# ExtraRadioButton

> ✅ **Реализован**: `ExtraRadiobuttonComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство         | Описание                                         | Типизация       | По умолчанию |
| ---------------- | ------------------------------------------------ | --------------- | ------------ |
| `label`          | текст названия                                   | `string`        | `''`         |
| `labelPosition`  | положение лейбла                                 | `left \| right` | `right`      |
| `caption`        | текст пояснения под лейблом                      | `string`        | `''`         |
| `value`          | значение опции                                   | `any`           | `null`       |
| `required`       | поле обязательно для заполнения                  | `boolean`       | `false`      |
| `name`           | имя группы радиокнопок (нативный атрибут `name`) | `string`        | —            |
| `ariaLabel`      | метка для программ экранного доступа             | `string`        | —            |
| `ariaLabelledBy` | `id` внешнего элемента-метки для доступности     | `string`        | —            |
| `autofocus`      | автофокус при монтировании компонента            | `boolean`       | `false`      |
| `tabindex`       | порядок перехода по Tab                          | `number`        | —            |

# Стекозависимые пропсы

| Описание                                                   | Angular                                         | Vue          | React   | Типизация | По умолчанию |
| ---------------------------------------------------------- | ----------------------------------------------- | ------------ | ------- | --------- | ------------ |
| значение группы: совпадает с `value` выбранной радиокнопки | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `any`     | `null`       |

# События

| Событие   | Описание                         | Типизация                                     |
| --------- | -------------------------------- | --------------------------------------------- |
| `onClick` | срабатывает при выборе опции     | `(event: ExtraRadioButtonClickEvent) => void` |
| `onFocus` | срабатывает при получении фокуса | `(event: Event) => void`                      |
| `onBlur`  | срабатывает при потере фокуса    | `(event: Event) => void`                      |

# ExtraRadioButtonClickEvent

| Свойство        | Описание         | Типизация |
| --------------- | ---------------- | --------- |
| `value`         | значение опции   | `any`     |
| `originalEvent` | исходное событие | `Event`   |

## Формы и доступность

`value` — значение опции любого типа, модель формы — выбранное значение группы. Для взаимоисключающего выбора задайте общий `name` и общий FormControl либо ngModel. Независимые группы должны иметь разные имена и модели.

`disabled` управляется через FormControl. Невалидность отображается после touched или dirty; `[required]="true"` проверяет `Validators.required`. Blur отмечает контрол touched и вызывает `onBlur`. Caption отображается общим `ExtraCaptionComponent` и связан с input через `aria-describedby`. Без label доступное имя по умолчанию — «Выбор».

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
