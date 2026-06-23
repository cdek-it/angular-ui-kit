---
component: ExtraTextarea
selector: extra-textarea
import:
  symbol: ExtraTextareaComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '309:1582'
  componentKey: 'a4d238e342705216c67068f12f4b28da12094ab7'
  name: '<Textarea>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraTextareaComponent` — атомарное многострочное поле для ввода длинного произвольного текста (комментарий, описание, заметка). Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<Textarea>` (nodeId `309:1582`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Поле «голое»: label, подсказка, сообщение об ошибке и счётчик символов навешиваются снаружи — через `<extra-input-group>` или `<extra-form-field>`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `placeholder` | `string` | `''` | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `placeholder` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля; `small`/`large` маппируются на PrimeNG `pSize`, `xlarge` — на CSS-класс `p-textarea-xlg` |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `showClear` | `boolean` | `false` | Показывает иконку очистки (×) при наличии значения — соответствует Figma-свойству `show-clear` |
| `fluid` | `boolean` | `false` | Растягивает поле на всю ширину контейнера |
| `autoResize` | `boolean` | `false` | Автоподстройка высоты под содержимое — соответствует Figma-свойству `show-resize` |
| `rows` | `number` | `3` | Стартовая высота поля в строках |
| `cols` | `number \| undefined` | `undefined` | Ширина поля в символах |
| `(onResize)` | `EventEmitter<{ height: string } \| {}>` | — | Событие при изменении высоты поля пользователем |
| `(onClear)` | `EventEmitter<void>` | — | Событие при нажатии на иконку очистки (только при `showClear=true`) |
| `[(ngModel)]` / `[formControl]` | `string` | `''` | Значение поля через ControlValueAccessor — соответствует Figma-свойству `text-inputarea` |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

## Variants

### Default / Base (базовое поле)

Figma: `<Textarea>`, state=default, placeholder=true, has-floatlabel=false — nodeId `309:1608`

```html
<extra-textarea
  placeholder="Введите текст..."
  [(ngModel)]="value"
  name="comment"
></extra-textarea>
```

### С кнопкой очистки (show-clear)

Figma: `<Textarea>`, state=default, show-clear=true — nodeId `309:1608`

```html
<extra-textarea
  placeholder="Комментарий..."
  [showClear]="true"
  [(ngModel)]="comment"
  name="comment"
></extra-textarea>
```

### Автоподстройка высоты (autoResize)

Figma: `<Textarea>`, show-resize=true — nodeId `309:1608`

```html
<extra-textarea
  placeholder="Описание..."
  [autoResize]="true"
  [(ngModel)]="description"
  name="description"
></extra-textarea>
```

### Заданная высота (rows)

Figma: `<Textarea>`, state=default, placeholder=true

```html
<extra-textarea
  placeholder="Заметка..."
  [rows]="6"
  [(ngModel)]="note"
  name="note"
></extra-textarea>
```

### Disabled (отключённое поле)

Figma: `<Textarea>`, state=disabled — nodeId `309:1583`

```html
<extra-textarea
  placeholder="Недоступно"
  [formControl]="disabledControl"
></extra-textarea>
```

```ts
disabledControl = new FormControl({ value: '', disabled: true });
```

### Readonly (только для чтения)

Figma: `<Textarea>`, state=readonly — nodeId `14980:20329`

```html
<extra-textarea
  [readonly]="true"
  [(ngModel)]="readonlyValue"
  name="roField"
></extra-textarea>
```

### Fluid / Large (на всю ширину, большой размер)

Figma: `<Textarea>`, state=default

```html
<extra-textarea
  size="large"
  [fluid]="true"
  placeholder="Широкое поле"
  [(ngModel)]="value"
  name="wideField"
></extra-textarea>
```

### С реактивной формой (formControl + валидация)

Figma: `<Textarea>`, state=danger, placeholder=true — nodeId `309:1589` (невалидное состояние определяется через NgControl автоматически)

```ts
descriptionControl = new FormControl('', [Validators.required, Validators.maxLength(500)]);
```

```html
<extra-textarea
  placeholder="Опишите проблему"
  [formControl]="descriptionControl"
></extra-textarea>
```

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Для добавления prefix/suffix-иконок используйте `<extra-input-group>` — см. [inputgroup.figma.md](../inputgroup/inputgroup.figma.md).

## Related

- [InputText](../inputtext/inputtext.figma.md) — однострочное поле для короткого текста
- [InputGroup](../inputgroup/inputgroup.figma.md) — обёртка с prefix/suffix-слотами
- [Button](../button/button.figma.md) — кнопки действий рядом с полем
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Включайте `[autoResize]="true"` при непредсказуемом объёме текста, чтобы поле росло по содержимому.
- Задавайте `[rows]` для стартовой высоты поля и `[fluid]="true"` в формах на всю ширину.
- Для сброса поля через иконку × включайте `[showClear]="true"` и подписывайтесь на `(onClear)` при необходимости пост-обработки.
- Оберните поле в `<extra-form-field>` или `<extra-input-group>` для добавления label, подсказки, ошибки и счётчика символов.

**Don't:**
- Не подменяйте `value` через прямой DOM (`document.querySelector('textarea').value = ...`) — теряется `dirty`-state и Angular-реактивность.
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
- Не используйте `extra-textarea` для короткого однострочного текста — для него предназначен [InputText](../inputtext/inputtext.figma.md).
