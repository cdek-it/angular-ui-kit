[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v3.0?node-id=437-3505&m=dev)

# ExtraInputGroup

Контейнер объединяет поле ввода с аддонами слева, справа или с обеих сторон. Поле и аддоны передаются через content projection. Контейнер не реализует ControlValueAccessor и не отправляет события: Angular Forms подключается к вложенному полю.

| Свойство        | Тип                                        | По умолчанию | Поведение                                                                                                       |
| --------------- | ------------------------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `size`          | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'`     | Размер группы и иконок аддонов. Для `extra-input-text` внутри группы задаёт отступы, типографику и высоту поля. |
| `addonPosition` | `'left' \| 'right' \| 'both'`              | `'left'`     | CSS-класс-хук; не меняет порядок проекции.                                                                      |

Положение и внешние скругления определяются фактическим порядком элементов в шаблоне. Размер вложенного поля рекомендуется задавать таким же, как у группы. Ширина группы заполняет контейнер, поле занимает место между аддонами; задавайте `[fluid]="true"` у поля. Лейбл и подпись размещайте снаружи группы.

# ExtraInputGroupAddon

| Свойство   | Тип                   | По умолчанию | Поведение                                      |
| ---------- | --------------------- | ------------ | ---------------------------------------------- |
| `position` | `'left' \| 'right'`   | `'left'`     | CSS-класс-хук, не переставляет аддон.          |
| `type`     | `'text' \| 'icon'`    | `'text'`     | Текст из проекции либо декоративная иконка.    |
| `icon`     | `string \| undefined` | `undefined`  | Классы Tabler, используются при `type="icon"`. |

У аддона нет собственного `disabled`: состояние берётся у вложенного поля. Например, `FormControl.disable()` отключает поле и меняет фон и цвет аддонов. Иконка имеет `aria-hidden="true"`; доступное имя задаётся на поле через `label`, `ariaLabel` или `ariaLabelledBy`.

```html
<extra-input-group size="base" addonPosition="both">
  <extra-input-group-addon position="left" type="icon" icon="ti ti-user"></extra-input-group-addon>
  <extra-input-text
    size="base"
    [formControl]="control"
    [fluid]="true"
    ariaLabel="Имя пользователя"
    placeholder="Placeholder"
  ></extra-input-text>
  <extra-input-group-addon position="right" type="text">text</extra-input-group-addon>
</extra-input-group>
```

`control` создаётся в компоненте приложения как `new FormControl('')`. Поддерживаются также `formControlName` и `ngModel` на вложенном поле. Контейнер не меняет значение, валидаторы, touched/dirty и события поля.

В Figma размеры задаются коллекцией `sizing`: геометрия группы без внешней обводки — 34/40/48/54 px; иконки — 14/16/18/20 px. Обводка 1 px располагается снаружи и не увеличивает layout-размер. Иконочный аддон имеет ширину 36 px, текстовый растёт по содержимому с горизонтальными отступами 10 px. Текст аддона — Noto Sans Regular 16/18, внешние углы — 10 px. Цвета переключаются вместе с темой.

Stories: [Default](http://localhost:6007/?path=/story/components-form-inputgroup--default), [Disabled](http://localhost:6007/?path=/story/components-form-inputgroup--disabled), [WithText](http://localhost:6007/?path=/story/components-form-inputgroup--with-text), [AddonRight](http://localhost:6007/?path=/story/components-form-inputgroup--addon-right), [AddonBoth](http://localhost:6007/?path=/story/components-form-inputgroup--addon-both). Размер переключается в Controls; исходный example xlarge сохранён.
