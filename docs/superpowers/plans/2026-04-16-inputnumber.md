# InputNumber Component — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать Angular wrapper-компонент InputNumber с CSS-переопределениями и Storybook-сториями.

**Architecture:** Standalone CVA-компонент `InputNumberComponent`, оборачивающий PrimeNG `p-inputnumber`. CSS-оверрайды в `src/prime-preset/tokens/components/inputnumber.ts`, подключаются через `map-tokens.ts`. Четыре стории: Default (динамический template из args), FloatLabel (нативный `p-inputnumber` внутри `p-floatlabel`), Currency, MinMax.

**Tech Stack:** Angular 20, PrimeNG 20, Storybook 8, Tailwind, `dt()` токены, Tabler Icons.

---

## File Map

| Действие | Путь |
|---|---|
| Создать | `src/lib/components/inputnumber/inputnumber.component.ts` |
| Создать | `src/prime-preset/tokens/components/inputnumber.ts` |
| Изменить | `src/prime-preset/map-tokens.ts` |
| Создать | `src/stories/components/inputnumber/inputnumber.stories.ts` |
| Создать | `src/stories/components/inputnumber/examples/inputnumber-float-label.component.ts` |
| Создать | `src/stories/components/inputnumber/examples/inputnumber-currency.component.ts` |
| Создать | `src/stories/components/inputnumber/examples/inputnumber-minmax.component.ts` |

---

### Task 1: CSS-переопределения InputNumber

**Files:**
- Create: `src/prime-preset/tokens/components/inputnumber.ts`
- Modify: `src/prime-preset/map-tokens.ts`

- [ ] **Step 1: Создать файл CSS-токенов**

Создать `src/prime-preset/tokens/components/inputnumber.ts`:

```typescript
export const inputnumberCss = ({ dt }: { dt: (token: string) => string }): string => `

/* ─── Кнопки +/− ─── */
.p-inputnumber-button {
  border-width: ${dt('inputnumber.extend.borderWidth')};
}

.p-inputnumber-horizontal .p-inputnumber-button {
  min-height: ${dt('inputnumber.extend.extButton.height')};
}

/* ─── Disabled состояние кнопок ─── */
.p-inputnumber-horizontal:has(.p-inputnumber-input:disabled) .p-inputnumber-button {
  background: ${dt('inputtext.root.disabledBackground')};
  color: ${dt('inputtext.root.disabledColor')};
}

/* ─── Extra Large ─── */
.p-inputnumber.p-inputnumber-xlg .p-inputnumber-input {
  font-size: ${dt('inputtext.extend.extXlg.fontSize')};
  padding: ${dt('inputtext.extend.extXlg.paddingY')} ${dt('inputtext.extend.extXlg.paddingX')};
}
`;
```

- [ ] **Step 2: Зарегистрировать CSS в map-tokens.ts**

Открыть `src/prime-preset/map-tokens.ts`. Добавить импорт после строки с `inputtextCss`:

```typescript
import { inputnumberCss } from './tokens/components/inputnumber';
```

Добавить запись в объект `components` после блока `inputtext`:

```typescript
inputnumber: {
  ...(tokens.components.inputnumber as unknown as ComponentsDesignTokens['inputnumber']),
  css: inputnumberCss,
},
```

- [ ] **Step 3: Проверить компиляцию**

```bash
cd /Users/d.khaliulin/Downloads/angular-ui-kit-feature-styles-debug
npx tsc --noEmit
```

Ожидается: нет ошибок.

- [ ] **Step 4: Коммит**

```bash
git add src/prime-preset/tokens/components/inputnumber.ts src/prime-preset/map-tokens.ts
git commit -m "feat(inputnumber): добавить CSS-переопределения токенов"
```

---

### Task 2: InputNumberComponent

**Files:**
- Create: `src/lib/components/inputnumber/inputnumber.component.ts`

- [ ] **Step 1: Создать компонент**

Создать `src/lib/components/inputnumber/inputnumber.component.ts`:

