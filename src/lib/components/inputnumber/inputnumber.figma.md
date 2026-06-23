---
component: ExtraInputNumber
selector: extra-input-number
import:
  symbol: ExtraInputNumberComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '320:1754'
  componentKey: '00bb1604181c52a43b1c9357ef8f88ccf882dd59'
  name: '<InputNumber>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraInputNumberComponent` — числовое поле для точного ввода числа с клавиатуры и пошагово через stepper-кнопки (+/−). Поддерживает форматирование (валюта, проценты, разделители разрядов), ограничения диапазона (`min`/`max`) и шаг (`step`). Оборачивает PrimeNG `p-inputNumber` и реализует `ControlValueAccessor`, поэтому работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<InputNumber>` (nodeId `320:1754`, библиотека «UI Kit (DS) v2.0»). Label, подсказка и сообщение об ошибке навешиваются снаружи — через `<extra-input-group>` или `<extra-form-field>`. В отличие от `<InputText>` с `type=number`, поддерживает stepper-кнопки и форматирование.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля |
| `showButtons` | `boolean` | `false` | Показывает stepper-кнопки (+/−) — соответствует Figma-свойству `buttons` |
| `buttonLayout` | `'stacked' \| 'horizontal' \| 'vertical'` | `'stacked'` | Расположение stepper-кнопок (действует при `showButtons=true`) |
| `mode` | `string` (`'decimal' \| 'currency'`) | `'decimal'` | Режим форматирования числа; `currency` включает отображение валюты |
| `currency` | `string \| undefined` | `undefined` | Код валюты (ISO 4217, например `'RUB'`); используется при `mode='currency'` |
| `locale` | `string \| undefined` | `undefined` | Локаль форматирования (например `'ru-RU'`) |
| `placeholder` | `string` | `''` | Подсказка при пустом поле — соответствует Figma-свойствам `text-placeholder` / `has-placeholder` |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `fluid` | `boolean` | `false` | Растягивает поле на всю ширину контейнера |
| `min` | `number \| undefined` | `undefined` | Минимальное допустимое значение |
| `max` | `number \| undefined` | `undefined` | Максимальное допустимое значение |
| `step` | `number` | `1` | Шаг изменения при нажатии stepper-кнопок |
| `prefix` | `string \| undefined` | `undefined` | Текст перед числом — соответствует Figma-свойствам `show-text-prefix` / `text-prefix` |
| `suffix` | `string \| undefined` | `undefined` | Текст после числа — соответствует Figma-свойствам `show-text-suffix` / `text-suffix` |
| `minFractionDigits` | `number \| undefined` | `undefined` | Минимальное число знаков после запятой |
| `maxFractionDigits` | `number \| undefined` | `undefined` | Максимальное число знаков после запятой |
| `useGrouping` | `boolean` | `true` | Группировка разрядов (разделитель тысяч) |
| `incrementButtonIcon` | `string \| undefined` | `undefined` | CSS-класс иконки кнопки «+»; по умолчанию используется встроенная SVG-иконка плюса |
| `decrementButtonIcon` | `string \| undefined` | `undefined` | CSS-класс иконки кнопки «−»; по умолчанию используется встроенная SVG-иконка минуса |
| `(onInput)` | `EventEmitter<{ value: number \| null }>` | — | Событие при изменении значения |
| `[(ngModel)]` / `[formControl]` | `number \| null` | `null` | Значение поля через ControlValueAccessor — соответствует Figma-свойству `text-inputnumber` |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

> `disabled` — управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; компонент не объявляет `@Input() disabled`. Соответствует Figma-состоянию `state=disabled`.

## Variants

### Default / Base (базовое поле)

Figma: `<InputNumber>`, state=default, buttons=false, has-placeholder=true — nodeId `320:1780`

```html
<extra-input-number
  placeholder="0"
  [(ngModel)]="value"
  name="amount"
></extra-input-number>
```

### Со stepper-кнопками (buttons)

Figma: `<InputNumber>`, state=default, buttons=true, has-placeholder=true — nodeId `379:1793`

```html
<extra-input-number
  [showButtons]="true"
  [min]="0"
  [max]="100"
  [step]="1"
  [(ngModel)]="quantity"
  name="quantity"
></extra-input-number>
```

### Валюта (currency)

Figma: `<InputNumber>`, state=default, show-text-suffix=true — nodeId `320:1780`

```html
<extra-input-number
  mode="currency"
  currency="RUB"
  locale="ru-RU"
  [(ngModel)]="price"
  name="price"
></extra-input-number>
```

### С префиксом и суффиксом (prefix / suffix)

Figma: `<InputNumber>`, state=default, show-text-prefix=true, show-text-suffix=true — nodeId `320:1780`

```html
<extra-input-number
  prefix="₽ "
  suffix=" /шт"
  [(ngModel)]="value"
  name="cost"
></extra-input-number>
```

### Disabled (отключённое поле)

Figma: `<InputNumber>`, state=disabled, buttons=false — nodeId `320:1755`

```html
<extra-input-number
  placeholder="Недоступно"
  [formControl]="disabledControl"
></extra-input-number>
```

```ts
disabledControl = new FormControl({ value: 0, disabled: true });
```

### Readonly (только для чтения)

Figma: `<InputNumber>`, state=readonly, buttons=false — nodeId `14980:33596`

```html
<extra-input-number
  [readonly]="true"
  [(ngModel)]="readonlyValue"
  name="roField"
></extra-input-number>
```

### С реактивной формой (formControl + валидация)

Figma: `<InputNumber>`, state=danger — nodeId `320:1761` (невалидное состояние определяется через NgControl автоматически)

```ts
amountControl = new FormControl<number | null>(null, [
  Validators.required,
  Validators.min(1),
]);
```

```html
<extra-input-number
  placeholder="0"
  [formControl]="amountControl"
></extra-input-number>
```

### Fluid / Large (на всю ширину, большой размер)

Figma: `<InputNumber>`, state=default

```html
<extra-input-number
  size="large"
  [fluid]="true"
  placeholder="0"
  [(ngModel)]="value"
  name="wideField"
></extra-input-number>
```

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Иконки stepper-кнопок настраиваются через `incrementButtonIcon` / `decrementButtonIcon`. Для добавления внешних prefix/suffix-иконок используйте `<extra-input-group>` — см. [inputtext.figma.md](../inputtext/inputtext.figma.md).

## Related

- [InputText](../inputtext/inputtext.figma.md) — однострочное текстовое поле (`type=number` без stepper и форматирования)
- [Button](../button/button.figma.md) — кнопка действия
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Задавайте `[min]` и `[max]` для ограничения диапазона и `[step]` для шага stepper-кнопок.
- Для денежных значений используйте `mode="currency"` с `currency` и `locale` вместо ручного `suffix`.
- Используйте `[fluid]="true"` в формах на всю ширину и мобильных макетах.
- Оберните поле в `<extra-form-field>` или `<extra-input-group>` для добавления label, подсказки и сообщения об ошибке.

**Don't:**
- Не подменяйте `value` через прямой DOM — теряется `dirty`-state и Angular-реактивность.
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
- Не применяйте `mode="currency"` без `currency` — валюта не отобразится корректно.
