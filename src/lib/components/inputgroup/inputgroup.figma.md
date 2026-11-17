---
component: ExtraInputGroup
selector: extra-input-group
import:
  symbol: ExtraInputGroupComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '437:3505'
  name: '<InputGroup>'
status: stable
updated: '2026-11-17'
---

## Mapping

| Figma                            | Angular                                                          |
| -------------------------------- | ---------------------------------------------------------------- |
| `addon-position=left`            | `addonPosition="left"`, аддон перед полем                        |
| `addon-position=right`           | `addonPosition="right"`, аддон после поля                        |
| `addon-position=left & right`    | `addonPosition="both"`, аддоны с обеих сторон                    |
| `change-field`                   | content projection; Angular Forms подключается к полю            |
| sizing small/base/large/xlarge   | `size="small/base/large/xlarge"` на группе и поле                |
| Addon `position=left/right`      | `position="left/right"`; фактическое место определяется DOM      |
| Addon `type=text`                | `type="text"`, текст через проекцию                              |
| Addon `type=icon`, `change-icon` | `type="icon"`, `icon="ti ti-user"`                               |
| Addon `disabled=true`            | disabled вложенного поля, например через `FormControl.disable()` |

InputGroup: [437:3505](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM?node-id=437-3505).
Addon: [436:3089](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM?node-id=436-3089).
Sizing: [26126:121878](https://www.figma.com/design/Q1BWgZ7zoV5UzlBOnjW0cM?node-id=26126-121878).

Live Figma проверена 2026-11-17: 3 позиции группы, 8 вариантов аддона, 4 sizing-мода, light/dark. Геометрия без внешнего stroke — 34/40/48/54; icon — 14/16/18/20; addon width/min-width 36, padding 10, radius 10. Фиксированная типографика текстового аддона — Noto Sans Regular 16/18.

Обводка OUTSIDE реализована псевдоэлементом аддона и outline поля. На стыках нет второй границы; у внутренних углов радиус нулевой. Поле остаётся единственным интерактивным элементом; декоративная иконка скрыта от accessibility tree.

В актуальном макете радиус привязан к `dimension/borderRadius/300` (10), хотя старый DTCG addon.borderRadius содержит 14. Dark addon text использует `color/fg/muted`, а не старую inverse-ссылку. Эти значения приведены к live-макету в собственных токенах InputGroup. Общие токены InputText не меняются.

Группа сохраняет растягивание по ширине контейнера. В Figma ширины вложенного поля переопределены на отдельных инстансах (240/203/166), поэтому их полные ширины не являются единым размерным токеном группы. Для пиксельной сверки задаётся соответствующая ширина контейнера. Tabler webfont использует тот же символ; его растеризация может отличаться от векторного пути Figma.

## Usage

```html
<extra-input-group size="base" addonPosition="left">
  <extra-input-group-addon position="left" type="icon" icon="ti ti-user"></extra-input-group-addon>
  <extra-input-text
    size="base"
    placeholder="Placeholder"
    ariaLabel="Поле ввода"
    [fluid]="true"
    [formControl]="control"
  ></extra-input-text>
</extra-input-group>
```

`addonPosition` и `position` сохраняют исходную семантику CSS-хуков: они не переставляют содержимое. Лейблы и подписи находятся снаружи группы. Для иконок используется `icon`; для текста — проекция. Контейнер и аддон не объявляют outputs или CVA.
