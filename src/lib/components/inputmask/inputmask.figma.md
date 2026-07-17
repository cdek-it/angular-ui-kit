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
updated: '2026-06-22'
---

## Overview

`ExtraInputMaskComponent` — поле ввода с фиксированной маской/форматом (телефон, дата, карта, СНИЛС/ИНН, время): подставляет структуру и литералы маски, а через `unmask` может отдавать «сырое» значение без разделителей. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<InputMask>` (nodeId `319:1690`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Label, подсказка и сообщение об ошибке навешиваются снаружи — через `<extra-input-group>` или `<extra-form-field>`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `mask` | `string` | `''` | Шаблон маски (`9` — цифра, `a` — буква, `*` — буква или цифра), задаёт фиксированный формат ввода |
| `slotChar` | `string` | `'_'` | Символ-заполнитель для незаполненных позиций маски |
| `autoClear` | `boolean` | `true` | Очищать поле при потере фокуса, если значение не соответствует маске целиком |
| `unmask` | `boolean` | `false` | Отдавать в модель «сырое» значение без литералов маски |
| `showClear` | `boolean` | `false` | Показывает иконку очистки (×) при наличии значения — соответствует Figma-свойству `show-clear` |
| `placeholder` | `string` | `''` | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля; `large` и `xlarge` маппируются на PrimeNG `pSize="large"` |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `fluid` | `boolean` | `false` | Растягивает поле на всю ширину контейнера |
| `characterPattern` | `string` | `'[A-Za-z]'` | RegExp-шаблон для буквенных позиций маски (`a`) |
| `keepBuffer` | `boolean` | `false` | Сохранять буфер маски при удалении символов |
| `autocomplete` | `string` | `''` | Значение нативного атрибута `autocomplete` |
| `(onComplete)` | `EventEmitter<void>` | — | Событие при полном заполнении маски |
| `(onClearEvent)` | `EventEmitter<void>` | — | Событие при нажатии на иконку очистки (только при `showClear=true`) |
| `(onFocusEvent)` | `EventEmitter<Event>` | — | Событие фокусировки поля |
| `(onBlurEvent)` | `EventEmitter<Event>` | — | Событие потери фокуса |
| `(onInputEvent)` | `EventEmitter<Event>` | — | Событие ввода символа |
| `(onKeydownEvent)` | `EventEmitter<Event>` | — | Событие нажатия клавиши |
| `[(ngModel)]` / `[formControl]` | `string` | `''` | Значение поля через ControlValueAccessor — соответствует Figma-свойству `text-input` |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

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

### Дата (маска `99/99/9999`)

Figma: `<InputMask>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `319:1716`

```html
<extra-input-mask
  mask="99/99/9999"
  slotChar="дд/мм/гггг"
  [(ngModel)]="birthDate"
  name="birthDate"
></extra-input-mask>
```

### Сырое значение (unmask)

Figma: `<InputMask>`, state=default, has-placeholder=false, has-floatlabel=false — nodeId `319:1719`

```html
<extra-input-mask
  mask="999-99-999 99"
  [unmask]="true"
  [(ngModel)]="snils"
  name="snils"
></extra-input-mask>
```

### С кнопкой очистки (show-clear)

Figma: `<InputMask>`, state=default, show-clear=true — nodeId `319:1716`

```html
<extra-input-mask
  mask="9999 9999 9999 9999"
  placeholder="Номер карты"
  [showClear]="true"
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
<extra-input-mask
  mask="(999) 999-9999"
  placeholder="Недоступно"
  [formControl]="disabledControl"
></extra-input-mask>
```

### Readonly (только для чтения)

Figma: `<InputMask>`, state=readonly, has-placeholder=true, has-floatlabel=false — nodeId `14980:19858`

```html
<extra-input-mask
  mask="(999) 999-9999"
  [readonly]="true"
  [(ngModel)]="readonlyPhone"
  name="roPhone"
></extra-input-mask>
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
<extra-input-mask
  mask="(999) 999-9999"
  placeholder="(___) ___-____"
  [formControl]="phoneControl"
></extra-input-mask>
```

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Для добавления prefix/suffix-иконок используйте `<extra-input-group>` — см. [inputgroup.figma.md](../inputgroup/inputgroup.figma.md).

## Related

- [InputText](../inputtext/inputtext.figma.md) — поле для свободного ввода без маски
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Включайте `[unmask]="true"`, когда в модель нужно сохранять значение без литералов маски (например, только цифры телефона).
- Для сброса поля через иконку × включайте `[showClear]="true"` и подписывайтесь на `(onClearEvent)` при необходимости пост-обработки.
- Используйте `[fluid]="true"` в формах на всю ширину и мобильных макетах.
- Оберните поле в `<extra-form-field>` или `<extra-input-group>` для добавления label, подсказки и prefix/suffix.

**Don't:**
- Не используйте маскированное поле для свободного текста без фиксированного формата — для этого есть [InputText](../inputtext/inputtext.figma.md).
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не подменяйте `value` через прямой DOM (`document.querySelector('input').value = ...`) — теряется `dirty`-state и Angular-реактивность.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
