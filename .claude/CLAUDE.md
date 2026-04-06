# CLAUDE.md — Angular UI Kit (@cdek-it/angular-ui-kit)

Инструкции для Claude Code по генерации компонентов, обёрток и сторисов.

---

## Стек и версии

| Технология     | Версия  |
|----------------|---------|
| Angular        | 20      |
| PrimeNG        | 20      |
| Storybook      | 10      |
| Tailwind CSS   | 3       |
| TypeScript     | 5       |

---

## Структура проекта

```
src/
├── lib/
│   └── components/
│       └── {name}/
│           └── {name}.component.ts        ← компонент-обёртка
├── stories/
│   └── components/
│       └── {name}/
│           ├── {name}.stories.ts          ← сторисы
│           └── examples/                  ← примеры для сторисов
├── prime-preset/
│   └── tokens/
│       └── components/
│           └── {name}.ts                  ← CSS-токены компонента
└── styles.scss                            ← Tailwind + иконки + шрифты
```

---

## Паттерн компонента-обёртки

Каждый компонент — standalone Angular-компонент, оборачивающий PrimeNG.

### Правила

1. Файл: `src/lib/components/{name}/{name}.component.ts`
2. `selector` — с приставкой `extra-` + имя компонента строчными буквами (например `selector: 'extra-button'`)
3. Импортировать PrimeNG-компонент и указать его в `imports: []`
4. Для каждого типа Input создавать отдельный `type`-алиас
5. Все `@Input()` отражают **свой** API обёртки, не PrimeNG напрямую
6. Computed-геттеры маппят API обёртки → PrimeNG API
7. Шаблон компонента использует только геттеры, не сырые инпуты

### Эталон — ButtonComponent

```typescript
import { Component, Input } from '@angular/core';
import { Button, ButtonSeverity as PrimeButtonSeverity } from 'primeng/button';

// Типы — отдельные алиасы, не inline union
export type ButtonVariant  = 'primary' | 'secondary' | 'outlined' | 'text' | 'link';
export type ButtonSeverity = 'success' | 'warning' | 'danger' | 'info' | null;
export type ButtonSize     = 'small' | 'base' | 'large' | 'xlarge';
export type ButtonIconPos  = 'prefix' | 'postfix' | null;
export type BadgeSeverity  = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null;

@Component({
  selector: 'extra-button',
  standalone: true,
  imports: [Button],
  template: `
    <p-button
      [label]="iconOnly ? '' : label"
      [disabled]="disabled"
      [loading]="loading"
      [size]="primeSize"
      [styleClass]="size === 'xlarge' ? 'p-button-xlg' : ''"
      [rounded]="rounded"
      [outlined]="variant === 'outlined'"
      [text]="variant === 'text' || text"
      [link]="variant === 'link'"
      [icon]="icon"
      [iconPos]="primeIconPos"
      [severity]="primeSeverity"
      [badge]="showBadge ? badge || ' ' : undefined"
      [badgeSeverity]="primeBadgeSeverity"
      [fluid]="fluid"
      [ariaLabel]="ariaLabel"
      [autofocus]="autofocus"
      [tabindex]="tabindex"
    ></p-button>
  `
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() severity: ButtonSeverity = null;
  @Input() size: ButtonSize = 'base';
  @Input() rounded = false;
  @Input() iconPos: ButtonIconPos = null;
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() badge = '';
  @Input() badgeSeverity: BadgeSeverity = null;
  @Input() showBadge = false;
  @Input() fluid = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() autofocus = false;
  @Input() tabindex: number | undefined = undefined;
  @Input() text = false;

  // Геттеры — маппинг в PrimeNG API
  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeIconPos(): 'left' | 'right' {
    return this.iconPos === 'postfix' ? 'right' : 'left';
  }

  get primeSeverity(): PrimeButtonSeverity | null {
    if (this.variant === 'secondary') return 'secondary';
    if (this.severity === 'warning') return 'warn';
    return this.severity;
  }

  get primeBadgeSeverity() {
    if (this.badgeSeverity === 'warning') return 'warn';
    return this.badgeSeverity;
  }
}
```

---

## Паттерн сторисов

### Файл: `src/stories/components/{name}/{name}.stories.ts`

**Все тексты описаний — на русском языке.**

### Полный шаблон сториса

