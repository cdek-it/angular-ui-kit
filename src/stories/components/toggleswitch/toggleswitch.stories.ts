import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraToggleSwitchComponent } from '../../../lib/components/toggleswitch/toggleswitch.component';
import { ToggleSwitchStatesComponent, States } from './examples/toggleswitch-states.component';
import { ToggleSwitchPositionsComponent, Positions } from './examples/toggleswitch-positions.component';

type ToggleSwitchArgs = ExtraToggleSwitchComponent & { disabled: boolean; invalid: boolean };

const meta: Meta<ToggleSwitchArgs> = {
  title: 'Components/Form/ToggleSwitch',
  component: ExtraToggleSwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraToggleSwitchComponent, ReactiveFormsModule, ToggleSwitchStatesComponent, ToggleSwitchPositionsComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-toggleswitch' },
    docs: {
      description: {
        component: `Переключатель-свитч для мгновенного включения/выключения одной бинарной настройки.

Реализовано по спецификации [toggleswitch.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/toggleswitch.md).

\`\`\`typescript
import { ExtraToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/toggleswitch.md) ────────────
    label: {
      control: 'text',
      description: 'Текст названия рядом с переключателем',
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
        type: { summary: 'EventEmitter<ExtraToggleSwitchChangeEvent>' }
      }
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<Event>' }
      }
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<Event>' }
      }
    },
    // Hidden computed props
    modelValue: { table: { disable: true } },
    inputId: { table: { disable: true } }
  },
  args: {
    label: 'Тёмная тема',
    labelPosition: 'right',
    caption: '',
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<ToggleSwitchArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.labelPosition && args.labelPosition !== 'right') parts.push(`labelPosition="${args.labelPosition}"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);

    const validators = args.invalid ? [Validators.requiredTrue] : [];
    const control = new FormControl({ value: false, disabled: args.disabled }, validators);

    const template = `<extra-toggleswitch [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-toggleswitch>`;

    // invalid и disabled живут во FormControl: у компонента invalid — геттер без сеттера,
    // и Storybook на попытке его присвоить роняет ошибку в консоль
    const { invalid, disabled, ...rest } = args;

    return { props: { ...rest, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный переключатель со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { States, Positions };
