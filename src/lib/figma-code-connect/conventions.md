# Соглашения Figma Code Connect

Этот документ описывает соглашения и best practices для написания файлов Code Connect (`.figma.md`) компонентов `@cdek-it/angular-ui-kit`.

## Naming (Именование)

### Селектор компонента (CSS)

Все селекторы должны начинаться с префикса `extra-` в формате kebab-case:

```html
<!-- ✓ Правильно -->
<extra-button></extra-button>
<extra-input-text></extra-input-text>
<extra-dialog></extra-dialog>

<!-- ✗ Неправильно -->
<button></button>
<cdek-button></cdek-button>
<Button></Button>
```

### Название класса компонента (TypeScript)

Все классы компонентов должны следовать паттерну `Extra<Name>Component` в формате PascalCase:

```typescript
// ✓ Правильно
export class ExtraButtonComponent {}
export class ExtraInputTextComponent {}
export class ExtraDialogComponent {}

// ✗ Неправильно
export class ButtonComponent {}
export class CdekButtonComponent {}
export class ExtraButton {}
```

### Путь импорта

Все импорты должны идти из пакета `@cdek-it/angular-ui-kit`:

```typescript
// ✓ Правильно
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
import { ExtraInputTextComponent, ExtraDialogComponent } from '@cdek-it/angular-ui-kit';

// ✗ Неправильно
import { ExtraButtonComponent } from './button/button.component';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit/button';
```

---

## Figma property → Angular @Input Mapping (Маппинг свойств)

Свойства компонентов в Figma должны маппироваться в Angular `@Input()` следующим образом:

### Строковые свойства (Variant, Size, Style)

Figma-свойства типа **Variant** маппируются в string-тип Angular inputs:

```html
<!-- Figma: Variant = Primary → Angular: variant="primary" -->
<extra-button variant="primary">Submit</extra-button>

<!-- Figma: Variant = Secondary → Angular: variant="secondary" -->
<extra-button variant="secondary">Cancel</extra-button>

<!-- Figma: Size = base → Angular: size="base" -->
<extra-input-text size="base"></extra-input-text>

<!-- Figma: Size = large → Angular: size="large" -->
<extra-input-text size="large"></extra-input-text>
```

**Правило:** Значения Figma-свойств преобразуются в lowercase и передаются как строки без кавычек в шаблоне TypeScript.

### Булевы свойства (State)

Figma-свойства типа **State** маппируются в boolean inputs с использованием property binding `[prop]="true|false"`:

```html
<!-- Figma: State = Disabled → Angular: [disabled]="true" -->
<extra-button [disabled]="true">Disabled Button</extra-button>

<!-- Figma: State = Disabled = false → Angular: [disabled]="false" -->
<extra-button [disabled]="false">Enabled Button</extra-button>

<!-- Figma: State = IsLoading → Angular: [isLoading]="true" -->
<extra-button [isLoading]="true">Loading...</extra-button>

<!-- Figma: State = IsReadOnly → Angular: [isReadOnly]="true" -->
<extra-input-text [isReadOnly]="true"></extra-input-text>
```

**Правило:** Булевы свойства всегда используют property binding `[prop]="true"` или `[prop]="false"`, никогда не передаются как атрибуты без квадратных скобок.

### Других типы свойств (Number, Text, Custom)

Для числовых и пользовательских свойств используйте property binding:

```html
<!-- Figma: Custom property maxLength = 50 → Angular: [maxLength]="50" -->
<extra-input-text [maxLength]="50"></extra-input-text>

<!-- Figma: Text property placeholder → Angular: placeholder="Enter text" -->
<extra-input-text placeholder="Enter text"></extra-input-text>

<!-- Figma: Number property tabIndex = 1 → Angular: [tabIndex]="1" -->
<extra-button [tabIndex]="1">First</extra-button>
```

---

## Two-way Binding (Двусторонняя привязка)

Компоненты, которые имеют изменяемое состояние, должны поддерживать двустороннюю привязку через `[()]` syntax:

### Видимость (visible)

```html
<!-- ✓ Двусторонняя привязка видимости -->
<extra-dialog [(visible)]="isDialogOpen">
  <p>Dialog content</p>
</extra-dialog>

<!-- В компоненте используется: -->
<!-- @Input() visible: boolean; -->
<!-- @Output() visibleChange = new EventEmitter<boolean>(); -->
```

### Модель (ngModel)

```html
<!-- ✓ Двусторонняя привязка значения (ngModel) -->
<extra-input-text [(ngModel)]="userInput" name="username"></extra-input-text>

<!-- Эквивалентно: -->
<extra-input-text [ngModel]="userInput" (ngModelChange)="userInput = $event"></extra-input-text>

<!-- В компоненте используется: -->
<!-- @Input() ngModel: any; -->
<!-- @Output() ngModelChange = new EventEmitter<any>(); -->
```

### Пользовательские свойства

```html
<!-- ✓ Двусторонняя привязка для пользовательских свойств -->
<extra-component [(selectedValue)]="myValue">
  <!-- content -->
</extra-component>

<!-- В компоненте используется: -->
<!-- @Input() selectedValue: any; -->
<!-- @Output() selectedValueChange = new EventEmitter<any>(); -->
```

**Правило:** Для двусторонней привязки компонент должен иметь пару:
- `@Input() propertyName`
- `@Output() propertyNameChange = new EventEmitter()`

---

## Slots / Content Projection (Слоты и проектирование содержимого)

### Структурные директивы (Structural Directives)

Для более сложного проектирования содержимого используйте структурные директивы:

