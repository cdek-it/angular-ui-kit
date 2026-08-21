[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=9370-42381&m=dev)

# ExtraAutoComplete

| Свойство         | Описание                                                                | Типизация                                                        |
| ---------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `placeholder`    | текст подсказки внутри поля                                             | `string`                                                         |
| `label`          | текст названия поля                                                     | `string`                                                         |
| `label-position` | положение лейбла                                                        | `default \| float \| left`                                       |
| `multiple`       | множественный выбор значений (выбранные отображаются в виде chips)      | `boolean`                                                        |
| `suggestions`    | список предлагаемых вариантов, выводимых в оверлее                      | `ExtraAutoCompleteGroup[] \| ExtraAutoCompleteOption[] \| any[]` |
| `completeMethod` | функция, загружающая `suggestions` в зависимости от введённого значения | `(event: ExtraAutoCompleteCompleteEvent) => void`                |
| `optionLabel`    | наименование поля, содержащего отображаемое значение                    | `string`                                                         |
| `loading`        | отображение индикатора загрузки                                         | `boolean`                                                        |
| `chip`           | отображать выбранные значения в виде chips                              | `boolean`                                                        |
| `chip-icon`      | класс иконки tabler icon для элементов при отображении chips            | `string`                                                         |
| `chip-clearable` | отображение иконки удаления chip                                        | `boolean`                                                        |
| `show-checkbox`  | отображать чекбокс у option                                             | `boolean`                                                        |
| `clearable`      | отображение иконки для очистки поля                                     | `boolean`                                                        |
| `caption`        | текст пояснения под полем                                               | `string`                                                         |
| `info`           | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                                                         |
| `size`           | размер поля                                                             | `sm \| base \| lg \| xlg`                                        |

Группировка элементов определяется по данным: если в `suggestions` передан `ExtraAutoCompleteGroup`, варианты выводятся сгруппированно.

# ExtraAutoCompleteCompleteEvent

Событие, передаваемое в `completeMethod`. По введённому значению `query` обработчик формирует и записывает новый список в `suggestions`.

| Свойство        | Описание                         | Типизация |
| --------------- | -------------------------------- | --------- |
| `query`         | введённое пользователем значение | `string`  |
| `originalEvent` | исходное браузерное событие      | `Event`   |

# ExtraAutoCompleteOption

| Свойство | Описание       | Типизация          |
| -------- | -------------- | ------------------ |
| `name`   | текст варианта | `string`           |
| `code`   | идентификатор  | `string \| number` |

# ExtraAutoCompleteGroup

| Свойство  | Описание            | Типизация                            |
| --------- | ------------------- | ------------------------------------ |
| `options` | список элементов    | `ExtraAutoCompleteOption[] \| any[]` |
| `name`    | наименование группы | `string`                             |

# События

| Событие           | Описание                                 | Типизация                                             |
| ----------------- | ---------------------------------------- | ----------------------------------------------------- |
| `onSelect`        | срабатывает при выборе варианта          | `(event: ExtraAutoCompleteSelectEvent) => void`       |
| `onUnselect`      | срабатывает при снятии выбора            | `(event: ExtraAutoCompleteSelectEvent) => void`       |
| `onClear`         | срабатывает при очистке значения         | `() => void`                                          |
| `onShow`          | срабатывает при открытии оверлея         | `() => void`                                          |
| `onHide`          | срабатывает при закрытии оверлея         | `() => void`                                          |
| `onDropdownClick` | срабатывает при клике по кнопке dropdown | `(event: ExtraAutoCompleteDropdownClickEvent) => void` |

# ExtraAutoCompleteSelectEvent

Событие выбора варианта, передаётся в `onSelect` и `onUnselect`.

| Свойство        | Описание          | Типизация |
| --------------- | ----------------- | --------- |
| `value`         | выбранный вариант | `any`     |
| `originalEvent` | исходное событие  | `Event`   |

# ExtraAutoCompleteDropdownClickEvent

Событие клика по кнопке dropdown, передаётся в `onDropdownClick`.

| Свойство        | Описание                           | Типизация |
| --------------- | ---------------------------------- | --------- |
| `query`         | введённое значение на момент клика | `string`  |
| `originalEvent` | исходное событие                   | `Event`   |
