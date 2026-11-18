import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraCheckboxComponent } from '../../../lib/components/checkbox/checkbox.component';
const INPUTS = [
  'label',
  'labelPosition',
  'caption',
  'indeterminate',
  'readonly',
  'required',
  'ariaLabel',
  'ariaLabelledBy',
  'autofocus',
  'tabindex'
] as const;
type CheckboxArgs = Pick<ExtraCheckboxComponent, (typeof INPUTS)[number] | 'onChange' | 'modelValue' | 'inputId'> & {
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
};
type RenderArgs = Partial<Pick<CheckboxArgs, (typeof INPUTS)[number] | 'checked' | 'disabled' | 'invalid'>>;
function source(args: RenderArgs) {
  const parts = ['[formControl]="control"'];
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  for (const key of INPUTS) {
    const value = args[key];
    if (value === undefined) continue;
    if (typeof value === 'string') parts.push(key + '="' + escape(value) + '"');
    else parts.push('[' + key + ']="' + value + '"');
  }
  return '<extra-checkbox\n  ' + parts.join('\n  ') + '\n></extra-checkbox>';
}
const meta: Meta<CheckboxArgs> = {
  title: 'Components/Form/Checkbox',
  component: ExtraCheckboxComponent,
  tags: ['autodocs', 'checkbox'],
  decorators: [moduleMetadata({ imports: [ExtraCheckboxComponent, ReactiveFormsModule] })],
  render: (args) => {
    const control = new FormControl(
      { value: !!args.checked, disabled: !!args.disabled },
      { nonNullable: true, validators: args.invalid ? () => ({ storyInvalid: true }) : [] }
    );
    if (args.invalid) control.markAsTouched();
    return {
      props: { ...Object.fromEntries(INPUTS.map((key) => [key, args[key]])), control, onChange: args.onChange },
      template:
        '<extra-checkbox [formControl]="control" ' +
        INPUTS.map((key) => '[' + key + ']="' + key + '"').join(' ') +
        ' (onChange)="onChange($event)"></extra-checkbox>'
    };
  },
  parameters: {
    designTokens: { prefix: '--p-checkbox' },
    docs: {
      description: {
        component: `Компонент флажка для выбора одного варианта (да/нет).

Реализовано по спецификации [checkbox.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/checkbox.md).

\`\`\`typescript
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_code: string, context: { args: RenderArgs }) => source(context.args)
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/checkbox.md) ────────────────
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
      options: ['right', 'left'],
      description: 'Положение лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'right' },
        type: { summary: "'right' | 'left'" }
      }
    },
    caption: {
      control: 'text',
      description: 'Текст пояснения под лейблом',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    indeterminate: {
      control: 'boolean',
      description: 'Возможно ли третье состояние (частично выбрано)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── Состояния (управляются через FormControl) ─────────────────
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
    checked: { control: 'boolean', description: 'Значение FormControl' },
    // ── События ──────────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения состояния',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraCheckboxChangeEvent>' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true }, description: 'Значение чекбокса (true/false)' },
    inputId: { table: { disable: true }, description: 'id нативного input — для связки с внешним <label>' },
    readonly: {
      control: 'boolean',
      description: 'Только чтение',
      table: { category: 'Свойства', defaultValue: { summary: 'false' } }
    },
    required: {
      control: 'boolean',
      description: 'Обязательно отметить чекбокс',
      table: { category: 'Свойства', defaultValue: { summary: 'false' } }
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при монтировании',
      table: { category: 'Дополнительно', defaultValue: { summary: 'false' } }
    },
    ariaLabel: {
      control: 'text',
      table: { category: 'Дополнительно' },
      description: 'Текст для скринридеров, если нет видимой подписи'
    },
    ariaLabelledBy: {
      control: 'text',
      table: { category: 'Дополнительно' },
      description: 'id элемента, текст которого подписывает чекбокс'
    },
    tabindex: {
      control: 'number',
      table: { category: 'Дополнительно' },
      description: 'Порядок фокуса при навигации клавиатурой'
    }
  },
  args: {
    label: 'label',
    labelPosition: 'right',
    caption: 'Caption',
    indeterminate: false,
    readonly: false,
    required: false,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    autofocus: false,
    tabindex: undefined,
    checked: false,
    disabled: false,
    invalid: false,
    onChange: fn()
  }
};
export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный чекбокс со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

export const Error: Story = { name: 'Error', args: { invalid: true } };

export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };

export const Readonly: Story = { name: 'Readonly', args: { readonly: true } };

export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: { indeterminate: true },
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate — неопределённое состояние родительского чекбокса при частичном выборе дочерних.'
      }
    }
  }
};

export const WithoutLabel: Story = { name: 'WithoutLabel', args: { label: '', caption: '' } };

export const WithoutCaption: Story = { name: 'WithoutCaption', args: { caption: '' } };

export const LabelLeft: Story = { name: 'LabelLeft', args: { labelPosition: 'left' } };
