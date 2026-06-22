# Токены дизайна (Design Tokens)

Справочник токенов Figma, используемых в `@cdek-it/angular-ui-kit`. Токены разбиты на категории: примитивные (primitive) и семантические (semantic).

## Цвета (Colors)

### Основные цвета (Solid colors)

Примитивные цвета из палитры доступны в 11 оттенках (50, 100, 200, ..., 900, 950):

| Цвет | Примеры оттенков | CSS переменная |
|------|-----------------|----------------|
| Зелёный (green) | #dcfce7, #bbf7d0, #86efac, #22c55e, #059669 | `--p-green-500` |
| Красный (red) | #fee2e2, #fca5a5, #f87171, #ef4444, #b91c1c | `--p-red-500` |
| Синий (blue) | #dbeafe, #93c5fd, #3b82f6, #1d4ed8, #1e40af | `--p-blue-500` |
| Жёлтый (yellow) | #fef3c7, #fde047, #facc15, #eab308, #ca8a04 | `--p-yellow-500` |
| Фиолетовый (purple) | #f3e8ff, #d8b4fe, #a855f7, #7e22ce, #6b21a8 | `--p-purple-500` |
| Цинк (zinc) | #f4f4f5, #d4d4d8, #71717a, #27272a, #09090b | `--p-zinc-500` |

Доступные цвета: amber, blue, cyan, emerald, fuchsia, gray, green, indigo, lime, neutral, orange, pink, purple, red, rose, sky, slate, stone, teal, violet, yellow, zinc.

### Семантические цвета (Semantic colors)

Привязаны к смыслу (фон, текст, бордер и т.д.):

#### color-background

| Название | Светлая тема | Тёмная тема | Использование |
|----------|--------------|------------|----------------|
| surface.ground | `#f4f4f5` | `#18181b` | Базовый фон |
| surface.section | `#ffffff` | `#27272a` | Фон секций, панелей |
| background.brand.bold | `#22c55e` (green-500) | `#16a34a` | Активные элементы, основные кнопки |
| background.success.bold | `#22c55e` (green-500) | `#16a34a` | Успех |
| background.danger.bold | `#ef4444` (red-500) | `#dc2626` | Ошибка, удаление |
| background.warning.bold | `#eab308` (yellow-500) | `#ca8a04` | Предупреждение |
| background.info.bold | `#3b82f6` (blue-500) | `#2563eb` | Информация |
| background.help.bold | `#a855f7` (purple-500) | `#9333ea` | Справка |

#### color-text

| Название | Светлая тема | Тёмная тема | Использование |
|----------|--------------|------------|----------------|
| text.default | `#18181b` (zinc-900) | `#fafafa` | Основной текст |
| text.subtle | `#52525b` (zinc-600) | `#a1a1aa` | Вторичный текст |
| text.muted | `#71717a` (zinc-500) | `#71717a` | Выключенный текст |
| text.disabled | `#d4d4d8` (zinc-300) | `#52525b` | Недоступный текст |
| text.onBold | `#ffffff` | `#ffffff` | Текст на ярких фонах |
| text.link | `#16a34a` (green-600) | `#22c55e` | Ссылки |

#### color-border

| Название | Светлая тема | Тёмная тема | Использование |
|----------|--------------|------------|----------------|
| border.default | `#e4e4e7` (zinc-200) | `#52525b` | Основной бордер |
| border.subtle | `#e4e4e7` (zinc-200) | `#3f3f46` | Мягкий бордер |
| border.muted | `#f4f4f5` (zinc-100) | `#3f3f46` | Едва заметный бордер |

#### color-icon

| Название | Светлая тема | Тёмная тема | Использование |
|----------|--------------|------------|----------------|
| icon.default | `#52525b` (zinc-600) | `#a1a1aa` | Основной цвет иконок |
| icon.subtle | `#71717a` (zinc-500) | `#71717a` | Вторичные иконки |
| icon.muted | `#d4d4d8` (zinc-300) | `#52525b` | Отключённые иконки |

## Интервалы (Spacing)

Используется 12-кратная система на основе `0.25rem` (4px):

