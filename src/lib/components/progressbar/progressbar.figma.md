---
component: ExtraProgressBar
selector: extra-progressbar
import:
  symbol: ExtraProgressBarComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '113:1004'
  componentKey: 'd5a0ce52cb63f14e227643dfbe424a0693d40747'
  name: '<ProgressBar>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraProgressBar` — линейный индикатор прогресса задачи: горизонтальный трек с заполняющимся баром, отображающий долю выполнения длительной операции (0–100). Оборачивает PrimeNG `p-progressbar`.

Компонент соответствует Figma-компоненту `<ProgressBar>` (nodeId `113:1004`). Figma-свойство `progress` маппируется на инпут `value`, а `hasValue` — на `showValue` (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `number` | `0` | Доля выполнения операции (0–100) — соответствует Figma-свойству `progress` |
| `mode` | `'determinate' \| 'indeterminate'` | `'determinate'` | Режим отображения: с известным процентом или анимированный без значения |
| `showValue` | `boolean` | `true` | Показывать числовое значение поверх трека — соответствует Figma-свойству `hasValue` |

## Variants

### Determinate (с известным процентом)

Figma: `<ProgressBar>`, progress=50, hasValue=true

```html
<extra-progressbar [value]="50"></extra-progressbar>
```

### Determinate без числовой метки

Figma: `<ProgressBar>`, progress=50, hasValue=false

```html
<extra-progressbar [value]="50" [showValue]="false"></extra-progressbar>
```

### Indeterminate (анимированный, без значения)

Figma: `<ProgressBar>`, mode=indeterminate — анимированная активность без конкретной доли выполнения

```html
<extra-progressbar mode="indeterminate"></extra-progressbar>
```

## Slots

Не используются. Числовое значение формируется компонентом по `value` и управляется через `showValue`.

## Related

- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraButton](../button/button.figma.md) — пример компонента с маппингом Figma-вариантов

## Do / Don't

**Do:**
- Используйте `mode="determinate"` с заданным `[value]`, когда процент выполнения известен
- Используйте `mode="indeterminate"` для фоновой активности без измеримого прогресса
- Скрывайте числовую метку через `[showValue]="false"`, когда процент не нужен визуально
- Держите `value` в диапазоне 0–100

**Don't:**
- Не задавайте `[value]` в режиме `mode="indeterminate"` — доля выполнения там не отображается
- Не используйте `ExtraProgressBar` для коротких операций без процента — для них предназначен круговой индикатор (ProgressSpinner)
- Не передавайте `value` вне диапазона 0–100
