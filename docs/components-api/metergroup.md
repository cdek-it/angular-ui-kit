[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5074&m=dev)

# ExtraMeterGroup

> ✅ **Реализован**: `ExtraMeterGroupComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Отображение массива данных в виде группы измерителей (сегментов).

| Свойство           | Описание              | Типизация                | По умолчанию |
| ------------------ | --------------------- | ------------------------ | ------------ |
| `value`            | массив измерителей    | `ExtraMeterItem[]`       | `[]`         |
| `orientation`      | ориентация компонента | `horizontal \| vertical` | `horizontal` |
| `labelPosition`    | расположение легенды  | `start \| end`           | `end`        |
| `labelOrientation` | ориентация легенды    | `horizontal \| vertical` | `horizontal` |

# ExtraMeterItem

| Свойство | Описание                 | Типизация |
| -------- | ------------------------ | --------- |
| `label`  | подпись измерителя       | `string`  |
| `value`  | значение                 | `number`  |
| `color`  | цвет                     | `string`  |
| `icon`   | класс иконки tabler icon | `string`  |
