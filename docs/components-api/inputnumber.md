[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5675&m=dev)

# ExtraInputNumber

> ✅ **Реализован**: `ExtraInputNumberComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство              | Описание                                                                                  | Типизация                           | По умолчанию |
| --------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------- | ------------ |
| `placeholder`         | текст подсказки внутри поля                                                               | `string`                            | `''`         |
| `label`               | текст названия поля                                                                       | `string`                            | `''`         |
| `labelPosition`       | положение лейбла                                                                          | `top \| left`                       | `top`        |
| `floatLabel`          | плавающий лейбл внутри поля (недоступен вместе с `showButtons`)                           | `boolean`                           | `false`      |
| `showButtons`         | отображение кнопок для увеличения/уменьшения значения (недоступно при `floatLabel: true`) | `boolean`                           | `false`      |
| `min`                 | минимальное допустимое значение                                                           | `number`                            | —            |
| `max`                 | максимальное допустимое значение                                                          | `number`                            | —            |
| `step`                | шаг изменения значения (кнопками `showButtons`)                                           | `number`                            | `1`          |
| `prefix`              | текст перед значением внутри поля                                                         | `string`                            | —            |
| `suffix`              | текст после значения внутри поля                                                          | `string`                            | —            |
| `clearable`           | отображение иконки для очистки поля                                                       | `boolean`                           | `false`      |
| `caption`             | текст пояснения под полем                                                                 | `string`                            | `''`         |
| `info`                | текст с доп. информацией (показывается в тултипе иконки ti-info-circle)                   | `string`                            | `''`         |
| `size`                | размер поля                                                                               | `small \| base \| large \| xlarge`  | `base`       |
| `readonly`            | только для чтения                                                                         | `boolean`                           | `false`      |
| `required`            | поле обязательно для заполнения                                                           | `boolean`                           | `false`      |
| `fluid`               | растягивает поле на всю ширину контейнера                                                 | `boolean`                           | `false`      |
| `mode`                | режим форматирования числа                                                                | `decimal \| currency`               | `decimal`    |
| `currency`            | код валюты (ISO 4217), используется при `mode: currency`                                  | `string`                            | —            |
| `locale`              | локаль форматирования числа                                                               | `string`                            | —            |
| `useGrouping`         | группировка разрядов (разделитель тысяч)                                                  | `boolean`                           | `true`       |
| `minFractionDigits`   | минимальное число знаков после запятой                                                    | `number`                            | —            |
| `maxFractionDigits`   | максимальное число знаков после запятой                                                   | `number`                            | —            |
| `buttonLayout`        | расположение кнопок `showButtons`                                                         | `stacked \| horizontal \| vertical` | `stacked`    |
| `incrementButtonIcon` | CSS-класс иконки кнопки увеличения                                                        | `string`                            | —            |
| `decrementButtonIcon` | CSS-класс иконки кнопки уменьшения                                                        | `string`                            | —            |
| `name`                | имя поля (нативный атрибут `name`); используется браузером для автозаполнения             | `string`                            | —            |
| `autocomplete`        | значение нативного атрибута `autocomplete`                                                | `string`                            | —            |
| `ariaLabel`           | метка для программ экранного доступа                                                      | `string`                            | —            |
| `ariaLabelledBy`      | `id` внешнего элемента-метки для доступности                                              | `string`                            | —            |
| `autofocus`           | автофокус при монтировании компонента                                                     | `boolean`                           | `false`      |
| `tabindex`            | порядок перехода по Tab                                                                   | `number`                            | —            |

# Стекозависимые пропсы

| Описание      | Angular                                         | Vue          | React   | Типизация | По умолчанию |
| ------------- | ----------------------------------------------- | ------------ | ------- | --------- | ------------ |
| значение поля | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `number`  | `null`       |

# События

| Событие | Описание                         | Типизация                                     |
| ------- | -------------------------------- | --------------------------------------------- |
| `input` | срабатывает при вводе значения   | `(event: ExtraInputNumberInputEvent) => void` |
| `clear` | срабатывает при очистке значения | `() => void`                                  |

# ExtraInputNumberInputEvent

Событие ввода значения, передаётся в `input`.

| Свойство         | Описание                   | Типизация        |
| ---------------- | -------------------------- | ---------------- |
| `value`          | введённое значение         | `number \| null` |
| `formattedValue` | отформатированное значение | `string`         |
| `originalEvent`  | исходное событие           | `Event`          |
