---
component: ExtraScrollPanel
selector: extra-scroll-panel
import:
  symbol: ExtraScrollPanelComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<ScrollPanel>'
status: stable
updated: '2026-11-17'
---

# ScrollPanel

Live Figma UI Kit DS v3.0: набор `ScrollPanel` — контейнер с прокруткой и полосы `bar`.

| Figma | API | Геометрия |
|---|---|---|
| контейнер | `<extra-scroll-panel height width>` | Область прокрутки задаётся размерами или CSS |
| полосы | — | Толщина и цвет из токенов `bar.*` |
| `focusRing` | фокус полосы | `bar.focusRing.shadow` — кольцо 2 px вместо elevation |

## Ограничения

- `step` — шаг прокрутки, расширение кита (в Figma нет).
- Горизонтальная прокрутка появляется только при контенте шире контейнера; в story `Horizontal` ширина 100%,
  поэтому полоса присутствует, но переполнение зависит от viewport.

Описания story и Controls скопированы из `origin/main` дословно.
