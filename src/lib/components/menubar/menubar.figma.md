---
component: ExtraMenubar
selector: extra-menubar
import:
  symbol: ExtraMenubarComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '882:5234'
  componentKey: '91c53c61603fc1a9169bb4bf411cf1af75d9bd20'
  name: '<Menubar>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraMenubar` — горизонтальная навигационная панель верхнего уровня с поддержкой вложенных выпадающих подменю. Разделы задаются декларативной моделью `model`, каждый пункт — это переход или действие (`label`, `icon`, `command`, `url`), вложенность задаётся через `items[].items`. Оборачивает PrimeNG `p-menubar`.

Компонент соответствует Figma-компоненту `<Menubar>` (nodeId `882:5234`) из библиотеки UI Kit (DS) v2.0. В отличие от `MegaMenu` (многоколоночные панели подменю) и `Menu` (вертикальный popup действий), menubar предназначен для глобальной навигации по разделам в шапке приложения.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `model` | `ExtraMenuItem[]` | `[]` | Декларативная модель пунктов меню; вложенные подменю задаются через `items[].items`. Каждый пункт поддерживает `label`, `icon`, `command`, `url`, `disabled`, `separator`, `badge` и др. |

## Variants

### Horizontal (горизонтальная навигация)

Figma: `<Menubar>`, orientation=horizontal — nodeId `882:5232`

```html
<extra-menubar [model]="items"></extra-menubar>
```

### С иконками пунктов

Иконка пункта задаётся в модели через поле `icon` (CSS-класс иконки; доступные иконки — [icons.md](../../figma-code-connect/icons.md)).

```ts
items: ExtraMenuItem[] = [
  { label: 'Home', icon: 'ti ti-home' },
  { label: 'Settings', icon: 'ti ti-settings' }
];
```

### С вложенными подменю

Подменю задаётся вложенным массивом `items`; у пункта с подменю отображается chevron.

```ts
items: ExtraMenuItem[] = [
  {
    label: 'Features',
    icon: 'ti ti-star',
    items: [
      { label: 'Core', icon: 'ti ti-cpu' },
      { label: 'UI Kit', icon: 'ti ti-palette' }
    ]
  }
];
```

## Slots

Кастомный рендер пункта меню задаётся через структурную директиву `[extraMenubarItem]` (symbol `ExtraMenubarItemDirective`). Шаблон получает контекст: `$implicit` (item типа `ExtraMenuItem`), `hasSubmenu` (есть ли вложенное подменю) и `root` (пункт верхнего уровня). При отсутствии директивы используется рендер по умолчанию.

```html
<extra-menubar [model]="items">
  <ng-template extraMenubarItem let-item let-hasSubmenu="hasSubmenu" let-root="root">
    <a class="p-menubar-item-link flex items-center gap-2">
      @if (item.icon) {
        <span [class]="'p-menubar-item-icon ' + item.icon"></span>
      }
      <span class="p-menubar-item-label">{{ item.label }}</span>
      @if (hasSubmenu) {
        <span [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'"></span>
      }
    </a>
  </ng-template>
</extra-menubar>
```

## Related

- [ExtraButton](../button/button.figma.md) — кнопка для действий вне навигации
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки пунктов (`ti ti-*`)
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте для глобальной навигации по разделам в шапке приложения
- Задавайте структуру через `model`, вкладывая подменю в `items[].items`
- Используйте директиву `[extraMenubarItem]` для кастомного рендера пункта (бейдж, описание)
- Задавайте иконки пунктов через поле `icon` из справочника [icons.md](../../figma-code-connect/icons.md)

**Don't:**
- Не используйте menubar для многоколоночных выпадающих панелей — для этого предназначен `MegaMenu`
- Не используйте menubar как вертикальный popup действий — для этого предназначен `Menu`
- Не инлайньте CSS-классы иконок вручную — используйте справочник [icons.md](../../figma-code-connect/icons.md)
- Не дублируйте навигацию menubar с боковой навигацией на одном экране
