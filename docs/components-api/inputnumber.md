[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=320-1754&m=dev)

# ExtraInputNumber

> ✅ **Реализован**: `ExtraInputNumberComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство              | Описание                                                                        | Типизация                           | По умолчанию |
| --------------------- | ------------------------------------------------------------------------------- | ----------------------------------- | ------------ |
| `placeholder`         | текст подсказки внутри поля                                                     | `string`                            | `''`         |
| `label`               | текст названия поля                                                             | `string`                            | `''`         |
| `labelPosition`       | положение лейбла                                                                | `top \| left`                       | `top`        |
| `floatLabel`          | плавающий лейбл внутри поля; поддерживает кнопки                                | `boolean`                           | `false`      |
| `showButtons`         | отображение кнопок для увеличения/уменьшения значения                           | `boolean`                           | `false`      |
| `min`                 | минимальное допустимое значение                                                 | `number`                            | —            |
| `max`                 | максимальное допустимое значение                                                | `number`                            | —            |
| `step`                | шаг изменения значения (кнопками `showButtons`)                                 | `number`                            | `1`          |
| `prefix`              | текст перед значением внутри поля                                               | `string`                            | —            |
| `suffix`              | текст после значения внутри поля                                                | `string`                            | —            |
| `clearable`           | отображение иконки для очистки поля                                             | `boolean`                           | `false`      |
| `caption`             | текст пояснения под полем                                                       | `string`                            | `''`         |
| `captionSeverity`     | вариант подписи (цвет и иконка): `base`, `success`, `warning`, `danger`, `info` | `ExtraCaptionSeverity`              | `base`       |
| `info`                | текст с доп. информацией (показывается в тултипе иконки ti-info-circle)         | `string`                            | `''`         |
| `size`                | размер поля                                                                     | `small \| base \| large \| xlarge`  | `base`       |
| `readonly`            | только для чтения                                                               | `boolean`                           | `false`      |
| `required`            | поле обязательно для заполнения                                                 | `boolean`                           | `false`      |
| `fluid`               | растягивает поле на всю ширину контейнера                                       | `boolean`                           | `false`      |
| `mode`                | режим форматирования числа                                                      | `decimal \| currency`               | `decimal`    |
| `currency`            | код валюты (ISO 4217), используется при `mode: currency`                        | `string`                            | —            |
| `locale`              | локаль форматирования числа                                                     | `string`                            | —            |
| `useGrouping`         | группировка разрядов (разделитель тысяч)                                        | `boolean`                           | `true`       |
| `minFractionDigits`   | минимальное число знаков после запятой                                          | `number`                            | —            |
| `maxFractionDigits`   | максимальное число знаков после запятой                                         | `number`                            | —            |
| `buttonLayout`        | расположение кнопок `showButtons`                                               | `stacked \| horizontal \| vertical` | `stacked`    |
| `incrementButtonIcon` | CSS-класс иконки кнопки увеличения                                              | `string`                            | —            |
| `decrementButtonIcon` | CSS-класс иконки кнопки уменьшения                                              | `string`                            | —            |
| `name`                | имя поля (нативный атрибут `name`); используется браузером для автозаполнения   | `string`                            | —            |
| `autocomplete`        | значение нативного атрибута `autocomplete`                                      | `string`                            | —            |
| `ariaLabel`           | метка для программ экранного доступа                                            | `string`                            | —            |
| `ariaLabelledBy`      | `id` внешнего элемента-метки для доступности                                    | `string`                            | —            |
| `autofocus`           | автофокус при монтировании компонента                                           | `boolean`                           | `false`      |
| `tabindex`            | порядок перехода по Tab                                                         | `number`                            | —            |

# Стекозависимые пропсы

| Описание      | Angular                                         | Vue          | React   | Типизация | По умолчанию |
| ------------- | ----------------------------------------------- | ------------ | ------- | --------- | ------------ |
| значение поля | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `number`  | `null`       |

# События

| Событие   | Описание                         | Типизация                                     |
| --------- | -------------------------------- | --------------------------------------------- |
| `onInput` | срабатывает при вводе значения   | `(event: ExtraInputNumberInputEvent) => void` |
| `onClear` | срабатывает при очистке значения | `() => void`                                  |

# ExtraInputNumberInputEvent

Событие ввода значения, передаётся в `onInput`.

| Свойство         | Описание                   | Типизация        |
| ---------------- | -------------------------- | ---------------- |
| `value`          | введённое значение         | `number \| null` |
| `formattedValue` | отформатированное значение | `string`         |
| `originalEvent`  | исходное событие           | `Event`          |

## Формы и поведение

Модель — `number | null`. Disabled задаётся формой. `[required]="true"` добавляет маркер обязательности и `Validators.required`; invalid отображается после touched или dirty. Ввод, ArrowUp/Down и кнопки меняют модель. После blur ограниченное min/max значение возвращается во внешнюю форму, контрол отмечается touched.

FloatLabel совместим с кнопками; поле высотой 56 при любом size. В покое placeholder скрыт и label остаётся 14/20; при заполнении label поднимается и становится 12/14. Очистка работает в том числе для нуля, возвращает null и вызывает onClear; недоступна в readonly/disabled. Caption связан с input через aria-describedby; без label доступное имя по умолчанию — «Число».

Без clearable и label/caption сохраняется прямая DOM-структура PrimeNG для InputGroup. При clearable появляется обёртка доступной кнопки очистки. Размеры small/base/large/xlarge: высота 36/42/50/56, шрифт 14/16/18/20.
