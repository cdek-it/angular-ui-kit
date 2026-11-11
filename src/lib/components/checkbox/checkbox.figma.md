---
component: ExtraCheckbox
selector: extra-checkbox
import:
  symbol: ExtraCheckboxComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '16:13529'
  componentKey: 'ce267dfcda08b2861c4aa2aea4af70194735c9f0'
  name: '<Checkbox>'
status: stable
updated: '2026-11-11'
---

## Overview

`ExtraCheckbox` — флажок для одиночного выбора «да/нет». Компонент сам рендерит подпись (`label`) и пояснение (`caption`) рядом с боксом — внешняя обёртка `<label>` не нужна. Оборачивает PrimeNG `p-checkbox` в бинарном режиме и реализует `ControlValueAccessor`, поэтому работает с `[(ngModel)]` и реактивными формами (`formControl` / `formControlName`).

Компонент соответствует Figma-компоненту `<Checkbox>` (nodeId `16:13529`) с VARIANT-свойствами `state` (default, hover, focus, danger, disabled), `checked` и `indeterminate`. Иконки галочки и минуса в боксе соответствуют DS и не настраиваются — отдельного инпута для иконки нет.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текст названия; без `label` и `caption` рендерится голый бокс без обёртки |
| `labelPosition` | `'right' \| 'left'` | `'right'` | Положение лейбла относительно бокса |
| `caption` | `string` | `''` | Текст пояснения под лейблом |
| `indeterminate` | `boolean` | `false` | Третье состояние «частично выбрано» — Figma `indeterminate=true` |

| Событие | Тип | Описание |
|---------|-----|---------|
| `onChange` | `ExtraCheckboxChangeEvent` (`{ checked: boolean; originalEvent: Event }`) | Срабатывает при изменении состояния пользователем |

Состояние «отмечен» (Figma `checked`) задаётся моделью: `[(ngModel)]`, `formControl` или `formControlName`; значение — `true`/`false`.

`disabled` и `invalid` в спеке не описаны (форма/состояния стек-зависимы, см. `common-info.md`) — управляются через Angular-формы: `disabled` (Figma `state=disabled`) — `FormControl.disable()` или `[disabled]` при `ngModel`, `invalid` (Figma `state=danger`) — вычисляется из `NgControl` (`Validators`).

`id` внутреннего `input` генерируется компонентом (`extra-checkbox-N`) и связан с `label`, задавать его не нужно.

### Есть в спецификации, но ещё не реализовано

`readonly`, `required`, `ariaLabel`, `ariaLabelledBy`, `autofocus`, `tabindex` описаны в [components-api/checkbox.md](../../../../docs/components-api/checkbox.md), но инпутов у `ExtraCheckboxComponent` пока нет — не используйте их в шаблонах.

## Variants

### Default (не отмечен)

Figma: state=default, checked=false, indeterminate=false

```html
<extra-checkbox label="Согласен с условиями" [(ngModel)]="isChecked"></extra-checkbox>
```

### Checked (отмечен)

Figma: state=default, checked=true, indeterminate=false

```html
<extra-checkbox label="Согласен с условиями" [(ngModel)]="isChecked"></extra-checkbox>
```

```ts
isChecked = true;
```

### Indeterminate (частично выбрано)

Figma: state=default, checked=false, indeterminate=true

```html
<extra-checkbox label="Выбрать все" [indeterminate]="someSelected" [(ngModel)]="allSelected"></extra-checkbox>
```

### Disabled (отключён)

Figma: state=disabled

```html
<extra-checkbox label="Недоступно" [formControl]="disabledControl"></extra-checkbox>
```

```ts
disabledControl = new FormControl({ value: false, disabled: true });
```

### Danger / invalid (ошибка)

Figma: state=danger

```html
<extra-checkbox label="Согласен с условиями" [formControl]="acceptControl"></extra-checkbox>
```

```ts
acceptControl = new FormControl(false, Validators.requiredTrue);
```

### С пояснением и лейблом слева

Figma: `<Checkbox>` в шаблоне подписи поля с caption

```html
<extra-checkbox label="Уведомления" caption="Присылать SMS о статусе" labelPosition="left" [(ngModel)]="notify"></extra-checkbox>
```

## Slots

Не используются.

## Related

- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний и `invalid`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraRadiobutton](../radiobutton/radiobutton.figma.md) — та же раскладка label/caption и работа с формами

## Do / Don't

**Do:**
- Задавайте состояние через модель (`[(ngModel)]` / `formControl`)
- Для невалидного состояния используйте валидаторы формы (Figma `state=danger`)
- Используйте `[indeterminate]="true"` только для «частично выбранного» родительского флажка

**Don't:**
- Не передавайте `binary`, `value`, `size`, `variant`, `checkboxIcon`, `inputId` — у обёртки их нет
- Не подменяйте иконку галочки/минуса стилями приложения — она уже соответствует DS
- Не оборачивайте компонент во внешний `<label>` — подпись задаётся через `label`
