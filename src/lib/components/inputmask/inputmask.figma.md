---
component: ExtraInputMask
selector: extra-input-mask
import:
  symbol: ExtraInputMaskComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '319:1690'
  componentKey: '30f1444b38ec5c9aa2d2cdff3e7051afb73d2b1b'
  name: '<InputMask>'
status: stable
updated: '2026-09-14'
---

## Overview

`ExtraInputMaskComponent` — поле ввода с фиксированной маской/форматом (телефон, дата, карта, СНИЛС/ИНН, время): подставляет структуру и литералы маски, а через `unmask` может отдавать «сырое» значение без разделителей. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<InputMask>` (nodeId `319:1690`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.1»). Как и `<InputText>`/`<InputNumber>`, умеет самостоятельно рисовать `label`/`caption`/`info`-тултип рядом с полем — оборачивать в `<extra-input-group>`/`<extra-form-field>` не обязательно.

## Props mapping

| Свойство                        | Тип                                        | По умолчанию | Описание                                                                                          |
| ------------------------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------- |
| `placeholder`                   | `string`                                   | `''`         | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder`   |
| `label`                         | `string`                                   | `''`         | Текст названия поля                                                                               |
| `labelPosition`                 | `'top' \| 'left'`                          | `'top'`      | Положение лейбла относительно поля                                                                |
| `floatLabel`                    | `boolean`                                  | `false`      | Плавающий лейбл внутри поля (PrimeNG `p-floatlabel`)                                              |
| `mask`                          | `string`                                   | `''`         | Шаблон маски (`9` — цифра, `a` — буква, `*` — буква или цифра), задаёт фиксированный формат ввода |
| `slotChar`                      | `string`                                   | `'_'`        | Символ-заполнитель для незаполненных позиций маски                                                |
| `autoClear`                     | `boolean`                                  | `true`       | Очищать поле при потере фокуса, если значение не соответствует маске целиком                      |
| `unmask`                        | `boolean`                                  | `false`      | Отдавать в модель «сырое» значение без литералов маски                                            |
| `clearable`                     | `boolean`                                  | `false`      | Показывает иконку очистки поля — соответствует Figma-свойству `clearable`                         |
| `caption`                       | `string`                                   | `''`         | Текст пояснения под полем                                                                         |
| `info`                          | `string`                                   | `''`         | Текст доп. информации в тултипе иконки `ti-info-circle` рядом с лейблом                           |
| `size`                          | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'`     | Размер поля                                                                                       |
| `readonly`                      | `boolean`                                  | `false`      | Только для чтения — соответствует Figma-состоянию `state=readonly`                                |
| `fluid`                         | `boolean`                                  | `false`      | Растягивает поле на всю ширину контейнера                                                         |
| `characterPattern`              | `string`                                   | `'[A-Za-z]'` | RegExp-шаблон для буквенных позиций маски (`a`)                                                   |
| `keepBuffer`                    | `boolean`                                  | `false`      | Сохранять буфер маски при удалении символов                                                       |
| `autocomplete`                  | `string`                                   | `''`         | Значение нативного атрибута `autocomplete`                                                        |
| `(onComplete)`                  | `EventEmitter<void>`                       | —            | Событие при полном заполнении маски                                                               |
| `(onInput)`                     | `EventEmitter<Event>`                      | —            | Событие ввода символа                                                                             |
| `(onClear)`                     | `EventEmitter<void>`                       | —            | Событие при очистке значения (иконка `clearable`)                                                 |
| `(onFocus)`                     | `EventEmitter<Event>`                      | —            | Событие фокусировки поля                                                                          |
| `(onBlur)`                      | `EventEmitter<Event>`                      | —            | Событие потери фокуса                                                                             |
| `[(ngModel)]` / `[formControl]` | `string`                                   | `''`         | Значение поля через ControlValueAccessor — соответствует Figma-свойству `text-input`              |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

> `disabled` — управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; компонент не объявляет `@Input() disabled`. Соответствует Figma-состоянию `state=disabled`.

## Variants

### Телефон (маска `(999) 999-9999`)

Figma: `<InputMask>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `319:1716`

```html
<extra-input-mask
  mask="(999) 999-9999"
  placeholder="(___) ___-____"
  [(ngModel)]="phone"
  name="phone"
