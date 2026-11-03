[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24035-72&m=dev)

# ExtraToggleSwitch

> ✅ **Реализован**: `ExtraToggleSwitchComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство         | Описание                                     | Типизация       | По умолчанию |
| ---------------- | -------------------------------------------- | --------------- | ------------ |
| `label`          | текст названия                               | `string`        | `''`         |
| `labelPosition`  | положение лейбла                             | `left \| right` | `right`      |
| `caption`        | текст пояснения под лейблом                  | `string`        | `''`         |
| `readonly`       | только для чтения                            | `boolean`       | `false`      |
| `required`       | поле обязательно для заполнения              | `boolean`       | `false`      |
| `ariaLabel`      | метка для программ экранного доступа         | `string`        | —            |
| `ariaLabelledBy` | `id` внешнего элемента-метки для доступности | `string`        | —            |
| `autofocus`      | автофокус при монтировании компонента        | `boolean`       | `false`      |
| `tabindex`       | порядок перехода по Tab                      | `number`        | —            |

# Стекозависимые пропсы

| Описание                | Angular                                         | Vue          | React     | Типизация | По умолчанию |
| ----------------------- | ----------------------------------------------- | ------------ | --------- | --------- | ------------ |
| состояние переключателя | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `checked` | `boolean` | `false`      |

# События

| Событие  | Описание                         | Типизация                                       |
| -------- | -------------------------------- | ----------------------------------------------- |
| `change` | срабатывает при переключении     | `(event: ExtraToggleSwitchChangeEvent) => void` |
| `focus`  | срабатывает при получении фокуса | `(event: Event) => void`                        |
| `blur`   | срабатывает при потере фокуса    | `(event: Event) => void`                        |

# ExtraToggleSwitchChangeEvent

| Свойство        | Описание         | Типизация |
| --------------- | ---------------- | --------- |
| `checked`       | новое состояние  | `boolean` |
| `originalEvent` | исходное событие | `Event`   |
