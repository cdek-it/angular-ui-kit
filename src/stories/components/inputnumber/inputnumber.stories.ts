import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputNumberComponent } from '../../../lib/components/inputnumber/inputnumber.component';
import { InputNumberFloatLabelComponent, FloatLabelStory } from './examples/inputnumber-float-label.component';
import { Currency } from './examples/inputnumber-currency.component';
import { Buttons } from './examples/inputnumber-buttons.component';
import { Disabled } from './examples/inputnumber-disabled.component';

type InputNumberArgs = ExtraInputNumberComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<InputNumberArgs> = {
  title: 'Components/Form/InputNumber',
  component: ExtraInputNumberComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraInputNumberComponent,
        ReactiveFormsModule,
        InputNumberFloatLabelComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-inputnumber' },
    docs: {
      description: {
        component: `Числовое поле ввода с поддержкой форматирования, валюты и кнопок увеличения/уменьшения.

\`\`\`typescript
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер компонента',
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
    showButtons: {
      control: 'boolean',
      description: 'Отображает кнопки увеличения/уменьшения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    buttonLayout: {
      control: 'select',
      options: ['stacked', 'horizontal', 'vertical'],
      description: 'Расположение кнопок',
      table: {
        category: 'Props',
        defaultValue: { summary: "'stacked'" },
        type: { summary: "'stacked' | 'horizontal' | 'vertical'" },
      },
    },
    mode: {
      control: 'select',
      options: ['decimal', 'currency'],
      description: 'Режим форматирования',
      table: {
        category: 'Props',
        defaultValue: { summary: "'decimal'" },
        type: { summary: "'decimal' | 'currency'" },
      },
    },
    currency: {
      control: 'text',
      description: 'ISO 4217 код валюты (при `mode="currency"`)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    locale: {
      control: 'text',
      description: 'Локаль для форматирования',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — управляется через FormControl',
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
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
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
    useGrouping: {
      control: 'boolean',
      description: 'Использовать разделитель групп разрядов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    prefix: {
      control: 'text',
      description: 'Текст перед значением',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    suffix: {
      control: 'text',
      description: 'Текст после значения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    minFractionDigits: {
      control: 'number',
      description: 'Минимальное количество знаков после запятой',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    maxFractionDigits: {
      control: 'number',
      description: 'Максимальное количество знаков после запятой',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    inputSizeClass: { table: { disable: true } },
    sizeClass: { table: { disable: true } },

    // ── Events ───────────────────────────────────────────────
    onInput: {
      control: false,
      description: 'Событие при изменении значения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<{ value: number | null }>' },
      },
    },
  },
  args: {
    size: 'base',
    placeholder: 'Введите число...',
    showButtons: false,
    buttonLayout: 'stacked',
    mode: 'decimal',
    disabled: false,
    invalid: false,
    readonly: false,
    fluid: false,
    step: 1,
    useGrouping: true,
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
    if (args.showButtons) parts.push(`[showButtons]="true"`);
    if (args.buttonLayout && args.buttonLayout !== 'stacked') parts.push(`buttonLayout="${args.buttonLayout}"`);
    if (args.mode && args.mode !== 'decimal') parts.push(`mode="${args.mode}"`);
    if (args.currency) parts.push(`currency="${args.currency}"`);
    if (args.locale) parts.push(`locale="${args.locale}"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.min != null) parts.push(`[min]="${args.min}"`);
    if (args.max != null) parts.push(`[max]="${args.max}"`);
    if (args.step && args.step !== 1) parts.push(`[step]="${args.step}"`);
    if (args.prefix) parts.push(`prefix="${args.prefix}"`);
    if (args.suffix) parts.push(`suffix="${args.suffix}"`);
    if (args.minFractionDigits != null) parts.push(`[minFractionDigits]="${args.minFractionDigits}"`);
    if (args.maxFractionDigits != null) parts.push(`[maxFractionDigits]="${args.maxFractionDigits}"`);
    if (!args.useGrouping) parts.push(`[useGrouping]="false"`);

    const validators = [];
    if (args.invalid) validators.push(Validators.required);

    const control = new FormControl<number | null>({ value: null, disabled: args.disabled }, validators);

    const template = `<extra-input-number [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-input-number>`;

    return { props: { ...args, control }, template };
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
export { Currency, Buttons, Disabled, FloatLabelStory as FloatLabel };
