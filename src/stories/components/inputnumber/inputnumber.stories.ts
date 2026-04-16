import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../../lib/components/inputnumber/inputnumber.component';
import { InputNumberFloatLabelComponent, FloatLabelStory } from './examples/inputnumber-float-label.component';
import { Currency } from './examples/inputnumber-currency.component';
import { Buttons } from './examples/inputnumber-buttons.component';
import { Disabled } from './examples/inputnumber-disabled.component';

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
        component: `Числовое поле ввода с поддержкой форматирования, валюты и кнопок увеличения/уменьшения.

\`\`\`typescript
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
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
      description: 'Отключает взаимодействие',
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
    // Hidden computed props
    modelValue: { table: { disable: true } },

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

    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.showButtons) parts.push(`[showButtons]="true"`);
    if (args.buttonLayout && args.buttonLayout !== 'stacked') parts.push(`buttonLayout="${args.buttonLayout}"`);
    if (args.mode && args.mode !== 'decimal') parts.push(`mode="${args.mode}"`);
    if (args.currency) parts.push(`currency="${args.currency}"`);
    if (args.locale) parts.push(`locale="${args.locale}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.min != null) parts.push(`[min]="${args.min}"`);
    if (args.max != null) parts.push(`[max]="${args.max}"`);
    if (args.step && args.step !== 1) parts.push(`[step]="${args.step}"`);
    if (args.prefix) parts.push(`prefix="${args.prefix}"`);
    if (args.suffix) parts.push(`suffix="${args.suffix}"`);
    if (!args.useGrouping) parts.push(`[useGrouping]="false"`);
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
export { Currency, Buttons, Disabled, FloatLabelStory as FloatLabel };
