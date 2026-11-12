---
component: ExtraInputText
selector: extra-input-text
import:
  symbol: ExtraInputTextComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '15:13444'
  componentKey: 'b8bc649d1acf7132183bed9af9df322dcab6ab9e'
  name: '<InputText>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraInputTextComponent` — атомарное однострочное поле для ввода короткого свободного текста (имя, email, строка поиска). Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<InputText>` (nodeId `15:13444`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Лейбл, плавающий лейбл и подпись (caption) компонент рисует сам (`label` / `labelPosition` / `caption` / `info`); без них рендерится голое поле без обёртки.

## Props mapping

| Свойство                        | Тип                                                      | По умолчанию | Описание                                                                                                                                                      |
| ------------------------------- | -------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placeholder`                   | `string`                                                 | `''`         | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder`                                                               |
| `label`                         | `string`                                                 | `''`         | Текст лейбла; при пустых `label`/`caption` поле рендерится без обёртки                                                                                        |
| `labelPosition`                 | `'default' \| 'float' \| 'left'`                         | `'default'`  | Положение лейбла: сверху, внутри поля (`float`, Figma `has-float-label=true`) или слева                                                                       |
| `caption`                       | `string`                                                 | `''`         | Подпись под полем                                                                                                                                             |
| `captionSeverity`               | `'base' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'base'`     | Вариант подписи (цвет и иконка), Figma `_<Caption>` variant                                                                                                   |
| `requiredMark`                  | `boolean`                                                | `false`      | Маркер «\*» перед лейблом (Figma `is-required`), валидацию не включает                                                                                        |
| `info`                          | `string`                                                 | `''`         | Текст всплывающей подсказки (иконка ℹ рядом с лейблом)                                                                                                        |
| `size`                          | `'small' \| 'base' \| 'large' \| 'xlarge'`               | `'base'`     | Размер поля; `large` и `xlarge` маппируются на PrimeNG `pSize="large"`                                                                                        |
| `readonly`                      | `boolean`                                                | `false`      | Только для чтения: ввод и очистка недоступны — соответствует Figma-состоянию `state=readonly`                                                                 |
| `required`                      | `boolean`                                                | `false`      | Поле обязательно для заполнения: контрол невалиден, пока значение не введено/не выбрано; работает как NG_VALIDATORS-валидатор                                 |
| `clearable`                     | `boolean`                                                | `false`      | Показывает иконку очистки (×) при наличии значения — соответствует Figma-свойству `show-clear`                                                                |
| `fluid`                         | `boolean`                                                | `false`      | Растягивает поле на всю ширину контейнера                                                                                                                     |
| `name`                          | `string \| undefined`                                    | `undefined`  | Имя внутреннего input для браузерного автозаполнения                                                                                                          |
| `autocomplete`                  | `string \| undefined`                                    | `undefined`  | Нативный атрибут autocomplete                                                                                                                                 |
| `maxLength`                     | `number \| undefined`                                    | `undefined`  | Максимальное количество символов                                                                                                                              |
| `ariaLabel`                     | `string \| undefined`                                    | `undefined`  | Доступное имя поля                                                                                                                                            |
| `ariaLabelledBy`                | `string \| undefined`                                    | `undefined`  | ID внешнего элемента-метки                                                                                                                                    |
| `autofocus`                     | `boolean`                                                | `false`      | Автофокус при монтировании поля                                                                                                                               |
| `tabindex`                      | `number \| undefined`                                    | `undefined`  | Порядок перехода по Tab                                                                                                                                       |
| `disabled`                      | `boolean`                                                | `false`      | Отключённое состояние — управляется через `FormControl.disable()` или `ControlValueAccessor.setDisabledState`; соответствует Figma-состоянию `state=disabled` |
| `(onClear)`                     | `EventEmitter<void>`                                     | —            | Событие при нажатии на иконку очистки (только при `clearable=true`)                                                                                           |
| `[(ngModel)]` / `[formControl]` | `string`                                                 | `''`         | Значение поля через ControlValueAccessor — соответствует Figma-свойству `text-input`                                                                          |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

