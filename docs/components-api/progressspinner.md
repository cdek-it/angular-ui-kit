[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=1219-3086&m=dev)

# ExtraProgressSpinner

> ✅ **Реализован**: `ExtraProgressSpinnerComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Индикатор ожидания (спиннер).

| Свойство            | Описание                                                                               | Типизация                          | По умолчанию |
| ------------------- | -------------------------------------------------------------------------------------- | ---------------------------------- | ------------ |
| `size`              | размер                                                                                 | `small \| base \| large \| xlarge` | `base`       |
| `fill`              | цвет                                                                                   | `primary \| white`                 | `primary`    |
| `strokeWidth`       | толщина линии дуги (SVG `stroke-width`)                                                | `string`                           | —            |
| `animationDuration` | длительность одной итерации анимации вращения                                          | `string`                           | `'2s'`       |
| `ariaLabel`         | метка для программ экранного доступа                                                   | `string`                           | —            |
| `circleFill`        | цвет заливки внутренней области круга (SVG `fill`), не связан с цветовой схемой `fill` | `string`                           | `'none'`     |
