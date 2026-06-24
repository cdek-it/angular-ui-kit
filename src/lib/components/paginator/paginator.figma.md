---
component: ExtraPaginator
selector: extra-paginator
import:
  symbol: ExtraPaginatorComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Khh7arsuXss3ncqy1Dz3OZ'
  nodeId: '1284:1732'
  componentKey: '5c0a5f38512dbb5c809f815f42a3eb6f4af88c0a'
  name: '<Paginator>'
status: stable
updated: '2026-06-22'
---

## Overview

`ExtraPaginatorComponent` — компонент постраничной навигации по большим спискам и таблицам. Разбивает данные на страницы, отображает кнопки prev/next, номера страниц и, опционально, выбор размера страницы, поле прыжка на страницу и текст с текущей позицией. Оборачивает PrimeNG `p-paginator`.

Компонент соответствует Figma-компоненту `<Paginator>` (component set, nodeId `1284:1732`, fileKey `Khh7arsuXss3ncqy1Dz3OZ`, библиотека «UI Kit (DS) v2.0»). Опциональные блоки управляются Figma-свойствами `show-jump` (поле прыжка на страницу), `show-dropdown` (выпадающий выбор размера страницы) и осью `template`.

Компонент событийный: текущая страница не хранится через `ControlValueAccessor`, а сообщается наружу событием `(onPageChange)`. Состояние страницы задаётся входами `first` и `rows`.

## Props mapping

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|---------|
| `first` | `number` | `0` | Индекс первой записи на текущей странице (смещение) |
| `rows` | `number` | `10` | Количество строк на странице |
| `totalRecords` | `number` | `0` | Общее количество записей для расчёта числа страниц |
| `rowsPerPageOptions` | `any[] \| undefined` | `undefined` | Набор вариантов размера страницы — соответствует Figma-свойству `show-dropdown` |
| `currentPageReportTemplate` | `string` | `'{currentPage} из {totalPages}'` | Шаблон текста текущей позиции (плейсхолдеры `{currentPage}`, `{totalPages}` и др.) |
| `showCurrentPageReport` | `boolean` | `false` | Показывать текст с текущей страницей и общим числом |
| `showFirstLastIcon` | `boolean` | `true` | Показывать кнопки перехода на первую и последнюю страницу |
| `showJumpToPageDropdown` | `boolean` | `false` | Показывать выпадающий список для прыжка на страницу |
| `showJumpToPageInput` | `boolean` | `false` | Показывать поле ввода для прыжка на страницу — соответствует Figma-свойству `show-jump` |
| `showPageLinks` | `boolean` | `true` | Показывать номера страниц |
| `pageLinkSize` | `number` | `5` | Количество одновременно отображаемых ссылок на страницы |
| `alwaysShow` | `boolean` | `true` | Показывать пагинатор даже при единственной странице |
| `(onPageChange)` | `EventEmitter<ExtraPaginatorState>` | — | Событие смены страницы; содержит `page`, `first`, `rows`, `pageCount` |

## Variants

### Default (базовая навигация)

Figma: `<Paginator>`, template=false, show-jump=false, show-dropdown=false — nodeId `1284:1732`

```html
<extra-paginator
  [totalRecords]="120"
  [rows]="10"
  [first]="0"
  (onPageChange)="onPageChange($event)"
></extra-paginator>
```

### С текстом текущей страницы (show-current-page-report)

Figma: `<Paginator>`, template=false

```html
<extra-paginator
  [totalRecords]="120"
  [rows]="10"
  [showCurrentPageReport]="true"
  currentPageReportTemplate="{currentPage} из {totalPages}"
  (onPageChange)="onPageChange($event)"
></extra-paginator>
```

### С выбором размера страницы (show-dropdown)

Figma: `<Paginator>`, show-dropdown=true

```html
<extra-paginator
  [totalRecords]="120"
  [rows]="10"
  [rowsPerPageOptions]="[10, 20, 50]"
  (onPageChange)="onPageChange($event)"
></extra-paginator>
```

### С полем прыжка на страницу (show-jump)

Figma: `<Paginator>`, show-jump=true

```html
<extra-paginator
  [totalRecords]="120"
  [rows]="10"
  [showJumpToPageInput]="true"
  (onPageChange)="onPageChange($event)"
></extra-paginator>
```

## Slots

Не используются. Состав пагинатора определяется входными свойствами; содержимое не проецируется.

## Related

- [Select](../select/select.figma.md) — выпадающий список (используется для выбора размера страницы)
- [Button](../button/button.figma.md) — кнопки навигации prev/next
- [Conventions](../../figma-code-connect/conventions.md) — соглашения маппинга Figma → Angular

## Do / Don't

**Do:**
- Управляйте текущей страницей через входы `first` и `rows`, обновляя их в обработчике `(onPageChange)`.
- Задавайте `totalRecords` — без него число страниц не рассчитывается.
- Включайте `[rowsPerPageOptions]` только когда пользователю действительно нужно менять размер страницы.
- Используйте `currentPageReportTemplate` вместе с `[showCurrentPageReport]="true"` для отображения позиции.

**Don't:**
- Не ожидайте двусторонней привязки страницы: компонент событийный, синхронизируйте `first`/`rows` вручную в `(onPageChange)`.
- Не задавайте `pageLinkSize` больше реального числа страниц — лишние ссылки не появятся.
- Не отключайте `alwaysShow`, если в макете пагинатор должен оставаться видимым при единственной странице.
