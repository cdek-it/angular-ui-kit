[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5726&m=dev)

# ExtraMultiselect

| Свойство             | Описание                                                                | Типизация                                                      |
| -------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `placeholder`        | текст подсказки внутри поля                                             | `string`                                                       |
| `label`              | текст названия поля                                                     | `string`                                                       |
| `labelPosition`      | положение лейбла                                                        | `left \| top \| float`                                          |
| `showChips`          | отображать выбранные значения в виде chips                              | `boolean`                                                      |
| `chipIcon`           | класс иконки tabler icon для элементов при отображении chips            | `string`                                                       |
| `chipClearable`      | отображение иконки удаления chip                                        | `boolean`                                                      |
| `clearable`          | отображение иконки для очистки поля                                     | `boolean`                                                      |
| `showCheckbox`       | отображать чекбокс у option                                             | `boolean`                                                      |
| `showFilter`         | отображать фильтр в оверлее                                             | `boolean`                                                      |
| `filterPlaceholder`  | текст подсказки в фильтре                                               | `string`                                                       |
| `options`            | список элементов или список групп с элементами                          | `ExtraMultiselectGroup[] \| ExtraMultiselectOption[] \| any[]` |
| `optionLabel`        | наименование поля, содержащего отображаемое значение                    | `string`                                                       |
| `caption`            | текст пояснения под полем                                               | `string`                                                       |
| `info`               | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                                                       |
| `size`               | размер поля                                                             | `small \| base \| large \| xlarge`                              |

# ExtraMultiselectOption

| Свойство | Описание        | Возможные значения |
| -------- | --------------- | ------------------ |
| `name`   | текст подсказки | `string`           |
| `code`   | идентификатор   | `string \| number` |

# ExtraMultiselectGroup

| Свойство  | Описание            | Возможные значения                  |
| --------- | ------------------- | ----------------------------------- |
| `options` | список элементов    | `ExtraMultiselectOption[] \| any[]` |
| `name`    | наименование группы | `string`                            |

# События

| Событие    | Описание                              | Типизация                                       |
| ---------- | ------------------------------------- | ----------------------------------------------- |
| `change` | срабатывает при изменении выбора      | `(event: ExtraMultiSelectChangeEvent) => void`  |
| `filter` | срабатывает при фильтрации            | `(event: ExtraMultiSelectFilterEvent) => void`  |
| `clear`  | срабатывает при очистке всех значений | `() => void`                                    |
| `show`   | срабатывает при открытии панели       | `() => void`                                    |
| `hide`   | срабатывает при закрытии панели       | `() => void`                                    |
| `remove` | срабатывает при удалении значения     | `(event: ExtraMultiSelectRemoveEvent) => void`  |

# ExtraMultiSelectChangeEvent

Событие изменения выбора, передаётся в `change`.

| Свойство        | Описание           | Типизация |
| --------------- | ------------------ | --------- |
| `value`         | выбранные значения | `any`     |
| `originalEvent` | исходное событие   | `Event`   |

# ExtraMultiSelectFilterEvent

Событие фильтрации, передаётся в `filter`.

| Свойство        | Описание               | Типизация |
| --------------- | ---------------------- | --------- |
| `filter`        | введённый текст фильтра | `string` |
| `originalEvent` | исходное событие       | `Event`   |

# ExtraMultiSelectRemoveEvent

Событие удаления значения, передаётся в `remove`.

| Свойство  | Описание                | Типизация |
| --------- | ----------------------- | --------- |
| `value`   | значения после удаления | `any`     |
| `removed` | удалённое значение      | `any`     |