| Токен | Значение | CSS переменная | Использование |
|-------|----------|----------------|----------------|
| `1x` | 0.25rem (4px) | `--p-spacing-1` | Минимальный отступ |
| `2x` | 0.5rem (8px) | `--p-spacing-2` | Маленький отступ |
| `3x` | 0.75rem (12px) | `--p-spacing-3` | Отступ между элементами |
| `4x` | 1rem (16px) | `--p-spacing-4` | Стандартный отступ |
| `6x` | 1.5rem (24px) | `--p-spacing-6` | Больший отступ |
| `8x` | 2rem (32px) | `--p-spacing-8` | Крупный отступ |
| `12x` | 3rem (48px) | `--p-spacing-12` | Очень крупный отступ |

Доступны значения: none, min, 2px, 1x–120x, pill, max.

## Скругления (Radius)

| Токен | Значение | CSS переменная | Использование |
|-------|----------|----------------|----------------|
| radius-none | 0rem | `--p-radius-0` | Прямые углы |
| radius-100 | 0.25rem (4px) | `--p-radius-100` | Небольшое скругление |
| radius-200 | 0.5rem (8px) | `--p-radius-200` | Стандартное скругление |
| radius-300 | 0.75rem (12px) | `--p-radius-300` | Умеренное скругление |
| radius-400 | 1rem (16px) | `--p-radius-400` | Выраженное скругление |
| radius-500 | 1.5rem (24px) | `--p-radius-500` | Большое скругление |
| radius-max | 71.357rem (pill) | `--p-radius-max` | Круглая кнопка, таблетка |

## Типография (Typography)

### Шрифты

| Категория | Семейство | Использование |
|-----------|-----------|----------------|
| font-heading | TT Fellows | Заголовки, крупный текст |
| font-base | PT Sans | Основной текст, интерфейс |

### Размеры шрифта

| Размер | Значение | CSS переменная | Использование |
|--------|----------|----------------|----------------|
| 100 | 0.75rem (12px) | `--p-font-size-100` | Caption, подпись |
| 200 | 0.875rem (14px) | `--p-font-size-200` | Label small |
| 300 | 1rem (16px) | `--p-font-size-300` | Body, label |
| 400 | 1.125rem (18px) | `--p-font-size-400` | Body large |
| 500 | 1.25rem (20px) | `--p-font-size-500` | Heading small |
| 600 | 1.5rem (24px) | `--p-font-size-600` | Heading medium |
| 700 | 2.25rem (36px) | `--p-font-size-700` | Heading large |
| 750 | 3rem (48px) | `--p-font-size-750` | Heading extra-large |

### Полужирность (Font weights)

| Вес | Значение | CSS переменная | Использование |
|-----|----------|----------------|----------------|
| font-weight-regular | 400 | `--p-font-weight-regular` | Основной текст |
| font-weight-medium | 500 | `--p-font-weight-medium` | Label, emphasis |
| font-weight-demibold | 600 | `--p-font-weight-demibold` | Подзаголовки, heading |
| font-weight-bold | 700 | `--p-font-weight-bold` | Заголовки, выделение |

### Высота строки (Line height)

| Токен | Значение | Использование |
|-------|----------|----------------|
| line-height-250 | 1rem | Caption, маленький текст |
| line-height-300 | 1.0714rem | Label small |
| line-height-400 | 1.2857rem | Label, body small |
| line-height-500 | 1.5rem | Body, основной текст |
| line-height-550 | 1.5714rem | Body large |
| line-height-600 | 1.7143rem | Heading small |
| line-height-700 | 1.8571rem | Heading medium |
| line-height-900 | 2.7857rem | Heading large |
| line-height-auto | auto | Автоматическая высота |

## Тени (Shadows)

| Уровень | CSS переменная | Использование |
|---------|----------------|----------------|
| shadow-none | `--p-shadow-none` | Без тени |
| shadow-100 | `--p-shadow-100` | Лёгкая тень (hover) |
| shadow-200 | `--p-shadow-200` | Мягкая тень |
| shadow-300 | `--p-shadow-300` | Средняя тень |
| shadow-400 | `--p-shadow-400` | Глубокая тень |
| shadow-500 | `--p-shadow-500` | Очень глубокая тень (модальные окна) |

## Прозрачность (Opacity)

Доступны уровни прозрачности для белого и чёрного с шагом 10% (от 0.1 до 1.0).

## Примечания

- Все токены привязаны к переменным Figma и синхронизируются с `src/lib/providers/prime-preset/tokens/tokens.json`.
- Для Tailwind используются CSS переменные через `theme.extend.colors`.
- При отсутствии значения в коде обратитесь к [`missing.md`](#missing.md).
