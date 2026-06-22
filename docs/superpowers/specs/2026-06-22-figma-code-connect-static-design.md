# Статический Figma Code Connect — дизайн

**Дата:** 2026-06-22
**Проект:** `@cdek-it/angular-ui-kit` (Angular 20 + PrimeNG)
**Тип:** design spec
**Статус:** утверждён к реализации

## 1. Постановка задачи

Реализовать статический (file-based) аналог Figma Code Connect для Angular UI Kit.
Цель — предоставить LLM-агенту тот же контекст связки «Figma-компонент ↔ кодовый компонент»,
который даёт оригинальный Figma Code Connect, но без рантайма Figma CLI и без TypeScript-DSL.

**Потребитель:** LLM/Claude при генерации Angular-кода (страниц, виджетов) по Figma-дизайну.
**Триггер:** агент получает Figma `nodeId` / `componentKey` из MCP и ищет соответствующий файл контекста.
**Не-цели:**
- Не заменяет Storybook (это не интерактивная песочница).
- Не описывает приватные компоненты.
- Не отражает runtime-логику (animations, CDK overlay) — только props/template-API.

## 2. Архитектура файлов

### Расположение
Колокация рядом с компонентом:

```
src/lib/components/<name>/<name>.figma.md
```

Один кодовый компонент → один `.figma.md`. Варианты компонента (`primary`, `secondary`,
`outlined` и т.д.) — секциями внутри файла, отдельных файлов под варианты нет.

### Глобальные артефакты
```
src/lib/figma-code-connect/
  README.md          # точка входа: что это, как использовать
  schema.md          # единственный источник правды о формате
  conventions.md     # общие соглашения проекта (префиксы, naming)
  tokens.md          # маппинг Figma variables → CSS-переменные / Tailwind
  icons.md           # icon-set: имена в Figma → имена в коде
  missing.md         # backlog: Figma-компоненты без реализации в коде
```

Индивидуальные `.figma.md` ссылаются на глобалы через относительные ссылки
(`[token](../../figma-code-connect/tokens.md#color-primary)`). Значения не дублируются.

## 3. Структура файла `<name>.figma.md`

### Frontmatter (YAML)

Обязательные поля:
```yaml
---
component: extra-button                  # имя Angular-компонента (обратный поиск)
selector: extra-button                   # Angular-селектор
import:
  symbol: ExtraButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: <figma-file-key>                # per-component; берётся из Figma MCP для каждого компонента; может различаться при использовании linked libraries
  nodeId: '123:456'                      # ID родительского componentSet (или массив)
  componentKey: <stable-component-key>
  name: 'Button'                         # имя в Figma (для отладки)
status: stable | beta | deprecated | orphan-code
updated: 2026-06-22
---
```

Опциональные поля:
```yaml
deprecated:
  replaceWith: extra-other
  since: 2026-03-01
  reason: 'Заменён на extra-other из-за изменения a11y-контракта'
```

Если `nodeId` — массив, в `Overview` обязана быть заметка о правилах выбора.

### Тело — фиксированный порядок секций

1. `## Overview` — 1–2 предложения о назначении, когда брать именно этот компонент.
2. `## Props mapping` — таблица `Figma property | Angular @Input | Type / values | Notes`.
3. `## Variants` — для каждого варианта `### <name>` + строка `Figma nodeId: \`<id>\`` + code-fence `html` со сниппетом.
4. `## Slots` — описание `ng-content` / структурных директив; «Нет.» если отсутствуют.
5. `## Related` — ссылки на смежные `.figma.md`; «Нет.» если отсутствуют.
6. `## Do / Don't` — список `✅`/`❌`, ≤ 5 пунктов.

### Правила тела
- Жёсткий порядок секций (для детерминированного парсинга).
- Все code-fence обязаны иметь язык (`html`, `ts`, `scss`).
- Свободного текста между секциями нет — только содержимое самих секций.
- Никаких inline-значений токенов или цветов — только ссылки на `tokens.md`.

## 4. Поиск по `nodeId` (lookup)

**MVP-стратегия:** без индекс-файла.

```
grep -rl "nodeId: '123:456'" src/lib/components --include='*.figma.md'
```

Работает потому что:
- `.figma.md` ≤ количества компонентов (~40);
- frontmatter содержит `nodeId` родителя, секции `## Variants` — `nodeId` каждого варианта;
- grep по проекту такого размера < 100 мс.

