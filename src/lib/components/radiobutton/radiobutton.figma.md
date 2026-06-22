---
component: ExtraRadiobutton
selector: extra-radiobutton
import:
  symbol: ExtraRadiobuttonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'HOLKdvQJ8jCLeX17s9d0Yf'
  nodeId: '17:13535'
  componentKey: 'b2f1d57bdcaefad98286b9316272c0b64bb268d8'
  name: '<RadioButton>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraRadiobutton` — радиокнопка для выбора ровно одного варианта из взаимоисключающей группы. Внутри группы радиокнопки объединяются общим `name`, выбор одиночный, снять выбор нельзя. Оборачивает PrimeNG `p-radiobutton` и реализует `ControlValueAccessor`, поэтому работает с `[(ngModel)]` и реактивными формами (`formControl` / `formControlName`).

Компонент соответствует Figma-компоненту `<RadioButton>` (nodeId `17:13535`) с VARIANT-свойствами `state` (default, focus, hover, danger, disabled) и `checked` (false, true).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `any` | `null` | Значение, которое получит модель при выборе этой радиокнопки |
| `name` | `string \| undefined` | `undefined` | Имя группы; одинаковое значение объединяет радиокнопки во взаимоисключающую группу |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-свойству `state=disabled` |
| `invalid` | `boolean` | `false` | Признак невалидности — соответствует Figma-свойству `state=danger` |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | Вариант оформления контрола |
| `size` | `'small' \| 'base' \| 'large'` | `'base'` | Размер радиокнопки |
| `inputId` | `string \| undefined` | `undefined` | `id` нативного `input`; используется для связи с внешним `<label for="...">` |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | `id` элемента, выступающего меткой для скринридера |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |

Состояния `state=focus` и `state=hover` в Figma — интерактивные, отдельных `@Input` не имеют и воспроизводятся браузером автоматически. Состояние `checked` в Figma управляется значением модели через `[(ngModel)]` / `formControl`, а не отдельным `@Input`.

## Variants

### Default (невыбранная)

Figma: `<RadioButton>`, state=default, checked=false — nodeId `17:13535`

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  [(ngModel)]="selected"
></extra-radiobutton>
```

### Checked (выбранная)

Figma: `<RadioButton>`, state=default, checked=true

Выбранное состояние задаётся равенством `value` и значения модели (`selected === 'option1'`).

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  [(ngModel)]="selected"
></extra-radiobutton>
```

### Группа вариантов

Figma: `<RadioButton>`, общий `name`, одиночный выбор внутри группы

```html
<extra-radiobutton value="pickup" name="delivery" [(ngModel)]="selected"></extra-radiobutton>
<extra-radiobutton value="courier" name="delivery" [(ngModel)]="selected"></extra-radiobutton>
<extra-radiobutton value="post" name="delivery" [(ngModel)]="selected"></extra-radiobutton>
```

### Disabled (отключённая)

Figma: `<RadioButton>`, state=disabled

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  [disabled]="true"
  [(ngModel)]="selected"
></extra-radiobutton>
```

### Invalid / Danger (невалидная)

Figma: `<RadioButton>`, state=danger

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  [invalid]="true"
  [(ngModel)]="selected"
></extra-radiobutton>
```

### Filled (залитый вариант)

Figma: `<RadioButton>`, variant=filled

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  variant="filled"
  [(ngModel)]="selected"
></extra-radiobutton>
```

### Large (крупный размер)

Figma: `<RadioButton>`, size=large

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  size="large"
  [(ngModel)]="selected"
></extra-radiobutton>
```

### Реактивная форма (formControl)

Figma: `<RadioButton>`, общий `name`, одиночный выбор внутри группы

```html
<extra-radiobutton value="pickup" name="delivery" [formControl]="deliveryControl"></extra-radiobutton>
<extra-radiobutton value="courier" name="delivery" [formControl]="deliveryControl"></extra-radiobutton>
```

## Slots

Не используются. Метка к радиокнопке добавляется внешним `<label [attr.for]="inputId">` или композитным шаблоном `Label.Radio`.

## Related

- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний (danger, disabled)
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`pi pi-*`)
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraInputText](../inputtext/inputtext.figma.md) — текстовое поле формы
- [ExtraButton](../button/button.figma.md) — кнопка действия

## Do / Don't

**Do:**
- Объединяйте радиокнопки одной группы общим `name` и связывайте с одной моделью через `[(ngModel)]` или `formControl`
- Используйте радиокнопки, когда нужно выбрать ровно один из взаимоисключающих вариантов
- Задавайте `inputId` и связывайте с внешней меткой `<label>` для доступности и кликабельности подписи
- Применяйте `[invalid]="true"` для подсветки ошибки валидации формы

**Don't:**
- Не используйте радиокнопки для множественного выбора — для этого есть Checkbox
- Не оставляйте радиокнопку без видимой метки — подпись обязательна
- Не пытайтесь снять выбор у радиокнопки повторным кликом: одиночный выбор в группе снять нельзя
- Не задавайте разный `name` радиокнопкам одной группы — они перестанут быть взаимоисключающими
