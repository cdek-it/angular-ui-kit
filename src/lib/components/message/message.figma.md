---
component: ExtraMessage
selector: extra-message
import:
  symbol: ExtraMessageComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '15963:3163'
  name: '<Message>'
status: stable
updated: '2026-11-17'
---

# Message

Live Figma UI Kit DS v3.0: страница MESSAGES, набор `15963:3163` — 8 вариантов
(`severity` info/success/warning/danger × `timer` false/true), props `show-close`, `show-caption`,
`show-footer`, `change-icon-info/success/warning/danger`, `show-layout-body`.

| Figma | API | Геометрия |
|---|---|---|
| `severity=info` | `severity="info"` | Фон `colorScheme.*.info.background`, рамка 1 px `borderColor`, заголовок `color` |
| `severity=success/warning/danger` | `severity` | Свои фон, рамка, цвет иконки и акцентная линия |
| `timer=true` | `showTimer` | Автоскрытие через 3 с, `onClose` срабатывает и при таймере, и при закрытии |
| `show-close=true` | `showClose` | Кнопка 32×32, радиус 10, иконка `ti-x` 16 px |
| `show-caption=true` | `caption` | Подпись 14/18 `fonts.lineHeight.300` |
| `change-icon-*` | `icon` | Своя иконка tabler; `icon=""` скрывает, `undefined` — стандартная по severity |
| `show-footer=true` | слот `extraMessageTemplate="footer"` | Строка действий под текстом |

Базовые значения: корпус радиус 14, рамка 1 px, контент паддинг 14 и gap 14, иконка 36, акцентная линия 4,
заголовок 16/20/700 (до синхронизации line-height был 16), подпись 14/18 (была 14/16).

## Отличия и ограничения

- Размерная лестница `size` (small/base/large/xlarge) и `fluid` — расширения кита: в Figma размера нет.
- Токены `colorScheme.*.outlined.*` и `extend.width` в наборе не используются (variables для outlined-варианта);
  в CSS они не применяются, гейт помечает их WARN — это осознанно оставленный резерв дизайна.
- Тёмная тема задаёт цвет заголовка `color.fg.inverse.default` (#2b2e33) на тёмном фоне — так в макете.
- `role`/aria уведомления — от PrimeNG Message, отдельного API не добавляли.

Исходные примеры сохранены, декоративные подложки `bg-surface-ground` сняты. Описания stories и Controls
скопированы из `origin/main` дословно; Success/Warning/Danger добавлены без описаний.
