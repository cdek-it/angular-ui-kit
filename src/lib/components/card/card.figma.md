---
component: ExtraCard
selector: extra-card
import:
  symbol: ExtraCardComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'Q1BWgZ7zoV5UzlBOnjW0cM'
  nodeId: '0:0'
  name: '<Card>'
status: stable
updated: '2026-11-17'
---

# Card

Live Figma UI Kit DS v3.0: набор `Card` — заголовок, подзаголовок, header-слот, контент, footer-слот, overlay.

| Figma | API | Геометрия |
|---|---|---|
| заголовок / подзаголовок | `title`, `subtitle` | Типографика и отступы из токенов `card.*` |
| header | слот `extraCardTemplate="header"` | Произвольный контент над телом |
| контент | проекция | Тело карточки |
| footer | слот `extraCardTemplate="footer"` | Действия под телом |
| `overlay` | `overlay` | Режим наложения |

## Ограничения

- Токены кита уже совпадали с Figma — правок не потребовалось (проверено `check-figma-values`, 0 расхождений).
- Слоты задаются директивами `extraCardTemplate`; в Figma это части компонента.

Описания story и Controls скопированы из `origin/main` дословно.
