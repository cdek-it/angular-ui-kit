import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputNumberComponent } from '../../../lib/components/inputnumber/inputnumber.component';
import { InputNumberFloatLabelComponent, FloatLabelStory } from './examples/inputnumber-float-label.component';
import { InputNumberLabelsComponent, Labels } from './examples/inputnumber-labels.component';
import { InputNumberClearableComponent, Clearable } from './examples/inputnumber-clearable.component';
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
        InputNumberLabelsComponent,
        InputNumberClearableComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-inputnumber' },
    docs: {
      description: {
        component: `Числовое поле ввода с поддержкой форматирования, валюты, кнопок увеличения/уменьшения и встроенных label/caption/info.

Реализован по спецификации \`docs/components-api/inputnumber.md\`.

\`\`\`typescript
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    placeholder: {
      control: 'text',
      description: 'Подсказка при пустом поле',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    label: {
      control: 'text',
      description: 'Текст названия поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'top'" },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Плавающий лейбл внутри поля; несовместим со `showButtons`',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Отображение иконки для очистки поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    caption: {
      control: 'text',
      description: 'Текст пояснения под полем',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    info: {
      control: 'text',
      description: 'Текст с доп. информацией (показывается в тултипе иконки ti-info-circle)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    showButtons: {
      control: 'boolean',
      description: 'Отображает кнопки увеличения/уменьшения; недоступно при `floatLabel: true`',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    buttonLayout: {
      control: 'select',
      options: ['stacked', 'horizontal', 'vertical'],
      description: 'Расположение кнопок',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'stacked'" },
        type: { summary: "'stacked' | 'horizontal' | 'vertical'" }
      }
    },
    mode: {
      control: 'select',
      options: ['decimal', 'currency'],
      description: 'Режим форматирования',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'decimal'" },
        type: { summary: "'decimal' | 'currency'" }
      }
    },
    currency: {
      control: 'text',
      description: 'ISO 4217 код валюты (при `mode="currency"`)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    locale: {
      control: 'text',
      description: 'Локаль для форматирования',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивает поле на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '1' },
        type: { summary: 'number' }
      }
    },
    useGrouping: {
      control: 'boolean',
      description: 'Использовать разделитель групп разрядов',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    prefix: {
      control: 'text',
      description: 'Текст перед значением',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    suffix: {
      control: 'text',
      description: 'Текст после значения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    minFractionDigits: {
      control: 'number',
      description: 'Минимальное количество знаков после запятой',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    maxFractionDigits: {
      control: 'number',
      description: 'Максимальное количество знаков после запятой',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    // ── Состояния (управляются через FormControl) ─────────────
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие — управляется через FormControl',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — вычисляется из NgControl (Validators)',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    inputSizeClass: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    inputId: { table: { disable: true } },

    // ── События ────────────────────────────────────────────────
    onInput: {
      control: false,
      description: 'Срабатывает при вводе значения',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraInputNumberInputEvent>' }
      }
    },
    onClear: {
      control: false,
      description: 'Срабатывает при очистке значения (иконка `clearable`)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    placeholder: 'Введите число...',
    label: '',
    labelPosition: 'top',
    floatLabel: false,
    clearable: false,
    caption: '',
    info: '',
    size: 'base',
    showButtons: false,
    buttonLayout: 'stacked',
    mode: 'decimal',
    disabled: false,
    invalid: false,
    readonly: false,
    fluid: false,
    step: 1,
    useGrouping: true
  }
};

export default meta;
type Story = StoryObj<InputNumberArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.floatLabel) parts.push(`[floatLabel]="true"`);
    if (args.clearable) parts.push(`[clearable]="true"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
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
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { Currency, Buttons, Disabled, FloatLabelStory as FloatLabel, Labels, Clearable };
