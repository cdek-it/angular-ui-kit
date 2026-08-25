import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraInputTextComponent } from '../../../lib/components/inputtext/inputtext.component';
import { InputTextClearableComponent, Clearable } from './examples/inputtext-clearable.component';
import { InputTextLabelsComponent, Labels } from './examples/inputtext-labels.component';
import { InputTextSizesComponent, Sizes } from './examples/inputtext-sizes.component';
import { InputTextStatesComponent, States } from './examples/inputtext-states.component';
import { InputTextTypesComponent, Types } from './examples/inputtext-types.component';

type InputTextArgs = ExtraInputTextComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<InputTextArgs> = {
  title: 'Components/Form/InputText',
  component: ExtraInputTextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraInputTextComponent,
        ReactiveFormsModule,
        InputTextLabelsComponent,
        InputTextSizesComponent,
        InputTextClearableComponent,
        InputTextTypesComponent,
        InputTextStatesComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Текстовое поле для ввода данных.

Реализовано по спецификации [inputtext.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/inputtext.md).

\`\`\`typescript
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/inputtext.md) ───────────────
    placeholder: {
      control: 'text',
      description: 'Текст подсказки внутри поля',
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
      options: ['default', 'float', 'left'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'float' | 'left'" }
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
      options: ['sm', 'base', 'lg', 'xlg'],
      description: 'Размер поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'sm' | 'base' | 'lg' | 'xlg'" }
      }
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'Тип поля input',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'text' },
        type: { summary: "'text' | 'password'" }
      }
    },
    // ── Состояния (управляются через FormControl) ────────────────
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние — управляется через FormControl',
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
    // ── События ───────────────────────────────────────────────────
    onClear: {
      control: false,
      description: 'Срабатывает при очистке поля иконкой × (только при clearable)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    inputId: { table: { disable: true } }
  },
  args: {
    placeholder: 'Введите текст...',
    label: '',
    labelPosition: 'default',
    clearable: false,
    caption: '',
    info: '',
    size: 'base',
    type: 'text',
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<InputTextArgs>;

// ── Default (интерактивная) ──────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'default') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.clearable) parts.push(`clearable`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.type && args.type !== 'text') parts.push(`type="${args.type}"`);

    const validators = args.invalid ? [Validators.required] : [];
    const control = new FormControl({ value: '', disabled: args.disabled }, validators);

    const template = `<extra-input-text [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-input-text>`;

    return { props: { ...args, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное поле со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ────────────────────────────────────────────────────

export { Labels, Sizes, Clearable, Types, States };
