[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=174-1363&m=dev)

# ExtraToggleButton

> ✅ **Реализован**: `ExtraToggleButtonComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Кнопка с двумя состояниями (вкл/выкл). Текущее состояние — это значение (привязка через модель), читается через событие `onChange`.

| Свойство         | Описание                                           | Типизация                          | По умолчанию |
| ---------------- | -------------------------------------------------- | ---------------------------------- | ------------ |
| `label`          | текст кнопки                                       | `string`                           | `''`         |
| `icon`           | класс иконки tabler icon                           | `string`                           | `''`         |
| `iconPosition`   | положение иконки                                   | `left \| right`                    | `left`       |
| `size`           | размер кнопки                                      | `small \| base \| large \| xlarge` | `base`       |
| `iconOnly`       | режим «только иконка» без текста                   | `boolean`                          | `false`      |
| `allowEmpty`     | разрешает снимать выбор повторным нажатием         | `boolean`                          | `true`       |
| `fluid`          | растяжение кнопки на всю ширину контейнера         | `boolean`                          | `false`      |
| `ariaLabel`      | метка для программ экранного доступа               | `string`                           | —            |
| `ariaLabelledBy` | `id` внешнего элемента-метки для доступности       | `string`                           | —            |
| `inputId`        | id внутреннего элемента для связки с `<label for>` | `string`                           | —            |
| `tabindex`       | порядок перехода по Tab                            | `number`                           | —            |
| `autofocus`      | автофокус при монтировании компонента              | `boolean`                          | `false`      |
| `required`       | поле обязательно для заполнения                    | `boolean`                          | `false`      |

# Стекозависимые пропсы

| Описание         | Angular                                         | Vue          | React     | Типизация | По умолчанию |
| ---------------- | ----------------------------------------------- | ------------ | --------- | --------- | ------------ |
| состояние кнопки | `ngModel` \| `formControl` \| `formControlName` | `modelValue` | `checked` | `boolean` | `false`      |

# События

| Событие    | Описание                     | Типизация                                       |
| ---------- | ---------------------------- | ----------------------------------------------- |
| `onChange` | срабатывает при переключении | `(event: ExtraToggleButtonChangeEvent) => void` |

# ExtraToggleButtonChangeEvent

| Свойство        | Описание                   | Типизация |
| --------------- | -------------------------- | --------- |
| `checked`       | новое состояние (вкл/выкл) | `boolean` |
| `originalEvent` | исходное событие           | `Event`   |

## Формы и доступность

Значение и отключение задаются через форму, отдельных inputs `checked` и `disabled` нет:

```typescript
control = new FormControl({ value: false, disabled: false }, { nonNullable: true });
```

```html
<extra-togglebutton label="Подписка" [formControl]="control"></extra-togglebutton>
```

`required=true` требует именно `true` (`Validators.requiredTrue`). Невалидное состояние показывается после touched/dirty; `allowEmpty=false` запрещает повторным нажатием снять выбор. Отключённая кнопка исключается из порядка Tab и не переключается мышью, Enter или Space.

`inputId` назначается интерактивному элементу с `role="button"`. `autofocus=true` фокусирует его после первого рендера, если форма не отключена. В `iconOnly` укажите `ariaLabel` или `ariaLabelledBy`; если `ariaLabel` не задан, для доступного имени используется скрытый `label`.

## Геометрия

| Размер | Высота / сторона icon-only | Текст / line-height | Иконка | Padding текста |
| ------ | -------------------------- | ------------------- | ------ | -------------- |
| small  | 36 px                      | 14 / 18 px          | 16 px  | 8 px 14 px     |
| base   | 42 px                      | 16 / 24 px          | 20 px  | 8 px 14 px     |
| large  | 50 px                      | 18 / 24 px          | 24 px  | 12 px 24 px    |
| xlarge | 56 px                      | 18 / 26 px          | 24 px  | 14 px 24 px    |

В focus-вариантах Figma у текстовых кнопок обводка заменяется внешними тенями, поэтому размер рамки по каждой оси на 2 px меньше (34/40/48/54 px по высоте). Icon-only сохраняет фиксированную сторону. Поведение воспроизведено через `:focus-visible`; при мышином наведении используются hover-токены.
