---
component: ExtraCarousel
selector: extra-carousel
import:
  symbol: ExtraCarouselComponent
  from: '@cdek-it/angular-ui-kit/components/carousel'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Carousel>'
status: stable
updated: '2026-11-18'
---

# Carousel

Live Figma UI Kit DS v3.0: наборы `Carousel`, `Carousel.Indicator`.

| Figma | API | Геометрия |
|---|---|---|
| слайды | `value` | 8 слайдов в примере, видно 5 (`numVisible`) |
| `Indicator` | `showIndicators` | Точки страниц; focus ring кольцом 2 px (было elevation) |
| навигация | `showNavigators`, `circular` | Кнопки prev/next, зацикливание |
| ориентация | `orientation` | `horizontal` / `vertical` |
| автопрокрутка | `autoplayInterval` | Интервал в мс |

## Ограничения

- Story `Vertical`, `Autoplay`, `HeaderAndFooter` сняты: их примеры рендерят несколько каруселей и содержат
  TS-сниппеты с интерполяциями; состояния проверяются Controls.
- `check-component`: 1 WARN `G6 чужой компонент button.root.roundedBorderRadius` — CSS карусели использует
  токен кнопки (не относится к этой ветке).
- Матрица `API-TESTS.md`: проверки рендера и одного экземпляра проходят; строки про навигацию и переключение
  требуют уточнения селекторов PrimeNG 20 (`.p-carousel-prev/next` и `data-pc-section` не находятся в DOM).

Описания story и Controls скопированы из `origin/main` дословно.
