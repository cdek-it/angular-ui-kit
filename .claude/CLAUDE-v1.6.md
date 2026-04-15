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

### Правило: title сториса

Формат: `Components/{Category}/{ComponentName}`

Категории соответствуют группировке на [primeng.org](https://primeng.org/):

| Категория | Компоненты                                                                                     |
|-----------|-----------------------------------------------------------------------------------------------|
| Button    | Button, SpeedDial, SplitButton                                                                |
| Data      | DataTable, DataView, OrderList, OrgChart, Paginator, PickList, Timeline, Tree, TreeTable      |
| Form      | AutoComplete, Checkbox, ColorPicker, DatePicker, InputMask, InputNumber, InputOtp, InputText, Knob, Listbox, MultiSelect, Password, RadioButton, Rating, Select, SelectButton, Slider, Textarea, ToggleButton, ToggleSwitch, TreeSelect |
| Menu      | Breadcrumb, ContextMenu, Dock, Menu, Menubar, MegaMenu, PanelMenu, Steps, TabMenu, TieredMenu |
| Messages  | Message, Toast                                                                                |
| Misc      | Avatar, Badge, BlockUI, Chip, Inplace, MeterGroup, ProgressBar, ProgressSpinner, ScrollTop, Skeleton, Tag |
| Overlay   | ConfirmDialog, ConfirmPopup, Dialog, Drawer, Popover, Tooltip                                 |
| Panel     | Accordion, Card, Divider, Fieldset, Panel, ScrollPanel, Splitter, Stepper, Tabs               |
| Media     | Carousel, Galleria, Image, ImageCompare                                                       |

```typescript
// ❌ Запрещено
title: 'Prime/Button'
title: 'Components/Button'

// ✅ Правильно
title: 'Components/Button/Button'
title: 'Components/Panel/Card'
title: 'Components/Panel/Divider'
title: 'Components/Form/InputText'
```

### Полный шаблон сториса

```typescript
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { XxxComponent } from '../../../lib/components/xxx/xxx.component';

// Расширяем тип для Events, которых нет в @Output()
type XxxArgs = XxxComponent & { onClick?: (event: MouseEvent) => void };

const meta: Meta<XxxArgs> = {
  title: 'Components/{Category}/Xxx',
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

## Паттерн examples/

### Назначение

Папка `src/stories/components/{name}/examples/` содержит **standalone Angular-компоненты** — каждый инкапсулирует один вариант использования компонента.
В блоке **Source** в Storybook показывается полноценный Angular-компонент (TypeScript), который пользователь библиотеки может скопировать к себе как есть.

Это принципиально отличается от подхода в `{name}.stories.ts`, где `source.code` показывает просто HTML-шаблон.

### Структура файла

```typescript
import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { XxxComponent } from '../../../../lib/components/xxx/xxx.component';

// 1. Шаблон выносится в const — чтобы переиспользовать в source.code
const template = `
<div class="bg-surface-ground">
  <extra-xxx prop="value"></extra-xxx>
</div>
`;
const styles = '';

// 2. Standalone-компонент с реальным шаблоном
@Component({
  selector: 'app-xxx-variant',
  standalone: true,
  imports: [XxxComponent],
  template,
  styles,
})
export class XxxVariantComponent {}

// 3. StoryObj — рендерит компонент; source.code — код компонента для копирования
export const Variant: StoryObj = {
  render: () => ({
    template: `<app-xxx-variant></app-xxx-variant>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Описание на русском.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { XxxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-xxx-variant',
  standalone: true,
  imports: [XxxComponent],
  template: \`
    <extra-xxx prop="value"></extra-xxx>
  \`,
})
export class XxxVariantComponent {}
        `,
      },
    },
  },
};
```

### Правила

1. Каждый файл — **одна вариация**, один `@Component` + один `StoryObj`
2. Шаблон выносится в `const template` — чтобы использовать в `source.code`
3. `render: () => ({ template: '<app-xxx-variant></app-xxx-variant>' })` — **только** для статичных примеров, где controls не нужны (форм-контролы с `ngModel`, группы компонентов). Для простых prop-вариаций controls не будут работать при таком подходе — см. правило ниже.
4. `source.code` содержит полный TypeScript-код компонента с импортами из `@cdek-it/angular-ui-kit`
5. Обёртка `<div class="bg-surface-ground">` — фон preview; **`p-4` не добавлять**
6. Именование файлов: `{name}-{variant}.component.ts` (например `avatar-label.component.ts`)
7. Именование selector компонента: `app-{name}-{variant}` (например `app-avatar-label`)
8. Класс компонента: `{Name}{Variant}Component` (например `AvatarLabelComponent`)

### Когда создавать examples/

`examples/` создаётся **обязательно для каждого компонента** — для всех вариационных сторисов (кроме `Default`).

`Default` (интерактивный playground) в examples/ **не дублируется** — он живёт только в `{name}.stories.ts`.

Каждая вариационная сторис (`WithIcon`, `Removable`, `Disabled` и т.д.) имеет соответствующий файл в `examples/`.

---

## Структура сторисов — обязательные разделы

| Порядок | Сторис      | Описание                                                              |
|---------|-------------|-----------------------------------------------------------------------|
| 1       | **Default** | Интерактивный playground. Динамический render. Все пропсы в Controls. |
| 2+      | Вариации    | По одному варианту: Sizes, Icons, Rounded, Loading, Disabled, и т.д.  |

### Правило: один экземпляр компонента на сторис

**Каждая сторис показывает ровно один вариант компонента. Все остальные виды компонента настраиваются с помощью пропсов через `args`.**

В каждой вариационной сторис шаблон содержит **ровно один** экземпляр компонента.
Это правило распространяется как на сторисы в `{name}.stories.ts`, так и на компоненты в `examples/`.
Вариация демонстрируется через `args` (пропсы), а не через дублирование тегов.

```typescript
// ❌ Запрещено — несколько экземпляров компонента в шаблоне
export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <extra-button size="small" label="Small"></extra-button>
      <extra-button label="Base"></extra-button>
      <extra-button size="large" label="Large"></extra-button>
    `,
  }),
};

// ❌ Запрещено — то же нарушение внутри examples/
@Component({ template: `
  <tag severity="primary" value="Primary"></tag>
  <tag severity="success" value="Success"></tag>
  <tag severity="danger" value="Danger"></tag>
