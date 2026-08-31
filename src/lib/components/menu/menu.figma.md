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
updated: '2026-08-31'
---

## Overview

`ExtraMenu` — компонент вертикального меню для навигации и действий. Принимает пункты через `@Input() items` в виде размеченного объединения `MenuAction | MenuGroup | MenuSeparator`; поддерживает разделители, иконки, группировку (`MenuGroup.items`, вложенность на один уровень) и пункты с описанием (`caption`). Оборачивает PrimeNG `p-menu`.

Компонент соответствует Figma-компоненту `<Menu>` (nodeId `16005:21803`) из библиотеки UI Kit (DS) v2.0. Figma-свойство `popup` напрямую маппируется в `@Input() popup`. Это не панель-навигация (`Menubar`), не многоуровневое меню (`TieredMenu`) и не широкое раскрывающееся меню (`MegaMenu`).

**Ограничение PrimeNG:** если в `items` присутствует хотя бы один `MenuGroup`, все объекты верхнего уровня рендерятся как подписи групп — плоские `MenuAction` на верхнем уровне вместе с группами не поддерживаются PrimeNG (см. Do/Don't).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `items` | `MenuItem[]` (`MenuAction \| MenuGroup \| MenuSeparator`) | `[]` | Пункты меню |
| `popup` | `boolean` | `false` | Режим всплывающего меню — соответствует Figma-свойству `popup`. В этом режиме меню скрыто и показывается методом `show()`/`toggle()` |
| `open` | `boolean` | `false` | Управляемая видимость popup-меню; синхронизируется через `(onOpenChange)` |
| `appendTo` | `'body' \| 'self' \| ElementLike` | `'body'` | Контейнер рендера overlay |
| `ariaLabel` | `string` | — | Доступное имя меню |

Иконки пунктов (`icon`, `iconEnd`) задаются строкой класса tabler icon — см. [icons.md](../../figma-code-connect/icons.md).

## Variants

### Inline (popup=false)

Figma: `<Menu>`, popup=false — nodeId `16005:21806`

Меню отображается на месте, в потоке документа.

```html
<extra-menu [items]="items"></extra-menu>
```

### Popup (popup=true)

Figma: `<Menu>`, popup=true — nodeId `16005:21804`

Меню скрыто и открывается рядом с триггером по вызову `toggle(event)` через ссылку на компонент.

```html
<extra-button label="Действия" variant="secondary" (click)="menuRef.toggle($event)"></extra-button>
<extra-menu #menuRef [items]="items" [popup]="true"></extra-menu>
```

## Slots

Именованные слоты передаются директивой `[extraMenuTemplate]` (символ `ExtraMenuTemplateDirective`) со значением `'item' | 'submenuHeader' | 'start' | 'end'`.

| Слот | Описание | Контекст (`let-x`) |
|------|----------|---------------------|
| `item` | Кастомный рендер пункта меню; при отсутствии применяется встроенный рендер | `MenuAction` |
| `submenuHeader` | Кастомный рендер заголовка группы | `MenuGroup` |
| `start` | Произвольный контент перед списком | — |
| `end` | Произвольный контент после списка | — |

```html
<extra-menu [items]="items">
  <ng-template extraMenuTemplate="item" let-item>
    <a class="p-menu-item-link" [attr.tabindex]="-1">
      <span class="p-menu-item-label">{{ item.label }}</span>
    </a>
  </ng-template>
</extra-menu>
```

## Related

- [ExtraButton](../button/button.figma.md) — частый триггер для popup-режима меню
- [Иконки](../../figma-code-connect/icons.md) — классы иконок пунктов
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Передавайте пункты через `[items]`, описывая их декларативно в компоненте
- Для popup-режима задавайте `[popup]="true"` и открывайте меню методом `toggle($event)`/`show($event)` по ссылке на компонент
- Используйте `{ separator: true }` в `items` для визуального разделения групп действий
- Для нестандартного отображения пункта используйте `<ng-template extraMenuTemplate="item">` вместо переопределения стилей

**Don't:**
- Не используйте `ExtraMenu` для горизонтальной навигации — для неё предназначен `Menubar`
- Не смешивайте плоские `MenuAction` верхнего уровня с `MenuGroup` в одном массиве `items` — PrimeNG рендерит все элементы верхнего уровня как заголовки групп, как только встречает хотя бы одну группу
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не открывайте popup-меню вручную через DOM — используйте методы `toggle()`/`show()`/`hide()`
