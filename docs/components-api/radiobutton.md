[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5367&m=dev)

# ExtraRadioButton

> ✅ **Реализован**: `ExtraRadiobuttonComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство         | Описание                          | Типизация          | По умолчанию |
| ---------------- | --------------------------------- | ------------------ | ------------ |
| `label`          | текст названия                    | `string`           | `''`         |
| `label-position` | положение лейбла                  | `right \| left`    | `right`      |
| `caption`        | текст пояснения под лейблом       | `string`           | `''`         |
| `value`          | значение опции                    | `any`              | `null`       |

# События

| Событие    | Описание                      | Типизация                                      |
| ---------- | ----------------------------- | ---------------------------------------------- |
| `onClick`  | срабатывает при выборе опции  | `(event: ExtraRadioButtonClickEvent) => void`  |
| `onFocus`  | срабатывает при получении фокуса | `(event: Event) => void`                    |
| `onBlur`   | срабатывает при потере фокуса | `(event: Event) => void`                       |

# ExtraRadioButtonClickEvent

| Свойство        | Описание            | Типизация |
| --------------- | ------------------- | --------- |
| `value`         | значение опции      | `any`     |
| `originalEvent` | исходное событие    | `Event`   |
