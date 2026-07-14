# API Alignment — план работ (backlog)

Сформирован автоматически из `flags` в `figma-angular-api-map.json`. Колонки «Исправление»/«Сторона» — предварительные, решение за владельцами DS/UI Kit.

> **Что НЕ является ошибкой:** `figmaOnly`/`angularOnly`-свойства — это штатное разнесение дизайнер/разработчик (см. блоки в отчётах), а не расхождения. Расхождения дефолтов (BTN-2/BTN-3) теперь выявляются автоматически (P0) — Figma-дефолты подмешаны из Desktop Bridge (`docs/figma-defaults.json`). Не покрыто пока: сравнение множеств enum-значений (BTN-1, напр. `variant=basic|outlined` vs Angular-тип) — требует разбора Angular-типов-юнионов в генераторе.

## P0 — расхождения дефолтов (Figma ≠ Angular)

Выявлено по совпадающим по имени параметрам: **42**. Источник Figma-дефолтов — `docs/figma-defaults.json` (Desktop Bridge).

> ⚠️ Матчинг по имени: часть строк — совпадение имени при разной семантике/типе (напр. `value`, `line`, `placeholder` — Figma-флаг/токен vs Angular-строка/массив). Проверять перед постановкой в работу.

| ID | Компонент | Параметр | Figma default | Angular default |
|---|---|---|---|---|
| DEF-1 | Button.Base | `icon-only` ↔ `iconOnly` | `true` | `false` |
| DEF-2 | Button.Base | `size` ↔ `size` | `xlarge` | `base` |
| DEF-3 | Button.Danger | `icon-only` ↔ `iconOnly` | `true` | `false` |
| DEF-4 | Button.Danger | `size` ↔ `size` | `xlarge` | `base` |
| DEF-5 | Button.Danger | `variant` ↔ `variant` | `basic` | `primary` |
| DEF-6 | Button.Info | `icon-only` ↔ `iconOnly` | `true` | `false` |
| DEF-7 | Button.Info | `size` ↔ `size` | `xlarge` | `base` |
| DEF-8 | Button.Info | `variant` ↔ `variant` | `basic` | `primary` |
| DEF-9 | Button.Success | `icon-only` ↔ `iconOnly` | `true` | `false` |
| DEF-10 | Button.Success | `size` ↔ `size` | `xlarge` | `base` |
| DEF-11 | Button.Success | `variant` ↔ `variant` | `basic` | `primary` |
| DEF-12 | Button.Warning | `icon-only` ↔ `iconOnly` | `true` | `false` |
| DEF-13 | Button.Warning | `size` ↔ `size` | `xlarge` | `base` |
| DEF-14 | Button.Warning | `variant` ↔ `variant` | `basic` | `primary` |
| DEF-15 | DatePicker | `show-clear` ↔ `showClear` | `true` | `false` |
| DEF-16 | DatePicker | `↳ show-time` ↔ `showTime` | `true` | `false` |
| DEF-17 | InputMask | `show-clear` ↔ `showClear` | `true` | `false` |
| DEF-18 | InputText | `show-clear` ↔ `showClear` | `true` | `false` |
| DEF-19 | Select | `show-clear` ↔ `showClear` | `true` | `false` |
| DEF-20 | SelectButton.Item | `size` ↔ `size` | `xlarge` | `base` |
| DEF-21 | Textarea | `placeholder` ↔ `placeholder` | `true` | `` |
| DEF-22 | Textarea | `show-clear` ↔ `showClear` | `true` | `false` |
| DEF-23 | ToggleButton | `icon-only` ↔ `iconOnly` | `true` | `false` |
| DEF-24 | ToggleButton | `size` ↔ `size` | `xlarge` | `base` |
| DEF-25 | ConfirmDialog | `severity` ↔ `severity` | `danger` | `default` |
| DEF-26 | Drawer | `position` ↔ `position` | `left` | `right` |
| DEF-27 | Card | `overlay` ↔ `overlay` | `true` | `false` |
| DEF-28 | Divider | `align` ↔ `align` | `left` | `center` |
| DEF-29 | Galleria | `↳ show-indicators` ↔ `showIndicators` | `true` | `false` |
| DEF-30 | Avatar | `size` ↔ `size` | `xlarge` | `base` |
| DEF-31 | MeterGroup.Item | `value` ↔ `value` | `{value}` | `[]` |
| DEF-32 | ProgressBar | `value` ↔ `value` | `{value}%` | `0` |
| DEF-33 | ProgressSpinner | `fill` ↔ `fill` | `primary` | `none` |
| DEF-34 | ProgressSpinner | `size` ↔ `size` | `xlarge` | `base` |
| DEF-35 | Breadcrumb | `home` ↔ `home` | `true` | `undefined` |
| DEF-36 | Timeline | `layout` ↔ `layout` | `horizontal` | `vertical` |
| DEF-37 | Timeline.ItemHorizontal | `align` ↔ `align` | `opposite` | `left` |
| DEF-38 | Timeline.ItemHorizontal | `line` ↔ `line` | `true` | `solid` |
| DEF-39 | Timeline.ItemVertical | `align` ↔ `align` | `opposite` | `left` |
| DEF-40 | Timeline.ItemVertical | `line` ↔ `line` | `true` | `solid` |
| DEF-41 | Timeline.Marker | `icon` ↔ `icon` | `false` | `` |
| DEF-42 | _❌Button.Badge | `size` ↔ `size` | `xlarge` | `base` |

