import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../lib/components/button/button.component';
import { ButtonSizesComponent, Sizes } from './examples/button-sizes.component';
import { ButtonTextComponent, Text } from './examples/button-text.component';
import { ButtonSeverityComponent, Severity } from './examples/button-severity.component';
import { ButtonRoundedComponent, Rounded } from './examples/button-rounded.component';
import { ButtonOutlinedComponent, Outlined } from './examples/button-outlined.component';
import { ButtonLoadingComponent, Loading } from './examples/button-loading.component';
import { ButtonIconComponent, Icon } from './examples/button-icon.component';
import { Extra } from './examples/button-extra.component';
import { ButtonDisabledComponent, Disabled } from './examples/button-disabled.component';
import { Base, ButtonBaseComponent } from './examples/button-base.component';
import { Badge, ButtonBadgeComponent } from './examples/button-badge.component';

type ButtonArgs = ExtraButtonComponent & { onClick?: (event: MouseEvent) => void };

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: ExtraButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraButtonComponent,
        ButtonSizesComponent,
        ButtonBadgeComponent,
        ButtonBaseComponent,
        ButtonDisabledComponent,
        ButtonIconComponent,
        ButtonLoadingComponent,
        ButtonOutlinedComponent,
        ButtonRoundedComponent,
        ButtonSeverityComponent,
        ButtonSizesComponent,
        ButtonTextComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Интерактивный элемент интерфейса. Используется для инициации действий, отправки форм и навигации.

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
        defaultValue: { summary: 'Button' },
        type: { summary: 'string' }
      }
    },
    severity: {
      control: 'select',
      options: [null, 'success', 'info', 'warning', 'danger'],
      description: 'Семантический вариант кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: "'success' | 'info' | 'warning' | 'danger' | null" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text', 'link'],
      description: 'Вариант отображения кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'outlined' | 'text' | 'link'" }
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
    iconPos: {
      control: 'select',
      options: [null, 'prefix', 'postfix'],
      description: 'Позиция иконки относительно текста',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: "'prefix' | 'postfix' | null" }
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
    text: {
      control: 'boolean',
      description: 'Текстовый вариант кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
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
    showBadge: false,
    badge: '',
    badgeSeverity: null,
    fluid: false,
    autofocus: false,
    text: false
  }
};

const commonTemplate = `
<extra-button
  [label]="label"
  [variant]="variant"
  [severity]="severity"
  [size]="size"
  [rounded]="rounded"
  [iconPos]="iconPos"
  [iconOnly]="iconOnly"
  [icon]="icon"
  [disabled]="disabled"
  [loading]="loading"
  [badge]="badge"
  [badgeSeverity]="badgeSeverity"
  [showBadge]="showBadge"
  [fluid]="fluid"
  [ariaLabel]="ariaLabel"
  [autofocus]="autofocus"
  [tabindex]="tabindex"
  [text]="text"
></extra-button>
`;

export default meta;
type Story = StoryObj<ButtonArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label != null && args.label !== '') parts.push(`label="${args.label}"`);
    if (args.severity != null) parts.push(`severity="${args.severity}"`);
    if (args.variant != null) parts.push(`variant="${args.variant}"`);
    if (args.size != null) parts.push(`size="${args.size}"`);
    if (args.icon != null && (args.icon as string) !== '') parts.push(`icon="${args.icon}"`);
    if (args.iconPos != null) parts.push(`iconPos="${args.iconPos}"`);
    if (args.rounded) parts.push(`[rounded]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.loading) parts.push(`[loading]="true"`);

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

export { Sizes, Text, Severity, Rounded, Outlined, Loading, Icon, Extra, Disabled, Base, Badge };
