[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5726&m=dev)

# ExtraMultiSelect

> ✅ **Реализован**: `ExtraMultiSelectComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство              | Описание                                                                | Типизация                                                      | По умолчанию              |
| --------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------- |
| `placeholder`         | текст подсказки внутри поля                                             | `string`                                                       | `''`                      |
| `label`               | текст названия поля                                                     | `string`                                                       | `''`                      |
| `labelPosition`       | положение лейбла                                                        | `top \| left`                                                  | `top`                     |
| `floatLabel`          | плавающий лейбл внутри поля                                             | `boolean`                                                      | `false`                   |
| `showChips`           | отображать выбранные значения в виде chips                              | `boolean`                                                      | `false`                   |
| `chipIcon`            | класс иконки tabler icon для элементов при отображении chips            | `string`                                                       | —                         |
| `chipClearable`       | отображение иконки удаления chip                                        | `boolean`                                                      | `true`                    |
| `clearable`           | отображение иконки для очистки поля                                     | `boolean`                                                      | `false`                   |
| `showCheckbox`        | отображать чекбокс у option                                             | `boolean`                                                      | `true`                    |
| `showFilter`          | отображать фильтр в оверлее                                             | `boolean`                                                      | `false`                   |
| `filterPlaceholder`   | текст подсказки в фильтре                                               | `string`                                                       | —                         |
| `options`             | список элементов или список групп с элементами                          | `ExtraMultiSelectGroup[] \| ExtraMultiSelectOption[] \| any[]` | —                         |
| `optionLabel`         | наименование поля, содержащего отображаемое значение                    | `string`                                                       | —                         |
| `optionValue`         | наименование поля, значение которого используется как значение модели   | `string`                                                       | —                         |
| `optionDisabled`      | наименование булева поля опции, отключающего её выбор                   | `string`                                                       | —                         |
| `optionGroupLabel`    | наименование поля группы, содержащего её название                       | `string`                                                       | —                         |
| `optionGroupChildren` | наименование поля группы со списком дочерних опций                      | `string`                                                       | `'items'`                 |
| `group`               | включает группировку опций (данные — `ExtraMultiSelectGroup[]`)         | `boolean`                                                      | `false`                   |
| `caption`             | текст пояснения под полем                                               | `string`                                                       | `''`                      |
| `info`                | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                                                       | `''`                      |
| `size`                | размер поля                                                             | `small \| base \| large \| xlarge`                             | `base`                    |
| `readonly`            | только для чтения                                                       | `boolean`                                                      | `false`                   |
| `required`            | поле обязательно для заполнения                                         | `boolean`                                                      | `false`                   |
| `loading`             | состояние загрузки опций                                                | `boolean`                                                      | `false`                   |
| `fluid`               | растягивает поле на всю ширину контейнера                               | `boolean`                                                      | `false`                   |
| `appendTo`            | контейнер для отрисовки выпадающей панели                               | `any`                                                          | `'body'`                  |
| `emptyMessage`        | сообщение при пустом списке опций                                       | `string`                                                       | `'Нет данных'`            |
| `emptyFilterMessage`  | сообщение при отсутствии результатов фильтрации                         | `string`                                                       | `'Результаты не найдены'` |
| `ariaLabel`           | метка для программ экранного доступа                                    | `string`                                                       | —                         |
| `ariaLabelledBy`      | `id` внешнего элемента-метки для доступности                            | `string`                                                       | —                         |
| `autofocus`           | автофокус при монтировании компонента                                   | `boolean`                                                      | `false`                   |
| `tabindex`            | порядок перехода по Tab                                                 | `number`                                                       | —                         |

# Стекозависимые пропсы

| Описание           | Angular                                         | Vue          | React   | Типизация | По умолчанию |
| ------------------ | ----------------------------------------------- | ------------ | ------- | --------- | ------------ |
| выбранные значения | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `any[]`   | `null`       |

# ExtraMultiSelectOption

| Свойство | Описание        | Возможные значения |
| -------- | --------------- | ------------------ |
| `name`   | текст подсказки | `string`           |
| `code`   | идентификатор   | `string \| number` |

# ExtraMultiSelectGroup

| Свойство  | Описание            | Возможные значения                  |
| --------- | ------------------- | ----------------------------------- |
| `options` | список элементов    | `ExtraMultiSelectOption[] \| any[]` |
| `name`    | наименование группы | `string`                            |

# События

| Событие  | Описание                              | Типизация                                      |
| -------- | ------------------------------------- | ---------------------------------------------- |
| `change` | срабатывает при изменении выбора      | `(event: ExtraMultiSelectChangeEvent) => void` |
| `filter` | срабатывает при фильтрации            | `(event: ExtraMultiSelectFilterEvent) => void` |
| `clear`  | срабатывает при очистке всех значений | `() => void`                                   |
| `show`   | срабатывает при открытии панели       | `() => void`                                   |
| `hide`   | срабатывает при закрытии панели       | `() => void`                                   |
| `remove` | срабатывает при удалении значения     | `(event: ExtraMultiSelectRemoveEvent) => void` |
| `focus`  | срабатывает при получении фокуса      | `(event: Event) => void`                       |
| `blur`   | срабатывает при потере фокуса         | `(event: Event) => void`                       |

# ExtraMultiSelectChangeEvent

Событие изменения выбора, передаётся в `change`.

| Свойство        | Описание           | Типизация |
| --------------- | ------------------ | --------- |
| `value`         | выбранные значения | `any`     |
| `originalEvent` | исходное событие   | `Event`   |

# ExtraMultiSelectFilterEvent

Событие фильтрации, передаётся в `filter`.

| Свойство        | Описание                | Типизация |
| --------------- | ----------------------- | --------- |
| `filter`        | введённый текст фильтра | `string`  |
| `originalEvent` | исходное событие        | `Event`   |

# ExtraMultiSelectRemoveEvent

Событие удаления значения, передаётся в `remove`.

| Свойство  | Описание                | Типизация |
| --------- | ----------------------- | --------- |
| `value`   | значения после удаления | `any`     |
| `removed` | удалённое значение      | `any`     |
