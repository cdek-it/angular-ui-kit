[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=24040-56&p=f&m=dev)

# ExtraButton

> ✅ **Реализован**: `ExtraButtonComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство        | Описание                                                       | Типизация                                                      | По умолчанию |
| --------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ------------ |
| `label`         | текст на кнопке                                                | `string`                                                       | `''`         |
| `icon`          | класс иконки tabler icon на кнопке                             | `string`                                                       | `''`         |
| `iconPosition`  | позиция иконки относительно текста                             | `left \| right`                                                | `left`       |
| `variant`       | вариант отображения кнопки                                     | `primary \| secondary \| tertiary \| outlined \| text \| link` | `primary`    |
| `severity`      | семантическое состояние кнопки; не задано — нейтральная кнопка | `danger \| warning \| success \| info`                         | —            |
| `size`          | размер кнопки                                                  | `small \| base \| large \| xlarge`                             | `base`       |
| `rounded`       | скруглённая форма кнопки                                       | `boolean`                                                      | `false`      |
| `fluid`         | растягивает кнопку на всю ширину контейнера                    | `boolean`                                                      | `false`      |
| `disabled`      | отключённое состояние кнопки                                   | `boolean`                                                      | `false`      |
| `loading`       | состояние загрузки: спиннер, кнопка неактивна                  | `boolean`                                                      | `false`      |
| `iconOnly`      | режим «только иконка» без текста                               | `boolean`                                                      | `false`      |
| `showBadge`     | показывать бейдж поверх кнопки                                 | `boolean`                                                      | `false`      |
| `badge`         | текст бейджа (виден только при `showBadge=true`)               | `string`                                                       | `''`         |
| `badgeSeverity` | цветовая схема бейджа (шкала `ExtraBadge.severity`)            | `primary \| info \| success \| warning \| danger`              | `primary`    |
| `ariaLabel`     | метка для программ экранного доступа                           | `string`                                                       | —            |
| `autofocus`     | автофокус при монтировании компонента                          | `boolean`                                                      | `false`      |
| `tabindex`      | порядок перехода по Tab                                        | `number`                                                       | —            |
