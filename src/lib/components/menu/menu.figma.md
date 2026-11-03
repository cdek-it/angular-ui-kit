---
component: ExtraMenu
selector: extra-menu
import:
  symbol: ExtraMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '16005:21803'
  name: '<Menu>'
status: stable
updated: '2026-10-30'
---

## Overview

`ExtraMenu` — панель со списком пунктов: действия или навигация. Используется как самостоятельный элемент или как всплывающее меню у триггера. Пункты передаются через `@Input() items` размеченным объединением `ExtraMenuAction | ExtraMenuGroup | ExtraMenuSeparator`: иконки, подпись `caption`, группы с заголовком (вложенность на один уровень), разделители. Оборачивает PrimeNG `p-menu`; содержимое пункта рисует сам компонент.

Компонент соответствует Figma-компоненту `<Menu>` (nodeId `16005:21803`, библиотека «UI Kit (DS) v2.1») и закрытым подкомпонентам `<🔒Menu.ItemBase>` (пункт), `<🔒Menu.ItemTemplate>` (пункт с подписью и слотом) и `<🔒Menu.Submenu>` (заголовок группы). Для постоянной навигации по разделам используйте `Menubar` или `Tabs`, для единичного действия — `Button`.

Спецификация: [menu.md](../../../../docs/components-api/menu.md).

**Ограничение PrimeNG:** если в `items` есть хотя бы один `ExtraMenuGroup`, PrimeNG рендерит все элементы верхнего уровня как заголовки групп (`hasSubMenu()` → `model.some(item => item.items)`) — плоские `ExtraMenuAction` верхнего уровня вместе с группами не поддерживаются.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `items` | `ExtraMenuItem[]` | `[]` | Пункты, группы и разделители. Соответствует Figma-слоту `<Slot>` у `<Menu>` |
| `popup` | `boolean` | `false` | Режим всплывающего меню — Figma-свойство `popup`. Меню отсутствует в DOM, пока его не открыли `toggle()`/`show()` или через `open` |
| `open` | `boolean` | `false` | Управляемая видимость всплывающего меню; синхронизируется через `(onShow)`/`(onHide)`. В Figma нет |
| `appendTo` | `'body' \| 'self' \| ExtraMenuElementLike` | `'body'` | Контейнер рендера всплывающего меню. В Figma нет |
| `ariaLabel` | `string` | — | Метка для скринридеров |
| `(onItemSelect)` | `EventEmitter<ExtraMenuItemSelectEvent>` | — | Выбор пункта |
| `(onShow)` / `(onHide)` | `EventEmitter<void>` | — | Открытие / закрытие всплывающего меню |

Свойства подкомпонентов в Figma → поля пункта:

| Figma | Поле | Комментарий |
|-------|------|-------------|
| `text-menu-item` | `label` | Текст пункта (у `Menu.Submenu` — заголовок группы `ExtraMenuGroup.label`) |
| `prefix-icon-menu-item` | `icon` | CSS-класс tabler целиком |
| `ItemTemplate.postfix-icon-menu` | `iconEnd` | CSS-класс tabler целиком |
| `ItemTemplate.text-caption` | `caption` | Одна строка, без точки в конце |
| `ItemTemplate.prefix-icon-menu` | — | Декоративная стрелка перед пунктом, в API не выносится |
| `state=active` | `selected` | «Активный раздел»: на `<li>` вешается класс `p-menuitem-checked` (стили — в пресете) |
| `state=hover/pressed/focus-visible` | — | Состояния взаимодействия, задаются темой |
| `separator=true` | `{ separator: true }` | Отдельная запись перед пунктом; допускается и внутри группы |

Отключённого пункта в ките нет («Отключённый пункт — в ките отсутствует»), поэтому `disabled` у пункта не предусмотрен.

## Variants

### Inline (popup=false)

Figma: `<Menu>`, popup=false — nodeId `16005:21806`

```html
<extra-menu [items]="items"></extra-menu>
```

```ts
items: ExtraMenuItem[] = [
  { label: 'Кабинет', icon: 'ti ti-user' },
  { label: 'Скачать реестр', caption: 'Ctrl+E', icon: 'ti ti-download' },
  { separator: true },
  { label: 'Выйти', icon: 'ti ti-logout' },
];
```

### Popup (popup=true)

Figma: `<Menu>`, popup=true — nodeId `16005:21804`. Не применяйте в мобильном интерфейсе.

```html
<extra-button label="Действия" variant="secondary" (click)="menuRef.toggle($event)"></extra-button>
<extra-menu #menuRef [items]="items" [popup]="true"></extra-menu>
```

### Группы

Figma: `<🔒Menu.Submenu>` — nodeId `16005:25381`

```ts
items: ExtraMenuGroup[] = [
  { label: 'Заказы', items: [{ label: 'Новый заказ', icon: 'ti ti-plus' }, { separator: true }, { label: 'Архив', icon: 'ti ti-archive' }] },
];
```

## Slots

| Слот | Директива | Контекст | Описание |
|------|-----------|----------|----------|
| `itemEnd` | `extraMenuTemplate="itemEnd"` | `let-item` (`ExtraMenuAction`) | Содержимое в конце пункта — после текста и `caption`, перед `iconEnd`. Аналог Figma-слота `<Slot.Content>` в `<🔒Menu.ItemTemplate>` |

```html
<extra-menu [items]="items">
  <ng-template extraMenuTemplate="itemEnd" let-item>
    @if (item.id === 'create') {
      <small class="menu-item-caption">Ctrl+N</small>
    }
  </ng-template>
</extra-menu>
```

Весь пункт — одна ссылка (PrimeNG выбирает пункт с клавиатуры кликом по первой ссылке внутри него), поэтому слот находится внутри ссылки: подходит для хоткея, `Badge`, `Tag`, `Typography.Caption`.

## Related

- [ExtraButton](../button/button.figma.md) — частый триггер для всплывающего меню
- [MegaMenu](../megamenu/megamenu.figma.md) — многоуровневая навигация с колонками
- [Иконки](../../figma-code-connect/icons.md) — классы иконок пунктов

## Do / Don't

**Do:**
- Называйте пункты коротко: глаголом действия или существительным раздела — «Кабинет», «Скачать реестр», «Выйти»
- Поясняйте пункт подписью `caption` в одну строку; хоткеи и вспомогательный контент размещайте в слоте `itemEnd`
- Используйте единую терминологию действий во всём продукте
- Для всплывающего режима задавайте `[popup]="true"` и открывайте меню методом `toggle($event)`/`show($event)`

**Don't:**
- Не ставьте точку в конце `caption` и не пишите хоткеи в тексте пункта вместо слота
- Не используйте всплывающий режим в мобильном интерфейсе
- Не смешивайте плоские `ExtraMenuAction` верхнего уровня с `ExtraMenuGroup` в одном массиве `items` (см. ограничение PrimeNG выше)
- Не открывайте всплывающее меню вручную через DOM — используйте методы `toggle()`/`show()`/`hide()`
