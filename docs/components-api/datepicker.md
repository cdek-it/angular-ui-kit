[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=25178-78127&m=dev)

# ExtraDatePicker

| Свойство          | Описание                                                                      | Типизация                              | По умолчанию |
| ----------------- | ----------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| `placeholder`     | текст подсказки внутри поля                                                   | `string`                               | —            |
| `label`           | текст названия поля                                                           | `string`                               | `''`         |
| `labelPosition`   | положение лейбла                                                              | `top \| left`                          | `top`        |
| `floatLabel`      | плавающий лейбл внутри поля (перекрывает `labelPosition`)                     | `boolean`                              | `false`      |
| `view`            | режим отображения календаря                                                   | `day \| month \| year \| time \| date` | `day`        |
| `selectionMode`   | режим выбора даты                                                             | `single \| multiple \| range`          | `single`     |
| `showTime`        | включить выбор времени (значение времени в поле + timepicker в календаре)     | `boolean`                              | `false`      |
| `inline`          | отображать календарь встроенно, без поля ввода                                | `boolean`                              | `false`      |
| `showButtonBar`   | отображать блок с кнопками (Сегодня / Очистить)                               | `boolean`                              | `false`      |
| `clearable`       | отображение иконки для очистки поля                                           | `boolean`                              | `false`      |
| `dateFormat`      | формат отображения даты                                                       | `string`                               | `'dd.mm.yy'` |
| `minDate`         | минимальная выбираемая дата                                                   | `Date`                                 | —            |
| `maxDate`         | максимальная выбираемая дата                                                  | `Date`                                 | —            |
| `caption`         | текст пояснения под полем                                                     | `string`                               | `''`         |
| `captionSeverity` | вариант подписи: base, success, warning, danger, info                         | `ExtraCaptionSeverity`                 | `'base'`     |
| `info`            | текст с доп. информацией (показывается в тултипе иконки ti-info-circle)       | `string`                               | `''`         |
| `size`            | размер поля                                                                   | `small \| base \| large \| xlarge`     | `base`       |
| `hourLabel`       | подпись поля часов в блоке времени (по умолчанию «Часы»)                      | `string`                               | `'Часы'`     |
| `minuteLabel`     | подпись поля минут в блоке времени (по умолчанию «Минуты»)                    | `string`                               | `'Минуты'`   |
| `readonly`        | только для чтения                                                             | `boolean`                              | `false`      |
| `required`        | поле обязательно для заполнения                                               | `boolean`                              | `true`      |
| `name`            | имя поля (нативный атрибут `name`); используется браузером для автозаполнения | `string`                               | —            |
| `autocomplete`    | значение нативного атрибута `autocomplete`                                    | `string`                               | —            |
| `ariaLabel`       | метка для программ экранного доступа                                          | `string`                               | —            |
| `ariaLabelledBy`  | `id` внешнего элемента-метки для доступности                                  | `string`                               | —            |
| `autofocus`       | автофокус при монтировании компонента                                         | `boolean`                              | `false`      |
| `tabindex`        | порядок перехода по Tab                                                       | `number`                               | —            |

| `fluid` | растягивает поле до ширины контейнера | `boolean` | `false` |
| `showIcon` | показывает иконку календаря | `boolean` | `true` |
| `iconDisplay` | иконка внутри поля либо отдельная кнопка | `input \| button` | `input` |
| `hourFormat` | формат времени; в 12-часовом режиме доступен переключатель AM/PM | `'24' \| '12'` | `'24'` |
| `showOtherMonths` | показывает дни соседних месяцев | `boolean` | `true` |
| `selectOtherMonths` | разрешает выбирать дни соседних месяцев | `boolean` | `false` |
| `inputId` | id поля, связанный с label | `string` | уникальный id |
| `invalid` | явная невалидность; также учитывается touched/dirty связанного NgControl | `boolean` | `false` |

`view="date"` сохраняется для существующих шаблонов; каноническое имя режима дней — `day`.
`view="time"` показывает только панель времени. При `inline=true` label/caption и поле ввода не рендерятся.
`floatLabel=true` перекрывает `labelPosition` и подавляет placeholder; метка поднимается при фокусе или значении.
`required` подключён как NG_VALIDATORS-валидатор. `disabled` задаётся через FormControl, не через Input.

Миграция: **BREAKING** `size="medium"` → `size="base"`; `[showClear]` → `[clearable]`.

Названия месяцев и дней недели, а также подписи кнопок навигации для скринридера берутся из перевода PrimeNG (`providePrimeNG({ translation })`, `PrimeNG.setTranslation`); по умолчанию `provideExtraThemes()` задаёт русский.

# Стекозависимые пропсы

| Описание                                                         | Angular                                         | Vue          | React   | Типизация        | По умолчанию |
| ---------------------------------------------------------------- | ----------------------------------------------- | ------------ | ------- | ---------------- | ------------ |
| выбранная дата (при `selectionMode` `multiple`/`range` — массив) | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `Date \| Date[]` | `null`       |

# События

| Событие         | Описание                                     | Типизация                                         |
| --------------- | -------------------------------------------- | ------------------------------------------------- |
| `onInput`       | срабатывает при ручном вводе значения в поле | `(event: Event) => void`                          |
| `onSelect`      | срабатывает при выборе даты в календаре      | `(value: Date) => void`                           |
| `onClear`       | срабатывает при очистке значения             | `() => void`                                      |
| `onShow`        | срабатывает при открытии календаря           | `() => void`                                      |
| `onHide`        | срабатывает при закрытии календаря           | `() => void`                                      |
| `onMonthChange` | срабатывает при смене месяца                 | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `onYearChange`  | срабатывает при смене года                   | `(event: ExtraDatePickerViewChangeEvent) => void` |
| `onTodayClick`  | срабатывает при клике по кнопке «Сегодня»    | `(value: Date) => void`                           |
| `onClearClick`  | срабатывает при клике по кнопке «Очистить»   | `() => void`                                      |

| `onFocus` | получение фокуса полем | `(event: Event) => void` |
| `onBlur` | потеря фокуса полем, помечает FormControl touched | `(event: Event) => void` |

# ExtraDatePickerViewChangeEvent

Событие смены месяца/года, передаётся в `onMonthChange` и `onYearChange`.

| Свойство | Описание        | Типизация |
| -------- | --------------- | --------- |
| `month`  | выбранный месяц | `number`  |
| `year`   | выбранный год   | `number`  |
