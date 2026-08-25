import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputOtpComponent } from '../../../lib/components/inputotp/inputotp.component';
import { Disabled } from './examples/inputotp-disabled.component';
import { Invalid } from './examples/inputotp-invalid.component';
import { Mask } from './examples/inputotp-mask.component';
import { IntegerOnly } from './examples/inputotp-integeronly.component';

type InputOtpArgs = ExtraInputOtpComponent;

const meta: Meta<InputOtpArgs> = {
  title: 'Components/Form/InputOtp',
  component: ExtraInputOtpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraInputOtpComponent, ReactiveFormsModule]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-inputotp' },
    docs: {
      description: {
        component: `Компонент для ввода одноразовых паролей (OTP).

Реализовано по спецификации [inputotp.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/inputotp.md).

\`\`\`typescript
import { ExtraInputOtpComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Значение подключается через \`[(ngModel)]\` или \`[formControl]\` (ControlValueAccessor). Состояния disabled и invalid управляются через FormControl.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/inputotp.md) ────────────────
    length: {
      control: 'number',
      description: 'Количество полей ввода',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '4' },
        type: { summary: 'number' }
      }
    },
    mask: {
      control: 'boolean',
      description: 'Скрывать введённое значение (как пароль)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    integerOnly: {
      control: 'boolean',
      description: 'Допускать только цифры',
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
      description: 'Срабатывает при изменении кода',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraInputOtpChangeEvent>' }
      }
    },
    // Hidden computed props
    control: { table: { disable: true } }
  },
  args: {
    length: 4,
    mask: false,
    integerOnly: false,
    disabled: false,
    invalid: false
  }
};

export default meta;
type Story = StoryObj<InputOtpArgs>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.length !== 4) parts.push(`[length]="${args.length}"`);
    if (args.mask) parts.push(`[mask]="true"`);
    if (args.integerOnly) parts.push(`[integerOnly]="true"`);

    const validators = args.invalid ? [() => ({ invalid: true })] : [];
    const control = new FormControl({ value: '', disabled: args.disabled }, validators);

    const template = `<extra-input-otp [formControl]="control"\n  ${parts.join('\n  ')}\n></extra-input-otp>`;

    return { props: { ...args, control }, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Disabled, Invalid, Mask, IntegerOnly };
