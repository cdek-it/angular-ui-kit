[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5983&m=dev)

# ExtraDatePicker

| Свойство         | Описание                                                                      | Типизация                          | По умолчанию |
| ---------------- | ----------------------------------------------------------------------------- | ---------------------------------- | ------------ |
| `placeholder`    | текст подсказки внутри поля                                                   | `string`                           | —            |
| `label`          | текст названия поля                                                           | `string`                           | `''`         |
| `labelPosition`  | положение лейбла                                                              | `top \| left`                      | `top`        |
| `floatLabel`     | плавающий лейбл внутри поля (перекрывает `labelPosition`)                     | `boolean`                          | `false`      |
| `view`           | режим отображения календаря                                                   | `day \| month \| year \| time`     | `day`        |
| `selectionMode`  | режим выбора даты                                                             | `single \| multiple \| range`      | `single`     |
| `showTime`       | включить выбор времени (значение времени в поле + timepicker в календаре)     | `boolean`                          | `false`      |
| `inline`         | отображать календарь встроенно, без поля ввода                                | `boolean`                          | `false`      |
| `showButtonBar`  | отображать блок с кнопками (Сегодня / Очистить)                               | `boolean`                          | `false`      |
| `clearable`      | отображение иконки для очистки поля                                           | `boolean`                          | `false`      |
| `dateFormat`     | формат отображения даты                                                       | `string`                           | `'dd.mm.yy'` |
| `minDate`        | минимальная выбираемая дата                                                   | `Date`                             | —            |
| `maxDate`        | максимальная выбираемая дата                                                  | `Date`                             | —            |
| `caption`        | текст пояснения под полем                                                     | `string`                           | `''`         |
| `info`           | текст с доп. информацией (показывается в тултипе иконки ti-info-circle)       | `string`                           | `''`         |
| `size`           | размер поля                                                                   | `small \| base \| large \| xlarge` | `base`       |
| `hourLabel`      | подпись поля часов в блоке времени (по умолчанию «Часы»)                      | `string`                           | `'Часы'`     |
| `minuteLabel`    | подпись поля минут в блоке времени (по умолчанию «Минуты»)                    | `string`                           | `'Минуты'`   |
| `readonly`       | только для чтения                                                             | `boolean`                          | `false`      |
| `required`       | поле обязательно для заполнения                                               | `boolean`                          | `false`      |
| `name`           | имя поля (нативный атрибут `name`); используется браузером для автозаполнения | `string`                           | —            |
| `autocomplete`   | значение нативного атрибута `autocomplete`                                    | `string`                           | —            |
| `ariaLabel`      | метка для программ экранного доступа                                          | `string`                           | —            |
| `ariaLabelledBy` | `id` внешнего элемента-метки для доступности                                  | `string`                           | —            |
| `autofocus`      | автофокус при монтировании компонента                                         | `boolean`                          | `false`      |
| `tabindex`       | порядок перехода по Tab                                                       | `number`                           | —            |

Названия месяцев и дней недели, а также подписи кнопок навигации для скринридера берутся из перевода PrimeNG (`providePrimeNG({ translation })`, `PrimeNG.setTranslation`); по умолчанию `provideExtraThemes()` задаёт русский.

# Стекозависимые пропсы

| Описание                                                         | Angular                                         | Vue          | React   | Типизация        | По умолчанию |
| ---------------------------------------------------------------- | ----------------------------------------------- | ------------ | ------- | ---------------- | ------------ |
| выбранная дата (при `selectionMode` `multiple`/`range` — массив) | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `Date \| Date[]` | `null`       |

# События

| Событие       | Описание                                     | Типизация                                         |
| ------------- | -------------------------------------------- | ------------------------------------------------- |
| `input`       | срабатывает при ручном вводе значения в поле | `(event: Event) => void`                          |
| `select`      | срабатывает при выборе даты в календаре      | `(value: Date) => void`                           |
| `clear`       | срабатывает при очистке значения             | `() => void`                                      |
| `show`        | срабатывает при открытии календаря           | `() => void`                                      |
| `hide`        | срабатывает при закрытии календаря           | `() => void`                                      |
| `monthChange` | срабатывает при смене месяца                 | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `yearChange`  | срабатывает при смене года                   | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `todayClick`  | срабатывает при клике по кнопке «Сегодня»    | `(value: Date) => void`                           |
| `clearClick`  | срабатывает при клике по кнопке «Очистить»   | `() => void`                                      |

# ExtraDatePickerViewChangeEvent

Событие смены месяца/года, передаётся в `monthChange` и `yearChange`.

| Свойство | Описание        | Типизация |
| -------- | --------------- | --------- |
| `month`  | выбранный месяц | `number`  |
| `year`   | выбранный год   | `number`  |
