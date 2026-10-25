[Открыть в Figma →](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM/UI-Kit--DS--v2.1?node-id=1284-1549&m=dev)

# ExtraPaginator

> ✅ **Реализован**: `ExtraPaginatorComponent` (`@cdek-it/angular-ui-kit`) соответствует спецификации.

Постраничная навигация по данным.

| Свойство                | Описание                                  | Типизация  | По умолчанию |
| ----------------------- | ----------------------------------------- | ---------- | ------------ |
| `rows`                  | количество элементов на странице          | `number`   | `10`         |
| `totalRecords`          | общее количество записей                  | `number`   | `0`          |
| `first`                 | индекс первой записи (0-based)            | `number`   | `0`          |
| `rowsPerPageOptions`    | варианты количества элементов на странице | `number[]` | —            |
| `showJumpToPage`        | поле для перехода к конкретной странице   | `boolean`  | `false`      |
| `jumpToPagePlaceholder` | плэйсхолдер поля выбора страницы          | `string`   | —            |
| `showDropdown`          | селект для перехода к конкретной странице | `boolean`  | `false`      |

# События

| Событие      | Описание                       | Типизация                                        |
| ------------ | ------------------------------ | ------------------------------------------------ |
| `pageChange` | срабатывает при смене страницы | `(event: ExtraPaginatorPageChangeEvent) => void` |

# ExtraPaginatorPageChangeEvent

| Свойство    | Описание                   | Типизация |
| ----------- | -------------------------- | --------- |
| `page`      | текущая страница (0-based) | `number`  |
| `first`     | индекс первой записи       | `number`  |
| `rows`      | элементов на странице      | `number`  |
| `pageCount` | всего страниц              | `number`  |
