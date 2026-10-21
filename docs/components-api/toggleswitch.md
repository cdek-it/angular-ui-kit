[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24035-72&m=dev)

# ExtraToggleSwitch

> ✅ **Реализован**: `ExtraToggleSwitchComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство         | Описание                    | Типизация          |
| ---------------- | --------------------------- | ------------------ |
| `label`          | текст названия              | `string`           |
| `labelPosition`  | положение лейбла            | `left \| right`    |
| `caption`        | текст пояснения под лейблом | `string`           |

# События

| Событие     | Описание                      | Типизация                                          |
| ----------- | ----------------------------- | -------------------------------------------------- |
| `change`    | срабатывает при переключении  | `(event: ExtraToggleSwitchChangeEvent) => void`    |
| `focus`     | срабатывает при получении фокуса | `(event: Event) => void`                        |
| `blur`      | срабатывает при потере фокуса    | `(event: Event) => void`                        |

# ExtraToggleSwitchChangeEvent

| Свойство        | Описание          | Типизация |
| --------------- | ----------------- | --------- |
| `checked`       | новое состояние   | `boolean` |
| `originalEvent` | исходное событие  | `Event`   |
