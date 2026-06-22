# Схема файлов Figma Code Connect

Этот документ описывает структуру и формат файлов Code Connect для компонентов `@cdek-it/angular-ui-kit`.

## Формат файла

Файлы Code Connect имеют расширение `.figma.md` и состоят из двух частей:
1. **Frontmatter** (YAML) — метаданные компонента
2. **Тело** (Markdown) — описание и примеры

### Пример структуры

```markdown
---
component: ExtraButton
selector: extra-button
import:
  symbol: ExtraButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'abc123def456'
  nodeId: '1:42'
  componentKey: 'Button_primary'
  name: 'Button / Primary'
status: stable
updated: '2026-06-22'
deprecated:
  replaceWith: ExtraButtonV2
  since: '2.0.0'
  reason: 'Migrated to Material Design v2'
---

## Overview
...
```

## Обязательные поля Frontmatter

### Основная информация компонента

- **`component`** (строка)
  - Название компонента на TypeScript (UpperCamelCase)
  - Пример: `ExtraButton`, `ExtraInputText`, `ExtraDialog`

- **`selector`** (строка)
  - CSS-селектор для использования в шаблонах (kebab-case)
  - Пример: `extra-button`, `extra-input-text`, `extra-dialog`

### Информация об импорте

- **`import.symbol`** (строка)
  - Экспортируемый символ из пакета
  - Пример: `ExtraButtonComponent`, `ExtraInputTextComponent`

- **`import.from`** (строка)
  - Путь до импорта в пакете `@cdek-it/angular-ui-kit`
  - Обычно: `@cdek-it/angular-ui-kit`

### Информация о Figma

- **`figma.fileKey`** (строка)
  - Уникальный идентификатор Figma-файла из URL
  - Пример: `abc123def456` (из `figma.com/file/abc123def456/...`)

- **`figma.nodeId`** (строка)
  - Уникальный идентификатор узла компонента в Figma
  - Пример: `1:42`, `123:456`

- **`figma.componentKey`** (строка)
  - Ключ компонента в Figma (для библиотек)
  - Пример: `Button_primary`, `InputText_default`

- **`figma.name`** (строка)
  - Отображаемое имя компонента в Figma
  - Пример: `Button / Primary`, `Input Text / Default`

### Статус и дата

- **`status`** (строка, перечисление)
  - Статус компонента: `stable`, `beta`, `deprecated`, `draft`
  - Определяет, используется ли компонент в продакшене

- **`updated`** (строка, ISO 8601 дата)
  - Дата последнего обновления в формате `YYYY-MM-DD`
  - Пример: `2026-06-22`

## Опциональные поля Frontmatter

### Информация об устаревании

- **`deprecated.replaceWith`** (строка)
  - Название компонента, который использовать вместо текущего
  - Используется только если `status: deprecated`

- **`deprecated.since`** (строка, семантическое версионирование)
  - Версия, с которой компонент отмечен как deprecated
  - Пример: `2.0.0`

- **`deprecated.reason`** (строка)
  - Описание причины устаревания
  - Пример: `Migrated to Material Design v2`

## Структура тела файла

Тело должно содержать следующие секции в **строгом порядке**:

### 1. `## Overview`
Краткое описание компонента и его предназначения. Обычно 1-3 абзаца.

Пример:
```markdown
## Overview

ExtraButton — универсальный компонент кнопки для выполнения действий. 
Поддерживает различные варианты оформления, размеры и состояния.
```

### 2. `## Props mapping`
Таблица или описание входных свойств компонента (Input properties).

Пример:
```markdown
## Props mapping

| Свойство | Тип | Описание |
|----------|-----|---------|
| `label` | `string` | Текст кнопки |
| `disabled` | `boolean` | Отключить кнопку |
```

### 3. `## Variants`
Описание доступных вариантов компонента (primary, secondary, size variations и т.д.).

