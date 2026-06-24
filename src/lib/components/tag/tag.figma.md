---
component: ExtraTag
selector: extra-tag
import:
  symbol: ExtraTagComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '21:1238'
  componentKey: '7dd396d5b311b096c403e1c4764dcbf700eddfbd'
  name: '<Tag>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraTag` — статичная некликабельная метка статуса или категории: короткий текст с тоном по `severity` и опциональной иконкой. Оборачивает PrimeNG `p-tag` и используется для обозначения статусов объектов, категорий и семантики записей в списках и таблицах.

Компонент соответствует Figma-компоненту `<Tag>` (nodeId `21:1238`). Tag не выполняет действий: для интерактивной метки используйте Chip, для overlay-счётчика — Badge.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `string` | `''` | Текст метки — соответствует Figma-свойству `text-tag` |
| `severity` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warn' \| 'danger'` | `'primary'` | Семантический тон — соответствует Figma-свойству `severity` (значение `primary` ↔ Figma `basic`, `warn` ↔ Figma `warning`) |
| `rounded` | `boolean` | `false` | Скруглённая форма метки — соответствует Figma-свойству `rounded` |
| `icon` | `string` | `''` | CSS-класс иконки (например `'ti ti-check'`) — соответствует Figma-свойствам `show-icon` / `change-icon`; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |

## Variants

### Basic (нейтральная метка)

Figma: `<Tag>`, severity=basic (в коде: `severity="primary"`), rounded=false — nodeId `21:1237`

```html
<extra-tag value="Tag"></extra-tag>
```

### Secondary (вторичный тон)

Figma: `<Tag>`, severity=secondary, rounded=false — nodeId `2262:1019`

```html
<extra-tag value="Черновик" severity="secondary"></extra-tag>
```

### Info (информационный тон)

Figma: `<Tag>`, severity=info, rounded=false — nodeId `21:1235`

```html
<extra-tag value="В работе" severity="info"></extra-tag>
```

### Success (успех)

Figma: `<Tag>`, severity=success, rounded=false — nodeId `21:1236`

```html
<extra-tag value="Готово" severity="success"></extra-tag>
```

### Warning (предупреждение)

Figma: `<Tag>`, severity=warning (в коде: `severity="warn"`), rounded=false — nodeId `21:1233`

```html
<extra-tag value="Ожидает" severity="warn"></extra-tag>
```

### Danger (ошибка)

Figma: `<Tag>`, severity=danger, rounded=false — nodeId `21:1234`

```html
<extra-tag value="Ошибка" severity="danger"></extra-tag>
```

### Rounded (скруглённая форма)

Figma: `<Tag>`, severity=basic, rounded=true — nodeId `21:1287`

```html
<extra-tag value="Tag" [rounded]="true"></extra-tag>
```

### С иконкой

Figma: `<Tag>`, show-icon=true; набор иконок — [icons.md](../../figma-code-connect/icons.md)

```html
<extra-tag value="Готово" severity="success" icon="ti ti-check"></extra-tag>
```

## Slots

Не используются. Содержимое метки передаётся через `@Input() value` и `@Input() icon`.

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`ti ti-*`)
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены severity
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular
- [Button](../button/button.figma.md) — кнопка для действий (Tag действий не выполняет)
- [InputText](../inputtext/inputtext.figma.md) — текстовое поле ввода
- [Dialog](../dialog/dialog.figma.md) — модальное окно

## Do / Don't

**Do:**
- Используйте `severity` для семантического тона: `success` для завершённых, `danger` для ошибок, `warn` для предупреждений
- Задавайте иконку через справочник [icons.md](../../figma-code-connect/icons.md), а не вручную
- Используйте Tag как статичный индикатор статуса или категории

**Don't:**
- Не используйте Tag для интерактивных меток (удаление, выбор) — для этого предназначен Chip
- Не используйте Tag как overlay-счётчик у иконки — для этого предназначен Badge
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не путайте значения тонов: в коде `primary` и `warn`, в Figma — `basic` и `warning`