```typescript
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';

export type InputNumberSize = 'small' | 'base' | 'large' | 'xlarge';
export type InputNumberButtonLayout = 'horizontal' | 'vertical' | 'stacked';
export type InputNumberMode = 'decimal' | 'currency';

@Component({
  selector: 'input-number',
  standalone: true,
  imports: [InputNumber, NgClass, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
  template: `
    <p-inputnumber
      [ngClass]="sizeClass"
      [size]="primeSize"
      [disabled]="disabled"
      [readonly]="readonly"
      [invalid]="invalid"
      [placeholder]="placeholder"
      [fluid]="fluid"
      [showButtons]="showButtons"
      [buttonLayout]="buttonLayout"
      [mode]="mode"
      [currency]="mode === 'currency' ? currency : undefined"
      [locale]="locale"
      [prefix]="prefix"
      [suffix]="suffix"
      [min]="min"
      [max]="max"
      [step]="step"
      [minFractionDigits]="minFractionDigits"
      [maxFractionDigits]="maxFractionDigits"
      incrementButtonIcon="ti ti-plus"
      decrementButtonIcon="ti ti-minus"
      [(ngModel)]="modelValue"
      (onInput)="onInputChange($event)"
      (onBlur)="onTouched()"
    ></p-inputnumber>
  `,
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() size: InputNumberSize = 'base';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input() showButtons = true;
  @Input() buttonLayout: InputNumberButtonLayout = 'horizontal';
  @Input() mode: InputNumberMode = 'decimal';
  @Input() currency = 'RUB';
  @Input() locale = 'ru-RU';
  @Input() prefix: string | undefined = undefined;
  @Input() suffix: string | undefined = undefined;
  @Input() min: number | undefined = undefined;
  @Input() max: number | undefined = undefined;
  @Input() step = 1;
  @Input() minFractionDigits = 0;
  @Input() maxFractionDigits = 20;
  @Input() fluid = false;

  modelValue: number | null = null;

  private _onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large' || this.size === 'xlarge') return 'large';
    return undefined;
  }

  get sizeClass(): Record<string, boolean> {
    return { 'p-inputnumber-xlg': this.size === 'xlarge' };
  }

  onInputChange(event: { value: number | null | undefined }): void {
    const value = event.value ?? null;
    this.modelValue = value;
    this._onChange(value);
  }

  writeValue(value: number | null): void {
    this.modelValue = value ?? null;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

- [ ] **Step 2: Проверить компиляцию**

```bash
npx tsc --noEmit
```

Ожидается: нет ошибок.

- [ ] **Step 3: Коммит**

```bash
git add src/lib/components/inputnumber/inputnumber.component.ts
git commit -m "feat(inputnumber): добавить компонент InputNumberComponent"
```

---

### Task 3: FloatLabel story

**Files:**
- Create: `src/stories/components/inputnumber/examples/inputnumber-float-label.component.ts`

- [ ] **Step 1: Создать файл**

Создать `src/stories/components/inputnumber/examples/inputnumber-float-label.component.ts`:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';

const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <p-inputnumber
      id="fl-number"
      [(ngModel)]="value"
      [showButtons]="true"
      buttonLayout="horizontal"
      incrementButtonIcon="ti ti-plus"
      decrementButtonIcon="ti ti-minus"
    ></p-inputnumber>
    <label for="fl-number">Число</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputnumber-float-label',
  standalone: true,
  imports: [InputNumber, FloatLabel, FormsModule],
  template,
  styles,
})
export class InputNumberFloatLabelComponent {
  value: number | null = null;
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-inputnumber-float-label></app-inputnumber-float-label>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля. Требует нативный `p-inputnumber` как прямой дочерний элемент `p-floatlabel`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputnumber-float-label',
  standalone: true,
  imports: [InputNumber, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <p-inputnumber
        id="fl-number"
        [(ngModel)]="value"
        [showButtons]="true"
        buttonLayout="horizontal"
        incrementButtonIcon="ti ti-plus"
        decrementButtonIcon="ti ti-minus"
      ></p-inputnumber>
      <label for="fl-number">Число</label>
    </p-floatlabel>
  \`,
})
export class InputNumberFloatLabelComponent {
  value: number | null = null;
}
        `,
      },
    },
  },
};
```

- [ ] **Step 2: Проверить компиляцию**

```bash
npx tsc --noEmit
```

Ожидается: нет ошибок.

---

### Task 4: Currency story

**Files:**
- Create: `src/stories/components/inputnumber/examples/inputnumber-currency.component.ts`

- [ ] **Step 1: Создать файл**

Создать `src/stories/components/inputnumber/examples/inputnumber-currency.component.ts`:

```typescript
import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Currency: Story = {
  name: 'Currency',
  render: (args) => ({
    props: { ...args, value: null },
    template: `
      <input-number
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [fluid]="fluid"
        [placeholder]="placeholder"
        [showButtons]="showButtons"
        [buttonLayout]="buttonLayout"
        [mode]="mode"
        [currency]="currency"
        [locale]="locale"
        [step]="step"
        [minFractionDigits]="minFractionDigits"
        [maxFractionDigits]="maxFractionDigits"
        [(ngModel)]="value"
      ></input-number>
    `,
  }),
  args: {
    mode: 'currency',
    currency: 'RUB',
    locale: 'ru-RU',
    minFractionDigits: 2,
    maxFractionDigits: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Режим валюты — форматирует значение с символом валюты по заданной локали.',
      },
      source: {
        language: 'ts',
        code: `
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-number mode="currency" currency="RUB" locale="ru-RU" [(ngModel)]="value"></input-number>
        `,
      },
    },
  },
};
```

---

### Task 5: MinMax story

**Files:**
- Create: `src/stories/components/inputnumber/examples/inputnumber-minmax.component.ts`

- [ ] **Step 1: Создать файл**

Создать `src/stories/components/inputnumber/examples/inputnumber-minmax.component.ts`:

```typescript
import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const MinMax: Story = {
  name: 'Min / Max / Step',
  render: (args) => ({
    props: { ...args, value: null },
    template: `
      <input-number
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [fluid]="fluid"
        [placeholder]="placeholder"
        [showButtons]="showButtons"
        [buttonLayout]="buttonLayout"
        [min]="min"
        [max]="max"
        [step]="step"
        [(ngModel)]="value"
      ></input-number>
    `,
  }),
  args: {
    min: 0,
    max: 100,
    step: 1,
    placeholder: '0–100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ограничения min/max и шаг изменения через кнопки и клавиатуру.',
      },
      source: {
        language: 'ts',
        code: `
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-number [min]="0" [max]="100" [step]="1" [(ngModel)]="value"></input-number>
        `,
      },
    },
  },
};
```

---

### Task 6: Main stories file

**Files:**
- Create: `src/stories/components/inputnumber/inputnumber.stories.ts`

- [ ] **Step 1: Создать файл**

Создать `src/stories/components/inputnumber/inputnumber.stories.ts`:

```typescript
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../../lib/components/inputnumber/inputnumber.component';
import { InputNumberFloatLabelComponent, FloatLabelStory } from './examples/inputnumber-float-label.component';
import { Currency } from './examples/inputnumber-currency.component';
import { MinMax } from './examples/inputnumber-minmax.component';

