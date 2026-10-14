import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../lib/components/button/button.component';
import { ButtonSizesComponent, Sizes } from './examples/button-sizes.component';
import { ButtonVariantsComponent, Variants } from './examples/button-variants.component';
import { ButtonIconsComponent, Icons } from './examples/button-icons.component';
import { ButtonStatesComponent, States } from './examples/button-states.component';
import { ButtonRoundedComponent, Rounded } from './examples/button-rounded.component';
import { Badge, ButtonBadgeComponent } from './examples/button-badge.component';
import { ButtonFluidComponent, Fluid } from './examples/button-fluid.component';
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
        ButtonSizesComponent,
        ButtonVariantsComponent,
        ButtonIconsComponent,
        ButtonStatesComponent,
        ButtonRoundedComponent,
        ButtonBadgeComponent,
        ButtonFluidComponent,
        ButtonEventsComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Интерактивный элемент интерфейса. Используется для инициации действий, отправки форм и навигации.

Помимо перечисленных свойств, на кнопку можно вешать нативные DOM-события (\`click\`, \`focus\`, \`blur\`, \`keydown\` и т.п.) напрямую; \`focus\` и \`blur\` также объявлены как типизированные события компонента.

\`\`\`typescript
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    label: {
      control: 'text',
      description: 'Текст кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    severity: {
      control: 'select',
      options: ['base', 'danger', 'warning', 'success', 'info'],
      description: 'Семантический вариант кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'base' | 'danger' | 'warning' | 'success' | 'info'" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outlined', 'text', 'link'],
      description: 'Вариант отображения кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'tertiary' | 'outlined' | 'text' | 'link'" }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например: ti ti-check)',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки относительно текста',
      table: {
        category: 'Props',
        defaultValue: { summary: 'left' },
        type: { summary: "'left' | 'right'" }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Только иконка, без текста',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    rounded: {
      control: 'boolean',
      description: 'Скруглённая форма кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки с индикатором',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивать ли кнопку на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Метка для экранных дикторов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' }
      }
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при загрузке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    tabindex: {
      control: 'number',
      description: 'Порядок фокуса',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    },
    // ── Badge ────────────────────────────────────────────────
    badge: {
      control: 'text',
      description: 'Значение бейджа',
      table: {
        category: 'Badge',
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    },
    badgeSeverity: {
      control: 'select',
      options: [null, 'success', 'info', 'warning', 'danger', 'secondary', 'contrast'],
      description: 'Цветовая схема бейджа',
      table: {
        category: 'Badge',
        defaultValue: { summary: 'null' },
        type: { summary: "'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null" }
      }
    },
    showBadge: {
      control: 'boolean',
      description: 'Показывать ли бейдж',
      table: {
        category: 'Badge',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── Events ───────────────────────────────────────────────
    focus: {
      control: false,
      description: 'Кнопка получила фокус',
      action: 'focus',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    blur: {
      control: false,
      description: 'Кнопка потеряла фокус',
      action: 'blur',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    onClick: {
      control: false,
      description: 'Событие клика по кнопке',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<MouseEvent>' }
      }
    }
  },
  args: {
    iconPosition: 'left',
    severity: 'base',
    showBadge: false,
    badge: '',
    badgeSeverity: null,
    fluid: false,
    autofocus: false
  }
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label != null && args.label !== '') parts.push(`label="${args.label}"`);
    if (args.severity != null && args.severity !== 'base') parts.push(`severity="${args.severity}"`);
    if (args.variant != null) parts.push(`variant="${args.variant}"`);
    if (args.size != null) parts.push(`size="${args.size}"`);
    if (args.icon != null && (args.icon as string) !== '') parts.push(`icon="${args.icon}"`);
    if (args.iconPosition != null && args.iconPosition !== 'left') parts.push(`iconPosition="${args.iconPosition}"`);
    if (args.iconOnly) parts.push(`[iconOnly]="true"`);
    if (args.rounded) parts.push(`[rounded]="true"`);
    if (args.fluid) parts.push(`[fluid]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.loading) parts.push(`[loading]="true"`);
    if (args.showBadge) parts.push(`[showBadge]="true"`);
    if (args.badge) parts.push(`badge="${args.badge}"`);
    if (args.badgeSeverity != null) parts.push(`badgeSeverity="${args.badgeSeverity}"`);
    if (args.ariaLabel) parts.push(`ariaLabel="${args.ariaLabel}"`);
    if (args.autofocus) parts.push(`[autofocus]="true"`);
    if (args.tabindex != null) parts.push(`[tabindex]="${args.tabindex}"`);

    const template = parts.length
      ? `<extra-button\n  ${parts.join('\n  ')}\n></extra-button>`
      : `<extra-button></extra-button>`;

    return { props: args, template };
  },
  args: {
    label: 'Button'
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

export { Sizes, Variants, Icons, States, Rounded, Badge, Fluid, Events };
