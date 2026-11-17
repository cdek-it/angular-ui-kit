---
component: ExtraSelectButton
selector: extra-select-button
import:
  symbol: ExtraSelectButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '317:1832'
  componentKey: '62afbf071ec53d216933d644c1e3041ff6a11dee'
  name: '<SelectButton>'
status: stable
updated: '2026-11-17'
---

# SelectButton

Live Figma UI Kit DS v3.0: страница SelectButton 📱, набор `317:1832` (2 варианта: `state=default`, `state=disabled`).
Внутри набора — слот `<Slot.Options>` из трёх инстансов `<🔒SelectButton.Item>`; сам элемент в Figma построен
на компоненте ToggleButton, поэтому размерная лестница и disabled-цвета берутся из токенов `togglebutton.*`.

| Figma | API | Геометрия |
|---|---|---|
| `state=default` | значение через CVA | Группа: фон `color.bg.neutral.medium.default`, паддинги 4, радиус 12, зазор 4 |
| `state=disabled` | `FormControl.disable()` | Сегмент: фон и рамка `disabledBackground`/`disabledBorderColor`, текст `disabledColor` (#85888e), без прозрачности |
| `state=default`, выбранный сегмент | `value` | Фон и рамка `checkedBackground`/`checkedBorderColor`, текст `checkedColor` |
| `<🔒SelectButton.Item>` | `options[]` | Паддинги 8×14, радиус 8, иконка 20, подпись Noto Sans 16/20, 600; высота сегмента 36, группы 44 |
| `<Slot.Options>` | `options` / `multiple` / `allowEmpty` | Слот задаёт содержимое и количество сегментов; выбор — `ControlValueAccessor` |

Ширина группы в Figma (472) задана плейсхолдерами слота, в коде группа тянется по содержимому.
Размерная лестница small/base/large/xlarge — расширение кита (в наборе Figma размера нет): высоты 32/36/56/64,
иконки 16/20/24/28, паддинги 4×14, 8×14, 14×24, 20×24. Значения закреплены матрицей API-TESTS.md.

## Отличия и ограничения

- Figma не содержит варианта `checked + disabled`: в коде выбранный сегмент сохраняет заливку выбора и получает muted-текст.
- В наборе нет `hover`/`focus`: подсветка невыбранного сегмента и DS focus ring 2 px приходят из ToggleButton и общих токенов.
- `invalidBorderColor` объявлен в переменных Figma, но в наборе нет `invalid`-варианта: внешний валидатор помечает `FormControl`
  невалидным, рамка компонента при этом не подменяется (состояние не выдумывается).
- Плейсхолдерная иконка слота — `ti-arrow-down-right`; она воспроизведена в story Default.
- `tabindex` удалён из API: PrimeNG 20 принимает вход, но не передаёт его сегментам. `autofocus` реализован в обёртке.

Пять исходных example-файлов сохранены, декоративные подложки `bg-surface-ground` сняты. Описания stories и Controls
скопированы дословно из `origin/main`; новые Controls `optionValue`/`optionDisabled` добавлены без описаний.
