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
updated: '2026-06-22'
---

## Overview

`ExtraTabsComponent` — компонент вкладок, организующий контент в несколько переключаемых разделов. Оборачивает PrimeNG `p-tabs` (`p-tablist` + `p-tabpanels`) и предлагает декларативный API: список вкладок задаётся одним массивом `tabs` типа `ExtraTabItem[]`, а не отдельными под-компонентами в шаблоне.

Компонент соответствует Figma-компоненту `<Tabs>` (nodeId `884:7324`, библиотека «UI Kit (DS) v2.0»). Figma-свойство `show-nav-buttons` соответствует Angular-входу `scrollable` (навигационные стрелки появляются при горизонтальной прокрутке списка вкладок).

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `value` | `string \| number \| undefined` | `'0'` | Значение активной вкладки; совпадает с `value` одного из элементов `tabs` |
| `tabs` | `ExtraTabItem[]` | `[]` | Массив описаний вкладок (см. структуру ниже в Slots) |
| `scrollable` | `boolean` | `false` | Горизонтальная прокрутка списка вкладок — соответствует Figma-свойству `show-nav-buttons` |
| `lazy` | `boolean` | `false` | Ленивая инициализация панелей: содержимое рендерится при первом открытии |

Элемент массива `ExtraTabItem`:

| Поле | Тип | Описание |
|------|-----|---------|
| `value` | `string` | Уникальный идентификатор вкладки; связывает заголовок и панель |
| `label` | `string` | Текст заголовка вкладки |
| `icon` | `string` | CSS-класс иконки заголовка; доступные иконки — [icons.md](../../figma-code-connect/icons.md) |
| `disabled` | `boolean` | Отключённое состояние вкладки |
| `badge` | `string` | Текст бейджа в заголовке вкладки |
| `badgeSeverity` | `'success' \| 'info' \| 'warn' \| 'danger' \| 'secondary' \| 'contrast'` | Цветовая схема бейджа; цвета соответствуют токенам [tokens.md](../../figma-code-connect/tokens.md) |
| `content` | `string` | Текстовое содержимое панели вкладки |

## Variants

### Несколько вкладок (базовый вариант)

Figma: `<Tabs>`, show-nav-buttons=false — nodeId `884:7324`

```html
<extra-tabs value="0" [tabs]="tabs"></extra-tabs>
```

```ts
import { ExtraTabsComponent, ExtraTabItem } from '@cdek-it/angular-ui-kit';

// В компоненте:
tabs: ExtraTabItem[] = [
  { value: '0', label: 'Информация', content: 'Содержимое первой вкладки' },
  { value: '1', label: 'Параметры', content: 'Содержимое второй вкладки' },
  { value: '2', label: 'История', content: 'Содержимое третьей вкладки' },
];
```

### Прокручиваемые вкладки (scrollable)

Figma: `<Tabs>`, show-nav-buttons=true

```html
<extra-tabs value="0" [tabs]="tabs" [scrollable]="true"></extra-tabs>
```

### Вкладки с иконками

Figma: `<Tabs>`, change-layout=иконка + текст

Иконки заголовков задаются полем `icon` элемента `ExtraTabItem`; доступные иконки — [icons.md](../../figma-code-connect/icons.md).

```html
<extra-tabs value="0" [tabs]="tabs"></extra-tabs>
```

```ts
import { ExtraTabsComponent, ExtraTabItem } from '@cdek-it/angular-ui-kit';

// В компоненте (CSS-классы иконок — см. icons.md):
tabs: ExtraTabItem[] = [
  { value: '0', label: 'Профиль', icon: 'ti ti-user', content: 'Данные профиля' },
  { value: '1', label: 'Настройки', icon: 'ti ti-settings', content: 'Параметры аккаунта' },
];
```

### Вкладки с бейджами

Бейдж задаётся полем `badge` (и опционально `badgeSeverity`); цвета бейджа соответствуют токенам [tokens.md](../../figma-code-connect/tokens.md).

```html
<extra-tabs value="0" [tabs]="tabs"></extra-tabs>
```

```ts
import { ExtraTabsComponent, ExtraTabItem } from '@cdek-it/angular-ui-kit';

// В компоненте:
tabs: ExtraTabItem[] = [
  { value: '0', label: 'Входящие', badge: '99+', badgeSeverity: 'danger', content: 'Список входящих' },
  { value: '1', label: 'Архив', badge: '5', content: 'Архивные записи' },
];
```

### С отключённой вкладкой

Отключение задаётся полем `disabled` элемента `ExtraTabItem`.

```html
<extra-tabs value="0" [tabs]="tabs"></extra-tabs>
```

```ts
import { ExtraTabsComponent, ExtraTabItem } from '@cdek-it/angular-ui-kit';

// В компоненте:
tabs: ExtraTabItem[] = [
  { value: '0', label: 'Доступно', content: 'Активная вкладка' },
  { value: '1', label: 'Недоступно', disabled: true, content: 'Эта вкладка отключена' },
];
```

## Slots

Компонент не использует `<ng-content>` и структурные директивы. Структура вкладок (заголовки и панели) описывается декларативно через массив `tabs`, который во внутреннем шаблоне разворачивается в PrimeNG-разметку:

| Уровень | PrimeNG-элемент | Источник данных |
|---------|-----------------|-----------------|
| Контейнер | `p-tabs` | входы `value`, `scrollable`, `lazy` |
| Список заголовков | `p-tablist` → `p-tab` (на каждый элемент `tabs`) | поля `label`, `icon`, `badge`, `disabled` элемента `ExtraTabItem` |
| Панели контента | `p-tabpanels` → `p-tabpanel` (на каждый элемент `tabs`) | поле `content` элемента `ExtraTabItem` |

Связь заголовка и панели обеспечивается полем `value`: совпадающие значения в `p-tab` и `p-tabpanel` объединяют их в одну вкладку.

## Related

- [Иконки](../../figma-code-connect/icons.md) — CSS-классы иконок для поля `icon`
- [Токены](../../figma-code-connect/tokens.md) — цветовые токены бейджей вкладок
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Задавайте уникальный `value` каждому элементу `tabs` и используйте то же значение во входе `value` для выбора активной вкладки по умолчанию.
- Включайте `[scrollable]="true"`, когда вкладок много и они не помещаются по ширине контейнера.
- Используйте `[lazy]="true"` для тяжёлого содержимого панелей, чтобы откладывать их инициализацию до первого открытия.
- Для иконок заголовков используйте CSS-классы из справочника [icons.md](../../figma-code-connect/icons.md).

**Don't:**
- Не дублируйте значения `value` у разных элементов `tabs` — это нарушит связь заголовка и панели.
- Не инлайньте CSS-классы иконок вручную в обход [icons.md](../../figma-code-connect/icons.md).
- Не задавайте во входе `value` идентификатор, которого нет ни в одном элементе `tabs` — активная вкладка не будет выбрана.
