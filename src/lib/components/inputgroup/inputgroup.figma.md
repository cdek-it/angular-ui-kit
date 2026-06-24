---
component: ExtraInputGroup
selector: extra-input-group
import:
  symbol: ExtraInputGroupComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '437:3505'
  componentKey: '5804ce15e658506c41002f48bf003b500ceceef1'
  name: '<InputGroup>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraInputGroupComponent` — обёртка, объединяющая поле ввода (`<extra-input-text>`) с присоединёнными аддонами (текст, единица измерения, иконка, кнопка) слева и/или справа в единый визуальный блок. Аддоны проецируются как дочерние элементы `<extra-input-group-addon>`.

Компонент соответствует Figma-компоненту `<InputGroup>` (nodeId `437:3505`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Позиция аддонов определяется Figma-свойством `addon-position` (`left`, `right`, `left & right`), а само вкладываемое поле — свойством `change-field`.

## Props mapping

### `<extra-input-group>` — обёртка

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `size` | `'small' \| 'base' \| 'large' \| 'xlarge'` | `'base'` | Размер группы; влияет на паддинги и шрифты аддонов. Должен совпадать с `size` вложенного `<extra-input-text>` |

> Позиция аддонов (Figma-свойство `addon-position`) в коде не является `@Input` — она задаётся порядком проекции `<extra-input-group-addon>` относительно `<extra-input-text>` в шаблоне.

### `<extra-input-group-addon>` — аддон

`ExtraInputGroupAddonComponent` (символ `ExtraInputGroupAddonComponent`, селектор `extra-input-group-addon`) не имеет `@Input`. Содержимое аддона (иконка, текст или кнопка) передаётся через проекцию контента — см. [Slots](#slots).

## Variants

### Addon слева (addon-position=left)

Figma: `<InputGroup>`, addon-position=left — nodeId `437:3504`

```html
<extra-input-group>
  <extra-input-group-addon><i class="ti ti-user"></i></extra-input-group-addon>
  <extra-input-text placeholder="Введите данные..." [(ngModel)]="value" name="field" [fluid]="true"></extra-input-text>
</extra-input-group>
```

### Addon справа (addon-position=right)

Figma: `<InputGroup>`, addon-position=right — nodeId `437:3502`

```html
<extra-input-group>
  <extra-input-text placeholder="Сумма" [(ngModel)]="amount" name="amount" [fluid]="true"></extra-input-text>
  <extra-input-group-addon>₽</extra-input-group-addon>
</extra-input-group>
```

### Addon с обеих сторон (addon-position=left & right)

Figma: `<InputGroup>`, addon-position=left & right — nodeId `437:3503`

```html
<extra-input-group>
  <extra-input-group-addon><i class="ti ti-currency-dollar"></i></extra-input-group-addon>
  <extra-input-text placeholder="0.00" [(ngModel)]="price" name="price" [fluid]="true"></extra-input-text>
  <extra-input-group-addon>USD</extra-input-group-addon>
</extra-input-group>
```

### Размер xlarge

Figma: `<InputGroup>`, addon-position=left

```html
<extra-input-group size="xlarge">
  <extra-input-group-addon><i class="ti ti-search"></i></extra-input-group-addon>
  <extra-input-text size="xlarge" placeholder="Поиск" [(ngModel)]="query" name="query" [fluid]="true"></extra-input-text>
</extra-input-group>
```

## Slots

- **`default` (обёртка)** — `<extra-input-group>` проецирует через `<ng-content>` дочерние `<extra-input-group-addon>` и `<extra-input-text>`. Позиция аддона определяется его порядком относительно поля.
- **`default` (аддон)** — `<extra-input-group-addon>` проецирует через `<ng-content>` своё содержимое: иконку (см. [icons.md](../../figma-code-connect/icons.md)), текст или кнопку.

## Related

- [InputText](../inputtext/inputtext.figma.md) — поле ввода, вкладываемое в группу
- [Токены](../../figma-code-connect/tokens.md) — токены паддингов и фонов аддонов
- [Иконки](../../figma-code-connect/icons.md) — иконки для аддонов
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте одинаковый `size` на `<extra-input-group>` и на вложенном `<extra-input-text>`, чтобы поле и аддоны совпадали по высоте.
- Используйте `[fluid]="true"` на `<extra-input-text>` внутри группы, чтобы поле занимало доступную ширину.
- Управляйте позицией аддона его порядком в шаблоне: до поля — слева, после — справа, и до, и после — с обеих сторон.
- Передавайте иконки в `<extra-input-group-addon>` ссылками из [icons.md](../../figma-code-connect/icons.md).

**Don't:**
- Не задавайте позицию аддона через `@Input` — у `<extra-input-group-addon>` нет входных свойств; позиция определяется порядком проекции.
- Не инлайньте значения токенов паддингов/цветов аддонов — используйте [tokens.md](../../figma-code-connect/tokens.md).
- Не вкладывайте несколько `<extra-input-text>` в одну группу — обёртка рассчитана на одно поле с аддонами.
