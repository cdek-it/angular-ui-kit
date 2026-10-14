[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24040-56&p=f&m=dev)

# ExtraButton

> ✅ **Реализован**: `ExtraButtonComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство        | Описание                                         | Типизация                                                               |
| --------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| `label`         | текст на кнопке                                  | `string`                                                                |
| `icon`          | класс иконки tabler icon на кнопке               | `string`                                                                |
| `iconPosition`  | позиция иконки относительно текста               | `left \| right`                                                         |
| `variant`       | вариант отображения кнопки                       | `primary \| secondary \| tertiary \| outlined \| text \| link`          |
| `severity`      | семантическое состояние кнопки                   | `base \| danger \| warning \| success \| info`                          |
| `size`          | размер кнопки                                    | `small \| base \| large \| xlarge`                                      |
| `rounded`       | скруглённая форма кнопки                         | `boolean`                                                               |
| `fluid`         | растягивает кнопку на всю ширину контейнера      | `boolean`                                                               |
| `disabled`      | отключённое состояние кнопки                     | `boolean`                                                               |
| `loading`       | состояние загрузки: спиннер, кнопка неактивна    | `boolean`                                                               |
| `iconOnly`      | режим «только иконка» без текста                 | `boolean`                                                               |
| `showBadge`     | показывать бейдж поверх кнопки                   | `boolean`                                                               |
| `badge`         | текст бейджа (виден только при `showBadge=true`) | `string`                                                                |
| `badgeSeverity` | цветовая схема бейджа                            | `success \| info \| warning \| danger \| secondary \| contrast \| null` |
| `ariaLabel`     | метка для программ экранного доступа             | `string \| undefined`                                                   |
| `autofocus`     | автофокус при монтировании компонента            | `boolean`                                                               |
| `tabindex`      | порядок перехода по Tab                          | `number \| undefined`                                                   |
