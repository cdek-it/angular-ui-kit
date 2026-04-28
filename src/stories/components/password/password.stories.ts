import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from '../../../lib/components/password/password.component';
import { PasswordToggleComponent, ToggleMask } from './examples/password-toggle.component';
import { PasswordFeedbackComponent, Feedback } from './examples/password-feedback.component';
import { PasswordDisabledComponent, Disabled } from './examples/password-disabled.component';
import { PasswordInvalidComponent, Invalid } from './examples/password-invalid.component';
import { PasswordFloatLabelComponent, FloatLabel } from './examples/password-float-label.component';
import { PasswordTemplateComponent, Template } from './examples/password-template.component';

const meta: Meta<PasswordComponent> = {
  title: 'Components/Form/Password',
  component: PasswordComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        PasswordComponent,
        FormsModule,
        PasswordToggleComponent,
        PasswordFeedbackComponent,
        PasswordDisabledComponent,
        PasswordInvalidComponent,
        PasswordFloatLabelComponent,
        PasswordTemplateComponent,
      ],
    }),
    (story) => ({
      ...story(),
      template: `<div style="padding: 4px">${story().template}</div>`,
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-password' },
    docs: {
      description: {
        component: `Поле ввода пароля с поддержкой индикатора надёжности и переключения видимости.

\`\`\`typescript
import { PasswordComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
      story: { height: '280px' },
    },
  },
  argTypes: {
    feedback: {
      control: 'boolean',
      description: 'Показывать индикатор надёжности пароля',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    toggleMask: {
      control: 'boolean',
      description: 'Возможность показать/скрыть пароль',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Текст-подсказка',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность взаимодействия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Подсвечивает поле как невалидное',
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
    floatLabel: {
      control: 'boolean',
      description: 'Плавающая метка внутри поля',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      description: 'Текст плавающей метки (используется с floatLabel)',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    // Hidden props
    variant: { table: { disable: true } },
    promptLabel: { table: { disable: true } },
    weakLabel: { table: { disable: true } },
    mediumLabel: { table: { disable: true } },
    strongLabel: { table: { disable: true } },
    inputId: { table: { disable: true } },
    inputStyleClass: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    computedInputStyleClass: { table: { disable: true } },

    // Events
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
    feedback: true,
    toggleMask: false,
    placeholder: 'Введите пароль',
    size: 'base',
    disabled: false,
    invalid: false,
    fluid: false,
    floatLabel: false,
    label: 'Пароль',
  },
};

export default meta;
type Story = StoryObj<PasswordComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (!args.feedback) parts.push(`[feedback]="false"`);
    if (args.toggleMask) parts.push(`[toggleMask]="true"`);
    if (args.floatLabel) {
      parts.push(`[floatLabel]="true"`);
      if (args.label) parts.push(`label="${args.label}"`);
    } else {
      if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    }
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);

    parts.push(`[(ngModel)]="value"`);

    const template = parts.length > 1
      ? `<password\n  ${parts.join('\n  ')}\n></password>`
      : `<password ${parts.join(' ')}></password>`;

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
export { ToggleMask, Feedback, Disabled, Invalid, FloatLabel, Template };
