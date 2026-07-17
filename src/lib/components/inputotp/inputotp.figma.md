---
component: ExtraInputOtp
selector: extra-input-otp
import:
  symbol: ExtraInputOtpComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '318:1373'
  componentKey: 'aa558ffe72b6bf9bdb18f5033e8c63f1336646e1'
  name: '<InputOtp>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraInputOtpComponent` — поле ввода одноразового кода (OTP/PIN) из N отдельных ячеек по одному символу. Поддерживает автопереход фокуса между ячейками, вставку кода целиком, маскирование символов и режим «только цифры». Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<InputOtp>` (nodeId `318:1373`, библиотека «UI Kit (DS) v2.0»). Не путать с `<InputText>`/`<InputNumber>` (одно сплошное поле) и `Password` (скрытый пароль произвольной длины) — OTP всегда фиксированной длины и разбит на ячейки.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `length` | `number` | `4` | Количество ячеек кода — соответствует числу элементов `<InputOtp.Item>` в Figma |
| `mask` | `boolean` | `false` | Маскирование введённых символов (как пароль) |
| `integerOnly` | `boolean` | `false` | Разрешает вводить только цифры |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер ячеек; `large` и `xlarge` маппируются на PrimeNG `pSize="large"` |
| `tabindex` | `number \| null` | `null` | Порядок перехода по Tab |
| `autofocus` | `boolean` | `false` | Автофокус первой ячейки при монтировании |
| `(onChange)` | `EventEmitter<ExtraInputOtpChangeEvent>` | — | Событие изменения значения кода |
| `(onFocus)` | `EventEmitter<Event>` | — | Событие получения фокуса |
| `(onBlur)` | `EventEmitter<Event>` | — | Событие потери фокуса |
| `[(ngModel)]` / `[formControl]` | `string` | `null` | Значение кода через ControlValueAccessor |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.
>
> `disabled` — не объявлен как `@Input`; управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; соответствует Figma-состоянию `state=disabled`.

## Variants

### Default / 4 ячейки (базовое поле)

Figma: `<InputOtp>`, length=4, state=default — nodeId `318:1373`

```html
<extra-input-otp
  [length]="4"
  [(ngModel)]="code"
  name="otp"
></extra-input-otp>
```

### 6 ячеек (SMS-код)

Figma: `<InputOtp>`, length=6, state=default

```html
<extra-input-otp
  [length]="6"
  [(ngModel)]="smsCode"
  name="smsCode"
></extra-input-otp>
```

### Только цифры (integer-only)

Figma: `<InputOtp>`, integerOnly=true, state=default

```html
<extra-input-otp
  [length]="6"
  [integerOnly]="true"
  [(ngModel)]="pin"
  name="pin"
></extra-input-otp>
```

### Маскирование (mask)

Figma: `<InputOtp>`, mask=true, state=default

```html
<extra-input-otp
  [length]="4"
  [mask]="true"
  [(ngModel)]="secretPin"
  name="secretPin"
></extra-input-otp>
```

### Disabled (отключённое поле)

Figma: `<InputOtp>`, state=disabled

```html
<extra-input-otp
  [length]="4"
  [formControl]="disabledControl"
></extra-input-otp>
```

```ts
// Управляется через FormControl:
disabledControl = new FormControl({ value: null, disabled: true });
```

### Large (большой размер ячеек)

Figma: `<InputOtp>`, size=large, state=default

```html
<extra-input-otp
  [length]="6"
  size="large"
  [(ngModel)]="code"
  name="otp"
></extra-input-otp>
```

### С реактивной формой (formControl + валидация)

Figma: `<InputOtp>`, state=danger (невалидное состояние определяется через NgControl автоматически)

```ts
otpControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);
```

```html
<extra-input-otp
  [length]="4"
  [formControl]="otpControl"
></extra-input-otp>
```

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Количество ячеек задаётся через `@Input() length`. Label, подсказку и сообщение об ошибке навешивайте снаружи — через `<extra-form-field>`.

## Related

- [InputText](../inputtext/inputtext.figma.md) — однострочное поле для свободного текста
- [Button](../button/button.figma.md) — кнопка подтверждения кода
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Задавайте `[length]` равным реальной длине кода (4 для PIN, 6 для SMS-кода).
- Включайте `[integerOnly]="true"` для числовых кодов — это блокирует ввод букв.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Используйте `[mask]="true"` для конфиденциальных кодов (например, PIN при подтверждении операции).

**Don't:**
- Не используйте OTP для ввода длинного или произвольного текста — для этого есть [InputText](../inputtext/inputtext.figma.md).
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
- Не меняйте `[length]` динамически после ввода — это сбрасывает уже введённые символы.
