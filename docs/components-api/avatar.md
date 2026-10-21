[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=484-4972&m=dev)

# ExtraAvatar

> ✅ **Реализован**: `ExtraAvatarComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Представление пользователя.

| Свойство   | Описание                            | Типизация                                         |
| ---------- | ----------------------------------- | ------------------------------------------------- |
| `size`     | размер аватара                      | `base \| large \| xlarge`                         |
| `shape`    | форма                               | `square \| circle`                                |
| `image`    | изображение                         | `string`                                          |
| `label`    | текст/инициалы                      | `string`                                          |
| `icon`     | класс иконки tabler icon            | `string`                                          |
| `badge`    | отображать значок (`Badge`)         | `string`                                          |
| `severity` | цветовая схема значка (при `badge`) | `primary \| success \| info \| warning \| danger` |

# ExtraAvatarGroup

Группа аватаров с перекрытием (стек). Дочерние `ExtraAvatar` передаются как есть — своих свойств у группы нет.

```html
<extra-avatar-group>
  <extra-avatar image="..." shape="circle"></extra-avatar>
  <extra-avatar image="..." shape="circle"></extra-avatar>
  <extra-avatar label="+2" shape="circle"></extra-avatar>
</extra-avatar-group>
```
