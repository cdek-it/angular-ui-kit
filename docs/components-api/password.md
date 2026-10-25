[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-5881&m=dev)

# ExtraPassword

> ✅ **Реализован**: `ExtraPasswordComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство         | Описание                                                                      | Типизация                          | По умолчанию |
| ---------------- | ----------------------------------------------------------------------------- | ---------------------------------- | ------------ |
| `placeholder`    | текст подсказки внутри поля                                                   | `string`                           | —            |
| `label`          | текст названия поля                                                           | `string`                           | `''`         |
| `labelPosition`  | положение лейбла                                                              | `top \| left`                      | `top`        |
| `floatLabel`     | плавающий лейбл внутри поля (перекрывает `labelPosition`)                     | `boolean`                          | `false`      |
| `toggleMask`     | отображать иконку для переключения видимости пароля                           | `boolean`                          | `false`      |
| `feedback`       | отображать панель с индикатором сложности и подсказками                       | `boolean`                          | `true`       |
| `caption`        | текст пояснения под полем                                                     | `string`                           | `''`         |
| `info`           | текст с доп. информацией (показывается в тултипе иконки ti-info-circle)       | `string`                           | `''`         |
| `size`           | размер поля                                                                   | `small \| base \| large \| xlarge` | `base`       |
| `readonly`       | только для чтения                                                             | `boolean`                          | `false`      |
| `required`       | поле обязательно для заполнения                                               | `boolean`                          | `false`      |
| `name`           | имя поля (нативный атрибут `name`); используется браузером для автозаполнения | `string`                           | —            |
| `autocomplete`   | значение нативного атрибута `autocomplete`                                    | `string`                           | —            |
| `maxLength`      | максимальное количество символов                                              | `number`                           | —            |
| `ariaLabel`      | метка для программ экранного доступа                                          | `string`                           | —            |
| `ariaLabelledBy` | `id` внешнего элемента-метки для доступности                                  | `string`                           | —            |
| `autofocus`      | автофокус при монтировании компонента                                         | `boolean`                          | `false`      |
| `tabindex`       | порядок перехода по Tab                                                       | `number`                           | —            |

# Стекозависимые пропсы

| Описание      | Angular                                         | Vue          | React   | Типизация | По умолчанию |
| ------------- | ----------------------------------------------- | ------------ | ------- | --------- | ------------ |
| значение поля | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `value` | `string`  | `null`       |
