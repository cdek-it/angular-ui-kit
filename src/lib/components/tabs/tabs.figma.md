---
component: ExtraTabs
selector: extra-tabs
import:
  symbol: ExtraTabsComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '884:7324'
  componentKey: 'ef7d7ac9ae94d9df8efe08ae85751d59c91779c3'
  name: '<Tabs>'
status: stable
updated: '2026-10-03'
---

## Overview

`ExtraTabsComponent` — компонент вкладок, организующий контент в несколько переключаемых разделов.
Оборачивает PrimeNG `p-tabs` (`p-tablist` + `p-tabpanels`). В отличие от более ранней версии (массив
`tabs: ExtraTabItem[]` с текстовым `content`), вкладки задаются декларативно как дочерние компоненты
`<extra-tab-item>` — по спеке (`docs/components-api/tabs.md`: «Вкладки передаются как дочерние
элементы `ExtraTabItem`»), содержимое панели — через `<ng-content>` внутри каждого `<extra-tab-item>`.

Компонент соответствует Figma-компоненту `<Tabs>` (nodeId `884:7324`, библиотека «UI Kit (DS)
v2.0»). Figma-свойство `show-nav-buttons` соответствует Angular-входу `scrollable`.

### ⚠️ Архитектура: почему `ExtraTabItem` не рендерит `p-tab`/`p-tabpanel` сам

PrimeNG `Tab` и `TabPanel` внедряют родителя через DI (`pcTabs: Tabs`, инжектится по
`forwardRef(() => Tabs)`). Angular резолвит зависимости спроецированного контента по месту его
**объявления** у вызывающего кода, а не по месту фактического рендера — поэтому если `p-tab`/
`p-tabpanel` рендерить в шаблоне ОТДЕЛЬНОГО `ExtraTabItemComponent`, а сам компонент передавать как
`<ng-content>` в `ExtraTabsComponent`, DI ломается: `NG0201: No provider found for Tabs`. Та же
ловушка у `p-accordion-panel`/`Accordion` и `p-step`/`Stepper` (см. корневой `CLAUDE.md`, раздел
«Ловушка: PrimeNG-компонент с DI-зависимостью от родителя внутри слота»).

Починка: `ExtraTabItemComponent` — чистый держатель данных (`name`/`icon`/`badge`/`badgeSeverity`/
`disabled`) и `TemplateRef` на свой `<ng-content>` (`@ViewChild('bodyTpl') bodyTpl`). Сам он никакой
PrimeNG-тег не рендерит. `ExtraTabsComponent` собирает детей через
`@ContentChildren(ExtraTabItemComponent) items` и рендерит РЕАЛЬНЫЕ `p-tab`/`p-tabpanel` в своём
собственном шаблоне через `@for`, подставляя тело панели через
`[ngTemplateOutlet]="item.bodyTpl"`. Так все PrimeNG-теги объявлены в одном месте — в шаблоне
`ExtraTabsComponent` — и DI резолвится корректно.

## Props mapping

### ExtraTabs

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `string \| undefined` | первая вкладка | Значение активной вкладки; совпадает с `name` одного из `extra-tab-item` |
| `scrollable` | `boolean` | `false` | Горизонтальная прокрутка списка вкладок — соответствует Figma-свойству `show-nav-buttons` |
| `lazy` | `boolean` | `false` | Ленивая инициализация панелей: содержимое рендерится при первом открытии |
| `(valueChange)` | `EventEmitter<string \| undefined>` | — | Событие при переключении вкладки; вместе с `value` поддерживает `[(value)]` |

### ExtraTabItem

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `name` | `string` (обязателен) | — | Текст заголовка вкладки; также уникальный идентификатор, связывающий заголовок и панель |
| `icon` | `string` | `''` | CSS-класс иконки заголовка; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `badge` | `string` | `''` | Текст бейджа в заголовке вкладки |
| `badgeSeverity` | `ExtraBadgeSeverity` | `'primary'` | Цветовая схема бейджа — делегирована `ExtraBadge`, не сырые значения PrimeNG |
| `disabled` | `boolean` | `false` | Отключённое состояние вкладки |

Содержимое панели — не проп, а `<ng-content>` внутри `<extra-tab-item>` (см. Slots).

## Variants

### Несколько вкладок (базовый вариант)

Figma: `<Tabs>`, show-nav-buttons=false — nodeId `884:7324`

```html
<extra-tabs [(value)]="activeTab">
  <extra-tab-item name="Информация">Содержимое первой вкладки</extra-tab-item>
  <extra-tab-item name="Параметры">Содержимое второй вкладки</extra-tab-item>
  <extra-tab-item name="История">Содержимое третьей вкладки</extra-tab-item>
</extra-tabs>
```

### Прокручиваемые вкладки (scrollable)

Figma: `<Tabs>`, show-nav-buttons=true

```html
<extra-tabs [scrollable]="true">
  <extra-tab-item name="Вкладка 1">...</extra-tab-item>
  <extra-tab-item name="Вкладка 2">...</extra-tab-item>
</extra-tabs>
```

### Вкладки с иконками

Figma: `<Tabs>`, change-layout=иконка + текст

```html
<extra-tabs>
  <extra-tab-item name="Профиль" icon="ti ti-user">Данные профиля</extra-tab-item>
  <extra-tab-item name="Настройки" icon="ti ti-settings">Параметры аккаунта</extra-tab-item>
</extra-tabs>
```

### Вкладки с бейджами

```html
<extra-tabs>
  <extra-tab-item name="Входящие" badge="99+" badgeSeverity="danger">Список входящих</extra-tab-item>
  <extra-tab-item name="Архив" badge="5">Архивные записи</extra-tab-item>
</extra-tabs>
```

### С отключённой вкладкой

```html
<extra-tabs>
  <extra-tab-item name="Доступно">Активная вкладка</extra-tab-item>
  <extra-tab-item name="Недоступно" [disabled]="true">Эта вкладка отключена</extra-tab-item>
</extra-tabs>
```

## Слоты (content projection)

| Слот | Описание |
|------|---------|
| `content` (на `extra-tab-item`) | Содержимое панели — обычный `<ng-content>`, без отдельной директивы |

## Related

- [ExtraAccordion](../accordion/accordion.figma.md) — та же DI-ловушка и тот же паттерн починки (панели вместо вкладок)
- [Иконки](../../figma-code-connect/icons.md) — CSS-классы иконок для `icon`
- [ExtraBadge](../badge/badge.figma.md) — `badgeSeverity`
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте уникальный `name` каждому `extra-tab-item` и используйте то же значение в `[value]`/`[(value)]` на `extra-tabs` для выбора активной вкладки.
- Включайте `[scrollable]="true"`, когда вкладок много и они не помещаются по ширине контейнера.
- Используйте `[lazy]="true"` для тяжёлого содержимого панелей.
- Для иконок заголовков используйте CSS-классы из справочника [icons.md](../../figma-code-connect/icons.md).

**Don't:**
- Не дублируйте `name` у разных `extra-tab-item` — это нарушит связь заголовка и панели.
- Не рендерьте `p-tab`/`p-tabpanel` самостоятельно в обход `extra-tabs`/`extra-tab-item` — сломается DI (см. раздел «Архитектура» выше).
- Не инлайньте CSS-классы иконок вручную в обход [icons.md](../../figma-code-connect/icons.md).
