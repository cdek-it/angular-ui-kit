# Иконки (Icons)

Справочник иконок для компонентов `@cdek-it/angular-ui-kit`. Используется библиотека **PrimeIcons** (часть PrimeNG).

## Использование

Иконки передаются в компоненты как строка в формате `'pi pi-<name>'`:

```typescript
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

// Использование в шаблоне
<extra-button icon="pi pi-check" label="Сохранить"></extra-button>
<extra-button icon="pi pi-trash" label="Удалить"></extra-button>
```

Цвет иконки наследуется от `currentColor` текущего контекста.

## Часто используемые иконки (Common icons)

| Figma слой | Код | Пример использования |
|-----------|------|-------------------|
| check | `'pi pi-check'` | `<extra-button icon="pi pi-check"></extra-button>` |
| times | `'pi pi-times'` | `<extra-button icon="pi pi-times"></extra-button>` |
| search | `'pi pi-search'` | `<extra-input-text icon="pi pi-search"></extra-input-text>` |
| trash | `'pi pi-trash'` | `<extra-button icon="pi pi-trash" severity="danger"></extra-button>` |
| arrow-left | `'pi pi-arrow-left'` | `<extra-button icon="pi pi-arrow-left"></extra-button>` |
| arrow-right | `'pi pi-arrow-right'` | `<extra-button icon="pi pi-arrow-right"></extra-button>` |
| chevron-down | `'pi pi-chevron-down'` | `<extra-button icon="pi pi-chevron-down"></extra-button>` |
| chevron-up | `'pi pi-chevron-up'` | `<extra-button icon="pi pi-chevron-up"></extra-button>` |
| star | `'pi pi-star'` | `<extra-button icon="pi pi-star"></extra-button>` |
| heart | `'pi pi-heart'` | `<extra-button icon="pi pi-heart"></extra-button>` |
| bell | `'pi pi-bell'` | `<extra-button icon="pi pi-bell"></extra-button>` |
| calendar | `'pi pi-calendar'` | `<extra-button icon="pi pi-calendar"></extra-button>` |
| clock | `'pi pi-clock'` | `<extra-button icon="pi pi-clock"></extra-button>` |
| cog | `'pi pi-cog'` | `<extra-button icon="pi pi-cog"></extra-button>` |
| user | `'pi pi-user'` | `<extra-button icon="pi pi-user"></extra-button>` |
| home | `'pi pi-home'` | `<extra-button icon="pi pi-home"></extra-button>` |
| info | `'pi pi-info'` | `<extra-button icon="pi pi-info" severity="info"></extra-button>` |
| exclamation-triangle | `'pi pi-exclamation-triangle'` | `<extra-button icon="pi pi-exclamation-triangle" severity="warning"></extra-button>` |
| question | `'pi pi-question'` | `<extra-button icon="pi pi-question"></extra-button>` |
| lock | `'pi pi-lock'` | `<extra-button icon="pi pi-lock"></extra-button>` |
| unlock | `'pi pi-unlock'` | `<extra-button icon="pi pi-unlock"></extra-button>` |
| download | `'pi pi-download'` | `<extra-button icon="pi pi-download"></extra-button>` |
| upload | `'pi pi-upload'` | `<extra-button icon="pi pi-upload"></extra-button>` |

## Все иконки PrimeIcons

Полный список иконок доступен на [primeng.org/icons](https://primeng.org/icons). Формат для использования: `'pi pi-<name>'`, где `<name>` — название иконки в kebab-case (например, `exclamation-triangle`, `arrow-left`).

## Примечания

- Иконки из PrimeIcons подключены автоматически через PrimeNG.
- Цвет контролируется через CSS или атрибут `severity` компонента.
- При необходимости новых иконок (не найденных в PrimeIcons) обратитесь к [`missing.md`](#missing.md).