Пример:
```markdown
## Variants

- **Primary** — основная кнопка для главного действия
- **Secondary** — вторичная кнопка для дополнительных действий
- **Ghost** — невидимая кнопка только с текстом
```

### 4. `## Slots`
Описание именованных slot'ов для проектирования содержимого (если компонент их имеет).

Пример:
```markdown
## Slots

- **`default`** — основное содержимое кнопки (текст или иконка)
```

Если компонент не использует слоты, напишите:
```markdown
## Slots

Не используются.
```

### 5. `## Related`
Ссылки на связанные компоненты, документацию или стандарты.

Пример:
```markdown
## Related

- [ButtonGroup](./button-group.figma.md) — группировка кнопок
- [Icon](./icon.figma.md) — иконки
- [Conventions](./conventions.md) — соглашения кодирования
```

### 6. `## Do / Don't`
Рекомендации и антипаттерны использования компонента.

Пример:
```markdown
## Do / Don't

**Do:**
- Используйте для основных действий на странице
- Выравнивайте кнопки по левому краю контейнера

**Don't:**
- Не комбинируйте текст и иконку без пространства
- Не размещайте более 2 primary-кнопок рядом
```

## Правила форматирования

### Code-fences
**Все примеры кода должны быть в отдельных блоках с явным указанием языка.**

```typescript
// Правильно: язык явно указан
@Component({
  selector: 'extra-button',
  template: '<button>Click</button>',
})
export class ExtraButtonComponent {}
```

```html
<!-- Правильно: язык явно указан -->
<extra-button label="Submit" [disabled]="isLoading"></extra-button>
```

**Запрещено:**
- Code-fences без языка (без спецификации после обратных кавычек)
- Inline-значения токенов прямо в примерах (используйте ссылки на `tokens.md`)
- Inline-иконки в примерах (используйте ссылки на `icons.md`)

### Ссылки на глобальные документы

При ссылке на вспомогательные документы используйте относительные пути:

```markdown
- [Список токенов](./tokens.md)
- [Доступные иконки](./icons.md)
- [Соглашения](./conventions.md)
- [Отсутствующие компоненты](./missing.md)
```

### Языки кода

Используйте следующие языки для code-fences:

- **typescript** или **ts** — TypeScript и JavaScript
- **html** — HTML шаблоны
- **css** — Стили CSS
- **json** — JSON данные
- **yaml** — YAML конфигурация
- **bash** или **shell** — Bash/Shell команды

## Порядок проверки валидатором

Валидатор (`npm run validate:figma-cc`) проверяет в следующем порядке:

1. Наличие frontmatter (YAML между `---...---`)
2. Корректность YAML синтаксиса
3. Наличие всех обязательных полей frontmatter
4. Наличие всех обязательных полей внутри `figma`
5. Порядок секций в теле файла
6. Наличие языка у всех code-fences

Если какая-то проверка не пройдена, валидатор выведет ошибку и завершится с кодом 1.

## Примеры полных файлов

### Минимальный компонент (без deprecated)

```markdown
---
component: ExtraTag
selector: extra-tag
import:
  symbol: ExtraTagComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'xyz789'
  nodeId: '2:100'
  componentKey: 'Tag_default'
  name: 'Tag / Default'
status: stable
updated: '2026-06-22'
---

## Overview
ExtraTag — компонент для отображения меток.

## Props mapping
| Свойство | Тип | Описание |
|----------|-----|---------|
| `value` | `string` | Текст метки |

## Variants
- **Default** — стандартная метка

## Slots
Не используются.

## Related
- [Conventions](./conventions.md)

## Do / Don't
**Do:**
- Используйте для категоризации контента
```

## Файлы, подлежащие валидации

Валидатор сканирует только файлы по паттерну `src/lib/**/*.figma.md` и проверяет только их.

Глобальные документы (schema.md, README.md, conventions.md, tokens.md, icons.md, missing.md) 
**НЕ проверяются** валидатором и служат справочной информацией для разработчиков и агентов.
