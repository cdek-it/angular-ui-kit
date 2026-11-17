---
component: ExtraAccordion
selector: extra-accordion
import:
  symbol: ExtraAccordionComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Accordion>'
status: stable
updated: '2026-11-17'
---

# Accordion

Live Figma UI Kit DS v3.0: наборы `Accordion` (заголовок, контент, разделители) и `Accordion.Panel`.

| Figma | API | Геометрия |
|---|---|---|
| `Accordion` | `<extra-accordion>` + дочерние панели | Паддинг заголовка 14×0, контента 0/24/14/24 |
| `Accordion.Panel` | `<extra-accordion-panel>` | Нижняя рамка панели 4 px, рамка контента 1 px |
| `focus` | фокус клавиатурой | `header.focusRing.shadow` — кольцо 2 px (было inset) |
| `expanded` | `[expanded]` панели | Раскрыта изначально |
| `disabled` | `[disabled]` панели | Панель недоступна для раскрытия |
| `multiple` | `[multiple]` аккордеона | Несколько панелей открыты одновременно |

## Ограничения

- Панели читаются через `@ContentChildren`, поэтому элементов `<extra-accordion-panel>` в DOM нет — гейты
  считают корневой `extra-accordion` (селектор выбирается по имени каталога компонента).

Описания story и Controls скопированы из `origin/main` дословно.
