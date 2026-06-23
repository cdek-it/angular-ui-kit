---
component: ExtraPanelMenu
selector: extra-panelmenu
import:
  symbol: ExtraPanelMenuComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '16194:4870'
  componentKey: 'e1101a767cb5ae9a77bb06c11ea258da1b91a503'
  name: '<PanelMenu>'
status: stable
updated: '2026-06-23'
---

## Overview

`ExtraPanelMenu` — вертикальное аккордеон-меню с вложенными разделами для боковой навигации. Пункты верхнего уровня отображаются как панели с chevron, раскрываются по клику и показывают вложенные пункты (рекурсивно). Оборачивает PrimeNG `p-panelmenu`.

Компонент соответствует Figma-компоненту `<PanelMenu>` (nodeId `16194:4870`) из библиотеки UI Kit (DS) v2.0. Структура меню задаётся декларативно через модель пунктов, а не через слоты. В отличие от `Accordion` (раскрытие произвольного контента) и `Menubar` (горизонтальная навигация), `ExtraPanelMenu` предназначен для вертикальной иерархической навигации с раскрываемыми разделами.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `model` | `ExtraMenuItem[]` | `[]` | Иерархическая модель пунктов меню; вложенность задаётся через `items` каждого пункта |
| `multiple` | `boolean` | `false` | Режим раскрытия: `false` — одновременно раскрыта одна панель (single-open), `true` — несколько (multiple-open) |
| `tabindex` | `number \| undefined` | `undefined` | Порядок перехода по Tab |

Каждый элемент `ExtraMenuItem` поддерживает поля `label`, `icon`, `items` (вложенные пункты), `disabled`, `expanded`, `url`, `routerLink`, `command` и другие. Подробности — в Slots.

## Variants

### Single-open (одиночное раскрытие)

Figma: `<PanelMenu>`, режим single-open — nodeId `16194:4870`

```html
<extra-panelmenu [model]="items"></extra-panelmenu>
```

### Multiple-open (множественное раскрытие)

Figma: `<PanelMenu>`, режим multiple-open — nodeId `16194:4870`

```html
<extra-panelmenu [model]="items" [multiple]="true"></extra-panelmenu>
```

## Slots

Не используются. Содержимое меню задаётся декларативно через `@Input() model` — массив `ExtraMenuItem`. Вложенные разделы описываются полем `items` каждого пункта, иконки — полем `icon` (значения из [icons.md](../../figma-code-connect/icons.md)).

```ts
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit';

const items: ExtraMenuItem[] = [
  {
    label: 'Отправления',
    icon: 'ti ti-package',
    items: [
      { label: 'Новые' },
      { label: 'В пути' },
      { label: 'Возвраты', items: [{ label: 'Ожидают' }, { label: 'Завершённые' }] }
    ]
  },
  { label: 'Маршруты', icon: 'ti ti-route' },
  { label: 'Настройки', disabled: true }
];
```

## Related

- [Иконки](../../figma-code-connect/icons.md) — доступные иконки для поля `icon` пунктов меню
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Используйте для вертикальной иерархической навигации в сайдбаре с раскрываемыми разделами
- Группируйте пункты по категориям через поле `items` вложенных `ExtraMenuItem`
- Используйте `[multiple]="true"`, когда пользователю нужно держать раскрытыми несколько разделов одновременно
- Задавайте `disabled: true` у пункта модели, чтобы сделать раздел неактивным

**Don't:**
- Не используйте `ExtraPanelMenu` для горизонтальной навигации — для этого предназначен `Menubar`
- Не применяйте его для раскрытия произвольного контента вместо навигации — для этого предназначен `Accordion`
- Не передавайте плоский список без вложенности там, где достаточно простого меню действий