## Variants

### Default / Base (базовое поле)

Figma: `<InputText>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `15:13443`

```html
<extra-input-text placeholder="Введите текст..." [(ngModel)]="value" name="field"></extra-input-text>
```

### С кнопкой очистки (show-clear)

Figma: `<InputText>`, state=default, show-clear=true — nodeId `15:13443`

```html
<extra-input-text placeholder="Поиск..." [clearable]="true" [(ngModel)]="searchQuery" name="search"></extra-input-text>
```

### Disabled (отключённое поле)

Figma: `<InputText>`, state=disabled — nodeId `15:13439`

```html
<extra-input-text placeholder="Недоступно" [formControl]="disabledControl"></extra-input-text>
```

```ts
// Управляется через FormControl:
disabledControl = new FormControl({ value: '', disabled: true });
```

### Fluid / Large (на всю ширину, большой размер)

Figma: `<InputText>`, state=default

```html
<extra-input-text
  size="large"
  [fluid]="true"
  placeholder="Широкое поле"
  [(ngModel)]="value"
  name="wideField"
></extra-input-text>
```

### С реактивной формой (formControl + валидация)

Figma: `<InputText>`, state=danger — nodeId `15:13435` (невалидное состояние определяется через NgControl автоматически)

```ts
emailControl = new FormControl('', [Validators.required, Validators.email]);
```

```html
<extra-input-text placeholder="email@example.com" [formControl]="emailControl"></extra-input-text>
```

### Readonly (только для чтения)

Figma: `<InputText>`, state=readonly — nodeId `14978:17413`

```html
<extra-input-text [readonly]="true" [(ngModel)]="readonlyValue" name="roField"></extra-input-text>
```

## Геометрия (Figma 1:1)

Размеры в px. В Figma размер задаёт мод коллекции `sizing` (`form.*`), а не ось компонента: small / base / large / xlarge.

| `size`   | Высота | Шрифт / межстрочный | padding Y / X | Радиус | Иконка |
| -------- | ------ | ------------------- | ------------- | ------ | ------ |
| `small`  | 36     | 14 / 14             | 10 / 12       | 10     | 14     |
| `base`   | 42     | 16 / 16             | 12 / 12       | 10     | 16     |
| `large`  | 50     | 18 / 20             | 14 / 12       | 10     | 18     |
| `xlarge` | 56     | 20 / 26             | 14 / 12       | 10     | 20     |

- Высота задана явно: Chrome не делает текстовый input ниже собственной высоты строки, поэтому одним `line-height` 36 и 42 не получить.
- Label: Noto Sans 14 / 14, иконка `info` 14. Caption: Noto Sans 14 / 14, letter-spacing −0.32. Размер поля на них не влияет.
- Рамка поля при ошибке — `border.status.danger.strong`, кольцо фокуса — `border.status.danger.focus`.
- В Figma у Label есть маркер обязательности (`*`, 12 / 14), в API его нет.

## Slots

Нет — поле атомарное. Проекция содержимого не поддерживается. Для добавления prefix/suffix-иконок используйте `<extra-input-group>` — см. [inputgroup.figma.md](../inputgroup/inputgroup.figma.md).

## Related

- [InputGroup](../inputgroup/inputgroup.figma.md) — обёртка с prefix/suffix-слотами
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**

- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Для сброса поля через иконку × включайте `[clearable]="true"` и подписывайтесь на `(onClear)` при необходимости пост-обработки.
- Используйте `[fluid]="true"` в формах на всю ширину и мобильных макетах.
- Оберните поле в `<extra-form-field>` или `<extra-input-group>` для добавления label, подсказки и prefix/suffix.

**Don't:**

- Не подменяйте `value` через прямой DOM (`document.querySelector('input').value = ...`) — теряется `dirty`-state и Angular-реактивность.
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки значение не синхронизируется с моделью.
