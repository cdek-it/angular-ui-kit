---
component: ExtraBadge
selector: extra-badge
import:
  symbol: ExtraBadgeComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '21:1193'
  componentKey: 'b8e76ebb1556bc428673719f4f3a5dccd0cf20a9'
  name: '<Badge>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraBadge` — компактный неинтерактивный индикатор: счётчик (число) или метка тона поверх элемента (иконка, кнопка, аватар). Оборачивает PrimeNG `p-badge` и нормализует значения `severity` и `size` под токены дизайн-системы.

Компонент соответствует Figma-компоненту `<Badge>` (nodeId `21:1193`). Figma-свойства `severity` и `dot` маппируются на Angular-инпуты (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `string \| number` | `''` | Отображаемое значение бейджа; пустое значение даёт точку-индикатор — соответствует Figma-свойству `dot=true` |
| `severity` | `'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'primary'` | Цветовая схема — соответствует Figma-свойству `severity` (значение `primary` соответствует Figma `severity=basic`); цвета описаны в [tokens.md](../../figma-code-connect/tokens.md) |
| `size` | `'base' \| 'large' \| 'xlarge'` | `'base'` | Размер бейджа; отдельного свойства размера в Figma нет — управляется на уровне макета |

## Variants

### Primary / Base (счётчик по умолчанию)

Figma: `<Badge>`, severity=basic, dot=false — nodeId `21:1193`

```html
<extra-badge value="8"></extra-badge>
```

### Success (успех)

Figma: `<Badge>`, severity=success, dot=false

```html
<extra-badge value="8" severity="success"></extra-badge>
```

### Info (информация)

Figma: `<Badge>`, severity=info, dot=false

```html
<extra-badge value="8" severity="info"></extra-badge>
```

### Warning (предупреждение)

Figma: `<Badge>`, severity=warning, dot=false

```html
<extra-badge value="8" severity="warning"></extra-badge>
```

### Danger (ошибка)

Figma: `<Badge>`, severity=danger, dot=false

```html
<extra-badge value="3" severity="danger"></extra-badge>
```

### Dot (точка-индикатор без числа)

Figma: `<Badge>`, dot=true — пустое `value` даёт точку

```html
<extra-badge severity="danger"></extra-badge>
```

### Large (большой размер)

Figma: размер задаётся на уровне макета, отдельного Figma-свойства нет

```html
<extra-badge value="8" size="large"></extra-badge>
```

### Overflow (порог переполнения)

Figma: `<Badge>`, dot=false — счётчик с числом более 99

```html
<extra-badge value="99+"></extra-badge>
```

## Slots

Не используются. Значение бейджа передаётся через `@Input() value`.

## Related

- [Токены](../../figma-code-connect/tokens.md) — цветовые токены severity
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [ExtraTag](../tag/tag.figma.md) — текстовая метка статуса/категории (не счётчик)
- [ExtraButton](../button/button.figma.md) — кнопка с поддержкой наложенного бейджа

## Do / Don't

**Do:**
- Используйте `value` для счётчика непрочитанных/новых элементов
- Оставляйте `value` пустым для точки-индикатора (Figma `dot=true`)
- Задавайте `severity="danger"` для критичных уведомлений, требующих внимания
- Используйте формат `99+` для переполнения вместо больших чисел

**Don't:**
- Не используйте бейдж как кликабельный элемент — он неинтерактивен (для действий используйте [ExtraButton](../button/button.figma.md))
- Не применяйте бейдж как текстовую метку категории — для этого есть [ExtraTag](../tag/tag.figma.md)
- Не инлайньте цвета вручную — используйте `severity` и токены [tokens.md](../../figma-code-connect/tokens.md)
