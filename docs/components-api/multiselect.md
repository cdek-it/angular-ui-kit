[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5726&m=dev)

# ExtraMultiselect

| Свойство             | Описание                                                                | Типизация                                                      |
| -------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `placeholder`        | текст подсказки внутри поля                                             | `string`                                                       |
| `label`              | текст названия поля                                                     | `string`                                                       |
| `label-position`     | положение лейбла                                                        | `default \| float \| left`                                     |
| `chip`               | отображать выбранные значения в виде chips                              | `boolean`                                                      |
| `chip-icon`          | класс иконки tabler icon для элементов при отображении chips            | `string`                                                       |
| `chip-clearable`     | отображение иконки удаления chip                                        | `boolean`                                                      |
| `clearable`          | отображение иконки для очистки поля                                     | `boolean`                                                      |
| `show-checkbox`      | отображать чекбокс у option                                             | `boolean`                                                      |
| `show-filter`        | отображать фильтр в оверлее                                             | `boolean`                                                      |
| `filter-placeholder` | текст подсказки в фильтре                                               | `string`                                                       |
| `options`            | список элементов или список групп с элементами                          | `ExtraMultiselectGroup[] \| ExtraMultiselectOption[] \| any[]` |
| `optionLabel`        | наименование поля, содержащего отображаемое значение                    | `string`                                                       |
| `note`               | текст пояснения под полем                                               | `string`                                                       |
| `info`               | текст с доп. информацией (показывается в тултипе иконки ti-info-circle) | `string`                                                       |
| `size`               | размер поля                                                             | `sm \| base \| lg \| xlg`                                      |

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
