---
component: ExtraToast
selector: extra-toast
import:
  symbol: ExtraToastComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '15953:4478'
  name: '<Toast>'
status: stable
updated: '2026-11-17'
---

# Toast

Live Figma UI Kit DS v3.0: страница Toast 📱, набор `15953:4478` — 8 вариантов
(`severity` info/success/warning/danger × `timer` false/true), props `show-close`, `show-caption`, `show-footer`,
`change-icon-*`, `show-layout-body`, слоты `<Slot.Body>`, `<Slot.FirstAction>`, `<Slot.SecondAction>`.

Toast — overlay-вариант `ExtraMessage`: контейнер `<extra-toast>` монтируется один раз, содержимое передаётся
императивно через `ExtraToastService.add({...})`.

| Figma | API | Геометрия |
|---|---|---|
| `severity=info/success/warning/danger` | поле `severity` в `add()` | Фон `colorScheme.*.background`, рамка 1 px `borderColor`, иконка 36 и акцентная линия 4 |
| `timer=true` | `life` | Автоскрытие по времени жизни контейнера или сообщения |
| `show-close=true` | `showClose` | Кнопка 32×32, радиус 10, иконка `ti-x` 16 |
| `show-caption=true` | `caption` | Подпись 14/18 |
| `show-footer=true` | шаблон `footer` в `add()` | Класс `.p-toast-footer` |
| `change-icon-*` | `icon` | Своя иконка tabler |

Базовые значения: ширина 272, радиус 14, рамка 1 px, контент паддинг 14, заголовок 16/20, тень `effects.elevation.300`.

## Отличия и ограничения

- `position`, `key`, `life` — свойства контейнера (в Figma их нет); `width` через CSS-переменную — расширение кита.
- Токены `extend.ext*.closeButton.focusBackground` добавлены по Figma, но в CSS не применяются (фокус кнопки
  закрытия уже покрыт focus-ring кольцом) — гейт помечает их WARN.
- Гейт `check-stories-source` структурно неприменим: контейнер скрыт, пока нет сообщения; snippets проверены вручную
  (один `<extra-toast>` на story, параметры — в payload сервиса).
- `onClose` и слоты передаются в payload сервиса, а не входами контейнера.

Статичные карточки-превью из примеров удалены, чтобы UI совпадал с показанным кодом; примеры сохранены.
Описания stories и Controls скопированы из `origin/main` дословно.