></extra-input-mask>
```

### С лейблом (label / labelPosition)

```html
<extra-input-mask
  mask="(999) 999-9999"
  label="Телефон"
  labelPosition="left"
  caption="Формат: код + номер"
  info="Используется для связи по заказу"
  [(ngModel)]="phone"
  name="phone"
></extra-input-mask>
```

### С плавающим лейблом (floatLabel)

```html
<extra-input-mask
  mask="(999) 999-9999"
  label="Телефон"
  [floatLabel]="true"
  [(ngModel)]="phone"
  name="phone"
></extra-input-mask>
```

### Дата (маска `99/99/9999`)

Figma: `<InputMask>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `319:1716`

```html
<extra-input-mask mask="99/99/9999" slotChar="дд/мм/гггг" [(ngModel)]="birthDate" name="birthDate"></extra-input-mask>
```

### Сырое значение (unmask)

Figma: `<InputMask>`, state=default, has-placeholder=false, has-floatlabel=false — nodeId `319:1719`

```html
<extra-input-mask mask="999-99-999 99" [unmask]="true" [(ngModel)]="snils" name="snils"></extra-input-mask>
```

### С кнопкой очистки (clearable)

Figma: `<InputMask>`, state=default, show-clear=true — nodeId `319:1716`

```html
<extra-input-mask
  mask="9999 9999 9999 9999"
  placeholder="Номер карты"
  [clearable]="true"
  [(ngModel)]="card"
  name="card"
></extra-input-mask>
```

### Disabled (отключённое поле)

Figma: `<InputMask>`, state=disabled, has-placeholder=true, has-floatlabel=false — nodeId `319:1691`

```ts
disabledControl = new FormControl({ value: '', disabled: true });
```

```html
<extra-input-mask mask="(999) 999-9999" placeholder="Недоступно" [formControl]="disabledControl"></extra-input-mask>
```

### Readonly (только для чтения)

Figma: `<InputMask>`, state=readonly, has-placeholder=true, has-floatlabel=false — nodeId `14980:19858`

```html
<extra-input-mask mask="(999) 999-9999" [readonly]="true" [(ngModel)]="readonlyPhone" name="roPhone"></extra-input-mask>
```

### Fluid / Large (на всю ширину, большой размер)

Figma: `<InputMask>`, state=default, has-placeholder=true, has-floatlabel=false

```html
<extra-input-mask
  mask="(999) 999-9999"
  size="large"
  [fluid]="true"
  placeholder="(___) ___-____"
  [(ngModel)]="phone"
  name="widePhone"
></extra-input-mask>
```

### С реактивной формой (formControl + валидация)

Figma: `<InputMask>`, state=danger, has-placeholder=true, has-floatlabel=false — nodeId `319:1697` (невалидное состояние определяется через NgControl автоматически)

```ts
phoneControl = new FormControl('', [Validators.required]);
```

```html
<extra-input-mask mask="(999) 999-9999" placeholder="(___) ___-____" [formControl]="phoneControl"></extra-input-mask>
```

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Для добавления внешних prefix/suffix-иконок используйте `<extra-input-group>` — см. [inputgroup.figma.md](../inputgroup/inputgroup.figma.md).

## Related

- [InputText](../inputtext/inputtext.figma.md) — поле для свободного ввода без маски
- [InputNumber](../inputnumber/inputnumber.figma.md) — числовое поле со stepper-кнопками и форматированием
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**

- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Включайте `[unmask]="true"`, когда в модель нужно сохранять значение без литералов маски (например, только цифры телефона).
- Для сброса поля через иконку × включайте `[clearable]="true"` и подписывайтесь на `(onClear)` при необходимости пост-обработки.
- Используйте `[fluid]="true"` в формах на всю ширину и мобильных макетах.
- Используйте встроенные `label`/`caption`/`info` вместо внешнего `<extra-form-field>`, если не нужны дополнительные слоты.

**Don't:**

- Не используйте маскированное поле для свободного текста без фиксированного формата — для этого есть [InputText](../inputtext/inputtext.figma.md).
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не подменяйте `value` через прямой DOM (`document.querySelector('input').value = ...`) — теряется `dirty`-state и Angular-реактивность.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
