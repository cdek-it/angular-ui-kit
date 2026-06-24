---
component: ExtraChip
selector: extra-chip
import:
  symbol: ExtraChipComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '312:1298'
  componentKey: 'a340ce844ed6af7b65422b30057e61870247e137'
  name: '<Chip>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraChip` — компактный интерактивный элемент-метка с текстом, опциональной ведущей иконкой и опциональной кнопкой удаления. Оборачивает PrimeNG `p-chip`.

Компонент соответствует Figma-компоненту `<Chip>` (nodeId `312:1298`). Figma-свойства `text-chip`, `show-icon`/`change-icon`, `show-close` и `state` маппируются на Angular-инпуты (см. раздел Props mapping).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `label` | `string` | `''` | Текст метки — соответствует Figma-свойству `text-chip` |
| `icon` | `string` | `''` | CSS-класс ведущей иконки; пустое значение скрывает иконку — соответствует Figma-свойствам `show-icon` (показ/скрытие) и `change-icon` (выбор иконки). Доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `removable` | `boolean` | `false` | Показывать кнопку удаления — соответствует Figma-свойству `show-close` |
| `disabled` | `boolean` | `false` | Отключённое состояние — соответствует Figma-свойству `state=disabled` |

Событие удаления `(onRemove)` (`EventEmitter<MouseEvent>`) возникает при клике на кнопку удаления и доступно только при `[removable]="true"`.

## Variants

### Default (только текст)

Figma: `state=default`, `show-icon=false`, `show-close=false`

```html
<extra-chip label="В пути"></extra-chip>
```

### With icon (с ведущей иконкой)

Figma: `state=default`, `show-icon=true`, `change-icon`

```html
<extra-chip label="Адрес" icon="ti ti-map-pin"></extra-chip>
```

### Removable (с кнопкой удаления)

Figma: `state=default`, `show-close=true`

```html
<extra-chip
  label="Фильтр"
  [removable]="true"
  (onRemove)="onRemove($event)"
></extra-chip>
```

### Removable with icon (иконка + удаление)

Figma: `state=default`, `show-icon=true`, `show-close=true`

```html
<extra-chip
  label="Москва"
  icon="ti ti-map-pin"
  [removable]="true"
  (onRemove)="onRemove($event)"
></extra-chip>
```

### Disabled (отключён)

Figma: `state=disabled`

```html
<extra-chip label="Недоступно" [disabled]="true"></extra-chip>
```

## Slots

Не используются. Содержимое чипа передаётся через `@Input() label` и `@Input() icon`.

## Related

- [ExtraButton](../button/button.figma.md) — кнопка для действий и навигации
- [ExtraTag](../tag/tag.figma.md) — статичная некликабельная метка
- [ExtraAvatar](../avatar/avatar.figma.md) — компонент для отображения аватара
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`ti ti-*`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены состояний
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте `ExtraChip` для категоризации, фильтрации и удаляемых токенов рядом с полем ввода
- Для удаляемого чипа задавайте `[removable]="true"` и подписывайтесь на `(onRemove)`
- Задавайте `icon` только из справочника [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте `ExtraChip` для навигации между страницами — берите [ExtraButton](../button/button.figma.md)
- Не заменяйте `ExtraChip` статичной меткой — для неинтерактивных меток есть [ExtraTag](../tag/tag.figma.md)
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не ожидайте событие `(onRemove)` без `[removable]="true"` — кнопка удаления не отображается
