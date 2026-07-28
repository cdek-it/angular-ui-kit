[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5829&m=dev)

# ExtraListbox

| Свойство            | Описание                                          | Типизация                                                      |
| ------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| `options`           | список элементов или список групп с элементами     | `ExtraListboxGroup[] \| ExtraListboxOption[] \| any[]`         |
| `optionLabel`       | наименование поля, содержащего отображаемое значение | `string`                                                     |
| `multiple`          | множественный выбор (элементы с чекбоксами)        | `boolean`                                                      |
| `show-filter`       | отображать поле поиска элементов                   | `boolean`                                                      |
| `filter-placeholder`| текст подсказки в поле поиска                      | `string`                                                       |
| `show-checkbox`     | отображать чекбоксы у элементов и «выбрать всё»    | `boolean`                                                      |
| `empty-message`     | сообщение при отсутствии элементов                 | `string`                                                       |

# События

| Событие           | Описание                                  | Типизация                                       |
| ----------------- | ----------------------------------------- | ----------------------------------------------- |
| `onChange`        | срабатывает при изменении выбора          | `(event: ExtraListboxChangeEvent) => void`      |
| `onFilter`        | срабатывает при фильтрации                | `(event: ExtraListboxFilterEvent) => void`      |
| `onSelectAllChange` | срабатывает при переключении «выбрать всё» | `(event: ExtraListboxSelectAllChangeEvent) => void` |

# ExtraListboxChangeEvent

| Свойство        | Описание           | Типизация |
| --------------- | ------------------ | --------- |
| `value`         | выбранные значения | `any`     |
| `originalEvent` | исходное событие   | `Event`   |

# ExtraListboxFilterEvent

| Свойство        | Описание                | Типизация |
| --------------- | ----------------------- | --------- |
| `filter`        | введённый текст поиска  | `string`  |
| `originalEvent` | исходное событие        | `Event`   |

# ExtraListboxSelectAllChangeEvent

| Свойство        | Описание        | Типизация |
| --------------- | --------------- | --------- |
| `checked`       | выбрано ли всё  | `boolean` |
| `originalEvent` | исходное событие | `Event`   |

# ExtraListboxOption

| Свойство | Описание        | Типизация          |
| -------- | --------------- | ------------------ |
| `name`   | текст элемента  | `string`           |
| `code`   | идентификатор   | `string \| number` |

# ExtraListboxGroup

| Свойство  | Описание            | Типизация                            |
| --------- | ------------------- | ------------------------------------ |
| `options` | список элементов    | `ExtraListboxOption[] \| any[]`      |
| `name`    | наименование группы | `string`                             |
