---
component: ExtraBreadcrumb
selector: extra-breadcrumb
import:
  symbol: ExtraBreadcrumbComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '735:7985'
  name: '<Breadcrumb>'
status: stable
updated: '2026-10-26'
---

## Overview

`ExtraBreadcrumb` — навигационная цепочка («хлебные крошки»): путь от корня раздела до текущей страницы. Ссылки на родительские уровни разделены шевроном; последний элемент — текущая страница (`aria-current="page"`), он приглушён и не является ссылкой. Оборачивает PrimeNG `p-breadcrumb`, но публичное API собственное: элементы описываются типом `ExtraBreadcrumbItem`, ссылку элемента рисует сам компонент.

Компонент соответствует Figma-компоненту `<Breadcrumb>` (nodeId `735:7985`, библиотека «UI Kit (DS) v2.1»), элементы цепочки — закрытому подкомпоненту `<🔒Breadcrumb.Item>` (nodeId `734:7859`). В отличие от `Tabs`/`Menubar` (переключение разделов одного уровня) и `Stepper` (линейный прогресс процесса), breadcrumb отражает положение страницы в иерархии и не заменяет основную навигацию.

Спецификация: [breadcrumb.md](../../../../docs/components-api/breadcrumb.md).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `items` | `ExtraBreadcrumbItem[]` | `[]` | Элементы цепочки, последний — текущая страница. Соответствует Figma-слоту `<Slot.Items>` |
| `showHome` | `boolean` | `true` | Показывать домашний элемент. Соответствует Figma-свойству `home` (`true`/`false`) |
| `home` | `ExtraBreadcrumbItem` | `{ icon: 'ti ti-home' }` | Данные домашнего элемента (ссылка, иконка). Отображается только иконкой |
| `homeAriaLabel` | `string` | — | Метка домашнего элемента для скринридеров. Задаётся приложением: у домашнего элемента нет текста, без метки ссылка безымянна |
| `ariaLabel` | `string` | — | Метка `<nav>` для скринридеров (нужна, если на странице несколько `<nav>`) |
| `(onItemSelect)` | `EventEmitter<ExtraBreadcrumbItemSelectEvent>` | — | Выбор элемента; не срабатывает для текущей страницы и `disabled` |

Свойства `<🔒Breadcrumb.Item>` в Figma → поля `ExtraBreadcrumbItem`:

| Figma | Поле | Комментарий |
|-------|------|-------------|
| `text-breadcrumb` | `label` | Текст элемента |
| `show-label` | `label` | Пустая строка — подписи нет; у обычных элементов подпись обязательна |
| `show-icon`, `change-icon` | `icon` | CSS-класс tabler целиком; пустая строка — иконки нет |
| `state=disabled` | `disabled` | Также так выглядит текущая страница (последний элемент) |
| `state=hover`, `state=focus` | — | Состояния взаимодействия, задаются темой |
| `show-separator` | — | Аналога в коде нет: разделитель ставится автоматически между элементами |

Остальные поля элемента: `href`, `target`, `command`, `id`. Переход через Angular Router — в `command` или `(onItemSelect)`.

## Variants

### С домашним элементом

Figma: `<Breadcrumb>`, home=true — nodeId `735:7983`

```html
<extra-breadcrumb [items]="items" [home]="{ icon: 'ti ti-home', href: '/' }" homeAriaLabel="Главная"></extra-breadcrumb>
```

```ts
items: ExtraBreadcrumbItem[] = [
  { label: 'Заказы', icon: 'ti ti-package', href: '/orders' },
  { label: 'Документы', icon: 'ti ti-file-text', href: '/orders/documents' },
  { label: 'Накладная', icon: 'ti ti-file-invoice' },
];
```

### Без домашнего элемента

Figma: `<Breadcrumb>`, home=false — nodeId `735:7982`

```html
<extra-breadcrumb [items]="items" [showHome]="false"></extra-breadcrumb>
```

### Заблокированный элемент

Figma: `<🔒Breadcrumb.Item>`, state=disabled — nodeId `734:7856`

```ts
items: ExtraBreadcrumbItem[] = [
  { label: 'Заказы', href: '/orders' },
  { label: 'Архив', disabled: true },
  { label: 'Накладная' },
];
```

## Slots

| Слот | Директива | Контекст | Описание |
|------|-----------|----------|----------|
| `item` | `extraBreadcrumbTemplate="item"` | `let-item` (`ExtraBreadcrumbItem`) | Содержимое элемента цепочки (иконка, подпись). Ссылку, клик, `disabled` и `aria-current` по-прежнему обеспечивает компонент. Аналог Figma-слота `<Slot.Items>`, куда допускается только `<🔒Breadcrumb.Item>` |

```html
<extra-breadcrumb [items]="items">
  <ng-template extraBreadcrumbTemplate="item" let-item>
    <span [class]="'p-breadcrumb-item-icon ' + item.icon"></span>
    <span class="p-breadcrumb-item-label">{{ item.label }}</span>
  </ng-template>
</extra-breadcrumb>
```

## Related

- [Menu](../menu/menu.figma.md) — тот же принцип собственного типа пункта и слота `item`
- [Иконки](../../figma-code-connect/icons.md) — доступные иконки (`ti ti-*`)
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте в многоуровневых разделах, где важно показать путь от корня
- Оставляйте домашний элемент включённым, чтобы корень раздела был доступен в один клик, и задавайте ему `homeAriaLabel`
- Делайте последним элементом текущую страницу
- Пишите подписи коротко, одним-двумя словами, существительными в именительном падеже («Документы», «Заказы»); подпись совпадает с заголовком страницы, на которую ведёт элемент

**Don't:**
- Не используйте breadcrumb как основную навигацию вместо меню
- Не оставляйте элементы цепочки без подписи — без текста они нечитаемы (только иконкой отображается домашний элемент)
- Не добавляйте служебные слова («Страница заказов», «Раздел документов») и длинные фразы
- Не рассчитывайте на схлопывание длинной цепочки — его нет, цепочка переносится на следующую строку
- Не перекрашивайте ссылки, иконки и разделитель вручную — цвета задаёт тема
