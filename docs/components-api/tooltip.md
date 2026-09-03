[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5229&m=dev)

# ExtraTooltip

> ✅ **Реализован**: `ExtraTooltipDirective` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Директива `[extra-tooltip]` — применяется к любому элементу и показывает всплывающую подсказку со справочной информацией.

| Свойство        | Описание                             | Типизация                        |
| --------------- | ------------------------------------ | -------------------------------- |
| `extra-tooltip` | текст подсказки (значение директивы) | `string`                         |
| `position`      | расположение относительно элемента   | `top \| right \| bottom \| left` |
| `event`         | событие для показа подсказки         | `hover \| focus \| both`         |
| `show-delay`    | задержка перед показом, мс           | `number`                         |
| `hide-delay`    | задержка перед скрытием, мс          | `number`                         |
| `tooltip-disabled` | отключает подсказку                | `boolean`                        |
