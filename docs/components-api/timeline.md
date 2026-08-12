[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=1207-3963&m=dev)

# ExtraTimeline

Список событий в хронологическом порядке.

| Свойство | Описание                                   | Типизация                   |
| -------- | ------------------------------------------ | --------------------------- |
| `value`  | массив событий                             | `ExtraTimelineItem[]`       |
| `icon`   | класс иконки tabler icons                  | `string`                    |
| `align`  | расположение контента относительно маркера | `opposite \| top \| bottom` |
| `line`   | отображение линии                          | `boolean`                   |

# ExtraTimelineItem

| Свойство  | Описание          | Типизация |
| --------- | ----------------- | --------- |
| `caption` | пояснение         | `string`  |
| `name`    | наименование шага | `string`  |