```html
<!-- ✓ Структурная директива для заголовка -->
<extra-dialog>
  <div *extraDialogHeader>
    <h2>Dialog Title</h2>
  </div>
  <p>Dialog body content</p>
</extra-dialog>

<!-- ✓ Структурная директива для футера -->
<extra-dialog>
  <p>Dialog body content</p>
  <div *extraDialogFooter>
    <extra-button (click)="onCancel()">Cancel</extra-button>
    <extra-button variant="primary" (click)="onSubmit()">Submit</extra-button>
  </div>
</extra-dialog>
```

**Паттерн:** Структурные директивы следуют паттерну `*extra<ComponentName><SlotName>` (camelCase после компонента).

### ng-content (Безымянные слоты)

Для базового проектирования содержимого используйте `<ng-content>`:

```html
<!-- Figma component template (button.component.html) -->
<button>
  <ng-content></ng-content>
</button>

<!-- Usage -->
<extra-button>
  <span>Click me</span>
</extra-button>

<!-- Эквивалентно -->
<extra-button>Click me</extra-button>
```

### Несколько именованных слотов

```html
<!-- Figma component template (dialog.component.html) -->
<div class="dialog">
  <div class="dialog-header">
    <ng-content select="[dialogHeader]"></ng-content>
  </div>
  <div class="dialog-body">
    <ng-content></ng-content>
  </div>
  <div class="dialog-footer">
    <ng-content select="[dialogFooter]"></ng-content>
  </div>
</div>

<!-- Usage -->
<extra-dialog>
  <div dialogHeader>
    <h2>Title</h2>
  </div>
  <p>Body content</p>
  <div dialogFooter>
    <extra-button>Cancel</extra-button>
  </div>
</extra-dialog>
```

**Правило:** 
- Используйте структурные директивы (`*extra<Name>`) для более семантичного и удобного API
- Используйте `<ng-content>` для простого проектирования безымянного содержимого
- Используйте selector-based `ng-content` для типизированного проектирования нескольких слотов

---

## Red Lines (Красные линии — антипаттерны)

### ✗ Не описывайте приватные компоненты

Только компоненты, экспортированные в `public_api.ts` библиотеки, должны иметь `.figma.md` файлы:

```typescript
// ✓ Публичный компонент (экспортирован в public_api.ts)
export class ExtraButtonComponent {}

// ✗ Приватный компонент (НЕ пишите для него .figma.md)
class _ExtraButtonBaseComponent {} // недокументируется
```

### ✗ Не дублируйте Storybook

Файлы `.figma.md` — это метаданные для интеграции Figma, а не документация компонентов:

```markdown
<!-- ✓ В .figma.md: минимум, только для Figma интеграции -->
## Overview
ExtraButton — универсальная кнопка для выполнения действий.

<!-- ✗ В .figma.md: не копируйте Storybook -->
## Overview
ExtraButton — это компонент кнопки с поддержкой 15 вариантов, включая primary, secondary, 
danger, ghost, с размерами small, base, large, и состояниями disabled, loading, focus...
<!-- Это описание принадлежит Storybook/документации, а не Code Connect -->
```

### ✗ Не описывайте runtime-логику

`.figma.md` файлы описывают **структуру и маппинг**, а не implementation details:

```markdown
<!-- ✓ Правильно: что маппируется -->
## Props mapping
| Свойство | Тип | Описание |
| disabled | boolean | Отключить кнопку |

<!-- ✗ Неправильно: как реализовано -->
## Props mapping
| Свойство | Тип | Описание |
| disabled | boolean | Устанавливает атрибут disabled на native button element внутри компонента и запускает CD |
```

### ✗ Не инлайньте значения токенов

Используйте ссылки на `tokens.md` вместо копирования значений:

```markdown
<!-- ✓ Правильно: ссылка на tokens.md -->
## Variants
- **Primary** — использует токен `color-primary` [см. tokens.md](./tokens.md)

<!-- ✗ Неправильно: копирование значения -->
## Variants
- **Primary** — использует цвет #007AFF (primary blue)
```

### ✗ Не инлайньте названия иконок

Используйте ссылки на `icons.md` вместо копирования списков:

```markdown
<!-- ✓ Правильно: ссылка на icons.md -->
## Props mapping
| Свойство | Тип | Описание |
| icon | string | Имя иконки из доступного набора [см. icons.md](./icons.md) |

<!-- ✗ Неправильно: копирование списка -->
## Props mapping
| Свойство | Тип | Описание |
| icon | 'check' \| 'close' \| 'warning' \| 'info' \| 'success' | Иконка |
```

### ✗ Не создавайте отдельные файлы для вариантов

Все варианты одного компонента описываются в **одном** файле:

```
<!-- ✓ Правильно -->
src/lib/button/
├── button.figma.md          # все варианты Button
└── button.component.ts

<!-- ✗ Неправильно -->
src/lib/button/
├── button-primary.figma.md  # ❌ отдельный файл для варианта
├── button-secondary.figma.md # ❌ отдельный файл для варианта
├── button.component.ts
└── button.variant.ts
```

---

## Файлы для справки

- [`schema.md`](./schema.md) — Полная спецификация формата файлов
- [`tokens.md`](./tokens.md) — Список дизайн-токенов
- [`icons.md`](./icons.md) — Доступные иконки
- [`missing.md`](./missing.md) — Компоненты без Code Connect

## Дополнительные ресурсы

- [Figma Code Connect Official Documentation](https://www.figma.com/developers/api#code-connect)
- [Angular Template Syntax](https://angular.io/guide/template-syntax)
- [@cdek-it/angular-ui-kit Documentation](https://www.npmjs.com/package/@cdek-it/angular-ui-kit)
