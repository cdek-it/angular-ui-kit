[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5983&m=dev)

# ExtraDatePicker

| Свойство         | Описание                                                                | Типизация                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------- |
| `placeholder`    | текст подсказки внутри поля                                             | `string`                   |
| `label`          | текст названия поля                                                     | `string`                   |
| `labelPosition`  | положение лейбла                                                        | `left \| top \| float`      |
| `view`           | режим отображения календаря                                             | `day \| month \| year \| time` |
| `selectionMode`  | режим выбора даты                                                       | `single \| multiple \| range` |
| `showTime`       | включить выбор времени (значение времени в поле + timepicker в календаре) | `boolean`                  |
| `inline`         | отображать календарь встроенно, без поля ввода                          | `boolean`                  |
| `showButtonBar`  | отображать блок с кнопками (Сегодня / Очистить)                         | `boolean`                  |
| `clearable`      | отображение иконки для очистки поля                                     | `boolean`                  |
| `dateFormat`     | формат отображения даты                                                 | `string`                   |
| `minDate`        | минимальная выбираемая дата                                             | `Date`                     |
| `maxDate`        | максимальная выбираемая дата                                            | `Date`                     |
| `caption`        | текст пояснения под полем                                               | `string`                   |
| `info`           | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                   |
| `size`           | размер поля                                                             | `small \| base \| large \| xlarge` |

# События

| Событие          | Описание                                          | Типизация                                    |
| ---------------- | ------------------------------------------------- | -------------------------------------------- |
| `input`          | срабатывает при ручном вводе значения в поле      | `(event: Event) => void`                     |
| `select`         | срабатывает при выборе даты в календаре           | `(value: Date) => void`                      |
| `clear`          | срабатывает при очистке значения                  | `() => void`                                 |
| `show`           | срабатывает при открытии календаря                | `() => void`                                 |
| `hide`           | срабатывает при закрытии календаря                | `() => void`                                 |
| `monthChange`    | срабатывает при смене месяца                      | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `yearChange`     | срабатывает при смене года                        | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `todayClick`     | срабатывает при клике по кнопке «Сегодня»         | `(value: Date) => void`                      |
| `clearClick`     | срабатывает при клике по кнопке «Очистить»        | `() => void`                                 |

# ExtraDatePickerViewChangeEvent

Событие смены месяца/года, передаётся в `monthChange` и `yearChange`.

| Свойство | Описание        | Типизация |
| -------- | --------------- | --------- |
| `month`  | выбранный месяц | `number`  |
| `year`   | выбранный год   | `number`  |
