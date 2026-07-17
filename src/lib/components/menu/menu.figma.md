---
component: ExtraMenu
selector: extra-menu
import:
  symbol: ExtraMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '16005:21803'
  componentKey: 'f8ce571000a0f4d615795f6ea2307b3b478964a7'
  name: '<Menu>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraMenu` — компонент вертикального меню для навигации и действий. Принимает массив пунктов через `@Input() model` и отображает их списком; поддерживает разделители, иконки, группировку (вложенные `items`) и пункты с описанием (`caption`). Оборачивает PrimeNG `p-menu`.

Компонент соответствует Figma-компоненту `<Menu>` (nodeId `16005:21803`) из библиотеки UI Kit (DS) v2.0. Figma-свойство `popup` напрямую маппируется в `@Input() popup`. Это не панель-навигация (`Menubar`), не многоуровневое меню (`TieredMenu`) и не широкое раскрывающееся меню (`MegaMenu`).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `model` | `ExtraMenuModel[]` | `[]` | Массив пунктов меню (label, icon, command, url, separator, items, caption и др.) |
| `popup` | `boolean` | `false` | Режим всплывающего меню — соответствует Figma-свойству `popup`. В этом режиме меню скрыто и показывается вызовом метода `toggle(event)` |

Иконки пунктов задаются строковым CSS-классом в поле `icon` пункта `model`; доступные иконки — [icons.md](../../figma-code-connect/icons.md).

## Variants

### Inline (popup=false)

Figma: `<Menu>`, popup=false — nodeId `16005:21806`

Меню отображается на месте, в потоке документа.

```html
<extra-menu [model]="items"></extra-menu>
```

### Popup (popup=true)

Figma: `<Menu>`, popup=true — nodeId `16005:21804`

Меню скрыто и открывается рядом с триггером по вызову `toggle(event)` через ссылку на компонент.

```html
<extra-button label="Действия" variant="secondary" (click)="menuRef.toggle($event)"></extra-button>
<extra-menu #menuRef [model]="items" [popup]="true"></extra-menu>
```

## Slots

Для кастомного рендера пункта меню используется структурная директива `*extraMenuItem` (символ `ExtraMenuItemDirective`). Шаблон получает текущий пункт через контекст `let-item`; при отсутствии директивы применяется стандартный рендер пункта.

```html
<extra-menu [model]="items">
  <ng-template extraMenuItem let-item>
    <a class="p-menu-item-link" role="menuitem" tabindex="0">
      <span class="p-menu-item-label">{{ item.label }}</span>
    </a>
  </ng-template>
</extra-menu>
```

## Related

- [ExtraButton](../button/button.figma.md) — частый триггер для popup-режима меню
- [Иконки](../../figma-code-connect/icons.md) — CSS-классы иконок пунктов
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Передавайте пункты через `[model]`, описывая их декларативно в компоненте
- Для popup-режима задавайте `[popup]="true"` и открывайте меню методом `toggle($event)` по ссылке на компонент
- Используйте `separator: true` в пункте `model` для визуального разделения групп действий
- Для нестандартного отображения пункта используйте директиву `*extraMenuItem` вместо переопределения стилей

**Don't:**
- Не используйте `ExtraMenu` для горизонтальной навигации — для неё предназначен `Menubar`
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не открывайте popup-меню вручную через DOM — используйте метод `toggle()`
