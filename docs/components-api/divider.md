[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5178&m=dev)

# ExtraDivider

Визуальный разделитель контента.

| Свойство  | Описание                              | Типизация                  |
| --------- | ------------------------------------- | -------------------------- |
| `layout`  | ориентация разделителя                | `horizontal \| vertical`                   |
| `type`    | стиль линии                           | `solid \| dash`                            |
| `align`   | расположение контента относительно линии (`top`/`bottom` — только для `layout="vertical"`) | `left \| center \| right \| top \| bottom` |

# Слоты (content projection)

| Слот      | Описание                                  |
| --------- | ----------------------------------------- |
| `content` | содержимое поверх линии (текст или иконка) |