## P1 — компоненты без Angular-реализации

| ID | repo.angular | Figma-узлы | Суть | Сторона |
|---|---|---|---|---|
| GAP-1 | `src/lib/components/multiselect` | MultiSelect, MultiSelect.Group, MultiSelect.Option, MultiSelect.Overlay | папки нет в `main` (есть в ветке) | Angular / решение |
| GAP-2 | `src/stories/components/p-data-table` | DataTable.BodyCellBase, DataTable.FooterCellBase, DataTable.HeaderCellBase, DataTable.HeaderCellFilter, DataTable.Constraint, DataTable.ConstraintList, DataTable.OverlayPopover, DataTable.OverlaySelect, DataTable.RowToggleButton | `repo` ведёт на сторис без `@Component` | Angular / решение |
| GAP-3 | `— (нет repo.angular)` | _❌FloatLabel, MenuItem.Base, MenuItem.Group, MenuItem.Node, MenuItem.Template, ActionIcon | нет `repo.angular` — модель/устаревшее/не реализовано | Angular / решение |

## P2 — ошибки данных Figma

| ID | Узлы | Суть | Сторона |
|---|---|---|---|
| — | — | нет | — |

## P3 — слоты без реализации (обзор)

Помечено `⚠️ отсутствует` слотов: **201** в **96** узлах.

> ⚠️ **Осторожно, завышено:** матчинг слот↔Input идёт **по имени**. Многие «gap» — ложные (напр. `text-button`→`label`, `↳ change-icon`→`icon` реализованы, но под другим именем). Задача SLOT-1: завести таблицу **ролевых алиасов слотов** или проверить вручную; не считать эти `⚠️` подтверждёнными расхождениями до проверки.

| ID | Задача | Сторона |
|---|---|---|
| SLOT-1 | Ролевой маппинг слотов (Figma TEXT/INSTANCE_SWAP → Angular Input по роли) вместо матчинга по имени | Документация + генератор |

## Справочно (не задачи)

- `figmaOnly` всего: **517** — свойства только во Figma (штатно → блок «Для дизайнеров»).
- `angularOnly` всего: **1123** — свойства только в Angular (штатно → блок «Для разработчиков»).
- Детализация по каждому компоненту — в соответствующем `api-alignment-<name>.md`.
