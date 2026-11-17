---
component: ExtraBreadcrumb
selector: extra-breadcrumb
import:
  symbol: ExtraBreadcrumbComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Breadcrumb>'
status: stable
updated: '2026-11-17'
---

# Breadcrumb

Live Figma UI Kit DS v3.0: наборы `Breadcrumb` (prop `home` true/false, слот `<Slot.Items>`) и `Breadcrumb.Item`
(ось `state` default/hover/disabled/focus; props `show-separator`, `show-icon`, `change-icon`, `show-label`).

| Figma | API | Геометрия |
|---|---|---|
| `home=true/false` | `home` | Иконка «Домой» перед крошками |
| `<Slot.Items>` | `model: ExtraMenuItem[]` | Крошки: label, icon, url, disabled |
| `Item.state=default/hover` | — | Ховер пункта — из PrimeNG Aura + токены `breadcrumb.item.*` |
| `Item.state=focus` | `tabindex` | Кольцо фокуса 2 px: `breadcrumb.focusRing.shadow` = `0 0 0 {width} {color}` |
| `Item.show-icon` | `icon` в элементе модели | Иконка Tabler перед текстом |
| `Item.show-label=false` | элемент без `label` | Крошка только с иконкой (story IconsOnly) |
| `show-separator` | — | Разделитель рисует PrimeNG, стиль из токенов |

## Отличия и ограничения

- В Figma нет оси «последняя крошка»: в PrimeNG последний элемент без `url` рендерится ссылкой без `href` — это
  проверяется матрицей, отдельного API нет.
- `disabled` берётся из `ExtraMenuItem.disabled` (PrimeNG), отдельного входа компонента нет.
- Токены `breadcrumb.focusRing.width/style/color/offset` не используются CSS напрямую — кольцо задаётся
  `breadcrumb.focusRing.shadow` (гейт помечает их WARN, это унаследованный резерв).

Описания Default, Basic, IconsOnly и Controls скопированы из `origin/main` дословно; сниппеты переведены на HTML.
