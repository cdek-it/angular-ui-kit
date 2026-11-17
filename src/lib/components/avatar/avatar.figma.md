---
component: ExtraAvatar
selector: extra-avatar
import:
  symbol: ExtraAvatarComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Avatar>'
status: stable
updated: '2026-11-17'
---

# Avatar

Live Figma UI Kit DS v3.0: набор `Avatar` — размеры (sm/base/lg/xl), формы (square/circle), содержимое (label/icon/image),
бейдж, группа аватаров.

| Figma | API | Геометрия |
|---|---|---|
| `root.borderRadius` | `shape="square"` | Радиус 10 (`borderRadius.300`) |
| `extend.borderColor` | — | Рамка `border.neutral.strong` |
| `lg` / `xl` | `size="large"/"xlarge"` | Радиусы `borderRadius.350` / `borderRadius.400` |
| `shape="circle"` | `shape` | `borderRadius.max` |
| badge | `extra-avatar-group`/overlay badge | Бейдж поверх аватара |

## Ограничения

- Витрины `Sizes`, `Shapes`, `Group` сняты: они рендерили 2–6 экземпляров `extra-avatar`, что нарушает правило
  «одна story — один экземпляр». Размеры и формы доступны через Controls, группа аватаров — компонентом
  `extra-avatar-group` (примеры сохранены в `examples/`).
- Story `Image`: `check-stories-source` сравнивает дефолты компонента (`severity="primary"`, пустые `label`/`icon`)
  с не заданными в DOM инпутами и помечает расхождение — это особенность гейта, а не дефект компонента.

Описания story и Controls скопированы из `origin/main` дословно.
