[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5074&m=dev)

# ExtraMeterGroup

Отображение массива данных в виде группы измерителей (сегментов).

| Свойство            | Описание                 | Типизация                |
| ------------------- | ------------------------ | ------------------------ |
| `value`             | массив измерителей       | `ExtraMeterItem[]`       |
| `orientation`       | ориентация компонента    | `horizontal \| vertical` |
| `label-position`    | расположение легенды     | `start \| end`           |
| `label-orientation` | ориентация легенды       | `horizontal \| vertical` |

# ExtraMeterItem

| Свойство | Описание                | Типизация |
| -------- | ----------------------- | --------- |
| `label`  | подпись измерителя      | `string`  |
| `value`  | значение                | `number`  |
| `color`  | цвет                    | `string`  |
| `icon`   | класс иконки tabler icon | `string` |
