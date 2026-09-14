[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5675&m=dev)

# ExtraInputNumber

> ✅ **Реализован**: `ExtraInputNumberComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство              | Описание                                                                                  | Типизация                           |
| --------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------- |
| `placeholder`         | текст подсказки внутри поля                                                               | `string`                            |
| `label`               | текст названия поля                                                                       | `string`                            |
| `labelPosition`       | положение лейбла                                                                          | `top \| left`                       |
| `floatLabel`          | плавающий лейбл внутри поля (недоступен вместе с `showButtons`)                           | `boolean`                           |
| `showButtons`         | отображение кнопок для увеличения/уменьшения значения (недоступно при `floatLabel: true`) | `boolean`                           |
| `min`                 | минимальное допустимое значение                                                           | `number`                            |
| `max`                 | максимальное допустимое значение                                                          | `number`                            |
| `step`                | шаг изменения значения (кнопками `showButtons`)                                           | `number`                            |
| `prefix`              | текст перед значением внутри поля                                                         | `string`                            |
| `suffix`              | текст после значения внутри поля                                                          | `string`                            |
| `clearable`           | отображение иконки для очистки поля                                                       | `boolean`                           |
| `caption`             | текст пояснения под полем                                                                 | `string`                            |
| `info`                | текст с доп. информацией (показывается в тултипе иконки ti-info-circle)                   | `string`                            |
| `size`                | размер поля                                                                               | `small \| base \| large \| xlarge`  |
| `readonly`            | только для чтения                                                                         | `boolean`                           |
| `fluid`               | растягивает поле на всю ширину контейнера                                                 | `boolean`                           |
| `mode`                | режим форматирования числа                                                                | `decimal \| currency`               |
| `currency`            | код валюты (ISO 4217), используется при `mode: currency`                                  | `string`                            |
| `locale`              | локаль форматирования числа                                                               | `string`                            |
| `useGrouping`         | группировка разрядов (разделитель тысяч)                                                  | `boolean`                           |
| `minFractionDigits`   | минимальное число знаков после запятой                                                    | `number`                            |
| `maxFractionDigits`   | максимальное число знаков после запятой                                                   | `number`                            |
| `buttonLayout`        | расположение кнопок `showButtons`                                                         | `stacked \| horizontal \| vertical` |
| `incrementButtonIcon` | CSS-класс иконки кнопки увеличения                                                        | `string`                            |
| `decrementButtonIcon` | CSS-класс иконки кнопки уменьшения                                                        | `string`                            |

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
