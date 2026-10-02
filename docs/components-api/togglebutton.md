[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-4821&m=dev)

# ExtraToggleButton

> ✅ **Реализован**: `ExtraToggleButtonComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Кнопка с двумя состояниями (вкл/выкл). Текущее состояние — это значение (привязка через модель), читается через событие `change`.

| Свойство         | Описание                                | Типизация             |
| ---------------- | --------------------------------------- | --------------------- |
| `label`          | текст кнопки                            | `string`              |
| `icon`           | класс иконки tabler icon                | `string`              |
| `iconPosition`   | положение иконки                        | `left \| right`       |
| `size`           | размер кнопки                           | `small \| base \| large \| xlarge` |
| `iconOnly`       | режим «только иконка» без текста        | `boolean`              |
| `allowEmpty`     | разрешает снимать выбор повторным нажатием | `boolean \| undefined` |
| `fluid`          | растяжение кнопки на всю ширину контейнера | `boolean`           |
| `ariaLabel`      | метка для программ экранного доступа    | `string \| undefined` |
| `ariaLabelledBy` | id элемента с меткой для доступности    | `string \| undefined` |
| `inputId`        | id внутреннего элемента для связки с `<label for>` | `string \| undefined` |
| `tabindex`       | порядок перехода по Tab                 | `number \| undefined` |
| `autofocus`      | автофокус при монтировании              | `boolean \| undefined` |

# События

| Событие     | Описание                         | Типизация                                          |
| ----------- | -------------------------------- | -------------------------------------------------- |
| `change`    | срабатывает при переключении     | `(event: ExtraToggleButtonChangeEvent) => void`    |

# ExtraToggleButtonChangeEvent

| Свойство        | Описание    | Типизация |
| --------------- | ----------- | --------- |
| `checked`       | новое состояние (вкл/выкл) | `boolean` |
| `originalEvent` | исходное событие | `Event`   |
