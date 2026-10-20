---
component: ExtraRadiobutton
selector: extra-radiobutton
import:
  symbol: ExtraRadiobuttonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '17:13535'
  componentKey: 'b2f1d57bdcaefad98286b9316272c0b64bb268d8'
  name: '<RadioButton>'
status: stable
updated: '2026-09-04'
---

## Overview

`ExtraRadiobutton` — радиокнопка для выбора ровно одного варианта из взаимоисключающей группы. Внутри группы радиокнопки объединяются общим `name` и одной моделью, выбор одиночный, снять выбор нельзя. Компонент сам рендерит подпись (`label`) и пояснение (`caption`) рядом с контролом — не требует внешней обёртки `<label>`. Оборачивает PrimeNG `p-radiobutton` и реализует `ControlValueAccessor`, поэтому работает с `[(ngModel)]` и реактивными формами (`formControl` / `formControlName`).

Компонент соответствует Figma-компоненту `<RadioButton>` (nodeId `17:13535`) с VARIANT-свойствами `state` (default, focus, hover, danger, disabled) и `checked` (false, true). У самого radio-индикатора нет вариантов размера/оформления — `label`/`caption`/`label-position` берутся из композитного шаблона подписи поля.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текст названия; без `label` и `caption` рендерится голый индикатор без обёртки |
| `labelPosition` | `'right' \| 'left'` | `'right'` | Положение лейбла относительно индикатора |
| `caption` | `string` | `''` | Текст пояснения под лейблом |
| `value` | `any` | `null` | Значение, которое получит модель при выборе этой радиокнопки |
| `name` | `string \| undefined` | `undefined` | Имя группы; вне спеки (форм-обвязка). Не влияет на взаимоисключение — оно обеспечивается общим `[formControl]`/`[(ngModel)]` (компонент подписывается на `NgControl.valueChanges`, чтобы синхронизировать соседние радиокнопки при выборе одной). Рекомендуется задавать: одинаковый `name` внутри одной группы — для нативной клавиатурной навигации между `<input type="radio">`, и уникальный между независимыми группами на одной странице — иначе браузер сгруппирует их нативно по `name` в обход Angular |

`disabled` и `invalid` в спеке не описаны (форма/состояния стек-зависимы, см. `common-info.md`) — управляются через Angular-формы: `disabled` — `FormControl.disable()`, `invalid` — вычисляется из `NgControl` (`Validators`), как у `ExtraCheckbox`.

## Variants

### Default (невыбранная)

Figma: `<RadioButton>`, state=default, checked=false — nodeId `17:13535`

```html
<extra-radiobutton value="option1" name="delivery" label="Курьером" [formControl]="control"></extra-radiobutton>
```

### Checked (выбранная)

Figma: `<RadioButton>`, state=default, checked=true

Выбранное состояние задаётся равенством `value` и значения модели (`control.value === 'option1'`).

### Группа вариантов

Figma: `<RadioButton>`, общий `name`, одиночный выбор внутри группы

```html
<extra-radiobutton value="pickup" name="delivery" label="Самовывоз" [formControl]="control"></extra-radiobutton>
<extra-radiobutton value="courier" name="delivery" label="Курьером" [formControl]="control"></extra-radiobutton>
<extra-radiobutton value="post" name="delivery" label="Почтой" [formControl]="control"></extra-radiobutton>
```

### Disabled (отключённая)

Figma: `<RadioButton>`, state=disabled

```html
<extra-radiobutton value="option1" name="delivery" label="Курьером" [formControl]="disabledControl"></extra-radiobutton>
```

```typescript
disabledControl = new FormControl({ value: null, disabled: true });
```

### Invalid / Danger (невалидная)

Figma: `<RadioButton>`, state=danger

```html
<extra-radiobutton value="option1" name="delivery" label="Курьером" [formControl]="requiredControl"></extra-radiobutton>
```

```typescript
requiredControl = new FormControl(null, Validators.required);
```

### Caption (пояснение под лейблом)

```html
<extra-radiobutton
  value="option1"
  name="delivery"
  label="Курьером"
  caption="Доставим за 1-2 дня"
  [formControl]="control"
></extra-radiobutton>
```

### Label справа / слева (label-position=right|left)

`right` — значение по умолчанию, лейбл справа от индикатора; `left` — лейбл слева.

```html
<extra-radiobutton value="option1" name="delivery" label="Курьером" [formControl]="control"></extra-radiobutton>

<extra-radiobutton
  value="option1"
  name="delivery"
  label="Курьером"
  labelPosition="left"
  [formControl]="control"
></extra-radiobutton>
```

## Slots

Не используются. `label`/`caption` — обычные `@Input()`, не content projection.

## Related

- [ExtraCheckbox](../checkbox/checkbox.figma.md) — тот же паттерн label/caption + FormControl, множественный выбор вместо одиночного
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний (danger, disabled)
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraInputText](../inputtext/inputtext.figma.md) — текстовое поле формы
- [ExtraButton](../button/button.figma.md) — кнопка действия

## Do / Don't

**Do:**
- Объединяйте радиокнопки одной группы общим `name` и связывайте с одной моделью через `[(ngModel)]` или `[formControl]`
- Используйте радиокнопки, когда нужно выбрать ровно один из взаимоисключающих вариантов
- Передавайте `label` — радиокнопка без видимой подписи не соответствует спеке
- Управляйте `disabled`/`invalid` через `FormControl`, а не отдельными `@Input()`

**Don't:**
- Не используйте радиокнопки для множественного выбора — для этого есть Checkbox
- Не оставляйте радиокнопку без `label` и `caption` одновременно без причины — подпись обязательна
- Не пытайтесь снять выбор у радиокнопки повторным кликом: одиночный выбор в группе снять нельзя
- Не переиспользуйте один и тот же `name` для разных независимых групп на одной странице — браузер группирует `<input type="radio">` по `name` нативно, в обход Angular, и это может визуально «переключить» несвязанную группу
