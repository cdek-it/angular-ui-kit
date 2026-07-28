[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5367&m=dev)

# ExtraRadioButton

| Свойство         | Описание                          | Типизация          |
| ---------------- | --------------------------------- | ------------------ |
| `label`          | текст названия                    | `string`           |
| `label-position` | положение лейбла                  | `default \| left`  |
| `caption`        | текст пояснения под лейблом       | `string`           |
| `value`          | значение опции                    | `any`              |

# События

| Событие    | Описание                      | Типизация                                      |
| ---------- | ----------------------------- | ---------------------------------------------- |
| `onClick`  | срабатывает при выборе опции  | `(event: ExtraRadioButtonClickEvent) => void`  |

# ExtraRadioButtonClickEvent

| Свойство        | Описание            | Типизация |
| --------------- | ------------------- | --------- |
| `value`         | значение опции      | `any`     |
| `originalEvent` | исходное событие    | `Event`   |