```typescript
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { XxxComponent } from '../../../lib/components/xxx/xxx.component';

// Расширяем тип для Events, которых нет в @Output()
type XxxArgs = XxxComponent & { onClick?: (event: MouseEvent) => void };

const meta: Meta<XxxArgs> = {
  title: 'Prime/Xxx',
  component: XxxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [XxxComponent] })
  ],
  parameters: {
    docs: {
      description: {
        // 1. Одна строка — для чего компонент
        // 2. Ссылка на Figma
        // 3. Блок импорта
        component: `Описание компонента. [Figma Design](https://www.figma.com/design/...).

\`\`\`typescript
import { XxxModule } from 'primeng/xxx';
\`\`\``,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    propName: {
      control: 'text' | 'boolean' | 'select' | 'number',
      options: [...],             // только для select
      description: 'Описание на русском',
      table: {
        category: 'Props',
        defaultValue: { summary: 'значение' },
        type: { summary: "'тип1' | 'тип2'" },
      },
    },
    // ── Badge ────────────────────────────────────────────────
    badge: {
      // ... category: 'Badge'
    },
    // ── Events ───────────────────────────────────────────────
    onClick: {
      control: false,
      description: 'Событие клика',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<MouseEvent>' },
      },
    },
  },
  args: {
    // Дефолты для полей, которые нужно явно инициализировать
  },
};

// commonTemplate — для сторисов-вариаций (НЕ для Default)
const commonTemplate = `
<xxx
  [prop1]="prop1"
  [prop2]="prop2"
  ...
></xxx>
`;

