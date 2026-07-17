---
component: ExtraSelectButton
selector: extra-select-button
import:
  symbol: ExtraSelectButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '317:1832'
  componentKey: '62afbf071ec53d216933d644c1e3041ff6a11dee'
  name: '<SelectButton>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraSelectButton` — segmented-группа кнопок для выбора одного или нескольких значений из небольшого набора взаимоисключающих опций (2–5). Кнопки слиты в единый контрол, выбор применяется немедленно. Оборачивает PrimeNG `p-selectbutton` и реализует `ControlValueAccessor`, поэтому интегрируется с `[(ngModel)]` и реактивными формами через `formControl` / `formControlName`.

Компонент соответствует Figma-компоненту `<SelectButton>` (nodeId `317:1832`). Figma-свойство `state` маппируется на Angular-инпут `disabled`, а набор сегментов (Figma-свойство `change-layout`) описывается массивом `options` с объектами `ExtraSelectButtonItem`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `options` | `ExtraSelectButtonItem[]` | `[]` | Массив сегментов; каждый сегмент задаётся объектом с `label`, `value`, опциональными `icon` и `disabled` — соответствует Figma-свойству `change-layout` |
| `optionLabel` | `string` | `'label'` | Имя поля объекта опции, из которого берётся подпись сегмента |
| `optionValue` | `string` | `'value'` | Имя поля объекта опции, из которого берётся значение модели |
| `optionDisabled` | `string` | `'disabled'` | Имя поля объекта опции, отключающего отдельный сегмент |
| `size` | `'small' \| 'base' \| 'large' \| 'xLarge'` | `'base'` | Размер контрола |
| `multiple` | `boolean` | `false` | Множественный выбор: модель — массив значений вместо одиночного значения |
| `allowEmpty` | `boolean` | `true` | Разрешает снять выбор (пустое значение) повторным нажатием на активный сегмент |
| `disabled` | `boolean` | `false` | Отключённое состояние всего контрола — соответствует Figma-свойству `state=disabled`; задаётся через `[disabled]` или `setDisabledState` формы |

Выбранное значение задаётся не отдельным инпутом, а моделью через `ControlValueAccessor`: используйте `[(ngModel)]`, `formControl` или `formControlName`. В одиночном режиме модель — `string`, в режиме `multiple` — `string[]`. Изменение значения также доступно через `@Output() valueChange`.

## Variants

### Одиночный выбор (по умолчанию)

Figma: `<SelectButton>`, state=default — single-режим

```html
<extra-select-button
  [options]="viewOptions"
  [(ngModel)]="selectedView"
></extra-select-button>
```

В реактивных формах эквивалентно:

```html
<extra-select-button
  [options]="viewOptions"
  [formControl]="viewControl"
></extra-select-button>
```

### Множественный выбор (multiple)

Figma: `<SelectButton>`, state=default — multiple-режим, модель-массив

```html
<extra-select-button
  [options]="filterOptions"
  [multiple]="true"
  [(ngModel)]="selectedFilters"
></extra-select-button>
```

### Без возможности снять выбор (allowEmpty=false)

Figma: `<SelectButton>`, state=default — обязателен один активный сегмент

```html
<extra-select-button
  [options]="viewOptions"
  [allowEmpty]="false"
  [(ngModel)]="selectedView"
></extra-select-button>
```

### С иконками в сегментах

Figma: `<SelectButton>`, state=default — сегменты с иконкой; CSS-классы иконок — [icons.md](../../figma-code-connect/icons.md)

```html
<extra-select-button
  [options]="alignOptions"
  [(ngModel)]="selectedAlign"
></extra-select-button>
```

### Disabled (отключён)

Figma: `<SelectButton>`, state=disabled

```html
<extra-select-button
  [options]="viewOptions"
  [disabled]="true"
  [(ngModel)]="selectedView"
></extra-select-button>
```

### Отдельный отключённый сегмент

Figma: `<SelectButton>`, state=default — один сегмент с `disabled: true`

```html
<extra-select-button
  [options]="partlyDisabledOptions"
  [(ngModel)]="selectedView"
></extra-select-button>
```

## Slots

Не используются. Содержимое сегментов задаётся через `@Input() options`: подпись берётся из поля `optionLabel`, иконка — из поля `icon` объекта опции.

## Related

- [ExtraButton](../button/button.figma.md) — одиночная кнопка действия (не выбор значения)
- [ExtraToggleButton](../togglebutton/togglebutton.figma.md) — одиночный переключатель состояния
- [ExtraCheckbox](../checkbox/checkbox.figma.md) — множественный выбор списком с похожим маппингом модели
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки сегментов (поле `icon`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний контрола
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте для 2–5 взаимоисключающих опций с мгновенным применением выбора (переключение вида, фильтр)
- Передавайте значение через `[(ngModel)]` / `formControl`; не задавайте «выбран» отдельным атрибутом
- Для режима «выбор нескольких» задавайте `[multiple]="true"` — модель станет массивом
- Используйте `[allowEmpty]="false"`, когда хотя бы один сегмент должен оставаться активным
- Для иконок в сегментах задавайте поле `icon` в объекте опции — классы берите из [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте для навигации по разделам — для этого предназначен компонент Tabs
- Не используйте для длинных списков значений — выберите `ExtraSelect`
- Не путайте с `ExtraToggleButton` — это одиночный переключатель, а не группа сегментов
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
