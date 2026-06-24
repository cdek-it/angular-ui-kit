---
component: ExtraListbox
selector: extra-listbox
import:
  symbol: ExtraListboxComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '349:2649'
  componentKey: 'c754e38e38d8927dcd62709abaecf328fd59b653'
  name: '<Listbox>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraListboxComponent` — всегда видимый список опций для выбора одного или нескольких значений, который не сворачивается за триггером. Оборачивает PrimeNG `p-listbox` и расширяет его множественным выбором с чекбоксами, фильтрацией, группировкой опций и кастомным шаблоном пункта. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<Listbox>` (component set, nodeId `349:2649`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Варианты задаются Figma-свойствами `state` (`default | disabled`), `empty`, `overlay`, `header`, а вложенные свойства `show-checkbox`, `show-filter` и `show-close` управляют отображением чекбоксов и строки поиска. Пункты, группы и расширенные шаблоны опций вынесены в отдельные внутренние Figma-узлы (`<Listbox.ItemCheckbox>`, `<Listbox.ItemGroup>`, `<Listbox.ItemTemplate>`, `<Listbox.ItemIcon>`) и в коде описываются через шаблон-директиву (см. Slots).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `options` | `any[]` | `[]` | Массив опций для выбора |
| `optionLabel` | `string` | `'label'` | Имя поля опции, отображаемое как подпись |
| `optionValue` | `string \| undefined` | `undefined` | Имя поля опции, используемое как значение модели |
| `multiple` | `boolean` | `false` | Множественный выбор — соответствует Figma-свойству `show-checkbox` |
| `filter` | `boolean` | `false` | Показывает строку поиска над списком — соответствует Figma-свойству `show-filter` |
| `filterPlaceHolder` | `string \| undefined` | `undefined` | Подсказка в строке поиска (при `filter=true`) |
| `checkmark` | `boolean` | `false` | Показывает галочку у выбранного пункта (одиночный выбор) |
| `group` | `boolean` | `false` | Включает группировку опций по секциям |
| `optionGroupLabel` | `string \| undefined` | `undefined` | Имя поля заголовка группы (при `group=true`) — соответствует Figma-узлу `<Listbox.ItemGroup>` |
| `optionGroupChildren` | `string \| undefined` | `undefined` | Имя поля группы со списком дочерних опций |
| `scrollHeight` | `string` | `'200px'` | Максимальная высота прокручиваемой области списка |
| `emptyMessage` | `string \| undefined` | `undefined` | Сообщение при пустом списке опций — соответствует Figma-свойству `empty=true` |
| `(onFocus)` | `EventEmitter<FocusEvent>` | — | Событие получения фокуса |
| `(onBlur)` | `EventEmitter<FocusEvent>` | — | Событие потери фокуса |
| `[(ngModel)]` / `[formControl]` | `any` | `null` | Выбранное значение через ControlValueAccessor |

> `disabled` — компонент не объявляет `@Input() disabled`; отключённое состояние (Figma `state=disabled`) задаётся через `ControlValueAccessor` (`FormControl.disable()`).

## Variants

### Single (одиночный выбор)

Figma: `<Listbox>`, state=default, header=true — nodeId `365:1812`

```html
<extra-listbox
  [options]="cities"
  optionLabel="name"
  [(ngModel)]="selectedCity"
  name="city"
></extra-listbox>
```

### Single c optionValue (примитивное значение модели)

Figma: `<Listbox>`, state=default

```html
<extra-listbox
  [options]="cities"
  optionLabel="name"
  optionValue="code"
  [checkmark]="true"
  [(ngModel)]="selectedCode"
  name="cityCode"
></extra-listbox>
```

### Multiple (множественный выбор с чекбоксами)

Figma: `<Listbox>`, state=default, show-checkbox=true — пункты `<Listbox.ItemCheckbox>`

```html
<extra-listbox
  [options]="cities"
  optionLabel="name"
  [multiple]="true"
  [(ngModel)]="selectedCities"
  name="cities"
></extra-listbox>
```

