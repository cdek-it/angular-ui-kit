import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraInputOtpComponent } from '../../../lib/components/inputotp/inputotp.component';
const INPUTS = [
  'length',
  'mask',
  'integerOnly',
  'autofocus',
  'size',
  'readonly',
  'required',
  'name',
  'autocomplete',
  'ariaLabel',
  'ariaLabelledBy',
  'tabindex'
] as const;
type OtpArgs = Pick<ExtraInputOtpComponent, (typeof INPUTS)[number] | 'onChange' | 'control'> & {
  value: string | null;
  disabled: boolean;
  invalid: boolean;
};
type RenderArgs = Partial<Pick<OtpArgs, (typeof INPUTS)[number] | 'value' | 'disabled' | 'invalid'>>;
function source(args: RenderArgs) {
  const parts = ['[formControl]="fieldControl"'];
  const escape = (s: string) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  for (const key of INPUTS) {
    const value = args[key];
    if (value === undefined) continue;
    parts.push(typeof value === 'string' ? key + '="' + escape(value) + '"' : '[' + key + ']="' + value + '"');
  }
  return '<extra-input-otp\n  ' + parts.join('\n  ') + '\n></extra-input-otp>';
}
const meta: Meta<OtpArgs> = {
  title: 'Components/Form/InputOtp',
  component: ExtraInputOtpComponent,
  tags: ['autodocs', 'inputotp'],
  decorators: [moduleMetadata({ imports: [ExtraInputOtpComponent, ReactiveFormsModule] })],
  render: (args) => {
    const fieldControl = new FormControl<string | null>(
      { value: args.value ?? null, disabled: !!args.disabled },
      args.invalid ? () => ({ storyInvalid: true }) : []
    );
    if (args.invalid) fieldControl.markAsTouched();
    return {
      props: { ...Object.fromEntries(INPUTS.map((k) => [k, args[k]])), fieldControl, onChange: args.onChange },
      template:
        '<extra-input-otp [formControl]="fieldControl" ' +
        INPUTS.map((k) => '[' + k + ']="' + k + '"').join(' ') +
        ' (onChange)="onChange($event)"></extra-input-otp>'
    };
  },
  parameters: {
    designTokens: { prefix: '--p-inputotp' },
    docs: {
      description: {
        component: `Компонент для ввода одноразовых паролей (OTP).

\`\`\`typescript
import { ExtraInputOtpComponent } from '@cdek-it/angular-ui-kit';
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
    autofocus: {
      control: 'boolean',
      description: 'Автофокус на первой ячейке при инициализации',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'Размер ячейки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large'" }
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
    control: {
      table: { disable: true },
      description: 'FormControl поля — используется в примерах с реактивной формой'
    },
    readonly: { control: 'boolean', description: 'Только для чтения: значение видно, но не редактируется' },
    required: { control: 'boolean', description: 'Поле обязательное для заполнения' },
    name: { control: 'text', description: 'Имя поля в HTML-форме' },
    autocomplete: { control: 'text', description: 'Значение атрибута autocomplete нативного input' },
    ariaLabel: { control: 'text', description: 'Текст для скринридеров, если нет видимой подписи' },
    ariaLabelledBy: { control: 'text', description: 'id элемента, текст которого подписывает поле' },
    tabindex: { control: 'number', description: 'Порядок фокуса при навигации клавиатурой' },
    value: { control: 'text', description: 'Введённый код' }
  },
  args: {
    length: 4,
    mask: false,
    integerOnly: false,
    autofocus: false,
    size: 'base',
    readonly: false,
    required: false,
    name: undefined,
    autocomplete: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    tabindex: undefined,
    value: '0000',
    disabled: false,
    invalid: false,
    onChange: fn()
  }
};
export default meta;
type Story = StoryObj<OtpArgs>;
export const Default: Story = {
  name: 'Default',
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример со всеми свойствами спецификации. Используйте Controls для изменения пропсов; disabled и invalid управляются через FormControl.'
      }
    }
  }
};
export const Error: Story = {
  name: 'Error',
  args: { invalid: true },
  parameters: {
    docs: { description: { story: 'Невалидное состояние — определяется через валидаторы `FormControl`.' } }
  }
};
export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  parameters: { docs: { description: { story: 'Заблокированное состояние — управляется через `FormControl`.' } } }
};
export const Readonly: Story = { name: 'Readonly', args: { readonly: true } };
export const SixDigits: Story = { name: 'SixDigits', args: { length: 6, value: '000000' } };
export const Mask: Story = {
  name: 'Mask',
  args: { mask: true },
  parameters: { docs: { description: { story: 'Маскированный ввод — символы скрыты.' } } }
};
export const IntegerOnly: Story = {
  name: 'IntegerOnly',
  args: { integerOnly: true },
  parameters: { docs: { description: { story: 'Ввод только цифр.' } } }
};
export const Autofocus: Story = {
  name: 'Autofocus',
  args: { autofocus: true },
  parameters: { docs: { description: { story: 'Автофокус на первой ячейке при инициализации.' } } }
};
