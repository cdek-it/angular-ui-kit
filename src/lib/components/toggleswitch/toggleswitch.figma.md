---
component: ExtraToggleSwitch
selector: extra-toggleswitch
import:
  symbol: ExtraToggleSwitchComponent
  from: '@cdek-it/angular-ui-kit/components/toggleswitch'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '19:13673'
  name: '<ToggleSwitch>'
status: stable
updated: '2026-11-17'
---

# ToggleSwitch

Live Figma UI Kit DS v3.0: страница ToggleSwitch 📱, набор `19:13673` — 10 вариантов (`state` default/focus/hover/danger/disabled × `checked` false/true),
props `show-label`, `text-label`, `show-caption`, `text-caption`.

| Figma | API | Геометрия |
|---|---|---|
| `state=default`, `checked=false` | значение через CVA | Корпус 40×24, радиус max, паддинг 4; бегунок 16 |
| `state=default`, `checked=true` | значение через CVA | Фон `checkedBackground`, бегунок `checkedBackground` |
| `state=hover` | указатель над свитчем | Фон `hoverBackground` (бегунок без изменений) |
| `state=focus` | фокус клавиатурой | Focus ring 2 px `color.border.focus` через box-shadow |
| `state=danger` | `invalid` из NgControl | Рамка `invalidBorderColor` (`danger.strong`), `p-invalid` на корпусе |
| `state=disabled` | `FormControl.disable()` | `disabledBackground` / `disabledBackground` бегунка, ввод заблокирован |
| `show-label` / `text-label` | `label` | Noto Sans 400 14/20, `color.fg.default`; `labelPosition` меняет сторону |
| `show-caption` / `text-caption` | `caption` | Noto Sans 400 14/18, letter-spacing −0.32, `color.fg.muted`; отступ 12 от свитча |

Значения Figma: light — корпус #a2a5a9, бегунок #ffffff, checked #2b2e33; dark — корпус #6d7076, бегунок #56595f, checked #2b2e33;
disabled в обеих темах #e2e2e4 / #85888e; danger-рамка #db3424 (light) и #f47f77 (dark).

## Отличия и ограничения

- `readonly` — расширение кита: состояние блокирует ввод без disabled-стилей, в Figma его нет.
- Figma `state=focus` описан статически; в коде кольцо появляется только на `:focus-visible`.
- `tabindex` без значения теперь уходит как `0` (PrimeNG 20 иначе получал `NaN` в атрибуте).
- Caption в Figma использует Noto Sans; в ките до синхронизации был TT Fellows — приведено к макету.
- Disabled/danger цвета берутся из токенов PrimeNG (`p-disabled`, `p-invalid`), локальных подмен нет.

Три исходных example-файла сохранены (States, Positions, Bare), комбинаторные story заменены одиночными с `args`.
Описание Default и существующих Controls скопированы из `origin/main` дословно; новые story добавлены без описаний.
