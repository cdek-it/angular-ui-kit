---
component: ExtraPopover
selector: extra-popover
import:
  symbol: ExtraPopoverComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '920:1239'
  componentKey: 'd4a07e3a7dd6a8713f2fe0dfa8615959668f2896'
  name: '<Popover>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraPopoverComponent` — немодальная всплывающая панель с произвольным (часто интерактивным) содержимым, привязанная к триггеру. Оборачивает PrimeNG `p-popover` и проецирует внутрь любой контент через `<ng-content>`. Фон страницы остаётся активным, фокус не блокируется.

Компонент соответствует Figma-компоненту `<Popover>` (nodeId `920:1239`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Открытие выполняется императивно: получите ссылку на компонент через template reference variable и вызовите метод `toggle(event)` из обработчика клика по триггеру. В отличие от `Tooltip` (read-only текст по hover) и `Dialog` (блокирующее модальное по центру) popover показывает интерактивный контент у элемента по клику.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `dismissable` | `boolean` | `true` | Закрывать панель при клике вне её области |
| `appendTo` | `string \| HTMLElement` | `'body'` | Куда в DOM монтируется оверлей — `'body'`, `'self'` или CSS-селектор/элемент |

> Открытие и закрытие выполняется методом `toggle(event: Event)`: панель не имеет `@Input` видимости, её состоянием управляет триггер. Figma-свойства `position` (`top` / `bottom`) и `aligment` (`left` / `center` / `right`) задают сторону и выравнивание панели относительно триггера в макете; в коде позиционирование рассчитывается автоматически от события клика.

## Variants

### Открытие по кнопке (базовый)

Figma: `<Popover>`, position=top, aligment=left — nodeId `533:137`

```html
<extra-button label="Показать" (click)="popover.toggle($event)"></extra-button>
<extra-popover #popover appendTo="self">
  <p>Содержимое popover.</p>
</extra-popover>
```

```ts
import { ExtraPopoverComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
import { ViewChild } from '@angular/core';

// В компоненте:
@ViewChild('popover') popover!: ExtraPopoverComponent;
```

### С расширенным содержимым (заголовок и описание)

Figma: `<Popover>`, position=bottom, aligment=left — nodeId `920:1172`

```html
<extra-button label="Подробнее" (click)="popover.toggle($event)"></extra-button>
<extra-popover #popover appendTo="self">
  <div class="flex flex-col gap-2">
    <span class="font-semibold">Заголовок</span>
    <p class="text-sm">Произвольный контент внутри панели: текст, ссылки, форма.</p>
  </div>
</extra-popover>
```

```ts
import { ExtraPopoverComponent, ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
```

### Без закрытия по клику вне области (dismissable=false)

Figma: `<Popover>` (общий компонент; поведение задаётся в коде)

```html
<extra-button label="Открыть" (click)="popover.toggle($event)"></extra-button>
<extra-popover #popover [dismissable]="false">
  <p>Панель закрывается только повторным кликом по триггеру.</p>
</extra-popover>
```

## Slots

| Слот | Синтаксис | Описание |
|------|-----------|---------|
| Содержимое (default) | `<ng-content>` | Произвольное содержимое панели — текст, ссылки, кнопки, небольшая форма. Проецируется без имени между тегами `<extra-popover>` |

Именованные слоты не используются: вся проекция контента идёт через единственный безымянный `<ng-content>`.

## Related

- [Button](../button/button.figma.md) — типичный триггер открытия панели
- [Dialog](../dialog/dialog.figma.md) — блокирующее модальное окно по центру для тяжёлых подзадач
- [Tooltip](../tooltip/tooltip.figma.md) — read-only текстовая подсказка по hover
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Открывайте панель методом `toggle($event)` из обработчика клика по триггеру, передавая событие — оно нужно для расчёта позиции.
- Используйте `appendTo="self"`, когда триггер находится в контейнере с `position: relative`, чтобы панель позиционировалась рядом.
- Размещайте в панели интерактивный контент: ссылки, вторичные действия, небольшие формы.

**Don't:**
- Не используйте popover для критичной информации, которая должна быть видна постоянно — для этого подходит inline-сообщение.
- Не помещайте в panel read-only текст-подсказку — для коротких пояснений по hover используйте `Tooltip`.
- Не отключайте `dismissable` без необходимости — пользователи ожидают закрытие кликом вне панели.
