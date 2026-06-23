---
component: ExtraAccordion
selector: extra-accordion
import:
  symbol: ExtraAccordionComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1153:3084'
  componentKey: '6d041d9db66babf7fe442165f3ab97f9bea7710a'
  name: '<Accordion>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraAccordionComponent` — компонент аккордеона, который группирует связанный контент в вертикальный набор раскрываемых/сворачиваемых секций. Экономит место при большом объёме информации и поддерживает прогрессивное раскрытие. Оборачивает PrimeNG `p-accordion` с под-элементами `p-accordion-panel`, `p-accordion-header` и `p-accordion-content`.

Компонент соответствует Figma-компоненту `<Accordion>` (nodeId `1153:3084`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). В отличие от диалога, содержимое задаётся декларативно через массив `items`, а не через слоты проекции контента — каждая секция описывается объектом `ExtraAccordionItem`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `items` | `ExtraAccordionItem[]` | `[]` | Массив секций аккордеона; каждый элемент рендерится как отдельная панель с заголовком и содержимым |
| `multiple` | `boolean` | `false` | Разрешить одновременное раскрытие нескольких панелей — соответствует Figma-режиму single/multiple |
| `activeValue` | `string \| null` | `'0'` | Значение (`value`) изначально раскрытой панели; `null` — все панели свёрнуты |

> `activeValueChange` — `@Output() EventEmitter<string \| number \| string[] \| number[] \| null \| undefined>`. Используйте синтаксис `[(activeValue)]` для двусторонней привязки активной секции.

Структура одного элемента `ExtraAccordionItem`:

| Поле | Тип | Описание |
|------|-----|---------|
| `value` | `string` | Уникальный идентификатор панели (ключ раскрытия и `track` в цикле) |
| `header` | `string` | Текст заголовка панели |
| `content` | `string` | Текстовое содержимое раскрываемой панели |
| `icon` | `string` (опц.) | CSS-класс иконки в заголовке; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `disabled` | `boolean` (опц.) | Заблокировать панель — она недоступна для раскрытия |

## Variants

### Одиночное раскрытие (single, по умолчанию)

Figma: `<Accordion>`, режим single — раскрыта ровно одна панель.

```html
<extra-accordion
  [items]="items"
  activeValue="0"
></extra-accordion>
```

```ts
import { ExtraAccordionComponent, ExtraAccordionItem } from '@cdek-it/angular-ui-kit';

// В компоненте:
items: ExtraAccordionItem[] = [
  { value: '0', header: 'Данные отправления', content: 'Заказ №ЦД-00123456' },
  { value: '1', header: 'Маршрут доставки', content: 'Москва → Новосибирск' },
];
```

### Множественное раскрытие (multiple)

Figma: `<Accordion>`, режим multiple — одновременно могут быть раскрыты несколько панелей.

```html
<extra-accordion
  [items]="items"
  [multiple]="true"
  activeValue="0"
></extra-accordion>
```

```ts
import { ExtraAccordionComponent, ExtraAccordionItem } from '@cdek-it/angular-ui-kit';
```

### С заблокированной панелью (disabled)

Заблокированная панель задаётся через `disabled: true` в соответствующем `ExtraAccordionItem` и недоступна для раскрытия.

```html
<extra-accordion
  [items]="items"
  activeValue="0"
></extra-accordion>
```

```ts
import { ExtraAccordionComponent, ExtraAccordionItem } from '@cdek-it/angular-ui-kit';

// В компоненте:
items: ExtraAccordionItem[] = [
  { value: '0', header: 'Данные отправления', content: 'Заказ №ЦД-00123456' },
  { value: '1', header: 'Документы (недоступно)', content: 'Недоступно', disabled: true },
];
```

## Slots

Не используются. Аккордеон не применяет проекцию содержимого — структура секций задаётся декларативно через массив `items`.

Внутренняя композиция каждой секции (рендерится компонентом автоматически по элементу `ExtraAccordionItem`):

| Часть | PrimeNG-узел | Источник |
|-------|--------------|----------|
| Панель | `p-accordion-panel` | один элемент массива `items` (`value`, `disabled`) |
| Заголовок | `p-accordion-header` | `item.header` + опциональная `item.icon` |
| Содержимое | `p-accordion-content` | `item.content` |

## Related

- [Button](../button/button.figma.md) — кнопки действий внутри или рядом с панелями
- [Иконки](../../figma-code-connect/icons.md) — CSS-классы иконок для заголовков панелей
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены поверхности и границ панелей
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте уникальный `value` для каждого элемента `items` — он используется как ключ раскрытия и `track`.
- Используйте `[(activeValue)]` для двусторонней синхронизации раскрытой секции с состоянием компонента.
- Включайте `[multiple]="true"`, когда пользователю полезно сравнивать содержимое нескольких секций одновременно.
- Помечайте недоступные секции через `disabled: true` в `ExtraAccordionItem`, а не скрывайте их полностью.

**Don't:**
- Не используйте аккордеон для критичной информации, которая должна быть всегда видна.
- Не путайте с Tabs — вкладки показывают параллельные равноправные разделы, а аккордеон раскрывает секции контента.
- Не задавайте `activeValue`, не существующий среди `value` элементов `items` — ни одна панель не раскроется.
