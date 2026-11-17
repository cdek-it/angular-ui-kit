[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5829&m=dev)

# ExtraListbox

> `ExtraListboxComponent` (`@cdek-it/angular-ui-kit`) — список выбора с поддержкой ControlValueAccessor.

| Свойство            | Описание                                             | Типизация                                              | По умолчанию |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------------ | ------------ |
| `options`           | список элементов или список групп с элементами       | `ExtraListboxGroup[] \| ExtraListboxOption[] \| any[]` | `[]`         |
| `optionLabel`       | наименование поля, содержащего отображаемое значение | `string`                                               | `'label'`    |
| `multiple`          | множественный выбор (элементы с чекбоксами)          | `boolean`                                              | `false`      |
| `showFilter`        | отображать поле поиска элементов                     | `boolean`                                              | `false`      |
| `filterPlaceholder` | текст подсказки в поле поиска                        | `string`                                               | —            |
| `showCheckbox`      | отображать чекбоксы у элементов и «выбрать всё»      | `boolean`                                              | `false`      |
| `emptyMessage`      | сообщение при отсутствии элементов                   | `string`                                               | —            |
| `readonly`          | только для чтения                                    | `boolean`                                              | `false`      |
| `required`          | поле обязательно для заполнения                      | `boolean`                                              | `false`      |
| `ariaLabel`         | метка для программ экранного доступа                 | `string`                                               | —            |
| `ariaLabelledBy`    | `id` внешнего элемента-метки для доступности         | `string`                                               | —            |
| `autofocus`         | автофокус при монтировании компонента                | `boolean`                                              | `false`      |
| `tabindex`          | порядок перехода по Tab                              | `number`                                               | —            |

## Дополнительные свойства

| Свойство | Назначение | Тип | По умолчанию |
|---|---|---|---|
| `optionValue` | Поле объекта, используемое как значение | `string` | — |
| `checkmark` | Галочка перед выбранным пунктом одиночного выбора | `boolean` | `false` |
| `group` | Группировка элементов | `boolean` | `false` |
| `optionGroupLabel` | Поле заголовка группы | `string` | — |
| `optionGroupChildren` | Поле массива пунктов группы | `string` | — |
| `scrollHeight` | Максимальная высота прокручиваемой области | `string` | `'200px'` |
| `showHeader` | Отображать шапку с фильтром, выбором всех и закрытием | `boolean` | `true` |
| `showClose` | Кнопка закрытия в шапке | `boolean` | `false` |
| `overlay` | Тень списка в варианте оверлея; позиционирование задаёт контейнер | `boolean` | `false` |
| `striped` | Чередовать фон строк | `boolean` | `false` |

`showHeader=false` скрывает шапку целиком. `showCheckbox` включает чекбоксы при `multiple=true`; в этом режиме отдельный checkmark не рисуется. Кнопка закрытия использует `ExtraButtonComponent` и сообщает о запросе через `onClose`, видимость списка контролирует потребитель.

Disabled управляется `FormControl.disable()` / `enable()`. `required=true` включает `Validators.required`; invalid отображается после touched/dirty. `autofocus` устанавливает фокус на список после монтирования; отключённый список не фокусируется и получает tabindex=-1.

Пункт с галочкой имеет высоту 32px, обычный — 42px, с чекбоксом — 48px, с подписью — 62px. Заголовки групп используют общий стиль `12px` и `padding: 4px 10px` через токены.

# Стекозависимые пропсы

| Описание                                     | Angular                                         | Vue          | React   | Типизация      | По умолчанию |
| -------------------------------------------- | ----------------------------------------------- | ------------ | ------- | -------------- | ------------ |
| выбранное значение (при `multiple` — массив) | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `any \| any[]` | `null`       |

# События

| Событие     | Описание                                   | Типизация                                     |
| ----------- | ------------------------------------------ | --------------------------------------------- |
| `change`    | срабатывает при изменении выбора           | `(event: ExtraListboxChangeEvent) => void`    |
| `filter`    | срабатывает при фильтрации                 | `(event: ExtraListboxFilterEvent) => void`    |
| `selectAll` | срабатывает при переключении «выбрать всё» | `(event: ExtraListboxSelectAllEvent) => void` |

## Дополнительные события Angular

- `onFocus: EventEmitter<FocusEvent>` — фокус на списке.
- `onBlur: EventEmitter<FocusEvent>` — потеря фокуса, FormControl становится touched.
- `onClose: EventEmitter<Event>` — запрос закрытия. `onChange`, `onFilter`, `onSelectAll` сохраняют существующие имена и типы.

# ExtraListboxChangeEvent

| Свойство        | Описание           | Типизация |
| --------------- | ------------------ | --------- |
| `value`         | выбранные значения | `any`     |
| `originalEvent` | исходное событие   | `Event`   |

# ExtraListboxFilterEvent

| Свойство        | Описание               | Типизация |
| --------------- | ---------------------- | --------- |
| `filter`        | введённый текст поиска | `string`  |
| `originalEvent` | исходное событие       | `Event`   |

# ExtraListboxSelectAllEvent

| Свойство        | Описание         | Типизация |
| --------------- | ---------------- | --------- |
| `checked`       | выбрано ли всё   | `boolean` |
| `originalEvent` | исходное событие | `Event`   |

# ExtraListboxOption

| Свойство | Описание       | Типизация          |
| -------- | -------------- | ------------------ |
| `name`   | текст элемента | `string`           |
| `code`   | идентификатор  | `string \| number` |

# ExtraListboxGroup

| Свойство  | Описание            | Типизация                       |
| --------- | ------------------- | ------------------------------- |
| `options` | список элементов    | `ExtraListboxOption[] \| any[]` |
| `name`    | наименование группы | `string`                        |
