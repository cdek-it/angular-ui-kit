[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24035-72&m=dev)

# ExtraToggleSwitch

| Свойство         | Описание                    | Типизация          |
| ---------------- | --------------------------- | ------------------ |
| `label`          | текст названия              | `string`           |
| `label-position` | положение лейбла            | `default \| left`  |
| `caption`        | текст пояснения под лейблом | `string`           |

# События

| Событие     | Описание                      | Типизация                                          |
| ----------- | ----------------------------- | -------------------------------------------------- |
| `onChange`  | срабатывает при переключении  | `(event: ExtraToggleSwitchChangeEvent) => void`    |

# ExtraToggleSwitchChangeEvent

| Свойство        | Описание          | Типизация |
| --------------- | ----------------- | --------- |
| `checked`       | новое состояние   | `boolean` |
| `originalEvent` | исходное событие  | `Event`   |
