---
component: ExtraInputMask
selector: extra-input-mask
import:
  symbol: ExtraInputMaskComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '319:1690'
  name: '<InputMask>'
status: stable
updated: '2026-11-17'
---

# InputMask

Live Figma UI Kit DS v3.0: страница InputMask 📱, набор `319:1690` — 24 варианта
(`state` default/hover/focus/danger/disabled/readonly × `has-placeholder` × `has-float-label`),
props `show-clear`, `show-text-input`, `text-input`, `text-placeholder`, `is-required`, `text-float-label`,
`show-label`, `show-caption`.

Своих токенов у компонента нет: поле целиком рисуется на токенах `inputtext.*` и `floatlabel.*`
(ветка `feature/form-inputtext-figma-sync`). Проверка — сравнение computed-стилей с InputText
на тех же размерах и состояниях (матрица `API-TESTS.md`, строки `parity/*`).

| Figma | API | Геометрия |
|---|---|---|
| `state=default` | значение через CVA | Поле 42 px (base), радиус 10, паддинг 12, рамка `border.neutral.default` |
| размеры | `size` | small 36 / base 42 / large 50 / xlarge 56; шрифт 14/16/18/20 |
| `state=danger` | `invalid` из NgControl | Рамка danger (#db3424 light, #f47f77 dark), подпись `captionSeverity="danger"` |
| `state=disabled` | `FormControl.disable()` | `disabledBackground`/`disabledColor`, ввод заблокирован |
| `state=readonly` | `readonly` | `readonlyBackground`, поле не редактируется |
| `state=focus` | фокус клавиатурой | Focus ring 2 px `color.border.focus` |
| `has-placeholder=true` | `placeholder` | Плейсхолдер маски `999-999-99-99` |
| `has-float-label=true` | `floatLabel` | Поле 56 px, паддинг 26/12/14, поднятый лейбл 12/14 на top 12 — как в InputText |
| `show-label` / `text-input` | `label`, `info` | Лейбл 14/14 Noto Sans, info-иконка 14 с тултипом |
| `show-caption` | `caption`, `captionSeverity` | Общий `extra-caption`: 14/14, `color.fg.muted`, иконка 14 |
| `show-clear` | `clearable` | Иконка очистки `inputtext.extend.iconSize`, событие `onClear` |

## Отличия и ограничения

- В Figma поднятый float-лейбл набран TT Fellows 12/14, в ките — Noto Sans 12/14: у `floatlabel` нет токена
  семейства шрифта, поэтому лейбл наследует базовый шрифт поля. Line-height и позиция совпадают.
- Подпись в Figma нарисована отдельным инстансом `_<Caption>`; в коде это общий `ExtraCaptionComponent`
  с `severity` (`base` / `info` / `success` / `warning` / `danger`) — раньше был собственный `div` и класс
  `.extra-inputmask-caption`, он удалён.
- `hover` отдельной story не имеет: подсветка проверяется интерактивно в Default.
- Маска, `slotChar`, `autoClear`, `unmask`, `characterPattern`, `keepBuffer`, `autocomplete` — поведение
  PrimeNG InputMask, проверяется матрицей (форматирование, `onComplete`, `unmask`, очистка неполного значения).

Шесть исходных example-файлов сохранены; сырая подложка `var(--p-surface-100)` заменена нейтральной рамкой.
Описания stories и Controls скопированы из `origin/main` дословно.
