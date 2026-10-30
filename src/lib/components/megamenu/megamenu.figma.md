---
component: ExtraMegaMenu
selector: extra-megamenu
import:
  symbol: ExtraMegaMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '16194:4401'
  name: '<MegaMenu>'
status: stable
updated: '2026-10-26'
---

## Overview

`ExtraMegaMenu` — многоуровневая навигация: пункты верхнего уровня раскрывают панель с колонками, в колонках — группы пунктов со своими заголовками. Подходит для крупных разделов с вложенной структурой. Оборачивает PrimeNG `p-megamenu`, но публичное API собственное: пункты описываются типами `ExtraMegaMenuItem` / `ExtraMegaMenuAction`, содержимое пункта рисует сам компонент.

Компонент соответствует Figma-компоненту `<MegaMenu>` (nodeId `16194:4401`, библиотека «UI Kit (DS) v2.1») и его закрытым подкомпонентам `<🔒MegaMenu.ItemBase>` (пункт верхнего уровня), `<🔒MegaMenu.ItemTemplate>` (пункт панели), `<🔒MegaMenu.Item.Group>` (заголовок группы), `<🔒MegaMenu.Submenu>` (панель) и `<🔒MegaMenu.MobileButton>`.

Спецификация: [megamenu.md](../../../../docs/components-api/megamenu.md).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `items` | `ExtraMegaMenuItem[]` | `[]` | Пункты верхнего уровня. Соответствует слотам `<MegaMenu>` (первый — пункты, второй — колонки `items[].items`) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Figma-свойство `orientation=horizontal/vertical` |
| `breakpoint` | `string` | `'960px'` | Ниже этой ширины — мобильная кнопка; соответствует Figma `orientation=none` («используется на экранах от `max-width: 960px` и меньше») |
| `scrollHeight` | `string` | — | Максимальная высота списков пунктов; не задано — без ограничения. В Figma не описан |
| `ariaLabel` | `string` | — | Метка для скринридеров |
| `ariaLabelledBy` | `string` | — | `id` внешнего элемента-метки |
| `tabindex` | `number` | `0` | Порядок перехода по Tab |
| `(onItemSelect)` | `EventEmitter<ExtraMegaMenuItemSelectEvent>` | — | Выбор пункта; не срабатывает у пункта верхнего уровня, раскрывающего панель |

Свойства подкомпонентов в Figma → поля пунктов:

| Figma | Поле | Комментарий |
|-------|------|-------------|
| `text-menu-item` | `label` | Текст пункта |
| `prefix-icon-menu-item` | `icon` | CSS-класс tabler целиком |
| `ItemBase.postfix-icon-menu` | — | Стрелка `ti-chevron-right` у пункта с панелью выводится автоматически |
| `ItemTemplate.text-caption` | `caption` | Подпись под текстом |
| `ItemTemplate.postfix-icon-menu` | `iconEnd` | CSS-класс tabler целиком |
| `ItemTemplate.prefix-icon-menu` | — | Декоративная стрелка перед пунктом, в API не выносится |
| `ItemTemplate.state=selected` | `selected` | На `<li>` вешается класс `p-megamenu-item-selected` |
| `state=hover/pressed/active`, `MobileButton.state` | — | Состояния взаимодействия; `active` + `aria-expanded` ставятся, пока открыта панель |
| `separator=true` | `{ separator: true }` | Отдельная запись между пунктами |
| `<🔒MegaMenu.Item.Group>` | `ExtraMegaMenuGroup.label` | Не фокусируется и не выбирается |

Отключённого пункта в ките нет («Отключённый пункт — в ките отсутствует»), поэтому `disabled` у пунктов и у меню не предусмотрен.

## Variants

### Горизонтальное меню

Figma: `<MegaMenu>`, orientation=horizontal — nodeId `16194:4402`

```html
<extra-megamenu [items]="items"></extra-megamenu>
```

```ts
items: ExtraMegaMenuItem[] = [
  {
    label: 'Отправления',
    icon: 'ti ti-package',
    items: [
      [{ label: 'Отправления', items: [{ label: 'Создать', icon: 'ti ti-file-plus' }] }],
      [{ label: 'Доставка', items: [{ label: 'Курьером', icon: 'ti ti-truck' }] }],
    ],
  },
  { label: 'Поддержка', icon: 'ti ti-headset', href: '/support' },
];
```

### Вертикальное меню

Figma: `<MegaMenu>`, orientation=vertical — nodeId `16194:4404`

```html
<extra-megamenu [items]="items" orientation="vertical"></extra-megamenu>
```

### Мобильная кнопка

Figma: `<MegaMenu>`, orientation=none — nodeId `16194:4406`. Включается автоматически, когда экран уже `breakpoint`.

### Пункт панели с подписью

Figma: `<🔒MegaMenu.ItemTemplate>` — nodeId `16194:4450`

```ts
{ label: 'Накладные', caption: 'Ctrl+N', icon: 'ti ti-file-invoice', selected: true }
```

## Slots

| Слот | Директива | Контекст | Описание |
|------|-----------|----------|----------|
| `itemEnd` | `extraMegaMenuTemplate="itemEnd"` | `let-item` (`ExtraMegaMenuAction`) | Содержимое в конце пункта панели — после текста и `caption`, перед `iconEnd`. Аналог Figma-слота `<Slot.Content>` в `<🔒MegaMenu.ItemTemplate>`. У пунктов верхнего уровня слота нет |

```html
<extra-megamenu [items]="items">
  <ng-template extraMegaMenuTemplate="itemEnd" let-item>
    @if (item.id === 'tracking') {
      <extra-badge value="Новое" severity="info"></extra-badge>
    }
  </ng-template>
</extra-megamenu>
```

Весь пункт — одна ссылка (PrimeNG выбирает пункт с клавиатуры кликом по первой ссылке внутри него), поэтому слот находится внутри ссылки: подходит для `Badge`, `Tag`, `Typography.Caption`.

## Стили

Компонент использует классы, под которые написан кастомный CSS пресета (`tokens/components/megamenu.ts`): `p-megamenu-item-icon`, `p-megamenu-item-label`, `megamenu-item-label` / `megamenu-item-caption` (текст с подписью), `p-megamenu-submenu-icon`, `p-megamenu-mobile-button-icon`. Для `p-megamenu-item-selected` стиля в пресете пока нет.

## Related

- [Menu](../menu/menu.figma.md) — одноуровневое меню без колонок
- [Breadcrumb](../breadcrumb/breadcrumb.figma.md) — путь к текущей странице
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`ti ti-*`)

## Do / Don't

**Do:**
- Выбирайте `orientation` по месту: `horizontal` — навигация в шапке, `vertical` — боковая панель; мобильная кнопка включается сама ниже `breakpoint`
- Называйте пункты короткими существительными или названиями разделов: «Продукты», «Настройки»
- Добавляйте в `caption` новую информацию и одинаково называйте одинаковые разделы во всём интерфейсе
- Давайте меню доступное имя (`ariaLabel`), если на странице несколько навигационных областей

**Don't:**
- Не используйте мегаменю для переключения представлений внутри страницы (`Tabs`), пути к странице (`Breadcrumb`) и небольшого меню без колонок (`Menu`, `Menubar`)
- Не ставьте точку в конце названия пункта и не пишите его не в обычном регистре
- Не повторяйте в `caption` название пункта и не дублируйте иконкой смысл текста
- Не кладите в слот `itemEnd` диалоги, таблицы и карточки
