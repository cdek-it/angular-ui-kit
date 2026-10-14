import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraCheckboxComponent } from '../../../lib/components/checkbox/checkbox.component';
import { CheckboxLabelsComponent, Labels } from './examples/checkbox-labels.component';
import { CheckboxStatesComponent, States } from './examples/checkbox-states.component';
import { CheckboxIndeterminateComponent, Indeterminate } from './examples/checkbox-indeterminate.component';

type CheckboxArgs = ExtraCheckboxComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Form/Checkbox',
  component: ExtraCheckboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraCheckboxComponent,
        ReactiveFormsModule,
        CheckboxLabelsComponent,
        CheckboxStatesComponent,
        CheckboxIndeterminateComponent
      ]
    })
  ],
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
    modelValue: { table: { disable: true } },
    inputId: { table: { disable: true } }
  },
  args: {
    label: 'Checkbox',
    labelPosition: 'right',
    caption: '',
    indeterminate: false,
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'right') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.indeterminate) parts.push(`[indeterminate]="true"`);

    const validators = args.invalid ? [Validators.requiredTrue] : [];
    const control = new FormControl({ value: false, disabled: args.disabled }, validators);

    const template = `<extra-checkbox [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-checkbox>`;

    // invalid и disabled живут во FormControl: у компонента invalid — геттер без сеттера,
    // и Storybook на попытке его присвоить роняет ошибку в консоль
    const { invalid, disabled, ...rest } = args;

    return { props: { ...rest, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный чекбокс со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Labels, States, Indeterminate };
