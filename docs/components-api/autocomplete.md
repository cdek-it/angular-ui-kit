[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=9370-42381&m=dev)

# ExtraAutoComplete

> ✅ **Реализован**: `ExtraAutoCompleteComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство              | Описание                                                                | Типизация                                                        |
| --------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `placeholder`         | текст подсказки внутри поля                                             | `string`                                                         |
| `label`               | текст названия поля                                                     | `string`                                                         |
| `labelPosition`       | положение лейбла                                                        | `top \| left`                                                    |
| `floatLabel`          | плавающий лейбл внутри поля                                             | `boolean`                                                        |
| `multiple`            | множественный выбор значений (выбранные отображаются в виде chips)      | `boolean`                                                        |
| `suggestions`         | список предлагаемых вариантов, выводимых в оверлее                      | `ExtraAutoCompleteGroup[] \| ExtraAutoCompleteOption[] \| any[]` |
| `completeMethod`      | функция, загружающая `suggestions` в зависимости от введённого значения | `(event: ExtraAutoCompleteCompleteEvent) => void`                |
| `optionLabel`         | наименование поля, содержащего отображаемое значение                    | `string`                                                         |
| `chipIcon`            | класс иконки tabler icon для элементов при отображении chips            | `string`                                                         |
| `chipClearable`       | отображение иконки удаления chip                                        | `boolean`                                                        |
| `showCheckbox`        | отображать чекбокс у option                                             | `boolean`                                                        |
| `clearable`           | отображение иконки для очистки поля                                     | `boolean`                                                        |
| `caption`             | текст пояснения под полем                                               | `string`                                                         |
| `info`                | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                                                         |
| `size`                | размер поля                                                             | `small \| base \| large \| xlarge`                               |
| `fluid`               | растягивает поле на всю ширину контейнера                               | `boolean`                                                        |
| `optionValue`         | наименование поля, значение которого используется как значение модели   | `string`                                                         |
| `optionDisabled`      | наименование булева поля опции, отключающего её выбор                   | `string`                                                         |
| `optionGroupChildren` | наименование поля группы со списком дочерних опций                      | `string`                                                         |
| `group`               | включает группировку опций (данные — `ExtraAutoCompleteGroup[]`)        | `boolean`                                                        |
| `dropdown`            | показывает кнопку раскрытия полного списка подсказок                    | `boolean`                                                        |
| `dropdownMode`        | поведение кнопки dropdown: весь список или подсказки по вводу           | `blank \| current`                                               |
| `forceSelection`      | ограничивает ввод только значениями из списка подсказок                 | `boolean`                                                        |
| `completeOnFocus`     | запрашивает подсказки при получении фокуса                              | `boolean`                                                        |
| `minLength`           | минимальная длина ввода для запроса подсказок                           | `number`                                                         |
| `delay`               | задержка (мс) перед вызовом `completeMethod` после ввода                | `number`                                                         |
| `scrollHeight`        | максимальная высота выпадающей панели                                   | `string`                                                         |
| `emptyMessage`        | сообщение при пустом списке подсказок                                   | `string`                                                         |
| `readonly`            | только для чтения                                                       | `boolean`                                                        |
| `unique`              | запрещает повторный выбор одной опции (при `multiple=true`)             | `boolean`                                                        |
| `dataKey`             | наименование поля-идентификатора опции для сравнения значений           | `string`                                                         |
| `ariaLabel`           | метка для программ экранного доступа                                    | `string`                                                         |
| `ariaLabelledBy`      | `id` внешнего элемента-метки для доступности                            | `string`                                                         |
| `autofocus`           | автофокус при монтировании компонента                                   | `boolean`                                                        |

Группировка элементов определяется по данным: если в `suggestions` передан `ExtraAutoCompleteGroup`, варианты выводятся сгруппированно.

> Индикатор загрузки управляется PrimeNG автоматически: он включается при вызове `completeMethod` и выключается, как только меняется `[suggestions]`. Отдельного `@Input() loading` нет — для асинхронных источников данных просто обновляйте `suggestions` по завершении запроса.

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

| Событие         | Описание                                 | Типизация                                              |
| --------------- | ---------------------------------------- | ------------------------------------------------------ |
| `select`        | срабатывает при выборе варианта          | `(event: ExtraAutoCompleteSelectEvent) => void`        |
| `unselect`      | срабатывает при снятии выбора            | `(event: ExtraAutoCompleteSelectEvent) => void`        |
| `clear`         | срабатывает при очистке значения         | `() => void`                                           |
| `show`          | срабатывает при открытии оверлея         | `() => void`                                           |
| `hide`          | срабатывает при закрытии оверлея         | `() => void`                                           |
| `dropdownClick` | срабатывает при клике по кнопке dropdown | `(event: ExtraAutoCompleteDropdownClickEvent) => void` |
| `focus`         | срабатывает при получении фокуса         | `(event: Event) => void`                               |
| `blur`          | срабатывает при потере фокуса            | `(event: Event) => void`                               |

# ExtraAutoCompleteSelectEvent

Событие выбора варианта, передаётся в `select` и `unselect`.

| Свойство        | Описание          | Типизация |
| --------------- | ----------------- | --------- |
| `value`         | выбранный вариант | `any`     |
| `originalEvent` | исходное событие  | `Event`   |

# ExtraAutoCompleteDropdownClickEvent

Событие клика по кнопке dropdown, передаётся в `dropdownClick`.

| Свойство        | Описание                           | Типизация |
| --------------- | ---------------------------------- | --------- |
| `query`         | введённое значение на момент клика | `string`  |
| `originalEvent` | исходное событие                   | `Event`   |