### Checkbox + checkmark (галочка выбранного пункта)

Figma: `<Listbox>`, state=default, show-checkbox=true

```html
<extra-listbox
  [options]="cities"
  optionLabel="name"
  [multiple]="true"
  [checkmark]="true"
  [(ngModel)]="selectedCities"
  name="citiesCheck"
></extra-listbox>
```

### Filter (строка поиска над списком)

Figma: `<Listbox>`, state=default, show-filter=true

```html
<extra-listbox
  [options]="cities"
  optionLabel="name"
  [filter]="true"
  filterPlaceHolder="Поиск города..."
  [(ngModel)]="selectedCity"
  name="cityFilter"
></extra-listbox>
```

### Group (группировка опций по секциям)

Figma: `<Listbox>`, state=default — заголовки групп `<Listbox.ItemGroup>`

```html
<extra-listbox
  [options]="groupedCities"
  [group]="true"
  optionGroupLabel="region"
  optionGroupChildren="items"
  optionLabel="name"
  [(ngModel)]="selectedCity"
  name="cityGrouped"
></extra-listbox>
```

### Empty (пустой список)

Figma: `<Listbox>`, state=default, empty=true — nodeId `365:1826`

```html
<extra-listbox
  [options]="[]"
  optionLabel="name"
  emptyMessage="Нет данных"
  [(ngModel)]="selectedCity"
  name="cityEmpty"
></extra-listbox>
```

### Disabled (отключённый список)

Figma: `<Listbox>`, state=disabled — nodeId `365:1842`

```html
<extra-listbox
  [options]="cities"
  optionLabel="name"
  [formControl]="disabledControl"
></extra-listbox>
```

```ts
// Управляется через FormControl:
disabledControl = new FormControl({ value: null, disabled: true });
```

## Slots

Проекция пользовательского содержимого пункта выполняется через шаблон-директиву `extraListboxItem`, размещаемую внутри тега `<extra-listbox>`. Директива оборачивается в `<ng-template>` и получает текущую опцию через `let-item`:

- **`extraListboxItem`** (`ExtraListboxItemDirective`) — шаблон отдельного пункта списка (контекст `let-item`); соответствует Figma-узлам `<Listbox.ItemTemplate>` и `<Listbox.ItemIcon>`.

```html
<extra-listbox [formControl]="ctrl" [options]="options" optionLabel="name">
  <ng-template extraListboxItem let-item>
    <i [class]="item.icon"></i>
    <div class="p-listbox-option-label-group">
      <span>{{ item.name }}</span>
      <small class="p-listbox-option-caption">{{ item.description }}</small>
    </div>
  </ng-template>
</extra-listbox>
```

```ts
import {
  ExtraListboxComponent,
  ExtraListboxItemDirective
} from '@cdek-it/angular-ui-kit';
```

## Related

- [Select](../select/select.figma.md) — выбор одного значения из сворачиваемого выпадающего списка
- [Checkbox](../checkbox/checkbox.figma.md) — отдельный чекбокс; в Listbox используется для множественного выбора
- [Button](../button/button.figma.md) — кнопки действий в формах
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся выбранное значение.
- Включайте `[multiple]="true"` для выбора нескольких значений — пункты получают чекбоксы.
- Управляйте отключённым состоянием через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Задавайте `optionLabel` для отображаемой подписи и `optionValue`, когда в модели нужно хранить примитив, а не весь объект опции.
- Включайте `[filter]="true"` для длинных списков, чтобы пользователь мог искать опцию по тексту.
- Для кастомного вида пункта используйте директиву `extraListboxItem`.

**Don't:**
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте отключение через `FormControl` или `ControlValueAccessor`.
- Не используйте список без `[(ngModel)]` / `[formControl]` — без привязки выбранное значение не синхронизируется с моделью.
- Не включайте `[group]="true"` без `optionGroupLabel` и `optionGroupChildren` — группы не отрисуются корректно.
- Не применяйте Listbox для свёрнутого выбора с триггером — для этого используйте [Select](../select/select.figma.md).