export default meta;
type Story = StoryObj<XxxArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
// Динамический render: template генерируется из текущих args.
// Storybook Angular захватывает template как source code →
// при смене controls сниппет обновляется автоматически.

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label)    parts.push(`label="${args.label}"`);
    if (args.variant)  parts.push(`variant="${args.variant}"`);
    if (args.severity) parts.push(`severity="${args.severity}"`);
    // ... остальные пропсы
    if (args.rounded)  parts.push(`[rounded]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);

    const template = parts.length
      ? `<xxx\n  ${parts.join('\n  ')}\n></xxx>`
      : `<xxx></xxx>`;

    return { props: args, template };
  },
  args: { label: 'Label' },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Сторисы-вариации ─────────────────────────────────────────────────────────
// Каждая сторис — ОДИН вариант компонента.
// Используют commonTemplate + props: args → controls работают.
// source.code — статичный минимальный пример.

export const Sizes: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'Button', size: 'large' },
  parameters: {
    docs: {
      description: { story: 'Описание вариации.' },
      source: {
        code: `<xxx size="large" label="Button"></xxx>`,
      },
    },
  },
};
```

---

## Структура сторисов — обязательные разделы

| Порядок | Сторис      | Описание                                                              |
|---------|-------------|-----------------------------------------------------------------------|
| 1       | **Default** | Интерактивный playground. Динамический render. Все пропсы в Controls. |
| 2+      | Вариации    | По одному варианту: Sizes, Icons, Rounded, Loading, Disabled, и т.д.  |

### Обязательные вариации для большинства компонентов
- `Sizes` — все доступные размеры
- `Icons` — с иконкой (если есть iconPos)
- `Loading` — состояние загрузки
- `Rounded` — скруглённая форма
- `Severity` — семантические цвета
- `Disabled` — отключённое состояние

---

## Ключевые технические решения

### Почему Default story использует динамический render

В Storybook 10 Angular `source.transform` **не реактивен** — вызывается один раз.
Единственный способ обновлять code-сниппет при смене controls:
генерировать `template` строку прямо в `render(args)`.
Storybook Angular использует `template` из render как source code.

```typescript
// ✅ Правильно — template обновляется при смене controls
render: (args) => {
  const template = `<button label="${args.label}"></button>`;
  return { props: args, template };
},

// ❌ Неправильно — source.transform не реактивен
parameters: {
  docs: { source: { transform: (src, ctx) => ... } }
}
```

### Почему НЕ используется самозакрывающийся тег

Angular JIT-компилятор запрещает `<button />` — только `<button></button>`.
`<button>` не является void-элементом в HTML5.

### Расширение типа Meta для Events

```typescript
// Если нужно добавить Events не из @Output() компонента:
type XxxArgs = XxxComponent & { onClick?: (event: MouseEvent) => void };
const meta: Meta<XxxArgs> = { ... };
type Story = StoryObj<XxxArgs>;
```

---

## argTypes — правила оформления

```typescript
propName: {
  control: 'text',              // text | boolean | select | number
  options: ['a', 'b', null],   // только для select; null = "нет значения"
  description: 'На русском',
  table: {
    category: 'Props',          // Props | Badge | Events
    defaultValue: { summary: 'значение' },
    type: { summary: "'a' | 'b' | null" },
    // disable: true — только если проп скрывается намеренно
  },
},
```

**Порядок в argTypes:**
1. Props (основные)
2. Badge (если есть badge-функциональность)
3. Events

---

## Иконки

Используется библиотека Tabler Icons:

```html
<!-- Класс иконки: "ti ti-{название}" -->
<button icon="ti ti-check" label="Сохранить"></button>
<button icon="ti ti-arrow-right" iconPos="postfix" label="Далее"></button>
```

Поиск иконок: https://tabler.io/icons

---

## Стилизация компонентов

### Порядок слоёв

```
Компонент-обёртка → PrimeNG (p-button) → PrimeNG Aura тема
→ Токены (src/prime-preset/tokens/components/{name}.ts)
→ Tailwind CSS
```

### Добавление CSS-токенов

Файл: `src/prime-preset/tokens/components/{name}.ts`

Структура токенов соответствует PrimeNG Aura preset.
Кастомные расширения — через префикс `--p-{name}-extend-*`.

### Tailwind в шаблонах сторисов

```html
<!-- Обёртка для отступов в preview -->
<div class="bg-surface-ground p-4">
  <component ...></component>
</div>
```

---

## Референс Vue UI Kit

Vue UI Kit (PrimeVue) — источник референса по структуре сторисов и вариациям компонентов:

- **Репозиторий**: `~/Downloads/vue-ui-kit-3/src/plugins/prime/stories/`
- **Запущен локально**: `http://localhost:6006`

### Что брать как референс

| Vue файл                          | Что переносить в Angular                         |
|-----------------------------------|--------------------------------------------------|
| `Button/Button.stories.js`        | argTypes, stories args, описания                 |
| `Button/Button.template.js`       | Шаблоны вариаций (grid-матрица размеров/severity)|
| `Button/Button.mdx`               | Структура документации, порядок сторисов         |

### Как адаптировать Vue → Angular

| Vue                         | Angular                                      |
|-----------------------------|----------------------------------------------|
| `v-bind="args"`             | `[prop]="prop"` (через `props: args`)        |
| `variant="text"`            | Остаётся `variant="text"` (статичный шаблон) |
| `<Button />`                | `<extra-button></extra-button>` (наш selector) |
| `:size="args.size === 'xlarge' ? undefined : args.size"` | `[size]="primeSize"` (геттер) |
| `class="p-button-xlg"`      | `[styleClass]="size === 'xlarge' ? 'p-button-xlg' : ''"` |
| `designToken: { disable: false }`, `designTokens: { prefix: '--p-button' }` | `designTokens: { prefix: '--p-button' }` |

### Design Tokens параметр

Каждый компонент указывает CSS-префикс для аддона Design Tokens через `parameters`:

```typescript
const meta: Meta<XxxArgs> = {
  parameters: {
    designTokens: { prefix: '--p-button' }, // префикс CSS-переменных компонента
  },
};
```

Аддон `.storybook/addons/design-tokens/` автоматически подхватывает `parameters.designTokens.prefix`
и отображает отфильтрованные CSS-переменные на вкладке **Design Tokens** в панели Controls.

---

## Правила стилизации

### Запрет `!important`

`!important` **запрещён** во всех стилях компонентов и токенов.
Для переопределения стилей использовать только повышение специфичности через каскад классов:

```scss
// ❌ Запрещено
.p-button {
  background: var(--p-button-background) !important;
}

// ✅ Правильно — приоритизация через специфичность
.p-button.p-button-custom {
  background: var(--p-button-background);
}

// ✅ Правильно — через вложенность
:host .p-button {
  background: var(--p-button-background);
}
```

### Только токены, никаких сырых значений

В токенах компонентов (`src/prime-preset/tokens/components/{name}.ts`) и стилях
**запрещено** использовать сырые цвета, размеры, отступы и шрифты.
Любое значение должно ссылаться на токен из базы.

```typescript
// ❌ Запрещено — сырые значения
background: '#1a73e8',
padding: '8px 16px',
fontSize: '14px',
borderRadius: '6px',
color: 'rgba(0,0,0,0.5)',

// ✅ Правильно — только токены
background: '{primary.500}',           // примитивный токен
padding: '{button.paddingY} {button.paddingX}',
fontSize: '{button.fontSize}',
borderRadius: '{button.borderRadius}',
color: '{surface.500}',
```

**Где искать токены:**
- Примитивы: `src/prime-preset/tokens/primitive.ts`
- Семантика (цвета по назначению, spacing): `src/prime-preset/tokens/semantic.ts`
- Компонентные токены: `src/prime-preset/tokens/components.ts`
- CSS-переменные Tailwind: `tailwind.config.js` (секция `colors`)

---

## Что НЕ делать

- Не использовать `source.transform` для динамических сниппетов — не реактивен
- Не писать `<component />` самозакрывающийся тег — Angular JIT не поддерживает
- Не добавлять `disable: true` в argTypes без явной причины — скрывает контролы
- Не помещать логику маппинга в шаблон — только в геттеры компонента
- Не дублировать PrimeNG API 1-в-1 — обёртка должна иметь собственные имена (`iconPos: 'prefix'/'postfix'`, не `'left'/'right'`)
- Не использовать `!important` — только повышение специфичности через классы
- Не оставлять сырые значения в стилях — только ссылки на токены из базы
