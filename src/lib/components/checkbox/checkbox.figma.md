---
component: ExtraCheckbox
selector: extra-checkbox
import:
  symbol: ExtraCheckboxComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'HOLKdvQJ8jCLeX17s9d0Yf'
  nodeId: '16:13529'
  componentKey: 'ce267dfcda08b2861c4aa2aea4af70194735c9f0'
  name: '<Checkbox>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraCheckbox` — компонент флажка для выбора одного или нескольких вариантов. Оборачивает PrimeNG `p-checkbox` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

Компонент соответствует Figma-компоненту `<Checkbox>` (nodeId `16:13529`). Figma-свойства `state`, `checked` и `indeterminate` маппируются на Angular-инпуты и модель значения (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `any` | `null` | Значение, добавляемое в массив-модель в небинарном режиме (группа чекбоксов) |
| `binary` | `boolean` | `false` | Бинарный режим: модель — `true`/`false` вместо массива значений |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-свойству `state=disabled`; передаётся через `[disabled]` |
| `readonly` | `boolean` | `false` | Режим только для чтения без изменения значения |
| `indeterminate` | `boolean` | `false` | Неопределённое состояние — соответствует Figma-свойству `indeterminate=true` |
| `invalid` | `boolean` | `false` | Подсветка как невалидного поля — соответствует Figma-свойству `state=danger` |
| `size` | `'small' \| 'base' \| 'large'` | `'base'` | Размер флажка |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | Вариант отображения |
| `checkboxIcon` | `string \| undefined` | `undefined` | CSS-класс иконки галочки; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `ariaLabel` | `string \| undefined` | `undefined` | Метка для программ экранного доступа |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Идентификатор элемента с меткой для доступности |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |
| `inputId` | `string \| undefined` | `undefined` | Идентификатор внутреннего `input`; используется для связки с `<label for>` |
| `trueValue` | `any` | `true` | Значение модели во «включённом» состоянии (бинарный режим) |
| `falseValue` | `any` | `false` | Значение модели в «выключенном» состоянии (бинарный режим) |
| `autofocus` | `boolean` | `false` | Автофокус при монтировании компонента |

Состояние «отмечен» (Figma-свойство `checked`) задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`: используйте `[(ngModel)]`, `formControl` или `formControlName`. Значение `true`/`false` (или `trueValue`/`falseValue`) соответствует `checked=true` / `checked=false` в Figma.

## Variants

### Default (по умолчанию, не отмечен)

Figma: state=default, checked=false, indeterminate=false

```html
<extra-checkbox [binary]="true" [(ngModel)]="isChecked"></extra-checkbox>
```

### Checked (отмечен)

Figma: state=default, checked=true, indeterminate=false

```html
<extra-checkbox [binary]="true" [(ngModel)]="isChecked"></extra-checkbox>
```

В реактивных формах эквивалентно:

```html
<extra-checkbox [binary]="true" [formControl]="acceptControl"></extra-checkbox>
```

### Indeterminate (неопределённое состояние)

Figma: state=default, checked=false, indeterminate=true

```html
<extra-checkbox
  [binary]="true"
  [indeterminate]="true"
  [(ngModel)]="isChecked"
></extra-checkbox>
```

### Disabled (отключён)

Figma: state=disabled, checked=false, indeterminate=false

```html
<extra-checkbox
  [binary]="true"
  [disabled]="true"
  [(ngModel)]="isChecked"
></extra-checkbox>
```

### Danger / invalid (невалидное состояние)

Figma: state=danger, checked=false, indeterminate=false

```html
<extra-checkbox
  [binary]="true"
  [invalid]="true"
  [(ngModel)]="isChecked"
></extra-checkbox>
```

### Группа чекбоксов (небинарный режим)

Figma: state=default — несколько `<Checkbox>` с общей моделью-массивом

```html
<extra-checkbox value="email" [(ngModel)]="selected"></extra-checkbox>
<extra-checkbox value="sms" [(ngModel)]="selected"></extra-checkbox>
<extra-checkbox value="push" [(ngModel)]="selected"></extra-checkbox>
```

## Slots

Не используются. Подпись к флажку размещается рядом во внешнем шаблоне через `<label [for]="inputId">`.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки галочки (`checkboxIcon`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний и `invalid`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraInputText](../inputtext/inputtext.figma.md) — текстовое поле формы с похожим маппингом состояний
- [ExtraDialog](../dialog/dialog.figma.md) — пример компонента с двусторонней привязкой

## Do / Don't

**Do:**
- Используйте `[binary]="true"` с `[(ngModel)]` или `formControl` для одиночного флажка
- В группе чекбоксов задавайте уникальный `value` каждому элементу и общую модель-массив
- Для невалидного состояния задавайте `[invalid]="true"` (Figma `state=danger`)
- Для доступности связывайте `inputId` с внешним `<label [for]>` или задавайте `ariaLabel`
- Используйте `[indeterminate]="true"` только для «частично выбранного» родительского флажка

**Don't:**
- Не задавайте «отмечен» через отдельный атрибут — состояние идёт только через модель (`[(ngModel)]` / `formControl`)
- Не комбинируйте `[disabled]="true"` с интерактивными обработчиками — события в этом состоянии не возникают
- Не используйте `value` в бинарном режиме (`[binary]="true"`) — там модель хранит `true`/`false`
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
