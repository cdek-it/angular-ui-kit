---
component: ExtraInputOtp
selector: extra-input-otp
import:
  symbol: ExtraInputOtpComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '24774:687'
  name: '<InputOtp>'
status: stable
updated: '2026-11-17'
---

## Модель и состояния

`ExtraInputOtpComponent` — поле одноразового кода из отдельных ячеек. Поддерживает `[(ngModel)]`, `formControl` и `formControlName`. Значение модели — `string | null`, изменение пользователем вызывает `onChange` с `{ value, originalEvent }`. Полный список двенадцати входов — в [API](../../../../docs/components-api/inputotp.md).

| Figma                            | Angular                                       |
| -------------------------------- | --------------------------------------------- |
| `set=default`                    | `length=4`                                    |
| `set=6`                          | `length=6`                                    |
| `state=disabled`                 | Отключённый FormControl                       |
| `state=danger`                   | Невалидная touched/dirty форма                |
| `state=hover/focus/danger-focus` | Нативное наведение/фокус                      |
| `text-number`, `show-text-input` | Строковое значение формы либо пустое значение |

```html
<extra-input-otp
  [formControl]="code"
  [length]="6"
  [integerOnly]="true"
  autocomplete="one-time-code"
  ariaLabel="Код подтверждения"
  (onChange)="onCodeChange($event)"
></extra-input-otp>
```

`mask` задаёт password-type каждой ячейки, `integerOnly` допускает только цифры. Вставка обрезается до length, проверяется целиком в integerOnly и вызывает одно событие. В readonly/disabled вставка не меняет значение. Смена length повторно отображает текущую модель после обновления ячеек; внешний setValue не вызывает onChange. Blur отмечает контрол touched даже без ввода. Required проверяет наличие непустой строки через Validators.required, а не полноту кода.

## Геометрия

Live Figma: set 24774:687, item set 318:1315. Базовая ячейка 36×36, radius 10, расстояние 8; строка из четырёх ячеек 168×36, из шести — 256×36. Noto Sans Regular 14/18. У обычной и danger-ячейки stroke снаружи: реализован outline 1 без изменения layout. Focus и danger-focus заменяют stroke единственным внешним кольцом 2. Disabled имеет opacity 0.5 и сохраняет цвет текста.

В Figma все экземпляры sizing small/base/large/xlarge используют фиксированную базовую ячейку 36 и фиксированный текст 14/18. Экспорт компонентов при этом содержит отдельные API размеры: small 28, base 36, large 40; они применяются и покрыты проверками в обеих темах. Small сохраняет radius 8 прежней реализации. `xlarge` не входит в API. Общие InputText и semantic tokens не меняются.

## Доступность и совместимость

Каждая ячейка получает name, autocomplete, ariaLabel/ariaLabelledBy, aria-required и tabindex. Доступное имя по умолчанию — «Одноразовый код». Disabled исключается из Tab-порядка и не получает autofocus.

PrimeNG может принимать length+1 символ при вставке, поэтому paste обрабатывается capture-listener обёртки до обработчика PrimeNG. Listener удаляется вместе с компонентом. Autofocus из ранее влитого PR #165 сохранён.

В stories переменная внешней формы названа fieldControl: имя control совпадает с внутренним публичным контролом обёртки и приводит к рекурсии при передаче props через Storybook. Все пять исходных example-файлов сохранены с тем же исправлением, описания из main не переформулированы.
