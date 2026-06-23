---
component: ExtraSelect
selector: extra-select
import:
  symbol: ExtraSelectComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '361:1561'
  componentKey: '361-1561'
  name: '<Select>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraSelectComponent` — выпадающий список для выбора одного значения из набора опций. Оборачивает PrimeNG `p-select` и расширяет его размерами, фильтрацией, группировкой, режимом плавающей метки и кастомными шаблонами пунктов. Реализует `ControlValueAccessor` и работает с `[(ngModel)]` и `[formControl]` «из коробки».

Компонент соответствует Figma-компоненту `<Select>` (component set, nodeId `361:1561`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Варианты задаются Figma-свойствами `state` (`default | hover | focus | danger | disabled | readonly`), `has-placeholder` и `has-floatlabel`. Выпадающая панель, пункты и группы вынесены в отдельные Figma-узлы `<Select.Overlay>`, `<Select.Option>` и `<Select.Group>` и в коде описываются через шаблоны-директивы (см. ниже).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `options` | `any[] \| null \| undefined` | `undefined` | Массив опций для выбора |
| `optionLabel` | `string \| undefined` | `undefined` | Имя поля опции, отображаемое как подпись |
| `optionValue` | `string \| undefined` | `undefined` | Имя поля опции, используемое как значение модели |
| `optionDisabled` | `string \| undefined` | `undefined` | Имя булева поля опции, отключающего её выбор |
| `optionGroupLabel` | `string \| undefined` | `undefined` | Имя поля заголовка группы (при `group=true`) |
| `optionGroupChildren` | `string` | `'items'` | Имя поля группы со списком дочерних опций |
| `group` | `boolean` | `false` | Включает группировку опций |
| `placeholder` | `string` | `''` | Подсказка при пустом поле — соответствует Figma-свойству `text-placeholder` / `has-placeholder` |
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер поля; `large` маппируется на PrimeNG `size="large"`, `xlarge` — на CSS-класс `p-select-xlg` |
| `filter` | `boolean` | `false` | Показывает строку поиска в выпадающем списке |
| `showClear` | `boolean` | `false` | Показывает иконку очистки (×) при наличии значения — соответствует Figma-свойству `show-clear` |
| `editable` | `boolean` | `false` | Разрешает ручной ввод значения в поле |
| `readonly` | `boolean` | `false` | Только для чтения — соответствует Figma-состоянию `state=readonly` |
| `loading` | `boolean` | `false` | Состояние загрузки опций — соответствует Figma-свойству `show-loader` |
| `inputId` | `string \| undefined` | `undefined` | `id` нативного инпута для связи с внешним `<label>` |
| `appendTo` | `any` | `'body'` | Контейнер для отрисовки выпадающей панели |
| `floatLabel` | `boolean` | `false` | Режим плавающей метки — соответствует Figma-свойству `has-floatlabel` |
| `label` | `string` | `''` | Текст плавающей метки (используется при `floatLabel=true`) |
| `checkmark` | `boolean` | `true` | Показывает галочку у выбранного пункта в списке |
| `emptyMessage` | `string` | `'Нет данных'` | Сообщение при пустом списке опций |
| `emptyFilterMessage` | `string` | `'Результаты не найдены'` | Сообщение при отсутствии результатов фильтрации |
| `(onClear)` | `EventEmitter<Event>` | — | Событие очистки выбранного значения (при `showClear=true`) |
| `(onFilter)` | `EventEmitter<ExtraSelectFilterEvent>` | — | Событие ввода в строку поиска (при `filter=true`) |
| `(onShow)` | `EventEmitter<ExtraAnimationEvent>` | — | Событие открытия панели |
| `(onHide)` | `EventEmitter<ExtraAnimationEvent>` | — | Событие закрытия панели |
| `(onFocus)` | `EventEmitter<Event>` | — | Событие получения фокуса |
| `(onBlur)` | `EventEmitter<Event>` | — | Событие потери фокуса |
| `[(ngModel)]` / `[formControl]` | `any` | `null` | Выбранное значение через ControlValueAccessor |

> `invalid` — вычисляемое свойство: берётся автоматически из связанного `NgControl` (соответствует Figma-состоянию `state=danger`). Устанавливать вручную нельзя.

## Variants

### Default / Base (базовый список)

Figma: `<Select>`, state=default, has-placeholder=true, has-floatlabel=false — nodeId `361:1603`

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  placeholder="Выберите город..."
  [(ngModel)]="selectedCity"
  name="city"
></extra-select>
```

### С привязкой значения (optionValue)

Figma: `<Select>`, state=default, has-placeholder=false, has-floatlabel=false — nodeId `361:1608`

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  optionValue="code"
  [(ngModel)]="selectedCode"
  name="cityCode"
></extra-select>
```

### С фильтрацией (filter)

Figma: `<Select.Overlay>` — выпадающая панель со строкой поиска

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  [filter]="true"
  placeholder="Поиск города..."
  [(ngModel)]="selectedCity"
  name="cityFilter"
></extra-select>
```

### С кнопкой очистки (show-clear)

Figma: `<Select>`, show-clear=true

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  [showClear]="true"
  placeholder="Можно очистить"
  [(ngModel)]="selectedCity"
  name="cityClearable"
></extra-select>
```

### С группировкой опций (group)

Figma: `<Select.Group>` — заголовок группы в панели

```html
<extra-select
  [options]="groupedCities"
  [group]="true"
  optionGroupLabel="region"
  optionGroupChildren="items"
  optionLabel="name"
  placeholder="Выберите город..."
  [(ngModel)]="selectedCity"
  name="cityGrouped"
></extra-select>
```

### С плавающей меткой (has-floatlabel)

Figma: `<Select>`, state=default, has-placeholder=true, has-floatlabel=true — nodeId `13798:26472`

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  [floatLabel]="true"
  label="Город"
  [(ngModel)]="selectedCity"
  name="cityFloat"
></extra-select>
```

### Large / xlarge (увеличенный размер)

Figma: `<Select>`, state=default

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  size="large"
  placeholder="Большое поле"
  [(ngModel)]="selectedCity"
  name="cityLarge"
></extra-select>
```

### Readonly (только для чтения)

Figma: `<Select>`, state=readonly, has-placeholder=true, has-floatlabel=false — nodeId `14980:35505`

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  [readonly]="true"
  [(ngModel)]="selectedCity"
  name="cityReadonly"
></extra-select>
```

### Disabled (отключённое поле)

Figma: `<Select>`, state=disabled, has-placeholder=true, has-floatlabel=false — nodeId `361:1562`

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  [formControl]="disabledControl"
></extra-select>
```

```ts
// Управляется через FormControl:
disabledControl = new FormControl({ value: null, disabled: true });
```

### Невалидное состояние (formControl + валидация)

Figma: `<Select>`, state=danger, has-placeholder=true, has-floatlabel=false — nodeId `361:1572` (невалидное состояние определяется через NgControl автоматически)

```ts
cityControl = new FormControl(null, [Validators.required]);
```

```html
<extra-select
  [options]="cities"
  optionLabel="name"
  placeholder="Обязательное поле"
  [formControl]="cityControl"
></extra-select>
```

## Slots

Проекция содержимого выполняется через шаблоны-директивы, размещаемые между тегами `<extra-select>`. Каждая директива оборачивается в `<ng-template>` и получает контекст через `let-`:

- **`extraSelectOption`** — шаблон пункта выпадающего списка (контекст `let-option`); соответствует Figma-узлу `<Select.Option>`.
- **`extraSelectSelectedItem`** — шаблон выбранного значения в закрытом поле (контекст `let-option`).
- **`extraSelectOptionGroup`** — шаблон заголовка группы (контекст `let-group`); соответствует Figma-узлу `<Select.Group>`.

```html
<extra-select [options]="cities" [(ngModel)]="selectedCity" name="cityCustom">
  <ng-template extraSelectOption let-option>
    <span>{{ option.name }} ({{ option.code }})</span>
  </ng-template>
  <ng-template extraSelectSelectedItem let-option>
    <strong>{{ option.name }}</strong>
  </ng-template>
</extra-select>
```

```ts
import {
  ExtraSelectOptionDirective,
  ExtraSelectSelectedItemDirective,
  ExtraSelectOptionGroupDirective
} from '@cdek-it/angular-ui-kit';
```

## Related

- [InputText](../inputtext/inputtext.figma.md) — атомарное поле ввода текста
- [Button](../button/button.figma.md) — кнопки действий в формах
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний поля
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `[(ngModel)]` или `[formControl]` — компонент реализует `ControlValueAccessor` и именно через них передаётся выбранное значение.
- Управляйте состоянием `disabled` через `FormControl.disable()` / `FormControl.enable()` — это сохраняет dirty/touched-флаги.
- Задавайте `optionLabel` для отображаемой подписи и `optionValue`, когда в модели нужно хранить примитив, а не весь объект опции.
- Включайте `[filter]="true"` для длинных списков, чтобы пользователь мог искать опцию по тексту.
- Для кастомного вида пунктов и выбранного значения используйте директивы `extraSelectOption` / `extraSelectSelectedItem` / `extraSelectOptionGroup`.

**Don't:**
- Не задавайте `[disabled]="true"` как Input-атрибут напрямую — компонент не объявляет `@Input() disabled`; передавайте через `FormControl` или `ControlValueAccessor`.
- Не используйте поле без `[(ngModel)]` / `[formControl]` — без привязки выбранное значение не синхронизируется с моделью.
- Не включайте `[group]="true"` без `optionGroupLabel` и `optionGroupChildren` — группы не отрисуются корректно.
- Не задавайте `invalid` вручную — невалидное состояние вычисляется из связанного `NgControl`.