type InputNumberArgs = InputNumberComponent;

const meta: Meta<InputNumberArgs> = {
  title: 'Components/Form/InputNumber',
  component: InputNumberComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        InputNumberComponent,
        FormsModule,
        InputNumberFloatLabelComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-inputnumber' },
    docs: {
      description: {
        component: `Числовое поле ввода с поддержкой форматирования и кнопок +/−.

\`\`\`typescript
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showButtons: {
      control: 'boolean',
      description: 'Показывать кнопки +/−',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    buttonLayout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'stacked'],
      description: 'Расположение кнопок',
      table: {
        category: 'Props',
        defaultValue: { summary: "'horizontal'" },
        type: { summary: "'horizontal' | 'vertical' | 'stacked'" },
      },
    },
    mode: {
      control: 'select',
      options: ['decimal', 'currency'],
      description: 'Режим отображения значения',
      table: {
        category: 'Props',
        defaultValue: { summary: "'decimal'" },
        type: { summary: "'decimal' | 'currency'" },
      },
    },
    currency: {
      control: 'text',
      description: 'Код валюты ISO 4217, используется при mode="currency"',
      table: {
        category: 'Props',
        defaultValue: { summary: "'RUB'" },
        type: { summary: 'string' },
      },
    },
    locale: {
      control: 'text',
      description: 'Локаль для форматирования числа',
      table: {
        category: 'Props',
        defaultValue: { summary: "'ru-RU'" },
        type: { summary: 'string' },
      },
    },
    prefix: {
      control: 'text',
      description: 'Префикс перед значением',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    suffix: {
      control: 'text',
      description: 'Суффикс после значения (например, "%")',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    min: {
      control: 'number',
      description: 'Минимально допустимое значение',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    max: {
      control: 'number',
      description: 'Максимально допустимое значение',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'Props',
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },
    minFractionDigits: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Минимальное количество знаков после запятой',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    maxFractionDigits: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Максимальное количество знаков после запятой',
      table: {
        category: 'Props',
        defaultValue: { summary: '20' },
        type: { summary: 'number' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
  },
  args: {
    size: 'base',
    placeholder: '0',
    disabled: false,
    readonly: false,
    invalid: false,
    showButtons: true,
    buttonLayout: 'horizontal',
    mode: 'decimal',
    currency: 'RUB',
    locale: 'ru-RU',
    step: 1,
    minFractionDigits: 0,
    maxFractionDigits: 20,
    fluid: false,
  },
};

export default meta;
type Story = StoryObj<InputNumberArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (!args.showButtons) parts.push(`[showButtons]="false"`);
    if (args.buttonLayout && args.buttonLayout !== 'horizontal') parts.push(`buttonLayout="${args.buttonLayout}"`);
    if (args.mode && args.mode !== 'decimal') parts.push(`mode="${args.mode}"`);
    if (args.mode === 'currency' && args.currency) parts.push(`currency="${args.currency}"`);
    if (args.locale && args.locale !== 'ru-RU') parts.push(`locale="${args.locale}"`);
    if (args.prefix) parts.push(`prefix="${args.prefix}"`);
    if (args.suffix) parts.push(`suffix="${args.suffix}"`);
    if (args.min !== undefined) parts.push(`[min]="${args.min}"`);
    if (args.max !== undefined) parts.push(`[max]="${args.max}"`);
    if (args.step && args.step !== 1) parts.push(`[step]="${args.step}"`);
    if (args.minFractionDigits) parts.push(`[minFractionDigits]="${args.minFractionDigits}"`);
    if (args.maxFractionDigits && args.maxFractionDigits !== 20) parts.push(`[maxFractionDigits]="${args.maxFractionDigits}"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    parts.push(`[(ngModel)]="value"`);

    const template = `<input-number\n  ${parts.join('\n  ')}\n></input-number>`;

    return { props: { ...args, value: null }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { FloatLabelStory as FloatLabel, Currency, MinMax };
```

- [ ] **Step 2: Проверить компиляцию**

```bash
npx tsc --noEmit
```

Ожидается: нет ошибок.

- [ ] **Step 3: Коммит**

```bash
git add src/stories/components/inputnumber/
git commit -m "feat(inputnumber): добавить Storybook-стории"
```

---

### Task 7: Финальная проверка

- [ ] **Step 1: Полная проверка TypeScript**

```bash
npx tsc --noEmit
```

Ожидается: нет ошибок.

- [ ] **Step 2: Запустить Storybook и проверить визуально**

```bash
npm run storybook
```

Открыть `http://localhost:6006` и проверить:
- `Components/Form/InputNumber` → Default: Controls меняют пропсы, code-snippet обновляется
- FloatLabel: метка анимируется при фокусе/вводе
- Currency: значение форматируется с символом ₽
- Min/Max: кнопки не выходят за диапазон 0–100

- [ ] **Step 3: Финальный коммит**

```bash
git add -A
git commit -m "feat(inputnumber): компонент InputNumber готов"
```

---

## Self-Review

**Spec coverage:**
- ✅ Компонент с CVA — Task 2
- ✅ Все 18 пропсов — Task 2 (InputNumberComponent)
- ✅ Size mapping (primeSize + p-inputnumber-xlg) — Task 2
- ✅ Tabler Icons через `incrementButtonIcon` / `decrementButtonIcon` — Task 2
- ✅ CSS overrides (border, height, disabled, xlarge) — Task 1
- ✅ map-tokens регистрация — Task 1
- ✅ Default story с динамическим template — Task 6
- ✅ FloatLabel story (нативный p-inputnumber) — Task 3
- ✅ Currency story — Task 4
- ✅ MinMax story — Task 5
- ✅ modelValue / primeSize / sizeClass скрыты в argTypes — Task 6

**Placeholder scan:** нет TBD/TODO.

**Type consistency:** `InputNumberSize`, `InputNumberButtonLayout`, `InputNumberMode` определены в Task 2 и используются в `argTypes` Task 6 через строковые литералы — согласованы.
