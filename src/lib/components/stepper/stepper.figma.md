---
component: ExtraStepper
selector: extra-stepper
import:
  symbol: ExtraStepperComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Stepper>'
status: stable
updated: '2026-11-17'
---

# Stepper

Live Figma UI Kit DS v3.0: наборы `Stepper`, `Stepper.ItemHorizontal`, `Stepper.ItemVertical`,
`Stepper.Separator`, `Stepper.StepPanel`.

| Figma | API | Геометрия |
|---|---|---|
| `Stepper` | `<extra-stepper>` с `extra-stepper-item` | Панель шага с паддингом 18×14, разделители |
| ItemHorizontal / ItemVertical | `orientation` | Горизонтальная/вертикальная раскладка, отступ разделителя 24 |
| `focusRing` | фокус клавиатурой | `stepHeader.focusRing.shadow` — кольцо 2 px вместо elevation |
| `invalid` | валидация шага | `invalidBorderColor` → `danger.strong` (#db3424) |
| `linear`, `value` | `linear`, `value` | Линейный режим и активный шаг |

## Ограничения

- Заголовки шагов и панели рендерит PrimeNG; ориентация задаётся на корне (`orientation="vertical"`).
- Активный шаг определяется `value`; клик по шагу без привязки `value` не переключает панель.

Описания story и Controls скопированы из `origin/main` дословно.
