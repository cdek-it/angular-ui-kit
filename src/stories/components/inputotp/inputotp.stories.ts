import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputOtpComponent } from '../../../lib/components/inputotp/inputotp.component';
import { Disabled } from './examples/inputotp-disabled.component';
import { Invalid } from './examples/inputotp-invalid.component';
import { Mask } from './examples/inputotp-mask.component';
import { Readonly } from './examples/inputotp-readonly.component';
import { IntegerOnly } from './examples/inputotp-integeronly.component';

type InputOtpArgs = InputOtpComponent;

const meta: Meta<InputOtpArgs> = {
  title: 'Components/Form/InputOtp',
  component: InputOtpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        InputOtpComponent,
        ReactiveFormsModule,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-inputotp' },
    docs: {
      description: {
        component: `Компонент для ввода одноразовых паролей (OTP).

\`\`\`typescript
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
    length: {
      control: 'number',
      description: 'Количество символов',
      table: {
        category: 'Props',
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    mask: {
      control: 'boolean',
      description: 'Маскирует введённые символы',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    integerOnly: {
      control: 'boolean',
      description: 'Разрешает ввод только цифр',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'] as const,
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
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
    tabindex: {
      control: 'number',
      description: 'Значение атрибута tabindex',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: 'number | null' },
      },
    },
    autofocus: {
      control: 'boolean',
      description: 'Автоматический фокус при загрузке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    // Hidden props
    control: { table: { disable: true } },
    disabled: { table: { disable: true } },
    invalid: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    writeValue: { table: { disable: true } },
    registerOnChange: { table: { disable: true } },
    registerOnTouched: { table: { disable: true } },
    setDisabledState: { table: { disable: true } },

    // Events
    onChange: {
      control: false,
      description: 'Событие изменения значения',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<InputOtpChangeEvent>' },
      },
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
  },
  args: {
    length: 4,
    mask: false,
    integerOnly: false,
    readonly: false,
    autofocus: false,
    tabindex: null,
    size: 'base' as const,
  },
};

export default meta;
type Story = StoryObj<InputOtpArgs>;

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.length !== 4) parts.push(`[length]="${args.length}"`);
    if (args.mask) parts.push(`[mask]="true"`);
    if (args.integerOnly) parts.push(`[integerOnly]="true"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.autofocus) parts.push(`[autofocus]="true"`);
    if (args.tabindex != null) parts.push(`[tabindex]="${args.tabindex}"`);
    parts.push(`[formControl]="control"`);

    const template = `<input-otp\n  ${parts.join('\n  ')}\n></input-otp>`;

    return { props: { ...args, control: new FormControl('') }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

export { Disabled, Readonly, Invalid, Mask, IntegerOnly };
