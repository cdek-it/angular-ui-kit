import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraPasswordComponent } from '../../../lib/components/password/password.component';
import { PasswordToggleComponent, ToggleMask } from './examples/password-toggle.component';
import { Feedback, PasswordFeedbackComponent } from './examples/password-feedback.component';
import { Disabled, PasswordDisabledComponent } from './examples/password-disabled.component';
import { Invalid, PasswordInvalidComponent } from './examples/password-invalid.component';
import { FloatLabel, PasswordFloatLabelComponent } from './examples/password-float-label.component';
import { PasswordTemplateComponent, Template } from './examples/password-template.component';
import { PasswordHeaderComponent, Header } from './examples/password-header.component';

const meta: Meta<ExtraPasswordComponent> = {
  title: 'Components/Form/Password',
  component: ExtraPasswordComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraPasswordComponent,
        FormsModule,
        PasswordToggleComponent,
        PasswordFeedbackComponent,
        PasswordDisabledComponent,
        PasswordInvalidComponent,
        PasswordFloatLabelComponent,
        PasswordTemplateComponent,
        PasswordHeaderComponent
      ]
    }),
    (story) => ({
      ...story(),
      template: `<div style="padding: 4px">${story().template}</div>`
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-password' },
    docs: {
      description: {
        component: `Поле ввода пароля с поддержкой индикатора надёжности и переключения видимости.

Шаблоны (передаются между тегами компонента):
- \`extraPasswordHeader\` — шапка панели надёжности
- \`extraPasswordFooter\` — подвал панели надёжности

\`\`\`typescript
import { ExtraPasswordComponent, ExtraPasswordHeaderDirective, ExtraPasswordFooterDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      story: { height: '280px' }
    }
  },
  argTypes: {
    feedback: {
      control: 'boolean',
      description: 'Показывать индикатор надёжности пароля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    toggleMask: {
      control: 'boolean',
      description: 'Возможность показать/скрыть пароль',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Текст-подсказка',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
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
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: 'Положение лейбла относительно поля (игнорируется при floatLabel=true)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'top' },
        type: { summary: "'top' | 'left'" }
      }
    },
    floatLabel: {
      control: 'boolean',
      description: 'Плавающая метка внутри поля (перекрывает labelPosition)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    label: {
      control: 'text',
      description: 'Текст лейбла поля',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
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
      description: 'Текст доп. информации в тултипе иконки ti-info-circle',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    // Hidden props
    variant: { table: { disable: true } },
    promptLabel: { table: { disable: true } },
    weakLabel: { table: { disable: true } },
    mediumLabel: { table: { disable: true } },
    strongLabel: { table: { disable: true } },
    inputStyleClass: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    ariaLabelledBy: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    sizeClass: { table: { disable: true } },
    computedInputStyleClass: { table: { disable: true } },

    // События
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
    }
  },
  args: {
    feedback: true,
    toggleMask: false,
    placeholder: 'Введите пароль',
    size: 'base',
    fluid: false,
    labelPosition: 'top',
    floatLabel: false,
    label: '',
    caption: '',
    info: ''
  }
};

export default meta;
type Story = StoryObj<ExtraPasswordComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (!args.feedback) parts.push(`[feedback]="false"`);
    if (args.toggleMask) parts.push(`[toggleMask]="true"`);
    if (args.label) parts.push(`label="${args.label}"`);
    if (args.floatLabel) {
      parts.push(`[floatLabel]="true"`);
    } else {
      if (args.labelPosition && args.labelPosition !== 'top') parts.push(`labelPosition="${args.labelPosition}"`);
      if (args.placeholder) parts.push(`placeholder="${args.placeholder}"`);
    }
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.info) parts.push(`info="${args.info}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.fluid) parts.push(`[fluid]="true"`);

    parts.push(`[(ngModel)]="value"`);

    const template =
      parts.length > 1
        ? `<extra-password\n  ${parts.join('\n  ')}\n></extra-password>`
        : `<extra-password ${parts.join(' ')}></extra-password>`;

    return { props: { ...args, value: null }, template };
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
export { ToggleMask, Feedback, Disabled, Invalid, FloatLabel, Template, Header };
