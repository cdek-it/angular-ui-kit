---
component: ExtraInputNumber
selector: extra-input-number
import:
  symbol: ExtraInputNumberComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '320:1754'
  name: '<InputNumber>'
status: stable
updated: '2026-11-17'
---

## Модель и входы

Числовое поле реализует ControlValueAccessor и работает через `[(ngModel)]`, `formControl` и `formControlName`. Модель — `number | null`; строка форматируется внутри PrimeNG. Полный список 33 входов и двух событий — в [API](../../../../docs/components-api/inputnumber.md).

| Figma                        | Angular                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| `buttons`                    | `showButtons`; макет соответствует `buttonLayout="horizontal"` |
| `has-float-label`            | `floatLabel`                                                   |
| `has-placeholder`            | Пустая или заполненная модель                                  |
| `show-clear`                 | `clearable` для доступного редактирования                      |
| `show-text-prefix/suffix`    | `prefix` / `suffix`                                            |
| `state=disabled`             | FormControl.disable()                                          |
| `state=readonly`             | `readonly`                                                     |
| `state=danger`               | Невалидная touched/dirty форма                                 |
| `is-required`                | `required`: маркер и Validators.required                       |
| `show-label/caption`         | Непустые `label` / `caption`                                   |
| `_<CaptionSeverity>.variant` | `captionSeverity`                                              |

```html
<extra-input-number
  [formControl]="amount"
  label="Количество"
  caption="Введите число"
  [showButtons]="true"
  buttonLayout="horizontal"
  [min]="0"
  [step]="1"
></extra-input-number>
```

Внешнее значение и disabled обновляют OnPush-представление. Ввод, кнопки и ArrowUp/ArrowDown обновляют форму; `onInput` содержит число, форматированную строку и исходное событие. Ограничение min/max при blur передаётся обратно во внешнюю форму. Blur отмечает контрол touched. Очистка поддерживает ноль и возвращает `null`, вызывает `onClear`; кнопка доступна с клавиатуры и имеет доступное имя.

## Геометрия

Live Figma: 48 вариантов InputNumber и 6 вариантов внутренних кнопок. Размеры проверены по коллекции sizing и реальным экземплярам страницы:

| size   | Высота | Шрифт / интерлиньяж | Padding Y / X |
| ------ | ------ | ------------------- | ------------- |
| small  | 36     | 14 / 14             | 10 / 12       |
| base   | 42     | 16 / 16             | 12 / 12       |
| large  | 50     | 18 / 20             | 14 / 12       |
| xlarge | 56     | 20 / 26             | 14 / 12       |

Радиус 10, ширина по умолчанию 240. Label и Caption 14/14, расстояние между ними и полем 4. Кнопки горизонтального варианта шириной 32 с Tabler plus/minus 16; высота следует размеру поля. Stacked и vertical сохранены как варианты API.

FloatLabel имеет высоту 56 независимо от size. В покое и при пустой модели label 14/20 на y=16, placeholder скрыт; при заполнении label 12/14 на y=12. Кнопки поддерживаются вместе с FloatLabel по Figma. Общие стили InputText и FloatLabel не меняются: переопределения ограничены InputNumber.

## Известные отличия

Один disabled + buttons + empty + float экземпляр Figma имеет ширину 250 вместо общей 240; используется 240. В двух danger + buttons + float вариантах border привязан к цвету label вместо цвета рамки, что различается в dark; используется единый `color.border.status.danger.strong`.

Макет содержит текст «InputNumber» в заполненном числовом поле; реальный компонент отображает числовое значение. Общий Caption имеет известное недостаточное соотношение контраста; это записано отдельно в отчёте проверки. Существующие описания stories сохранены из main по правилу проекта и могут содержать прежнее ограничение FloatLabel/showButtons; актуальное поведение описано здесь.
