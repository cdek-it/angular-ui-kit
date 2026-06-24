---
component: ExtraMeterGroup
selector: extra-metergroup
import:
  symbol: ExtraMeterGroupComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '222:1489'
  componentKey: '5e667c21084e33270039bc3dfec1a77ef9ef63d2'
  name: '<MeterGroup>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraMeterGroup` — компонент шкалы измерения, отображающий несколько значений-сегментов на одной общей шкале (`role=meter`) в известном диапазоне. Каждый сегмент имеет своё значение, цвет, иконку и подпись; компонент показывает распределение или заполненность по категориям и неинтерактивен. Оборачивает PrimeNG `p-metergroup`.

Компонент соответствует Figma-компоненту `<MeterGroup>` (nodeId `222:1489`). Figma-свойства `label-position` и `label-orientation` маппируются на Angular-инпуты `labelPosition` и `labelOrientation`; ориентация самой шкалы задаётся инпутом `orientation`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `ExtraMeterItem[]` | `[]` | Массив сегментов шкалы; каждый элемент задаёт `value`, `color`, `icon` и `label` |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Ориентация шкалы — горизонтальная или вертикальная |
| `labelPosition` | `'start' \| 'end'` | `'end'` | Позиция блока подписей относительно шкалы — соответствует Figma-свойству `label-position` |
| `labelOrientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Раскладка списка подписей — соответствует Figma-свойству `label-orientation` |

Тип `ExtraMeterItem` реэкспортирует PrimeNG `MeterItem`: поле `value` (число) обязательно, поля `label`, `color` и `icon` опциональны. CSS-классы иконок берутся из справочника [icons.md](../../figma-code-connect/icons.md), цвета сегментов — из токенов [tokens.md](../../figma-code-connect/tokens.md).

## Variants

### Горизонтальная шкала (по умолчанию)

Figma: `<MeterGroup>`, label-position=end, label-orientation=horizontal — nodeId `222:1489`

```html
<extra-metergroup [value]="meterItems"></extra-metergroup>
```

### Вертикальная шкала

Figma: `<MeterGroup>` — orientation в коде; раскладка подписей задаётся отдельно

```html
<extra-metergroup orientation="vertical" [value]="meterItems"></extra-metergroup>
```

### Подписи перед шкалой (label-position=start)

Figma: `<MeterGroup>`, label-position=start, label-orientation=horizontal

```html
<extra-metergroup labelPosition="start" [value]="meterItems"></extra-metergroup>
```

### Вертикальная раскладка подписей (label-orientation=vertical)

Figma: `<MeterGroup>`, label-position=end, label-orientation=vertical

```html
<extra-metergroup labelOrientation="vertical" [value]="meterItems"></extra-metergroup>
```

### Несколько метрик (многосегментная шкала)

Figma: `<MeterGroup>` с несколькими видимыми сегментами (`show-item-*`)

```html
<extra-metergroup [value]="storageBreakdown"></extra-metergroup>
```

## Slots

Не используются. Сегменты и их подписи задаются данными через `@Input() value` (`ExtraMeterItem[]`).

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки сегментов (`MeterItem.icon`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены сегментов (`MeterItem.color`)
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraButton](../button/button.figma.md) — пример контракта со строковыми вариантами

## Do / Don't

**Do:**
- Передавайте данные сегментов через `[value]` массивом `ExtraMeterItem[]`
- Используйте `orientation="vertical"` для компактных вертикальных макетов
- Задавайте `labelPosition` и `labelOrientation` для управления раскладкой подписей
- Для цветов сегментов используйте токены [tokens.md](../../figma-code-connect/tokens.md), для иконок — [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте `ExtraMeterGroup` для прогресса задачи во времени — для этого предназначен ProgressBar
- Не применяйте компонент для интерактивного ввода значения — он только отображает данные
- Не инлайньте цвета и CSS-классы иконок вручную — используйте справочники токенов и иконок
