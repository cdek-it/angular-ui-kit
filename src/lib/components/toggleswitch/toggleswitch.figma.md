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
updated: '2026-06-22'
---

## Overview

`ExtraToggleSwitch` — переключатель-свитч (`role=switch`) для мгновенного включения/выключения одной бинарной настройки: эффект применяется сразу, без отдельного сохранения. Оборачивает PrimeNG `p-toggleswitch` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

Компонент соответствует Figma-компоненту `<ToggleSwitch>` (nodeId `19:13673`). Figma-свойства `state` и `checked` маппируются на состояние компонента и модель значения (см. раздел Props mapping).

## Props mapping

У компонента нет собственных `@Input()` для конфигурации внешнего вида: состояние задаётся моделью и формой через `ControlValueAccessor`. Доступны три события вывода (`@Output()`):

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `onChange` | `EventEmitter<unknown>` | — | Событие при изменении значения переключателя |
| `onFocus` | `EventEmitter<Event>` | — | Событие при получении фокуса |
| `onBlur` | `EventEmitter<Event>` | — | Событие при потере фокуса |

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

Не используются. Подпись к переключателю размещается рядом во внешнем шаблоне.

## Related

- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — выбор в форме с submit (selection vs activation), похожий маппинг состояний через модель
- [ExtraButton](../button/button.figma.md) — пример компонента с маппингом state-вариантов

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `formControl` для управления состоянием вкл/выкл
- Применяйте свитч для мгновенного эффекта (тёмная тема, уведомления), без отдельной кнопки Save
- Для отключения и невалидного состояния управляйте состоянием формы (`disabled` / валидаторы `formControl`)
- Размещайте подпись рядом с переключателем во внешнем шаблоне для доступности

**Don't:**
- Не задавайте «включён» через отдельный атрибут — состояние идёт только через модель (`[(ngModel)]` / `formControl`)
- Не используйте свитч для действий с подтверждением, необратимых операций или выбора из более чем двух опций
- Не путайте с `ExtraCheckbox` (выбор в форме с submit) и `ToggleButton` (кнопка-переключатель, `aria-pressed`)
