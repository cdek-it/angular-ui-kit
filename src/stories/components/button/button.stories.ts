import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../lib/components/button/button.component';
import { ButtonSizesComponent, Sizes } from './examples/button-sizes.component';
import { ButtonVariantsComponent, Variants } from './examples/button-variants.component';
import { ButtonIconsComponent, Icons } from './examples/button-icons.component';
import { ButtonStatesComponent, States } from './examples/button-states.component';
import { ButtonRoundedComponent, Rounded } from './examples/button-rounded.component';
import { ButtonEventsComponent, Events } from './examples/button-events.component';

type ButtonArgs = ExtraButtonComponent & {
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: ExtraButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraButtonComponent,
        ButtonVariantsComponent,
        ButtonSizesComponent,
        ButtonIconsComponent,
        ButtonStatesComponent,
        ButtonRoundedComponent,
        ButtonEventsComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Кнопка — интерактивный элемент интерфейса для инициализации действий, отправки форм и навигации.

Реализована по спецификации [button.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/button.md).

\`\`\`typescript
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Помимо перечисленных свойств, на кнопку можно вешать нативные DOM-события (\`click\`, \`focus\`, \`blur\`, \`keydown\` и т.п.) напрямую; \`focus\` и \`blur\` также объявлены как типизированные события компонента.`
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/button.md) ───────────────
    label: {
      control: 'text',
      description: 'Текст на кнопке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'text',
      description: 'Класс иконки tabler icon на кнопке',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки относительно текста',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'left' },
        type: { summary: "'left' | 'right'" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'text', 'link'],
      description: 'Вариант отображения кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'tertiary' | 'text' | 'link'" }
      }
    },
    severity: {
      control: 'select',
      options: ['base', 'danger', 'warning', 'success', 'info'],
      description: 'Семантическое состояние кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'base' | 'danger' | 'warning' | 'success' | 'info'" }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    rounded: {
      control: 'boolean',
      description: 'Скруглённая форма кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растянуть кнопку на всю ширину контейнера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние кнопки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки: спиннер, кнопка неактивна',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── События ─────────────────────────────────────────────────
    focus: {
      control: false,
      description: 'Кнопка получила фокус',
      action: 'focus',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    blur: {
      control: false,
      description: 'Кнопка потеряла фокус',
      action: 'blur',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    onClick: {
      control: false,
      description: 'Нативный клик по кнопке',
      action: 'click',
      table: {
        category: 'События',
        type: { summary: 'DOM-событие click (нативное)' }
      }
    },
    onFocus: {
      control: false,
      description: 'Нативный фокус (прослушивается напрямую на extra-button)',
      table: {
        category: 'События',
        disable: true
      }
    },
    onBlur: {
      control: false,
      description: 'Нативная потеря фокуса (прослушивается напрямую на extra-button)',
      table: {
        category: 'События',
        disable: true
      }
    }
  },
  args: {
    label: 'Button',
    icon: '',
    iconPosition: 'left',
    variant: 'primary',
    severity: 'base',
    size: 'base',
    rounded: false,
    fluid: false,
    disabled: false,
    loading: false
  }
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// ── Primary (интерактивная) ──────────────────────────────────────────────────

export const Default: Story = {
  name: 'Primary',
  render: (args) => {
    const parts: string[] = [];

    if (args.label != null && args.label !== '') parts.push(`label="${args.label}"`);
    if (args.icon != null && args.icon !== '') parts.push(`icon="${args.icon}"`);
    if (args.iconPosition != null && args.iconPosition !== 'left') parts.push(`iconPosition="${args.iconPosition}"`);
    if (args.variant != null && args.variant !== 'primary') parts.push(`variant="${args.variant}"`);
    if (args.severity != null && args.severity !== 'base') parts.push(`severity="${args.severity}"`);
    if (args.size != null && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.rounded) parts.push(`[rounded]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.loading) parts.push(`[loading]="true"`);

    const template = parts.length
      ? `<extra-button\n  ${parts.join('\n  ')}\n  (click)="onClick($event)"\n></extra-button>`
      : `<extra-button (click)="onClick($event)"></extra-button>`;

    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивная кнопка со всеми свойствами спецификации (по умолчанию — primary). Используйте Controls для изменения пропсов; click/focus/blur логируются в панель Actions.'
      }
    }
  }
};

// ── Комбинаторные истории ────────────────────────────────────────────────────

export { Variants, Sizes, Icons, States, Rounded, Events };
