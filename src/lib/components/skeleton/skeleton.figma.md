---
component: ExtraSkeleton
selector: extra-skeleton
import:
  symbol: ExtraSkeletonComponent
  from: '@cdek-it/angular-ui-kit/components/skeleton'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Skeleton>'
status: stable
updated: '2026-11-17'
---

# Skeleton

Live Figma UI Kit DS v3.0: набор `Skeleton` — прямоугольные и круглые заглушки, анимация.

| Figma | API | Геометрия |
|---|---|---|
| `root.borderRadius` | `shape="circle"` / скругление | 12 (`borderRadius.350`) |
| `extend.minWidth` | `width` | 14 px |
| `extend.minHeight` | `height` | 14 px |
| анимация | `animation` | Встроенная пульсация PrimeNG |

## Ограничения

- Витрины `Rectangles`, `Circle`, `CardPlaceholder`, `NoAnimation` (3–4 экземпляра в одной story) сняты:
  правило «одна story — один экземпляр». Состояния проверяются Controls и матрицей.

Описания story и Controls скопированы из `origin/main` дословно.
