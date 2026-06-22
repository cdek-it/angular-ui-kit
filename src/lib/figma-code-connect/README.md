# Figma Code Connect — Статические файлы описания компонентов

Эта директория содержит статические файлы документации для интеграции Figma с исходным кодом компонентов `@cdek-it/angular-ui-kit`.

## Структура директории

```
src/lib/figma-code-connect/
├── README.md                   # Этот файл
├── schema.md                   # Полная спецификация формата .figma.md
├── conventions.md              # Соглашения и best practices (Task 3)
├── tokens.md                   # Дизайн токены (Task 4)
├── icons.md                    # Доступные иконки (Task 4)
├── missing.md                  # Список компонентов без Code Connect (Task 4)
├── button/
│   └── button.figma.md         # Документация Button (Task 5)
├── input-text/
│   └── input-text.figma.md     # Документация InputText (Task 6)
└── dialog/
    └── dialog.figma.md         # Документация Dialog (Task 7)
```

## Описание

**Figma Code Connect** — это практика связывания компонентов Figma с их реализацией в исходном коде. 
Статические файлы (`.figma.md`) содержат метаданные о компонентах, которые позволяют:

- Агентам находить реальную реализацию компонента по его nodeId из Figma
- Разработчикам быстро переходить между дизайном и кодом
- Поддерживать актуальность синхронизации между Figma и исходным кодом

## Как использовать этот формат

### Для разработчиков

1. **Читайте** [`schema.md`](./schema.md) для понимания структуры файлов
2. **Смотрите примеры** в директориях компонентов (`button/`, `input-text/`, `dialog/`)
3. **Следуйте соглашениям** из [`conventions.md`](./conventions.md)
4. **Валидируйте** свои файлы перед коммитом:
   ```bash
   npm run validate:figma-cc
   ```

### Для агентов и интеграций

Агент (например, при автоматическом синхронизировании дизайна) может использовать эти файлы следующим образом:

1. **Получить nodeId из Figma**
   ```
   figma.fileKey = abc123def456
   figma.nodeId = 1:42
   ```

2. **Найти соответствующий .figma.md файл**
   ```bash
   grep -r "nodeId.*1:42" src/lib/**/*.figma.md
   # Результат: src/lib/button/button.figma.md
   ```

3. **Извлечь метаданные из frontmatter**
   ```yaml
   component: ExtraButton
   selector: extra-button
   import:
     symbol: ExtraButtonComponent
     from: '@cdek-it/angular-ui-kit'
   ```

4. **Использовать данные для синхронизации**
   - Обновить тип компонента в коде
   - Добавить новое свойство или slot
   - Обновить документацию

## Справочные документы

| Документ | Описание |
|----------|---------|
| [`schema.md`](./schema.md) | Полная спецификация формата файлов, обязательные/опциональные поля, правила форматирования |
| [`conventions.md`](./conventions.md) | Соглашения по именованию, структуре компонентов, примеры best practices |
| [`tokens.md`](./tokens.md) | Список дизайн-токенов (цвета, типография, размеры, отступы) |
| [`icons.md`](./icons.md) | Доступные иконки и их имена |
| [`missing.md`](./missing.md) | Компоненты, которые есть в коде, но не документированы в Code Connect |

## Валидация

### Команда валидации

```bash
npm run validate:figma-cc
```

### Что проверяет валидатор?

Валидатор сканирует файлы по паттерну `src/lib/**/*.figma.md` и проверяет:

✓ Наличие и корректность YAML frontmatter  
✓ Обязательные поля: `component`, `selector`, `import.{symbol,from}`, `figma.{fileKey,nodeId,componentKey,name}`, `status`, `updated`  
✓ Правильный порядок секций (Overview → Props mapping → Variants → Slots → Related → Do/Don't)  
✓ Все code-fences содержат явный язык программирования  
✓ Опциональные поля (если present): `deprecated.{replaceWith,since,reason}`  

### Примеры ошибок

```bash
# ❌ Отсутствует frontmatter
src/lib/button/button.figma.md: missing frontmatter

# ❌ Отсутствует обязательное поле
src/lib/button/button.figma.md: missing field figma

# ❌ Нарушен порядок секций
src/lib/button/button.figma.md: section order violation near ## Related

# ❌ Code-fence без языка
src/lib/button/button.figma.md: code-fence without language
```

### Валидация отдельного файла

```bash
npm run validate:figma-cc src/lib/button/button.figma.md
```

## Примеры использования

### Пример 1: Найти компонент по nodeId

Дизайнер скопировал nodeId из Figma: `1:42`

```bash
grep -r "nodeId.*1:42" src/lib
# src/lib/button/button.figma.md: figma:
#   nodeId: '1:42'
```

Затем агент может прочитать `src/lib/button/button.figma.md` и получить полную информацию 
о компоненте (селектор, имя для импорта и т.д.).

### Пример 2: Отобразить все компоненты со статусом deprecated

```bash
grep -l "status: deprecated" src/lib/**/*.figma.md
```

### Пример 3: Обновить дату последнего обновления

```yaml
# Было
updated: '2026-06-15'

# Стало
updated: '2026-06-22'
```

## Создание нового компонента Code Connect

1. **Прочитайте** [`schema.md`](./schema.md) — полную спецификацию
2. **Создайте файл** `src/lib/<component>/<component>.figma.md`
3. **Добавьте frontmatter** со всеми обязательными полями
4. **Напишите секции** в правильном порядке
5. **Валидируйте**: `npm run validate:figma-cc`
6. **Коммитьте** с message: `feat(figma-cc): add <component>.figma.md`

Пример структуры:

```markdown
---
component: ExtraButton
selector: extra-button
import:
  symbol: ExtraButtonComponent
  from: '@cdek-it/angular-ui-kit'
figma:
  fileKey: 'abc123'
  nodeId: '1:42'
  componentKey: 'Button_primary'
  name: 'Button / Primary'
status: stable
updated: '2026-06-22'
---

## Overview
Описание компонента...

## Props mapping
Таблица свойств...

## Variants
Описание вариантов...

## Slots
Информация о slot'ах...

## Related
Связанные компоненты и документы...

## Do / Don't
Рекомендации...
```

## Важные замечания

- **Только статические файлы**: Этот формат не требует интеграции с Figma API (в отличие от других решений Code Connect)
- **Git-friendly**: Файлы хорошо работают с системой контроля версий (читаемые, небольшие)
- **Человеко-читаемые**: Легко редактировать в обычном текстовом редакторе
- **Безопасные**: Можно безопасно хранить в репозитории (нет секретов Figma)

## Контролеры и ответственность

- **Разработчики компонентов**: Создают и обновляют `.figma.md` файлы
- **Дизайнеры**: Получают информацию о реализации компонентов
- **Агенты/интеграции**: Используют метаданные для синхронизации дизайна и кода

## Дополнительные ресурсы

- [Figma Code Connect Official Documentation](https://www.figma.com/developers/api#code-connect)
- [@cdek-it/angular-ui-kit на npm](https://www.npmjs.com/package/@cdek-it/angular-ui-kit)
- [Angular Components](https://angular.io/guide/component-overview)
