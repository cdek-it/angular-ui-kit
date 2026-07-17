---
component: ExtraStepper
selector: extra-stepper
import:
  symbol: ExtraStepperComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1079:7496'
  componentKey: '13935dba8f227678ec2a853b311e916cd7fd3e98'
  name: '<Stepper>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraStepper` — индикатор шагов пошагового процесса (мастер/wizard): последовательность этапов с текущим, завершёнными и оставшимися шагами. Поддерживает горизонтальную и вертикальную ориентацию, линейный режим и опциональные панели контента. Оборачивает PrimeNG `p-stepper` и data-driven строит шаги из массива `steps`.

Компонент соответствует Figma-компоненту `<Stepper>` (nodeId `1079:7496`, библиотека «UI Kit (DS) v2.0»). Шаги задаются декларативно через `@Input() steps`, а не через ручную композицию под-элементов.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `[(value)]` | `number \| undefined` | `1` | Двусторонняя привязка значения активного шага — `[value]` задаёт текущий шаг, `(valueChange)` реагирует на переход |
| `steps` | `ExtraStepperItem[]` | `[]` | Массив шагов; каждый элемент описывает `value`, `label`, опциональные `caption`, `content`, `disabled`, `invalid` |
| `linear` | `boolean` | `false` | Запрещает переход к следующему шагу без завершения текущего — соответствует Figma-режиму `linear` |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация степпера — соответствует Figma-свойству ориентации |
| `showPanels` | `boolean` | `true` | Отображать ли панели контента с навигационными кнопками под шагами |

> `valueChange` — `@Output() EventEmitter<number | undefined>`. Используйте синтаксис `[(value)]` для двусторонней привязки.

Структура одного элемента `ExtraStepperItem`:

| Поле | Тип | Описание |
|------|-----|---------|
| `value` | `number \| undefined` | Уникальный идентификатор шага, по нему определяется активность |
| `label` | `string` | Заголовок шага |
| `caption` | `string` | Опциональная вторичная подпись под заголовком |
| `content` | `string` | Опциональный текст панели контента (при `showPanels=true`) |
| `disabled` | `boolean` | Шаг недоступен для перехода |
| `invalid` | `boolean` | Шаг помечен как невалидный (ошибка); блокирует кнопку «Вперёд» |

## Variants

### Horizontal (горизонтальный степпер с панелями)

Figma: `<Stepper>`, orientation=horizontal — nodeId `1079:7496`

```html
<extra-stepper
  [(value)]="activeStep"
  [steps]="steps"
></extra-stepper>
```

```ts
import { ExtraStepperComponent, ExtraStepperItem } from '@cdek-it/angular-ui-kit';

// В компоненте:
activeStep = 1;
steps: ExtraStepperItem[] = [
  { value: 1, label: 'Получатель', caption: 'данные', content: 'Шаг 1' },
  { value: 2, label: 'Адрес', caption: 'доставки', content: 'Шаг 2' },
  { value: 3, label: 'Оплата', caption: 'способ', content: 'Шаг 3' },
];
```

### Vertical (вертикальный степпер)

Figma: `<Stepper>`, orientation=vertical

Шаги располагаются друг под другом, панель контента раскрывается под активным шагом.

```html
<extra-stepper
  orientation="vertical"
  [(value)]="activeStep"
  [steps]="steps"
></extra-stepper>
```

### Linear (линейный режим)

Figma: `<Stepper>`, linear=true

Переход к следующему шагу возможен только после завершения текущего.

```html
<extra-stepper
  [linear]="true"
  [(value)]="activeStep"
  [steps]="steps"
></extra-stepper>
```

### Steps only (только индикатор, без панелей)

Figma: `<Stepper>`, без `<Stepper.StepPanel>`

Отображает только последовательность шагов без панелей контента и навигационных кнопок.

```html
<extra-stepper
  [showPanels]="false"
  [(value)]="activeStep"
  [steps]="steps"
></extra-stepper>
```

## Slots

Не используются. Композиция Figma — `<Stepper>` содержит внутренние под-элементы `<🔒Stepper.Item>` (шаг с номером/иконкой, коннектором и label) и `<🔒Stepper.StepPanel>` (панель контента). В коде эта структура строится декларативно из `@Input() steps`, а под-сущности PrimeNG (`p-step-list`, `p-step`, `p-step-item`, `p-step-panels`, `p-step-panel`) инкапсулированы внутри `ExtraStepperComponent` и не выносятся в шаблон потребителя:

- `p-step-list` + `p-step` — горизонтальная лента шагов (`orientation="horizontal"`);
- `p-step-item` + `p-step` — вертикальная композиция шага (`orientation="vertical"`);
- `p-step-panels` + `p-step-panel` — панели контента, рендерятся при `showPanels=true`.

Навигационные кнопки «Назад» и «Вперёд» внутри панелей реализованы через [Button](../button/button.figma.md).

## Related

- [Button](../button/button.figma.md) — навигационные кнопки «Назад» и «Вперёд» в панелях шагов
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Управляйте активным шагом через `[(value)]` — это сохраняет двустороннюю синхронизацию и эмитит `valueChange` при переходе.
- Задавайте уникальный `value` каждому элементу `steps` — по нему определяется активность и порядок шагов.
- Используйте `[linear]="true"` для обязательной последовательности, где шаги нельзя пропускать.
- Помечайте шаг с ошибкой через `invalid: true` в элементе `steps` — это блокирует кнопку «Вперёд».

**Don't:**
- Не используйте Stepper для свободного переключения разделов — для этого предназначены Tabs.
- Не путайте со списком событий по времени (Timeline) — Stepper ведёт по управляемому процессу.
- Не задавайте `value` активного шага вне диапазона значений в `steps` — активный шаг не определится.
- Не отключайте `showPanels`, если шаги должны нести контент и навигацию внутри степпера.
