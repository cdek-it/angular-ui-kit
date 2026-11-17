---
component: ExtraTabs
selector: extra-tabs
import:
  symbol: ExtraTabsComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Tabs>'
status: stable
updated: '2026-11-17'
---

# Tabs

Live Figma UI Kit DS v3.0: наборы `Tabs`, `Tabs.Tab`, `Tabs.NavButton`, `Tabs.Tabpanel`.

| Figma | API | Геометрия |
|---|---|---|
| `Tabs` | `<extra-tabs>` с дочерними вкладками | Список вкладок и панели |
| `Tab` | `value` / содержимое вкладки | Активная, disabled, с бейджем |
| `Tabpanel` | проекция | Контент активной панели |
| `focusRing` | фокус клавиатурой | Кольцо 2 px у navButton, tab и tabpanel (было elevation) |

## Ограничения

- Storybook-заголовок компонента — `Components/Menu/Tabs` (историческое размещение), хотя компонент относится к PANEL.
- `value` определяет активную вкладку. Без двусторонней привязки `value` клик по вкладке не переключает активную панель —
  это проверено матрицей и зафиксировано как ограничение (нужен `(valueChange)`/`[(value)]`).

Описания story и Controls скопированы из `origin/main` дословно.
