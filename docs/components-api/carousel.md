[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=1207-3811&m=dev)

# ExtraCarousel

Прокручиваемый набор элементов.

| Свойство            | Описание                               | Типизация                 |
| ------------------- | -------------------------------------- | ------------------------- |
| `showNav`          | кнопки навигации (стрелки)             | `boolean`                          |
| `showIndicators`   | индикаторы-точки (пагинация)           | `boolean`                          |
| `navIconLeft`      | класс иконки tabler icon кнопки слева  | `string`                           |
| `navIconRight`     | класс иконки tabler icon кнопки справа | `string`                           |
| `navTextLeft`      | текст кнопок навигации слева           | `string`                           |
| `navTextRight`     | текст кнопок навигации справа          | `string`                           |
| `navVariant`       | вариант стиля кнопок навигации         | `string`                           |
| `navSize`          | размер кнопок навигации                | `small \| base \| large \| xlarge` |
| `navRounded`       | скруглённая форма кнопок               | `boolean`                          |
| `navIconPosition`  | позиция иконки в кнопках               | `left \| right`                    |

# Слоты (content projection)

| Слот      | Описание                 |
| --------- | ------------------------ |
| `content` | шаблон элемента карусели |

# События

| Событие        | Описание                       | Типизация                                 |
| -------------- | ------------------------------ | ----------------------------------------- |
| `pageChange` | срабатывает при смене страницы | `(event: ExtraCarouselPageEvent) => void` |

# ExtraCarouselPageEvent

| Свойство | Описание         | Типизация |
| -------- | ---------------- | --------- |
| `page`   | текущая страница | `number`  |