**Обратный lookup (по имени компонента):** соглашение пути
`src/lib/components/<kebab-name>/<kebab-name>.figma.md` — агент строит путь напрямую.

**Когда добавим индекс:** при превышении ~200 компонентов или времени grep > 500 мс.
До тех пор — YAGNI.

## 5. Источники данных и процесс генерации

### Источники (в порядке приоритета при конфликте)

1. **Figma MCP** — `componentKey`, `nodeId`, variants, Figma property panel.
2. **`src/lib/components/<name>/<name>.component.ts`** — селектор, `@Input`/`@Output`,
   типы (`ExtraButtonVariant = 'primary' | …`), дефолты.
3. **`src/stories/components/<name>/*.stories.ts`** — канонические сниппеты для `## Variants`.
4. **`public_api.ts`** — реальный import symbol и публичный путь.

### Разрешение конфликтов
- Тип в коде ≠ variant в Figma → побеждает код. Заметка в `## Do / Don't`.
- Селектор не совпадает с шаблоном `extra-*` → фиксируется как есть, `status: beta`.

### Генерация одного файла
1. Прочитать `<name>.component.ts` → props, типы, селектор.
2. Прочитать `public_api.ts` → import symbol.
3. Figma MCP по имени → `nodeId`, `componentKey`, variants.
4. Прочитать stories в `src/stories/components/<name>/` (если есть) → канонические сниппеты.
5. Скомпоновать `.figma.md` строго по schema.
6. Self-check: все обязательные поля frontmatter заполнены, все Figma-variants
   представлены секциями `## Variants`.

### Обновление существующего файла
- Триггер: изменение `<name>.component.ts` или соответствующих stories.
- Регенерация по тому же процессу, но `figma.fileKey/nodeId/componentKey` берутся
  из старого frontmatter (Figma-ID стабильнее имени).
- Поле `updated:` обновляется на текущую дату.

## 6. Edge cases

| Случай | Поведение |
|--------|-----------|
| Компонент в коде, нет в Figma | Файл создаётся, `figma.nodeId = null`, `status: orphan-code`. Агент не предлагает первым при генерации. |
| Компонент в Figma, нет в коде | Файл НЕ создаётся. Запись в `figma-code-connect/missing.md`. |
| Variant в Figma не покрыт типом в коде | Блок `### …` создаётся, в code-fence `<!-- not implemented -->` + сниппет ближайшего поддерживаемого. Запись в `## Do / Don't`. |
| Несколько Figma-компонентов → один кодовый | `figma.nodeId` — массив, в `## Overview` правила выбора. |
| Deprecated | `status: deprecated` + поле `deprecated: { replaceWith, since, reason }`. Агент только распознаёт, не предлагает. |
| Composition (dialog→button) | В `## Related` — ссылка, в `## Variants` — пример композиции. Детали зависимого компонента не дублируются. |
| Токены/иконки | Только ссылки на `tokens.md` / `icons.md`. Inline-значений нет. |

## 7. Red lines

- Не описывать приватные компоненты (которых нет в `public_api.ts`).
- Не отражать runtime-логику (анимации, CDK overlay, router-выборы).
- Не дублировать Storybook — это контракт, а не песочница.
- Не инлайнить значения токенов/иконок — только ссылки на глобалы.
- Не создавать отдельные файлы под варианты компонента.

## 8. Что нужно от пользователя

**Обязательно:**
- URL Figma-файла UI Kit (для MCP).
- Подтверждение прав на запись в `src/lib/`.
- Решение по MVP-объёму: пилот на 3–5 компонентов или сразу все ~40.

**Желательно:**
- Существующий `figma.config.json` / Code Connect TS-файлы (если есть) — для переиспользования nodeId.
- Канонические Storybook stories (`src/stories/`) как источник сниппетов.
- Внутренние соглашения по a11y и именованию иконок.

## 9. Критерии приёмки (MVP)

1. Создан каркас `src/lib/figma-code-connect/` со всеми пятью глобальными файлами.
2. Сгенерированы `.figma.md` для пилотных компонентов (`button`, `inputtext`, `dialog`).
3. Каждый пилотный файл проходит self-check по `schema.md`.
4. Lookup по `nodeId` через grep возвращает корректный файл.
5. Агент по `.figma.md` пилотного компонента генерирует валидный Angular-код,
   соответствующий контракту в коде (props, типы, селектор).
