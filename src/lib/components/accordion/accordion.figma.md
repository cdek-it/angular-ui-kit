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
updated: '2026-09-28'
---

## Overview

`ExtraAccordionComponent` — контейнер из раскрывающихся панелей (`ExtraAccordionPanelComponent`), передаваемых декларативно как дочерние элементы. Экономит место при большом объёме информации и поддерживает прогрессивное раскрытие. Оборачивает PrimeNG `p-accordion` с под-элементами `p-accordion-panel`, `p-accordion-header` и `p-accordion-content`.

Компонент соответствует Figma-компоненту `<Accordion>` (nodeId `1153:3084`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.1»). В отличие от предыдущей версии (данные через массив `items`), содержимое каждой панели задаётся через content projection: слот `header` — именованный шаблон, слот `content` — основное содержимое (`<ng-content>`).

## Props mapping

### ExtraAccordion

| Свойство    | Тип                  | По умолчанию | Описание                                             |
| ----------- | -------------------- | ------------ | ---------------------------------------------------- |
| `multiple`  | `boolean`            | `false`      | Разрешить одновременное раскрытие нескольких панелей |
| `(onOpen)`  | `EventEmitter<void>` | —            | Срабатывает при раскрытии любой панели               |
| `(onClose)` | `EventEmitter<void>` | —            | Срабатывает при сворачивании любой панели            |

> Активная панель(и) не управляется извне через `[(value)]` — какие панели раскрыты изначально, определяется их собственным `[expanded]="true"`. Контейнер это значение считывает один раз при инициализации (`ngAfterContentInit`) и дальше состоянием раскрытия управляет сам PrimeNG.

### ExtraAccordionPanel

| Свойство   | Тип                   | По умолчанию | Описание                                                                                       |
| ---------- | --------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `icon`     | `string \| undefined` | `undefined`  | CSS-класс иконки в заголовке; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `expanded` | `boolean`             | `false`      | Раскрыта ли панель изначально (стартовое состояние, не двусторонняя привязка)                  |
| `disabled` | `boolean`             | `false`      | Заблокировать панель — она недоступна для раскрытия                                            |

## Variants

### Одиночное раскрытие (single, по умолчанию)

Figma: `<Accordion>`, режим single — раскрыта не более одной панели.

```html
<extra-accordion>
  <extra-accordion-panel icon="ti ti-package" [expanded]="true">
    <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
    Заказ №ЦД-00123456
  </extra-accordion-panel>
  <extra-accordion-panel icon="ti ti-map-pin">
    <ng-template extraAccordionPanelTemplate="header">Маршрут доставки</ng-template>
    Москва → Новосибирск
  </extra-accordion-panel>
</extra-accordion>
```

### Множественное раскрытие (multiple)

Figma: `<Accordion>`, режим multiple — одновременно могут быть раскрыты несколько панелей.

```html
<extra-accordion [multiple]="true">
  <extra-accordion-panel icon="ti ti-package" [expanded]="true">
    <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
    Заказ №ЦД-00123456
  </extra-accordion-panel>
  <extra-accordion-panel icon="ti ti-receipt" [expanded]="true">
    <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
    Итого: 525 ₽
  </extra-accordion-panel>
</extra-accordion>
```

### С заблокированной панелью (disabled)

```html
<extra-accordion>
  <extra-accordion-panel icon="ti ti-file-description" disabled>
    <ng-template extraAccordionPanelTemplate="header">Документы (недоступно)</ng-template>
    Документация временно недоступна.
  </extra-accordion-panel>
</extra-accordion>
```

## Slots

Слоты объявлены на `ExtraAccordionPanelComponent` (не на контейнере):

| Слот      | Описание                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| `header`  | Заголовок панели — именованный шаблон `<ng-template extraAccordionPanelTemplate="header">` |
| `content` | Содержимое панели (тело) — основное содержимое, голый `<ng-content>`                       |

## Related

- [Button](../button/button.figma.md) — кнопки действий внутри или рядом с панелями
- [Иконки](../../figma-code-connect/icons.md) — CSS-классы иконок для заголовков панелей
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены поверхности и границ панелей
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**

- Задавайте `[expanded]="true"` на панелях, которые должны быть раскрыты сразу после инициализации.
- Используйте именованный шаблон `extraAccordionPanelTemplate="header"` для заголовка — это единственный способ задать заголовок панели.
- Включайте `[multiple]="true"` на контейнере, когда пользователю полезно сравнивать содержимое нескольких секций одновременно.
- Помечайте недоступные панели через `disabled` — она остаётся видимой, но не раскрывается.

**Don't:**

- Не используйте аккордеон для критичной информации, которая должна быть всегда видна.
- Не путайте с Tabs — вкладки показывают параллельные равноправные разделы, а аккордеон раскрывает секции контента.
- Не ждите двусторонней синхронизации `expanded` — это только стартовое состояние, дальше раскрытием управляет сам компонент.
