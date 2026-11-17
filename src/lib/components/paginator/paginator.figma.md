---
component: ExtraPaginator
selector: extra-paginator
import:
  symbol: ExtraPaginatorComponent
  from: '@cdek-it/angular-ui-kit/components/paginator'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Paginator>'
status: stable
updated: '2026-11-17'
---

# Paginator

Live Figma UI Kit DS v3.0: наборы `Paginator` (ось `template` false/true, props `show-jump`, `show-dropdown`,
`text-jump/text-current/text-of/text-total`) и `Paginator.Item` (ось `state` default/hover/disabled,
`checked` false/true, `icon` false/true).

| Figma | API | Геометрия |
|---|---|---|
| `template=false` / `true` | `showPageLinks`, `showDropdown`, `showJumpToPage`, `showCurrentPageReport` | Композиция пагинатора и слот содержимого |
| `Paginator.Item state` | `showPageLinks` | Кнопки страниц: default / hover / selected |
| `checked=true` | выбранная страница | `navButton.selectedColor` (`fg.inverse.default`), заливка кнопки |
| `icon=true` | навигационные кнопки | Первая/последняя/предыдущая/следующая |
| `show-jump` | `showJumpToPage`, `jumpToPagePlaceholder` | Поле перехода на страницу |
| `show-dropdown` | `showDropdown`, `rowsPerPageOptions` | Выпадающий выбор количества строк |

Токены: `navButton.focusRing.shadow` теперь ссылается на роль `effects.focusRing.none` (кольцо фокуса рисует сам
компонент), `navButton.selectedColor` — на `color.fg.inverse.default`.

## Отличия и ограничения

- В Figma нет осей `rows`/`rowsPerPageOptions`/`totalRecords` — это данные, управляемые кодом.
- `alwaysShow`, `first`, `rowsPerPageOptions`, `currentPageReportTemplate` — расширения кита/PrimeNG.
- Шаблон `currentPageReportTemplate` содержит фигурные скобки (`{currentPage}`), поэтому пример передаёт его
  из класса, а не строкой в HTML: иначе Angular-парсер трактует его как ICU.

Описания Default, CurrentPageReport, RowsPerPage и Controls скопированы из `origin/main` дословно.