` })
export class TagSeveritiesComponent {}

// ✅ Правильно — один экземпляр, вариация задаётся через args
export const Sizes: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'Button', size: 'large' },
};

export const Severity: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { value: 'Success', severity: 'success' },
};
```

**Исключение**: составные компоненты (например группа радиокнопок / чекбоксов), где несколько дочерних элементов — это **сам смысл компонента**, а не визуальное перечисление вариантов.

### Обязательные вариации для большинства компонентов
- `Sizes` — один компонент с нужным `size` в `args`
- `Icons` — один компонент с иконкой в `args`
- `Loading` — один компонент с `loading: true` в `args`
- `Rounded` — один компонент с `rounded: true` в `args`
- `Severity` — один компонент с нужным `severity` в `args`
- `Disabled` — один компонент с `disabled: true` в `args`

### Правило: controls (пропсы) работают во всех вариационных сторисах

**Вариационные сторисы ВСЕГДА рендерят через `commonTemplate + args`** — это единственный способ, при котором Storybook передаёт значения controls в компонент.

`render: () => ({ template: '<app-xxx-variant></app-xxx-variant>' })` — статичный рендер, controls **не работают**. Такой подход применим только для форм-контролов с `ngModel` и групп компонентов.

```typescript
// ❌ Controls не работают — props не передаются в статичный компонент
export const Rounded: Story = {
  render: () => ({
    template: `<app-tag-rounded></app-tag-rounded>`,
  }),
};

// ✅ Controls работают — props передаются через args
export const Rounded: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { value: 'Rounded', severity: 'success', rounded: true },
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { TagComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tag-rounded',
  standalone: true,
  imports: [TagComponent],
  template: \\\`
    <tag value="Rounded" severity="success" [rounded]="true"></tag>
  \\\`,
})
export class TagRoundedComponent {}
        `,
      },
    },
  },
};
```

**Если для вариации существует example-файл:** example-компонент регистрируется в `moduleMetadata`, но сторис рендерит через `commonTemplate + args`. В `source.code` сторис показывает TypeScript-код из example-файла (дублируется вручную).

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
<!-- Обёртка для фона в preview; p-4 НЕ добавлять -->
<div class="bg-surface-ground">
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

## Моковые данные

Все текстовые данные в шаблонах компонентов, примерах и сторисах — **только на русском языке** с **логистическим контекстом**.

### Примеры по типу компонента

| Компонент           | Плохо (❌)                  | Хорошо (✅)                              |
|---------------------|----------------------------|------------------------------------------|
| Button label        | `Button`, `Submit`, `Click`| `Отследить`, `Оформить заказ`, `Передать`|
| Input placeholder   | `Enter text...`            | `Введите трек-номер`                     |
| Card title          | `Title`, `Card header`     | `Посылка в пути`, `Заказ №ЦД-00123456`  |
| Card subtitle       | `Caption`, `Subtitle`      | `Москва → Новосибирск`, `2 кг, 3 места` |
| Card content        | `Content text here`        | `Ожидаемая доставка: 12 апреля`          |
| Table row           | `John Doe`, `Item name`    | `Иванов И.И.`, `Хрупкий груз`           |
| Badge / Tag         | `Status`, `Label`          | `В пути`, `Задержан`, `Доставлен`        |
| Toast message       | `Success!`, `Error`        | `Заказ принят`, `Адрес не найден`        |

### Правило

```typescript
// ❌ Запрещено — нейтральные заглушки без контекста
args: { label: 'Button', title: 'Title', value: 'Item' }

// ✅ Правильно — логистический контекст на русском
args: { label: 'Отследить посылку', title: 'Заказ №ЦД-00123456', value: 'В пути' }
```

---

## Что НЕ делать

- Не использовать `source.transform` для динамических сниппетов — не реактивен
- Не писать `<component />` самозакрывающийся тег — Angular JIT не поддерживает
- Не добавлять `disable: true` в argTypes без явной причины — скрывает контролы
- Не помещать логику маппинга в шаблон — только в геттеры компонента
- Не дублировать PrimeNG API 1-в-1 — обёртка должна иметь собственные имена (`iconPos: 'prefix'/'postfix'`, не `'left'/'right'`)
- Не использовать `!important` — только повышение специфичности через классы
- Не оставлять сырые значения в стилях — только ссылки на токены из базы
- **Не оборачивать компонент в `<div>` или другие элементы в code-сниппетах** — шаблон `render()` и `source.code` должны содержать только сам компонент без inline-стилей. Блочные компоненты (слайдеры, инпуты) получают `host: { style: 'display: block' }` и занимают ширину контейнера Storybook автоматически:

```typescript
// ❌ Запрещено — обёртка в сниппете
render: (args) => ({
  props: args,
  template: `<div style="width: 300px"><slider></slider></div>`,
}),

// ❌ Запрещено — inline-стиль на теге компонента
render: (args) => ({
  props: args,
  template: `<slider style="width: 300px"></slider>`,
}),

// ✅ Правильно — только компонент
render: (args) => ({
  props: args,
  template: `<slider></slider>`,
}),
```
