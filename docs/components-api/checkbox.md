[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=16-13529&m=dev)

# ExtraCheckbox

> ✅ **Реализован**: `ExtraCheckboxComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

| Свойство         | Описание                                        | Типизация       | По умолчанию |
| ---------------- | ----------------------------------------------- | --------------- | ------------ |
| `label`          | текст названия поля                             | `string`        | `''`         |
| `labelPosition`  | положение лейбла                                | `left \| right` | `right`      |
| `caption`        | текст пояснения под лейблом                     | `string`        | `''`         |
| `indeterminate`  | возможно ли третье состояние (частично выбрано) | `boolean`       | `false`      |
| `readonly`       | только для чтения                               | `boolean`       | `false`      |
| `required`       | поле обязательно для заполнения                 | `boolean`       | `false`      |
| `ariaLabel`      | метка для программ экранного доступа            | `string`        | —            |
| `ariaLabelledBy` | `id` внешнего элемента-метки для доступности    | `string`        | —            |
| `autofocus`      | автофокус при монтировании компонента           | `boolean`       | `false`      |
| `tabindex`       | порядок перехода по Tab                         | `number`        | —            |

# Стекозависимые пропсы

| Описание           | Angular                                         | Vue          | React     | Типизация | По умолчанию |
| ------------------ | ----------------------------------------------- | ------------ | --------- | --------- | ------------ |
| состояние чекбокса | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `checked` | `boolean` | `false`      |

# События

| Событие    | Описание                            | Типизация                                   |
| ---------- | ----------------------------------- | ------------------------------------------- |
| `onChange` | срабатывает при изменении состояния | `(event: ExtraCheckboxChangeEvent) => void` |

# ExtraCheckboxChangeEvent

Событие изменения состояния, передаётся в `onChange`.

| Свойство        | Описание           | Типизация |
| --------------- | ------------------ | --------- |
| `checked`       | состояние чекбокса | `boolean` |
| `originalEvent` | исходное событие   | `Event`   |

## Формы и доступность

Компонент работает в бинарном режиме: значение формы — `boolean`. `disabled` управляется через FormControl; невалидное поле подсвечивается после touched или dirty. `[required]="true"` проверяет `Validators.requiredTrue`. Blur отмечает контрол touched; внешние изменения значения и disabled обновляют OnPush-представление.

Label связан с input автоматически; caption отображает общий `ExtraCaptionComponent` и связан через `aria-describedby`. Без label доступное имя по умолчанию — «Выбор». `ariaLabel` и `ariaLabelledBy` позволяют задать собственное имя.

```html
<extra-checkbox
  [formControl]="acceptControl"
  label="Согласен с условиями"
  caption="Подтвердите согласие"
  [required]="true"
  (onChange)="onAcceptChange($event)"
></extra-checkbox>
```
