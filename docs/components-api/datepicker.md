[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5983&m=dev)

# ExtraDatePicker

| Свойство         | Описание                                                                | Типизация                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------- |
| `placeholder`    | текст подсказки внутри поля                                             | `string`                   |
| `label`          | текст названия поля                                                     | `string`                   |
| `label-position` | положение лейбла                                                        | `default \| float \| left` |
| `view`           | режим отображения календаря                                             | `day \| month \| year \| time` |
| `selection-mode` | режим выбора даты                                                       | `single \| multiple \| range` |
| `show-time`      | включить выбор времени (значение времени в поле + timepicker в календаре) | `boolean`                  |
| `inline`         | отображать календарь встроенно, без поля ввода                          | `boolean`                  |
| `show-button-bar`| отображать блок с кнопками (Сегодня / Очистить)                         | `boolean`                  |
| `clearable`      | отображение иконки для очистки поля                                     | `boolean`                  |
| `date-format`    | формат отображения даты                                                 | `string`                   |
| `min-date`       | минимальная выбираемая дата                                             | `Date`                     |
| `max-date`       | максимальная выбираемая дата                                            | `Date`                     |
| `caption`        | текст пояснения под полем                                               | `string`                   |
| `info`           | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                   |
| `size`           | размер поля                                                             | `sm \| base \| lg \| xlg`  |

# События

| Событие          | Описание                                          | Типизация                                    |
| ---------------- | ------------------------------------------------- | -------------------------------------------- |
| `onInput`        | срабатывает при ручном вводе значения в поле      | `(event: Event) => void`                     |
| `onSelect`       | срабатывает при выборе даты в календаре           | `(value: Date) => void`                      |
| `onClear`        | срабатывает при очистке значения                  | `() => void`                                 |
| `onShow`         | срабатывает при открытии календаря                | `() => void`                                 |
| `onClose`        | срабатывает при закрытии календаря                | `() => void`                                 |
| `onMonthChange`  | срабатывает при смене месяца                      | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `onYearChange`   | срабатывает при смене года                        | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `onTodayClick`   | срабатывает при клике по кнопке «Сегодня»         | `(value: Date) => void`                      |
| `onClearClick`   | срабатывает при клике по кнопке «Очистить»        | `() => void`                                 |

# ExtraDatePickerViewChangeEvent

Событие смены месяца/года, передаётся в `onMonthChange` и `onYearChange`.

| Свойство | Описание        | Типизация |
| -------- | --------------- | --------- |
| `month`  | выбранный месяц | `number`  |
| `year`   | выбранный год   | `number`  |
