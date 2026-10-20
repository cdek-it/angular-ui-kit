---
component: ExtraToggleSwitch
selector: extra-toggleswitch
import:
  symbol: ExtraToggleSwitchComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '19:13673'
  componentKey: 'd40b5a42d528dd153d39b16be43311aae73a0e42'
  name: '<ToggleSwitch>'
status: stable
updated: '2026-10-20'
---

## Overview

`ExtraToggleSwitch` — переключатель-свитч (`role=switch`) для мгновенного включения/выключения одной бинарной настройки: эффект применяется сразу, без отдельного сохранения. Оборачивает PrimeNG `p-toggleswitch`, сам рисует `label`/`caption` рядом с собой (как `ExtraCheckbox`) и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

Компонент соответствует Figma-компоненту `<ToggleSwitch>` (nodeId `19:13673`). Figma-свойства `state` и `checked` маппируются на состояние компонента и модель значения (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текст названия рядом с переключателем |
| `labelPosition` | `'right' \| 'left'` | `'right'` | Положение лейбла относительно свитча |
| `caption` | `string` | `''` | Пояснение под лейблом |
| `ariaLabel` | `string \| undefined` | `undefined` | Доступное имя; обязателен, когда свитч используется без `label` |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Идентификатор элемента с меткой для доступности |
| `onChange` | `EventEmitter<ExtraToggleSwitchChangeEvent>` | — | Событие при изменении значения переключателя |
| `onFocus` | `EventEmitter<Event>` | — | Событие при получении фокуса |
| `onBlur` | `EventEmitter<Event>` | — | Событие при потере фокуса |

Если ни `label`, ни `caption` не заданы — рендерится голый свитч без обёртки (тот же приём, что у
`ExtraCheckbox`/полей ввода, важно для `p-inputgroup` и плотных layout'ов). В этом режиме задавайте
`ariaLabel` — иначе у свитча нет доступного имени.

`ariaLabel`/`ariaLabelledBy` — полезные пропы сверх базовой спеки (`docs/components-api/toggleswitch.md`),
добавлены по итогам доработки (см. чеклист в корневом `CLAUDE.md`, п.3).

Состояние «включён» (Figma-свойство `checked`) задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`: используйте `[(ngModel)]`, `formControl` или `formControlName`. Значение `true` / `false` соответствует `checked=true` / `checked=false` в Figma.

Отключённое состояние (Figma `state=disabled`) задаётся не отдельным инпутом, а через форму: атрибут `[disabled]` на `formControl` или `disabled`-состояние реактивной формы передаётся в компонент методом `setDisabledState` из `ControlValueAccessor`.

Невалидное состояние (Figma `state=danger`) выводится автоматически из состояния валидации связанного `NgControl` (`ngControl.invalid`) и отдельным инпутом не задаётся.

## Variants

### Off (выключен, по умолчанию)

Figma: state=default, checked=false

```html
<extra-toggleswitch [(ngModel)]="isEnabled"></extra-toggleswitch>
```

### On (включён)

Figma: state=default, checked=true

```html
<extra-toggleswitch [(ngModel)]="isEnabled"></extra-toggleswitch>
```

### С лейблом и пояснением

```html
<extra-toggleswitch
  [(ngModel)]="isEnabled"
  label="Тёмная тема"
  caption="Применяется сразу для всех устройств"
></extra-toggleswitch>

<!-- лейбл слева от свитча -->
<extra-toggleswitch [(ngModel)]="isEnabled" label="Тёмная тема" labelPosition="left"></extra-toggleswitch>
```

В реактивных формах эквивалентно:

```html
<extra-toggleswitch [formControl]="darkThemeControl"></extra-toggleswitch>
```

### Disabled (отключён)

Figma: state=disabled, checked=false

Отключение задаётся через состояние формы, а не через атрибут на компоненте:

```html
<extra-toggleswitch [formControl]="disabledControl"></extra-toggleswitch>
```

### Danger / invalid (невалидное состояние)

Figma: state=danger, checked=false

Подсветка как невалидного поля выводится автоматически из состояния валидации связанного `formControl`:

```html
<extra-toggleswitch [formControl]="requiredConsentControl"></extra-toggleswitch>
```

## Slots

Не используются. `label`/`caption` — не слоты, а обычные `@Input()` (см. Props mapping); компонент
сам рисует обёртку по тому же принципу, что `ExtraCheckbox`/`ExtraInputText` (см.
`docs/components-api/common-info.md` и чеклист в корневом `CLAUDE.md`, раздел «Label / caption /
info»). Раскладка и типографика обёртки живут в `tokens/components/toggleswitch.ts` — там же, где
focus-ring, и повторяют `checkbox.ts`.

## Related

- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — выбор в форме с submit (selection vs activation), похожий маппинг состояний через модель
- [ExtraButton](../button/button.figma.md) — пример компонента с маппингом state-вариантов

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `formControl` для управления состоянием вкл/выкл
- Применяйте свитч для мгновенного эффекта (тёмная тема, уведомления), без отдельной кнопки Save
- Для отключения и невалидного состояния управляйте состоянием формы (`disabled` / валидаторы `formControl`)
- Задавайте подпись через `label`/`caption` — так `<label [for]>` связывается с полем автоматически
- Для свитча без подписи задавайте `ariaLabel` — иначе у него нет доступного имени

**Don't:**
- Не задавайте «включён» через отдельный атрибут — состояние идёт только через модель (`[(ngModel)]` / `formControl`)
- Не используйте свитч для действий с подтверждением, необратимых операций или выбора из более чем двух опций
- Не путайте с `ExtraCheckbox` (выбор в форме с submit) и `ToggleButton` (кнопка-переключатель, `aria-pressed`)
