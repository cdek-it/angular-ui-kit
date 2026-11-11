import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../lib/components/button/button.component';

type ButtonArgs = ExtraButtonComponent & {
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: ExtraButtonComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ExtraButtonComponent] })],
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
    label: 'Button',
    variant: 'primary',
    severity: 'base',
    size: 'base',
    icon: '',
    iconPosition: 'left',
    iconOnly: false,
    rounded: false,
    disabled: false,
    loading: false,
    fluid: false,
    showBadge: false,
    badge: '',
    badgeSeverity: null,
    autofocus: false
  }
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// Шаблон собирается из args; disabled и loading, как и у потребителя, задаются привязкой
const renderButton = (args: Partial<ButtonArgs> | Record<string, unknown>) => {
  const a = args as Partial<ButtonArgs>;
  const parts: string[] = [];

  if (a.label) parts.push(`label="${a.label}"`);
  if (a.severity && a.severity !== 'base') parts.push(`severity="${a.severity}"`);
  if (a.variant && a.variant !== 'primary') parts.push(`variant="${a.variant}"`);
  if (a.size && a.size !== 'base') parts.push(`size="${a.size}"`);
  if (a.icon) parts.push(`icon="${a.icon}"`);
  if (a.iconPosition && a.iconPosition !== 'left') parts.push(`iconPosition="${a.iconPosition}"`);
  if (a.iconOnly) parts.push(`[iconOnly]="true"`);
  if (a.rounded) parts.push(`[rounded]="true"`);
  if (a.fluid) parts.push(`[fluid]="true"`);
  if (a.disabled) parts.push(`[disabled]="true"`);
  if (a.loading) parts.push(`[loading]="true"`);
  if (a.showBadge) parts.push(`[showBadge]="true"`);
  if (a.badge) parts.push(`badge="${a.badge}"`);
  if (a.badgeSeverity) parts.push(`badgeSeverity="${a.badgeSeverity}"`);
  if (a.ariaLabel) parts.push(`ariaLabel="${a.ariaLabel}"`);
  if (a.autofocus) parts.push(`[autofocus]="true"`);
  if (a.tabindex != null) parts.push(`[tabindex]="${a.tabindex}"`);

  const template = parts.length
    ? `<extra-button\n  ${parts.join('\n  ')}\n></extra-button>`
    : `<extra-button></extra-button>`;

  return { props: args, template };
};

const story = (name: string, description: string, code: string, args: Story['args'] = {}): Story => ({
  name,
  args,
  render: (a) => renderButton(a),
  parameters: { docs: { description: { story: description }, source: { language: 'html', code } } }
});

export const Default: Story = story(
  'Default',
  'Базовая кнопка. Вариант, severity, размер, иконка и остальные свойства меняются в Controls. Нативные DOM-события (click, keydown и т. п.) вешаются на кнопку напрямую, focus и blur объявлены событиями компонента.',
  `<extra-button label="Button"></extra-button>

<!-- события -->
<extra-button label="Button" (click)="onClick($event)" (focus)="onFocus($event)" (blur)="onBlur($event)"></extra-button>`
);

export const Disabled: Story = story(
  'Disabled',
  'Отключённая кнопка: события не приходят, фокус не принимается.',
  `<extra-button label="Button" [disabled]="true"></extra-button>`,
  { disabled: true }
);

export const Loading: Story = story(
  'Loading',
  'Состояние загрузки: вместо иконки показывается индикатор, клики блокируются.',
  `<extra-button label="Button" [loading]="true"></extra-button>`,
  { loading: true }
);

export const Rounded: Story = story(
  'Rounded',
  'Полностью скруглённая форма.',
  `<extra-button label="Button" [rounded]="true"></extra-button>`,
  { rounded: true }
);

export const Icon: Story = story(
  'Icon',
  'Иконка слева от текста (iconPosition="left").',
  `<extra-button label="Button" icon="ti ti-check"></extra-button>`,
  { icon: 'ti ti-check' }
);

export const IconRight: Story = story(
  'IconRight',
  'Иконка справа от текста (iconPosition="right").',
  `<extra-button label="Button" icon="ti ti-check" iconPosition="right"></extra-button>`,
  { icon: 'ti ti-check', iconPosition: 'right' }
);

export const IconOnly: Story = story(
  'IconOnly',
  'Только иконка. Укажите ariaLabel: текста у кнопки нет.',
  `<extra-button icon="ti ti-check" [iconOnly]="true" ariaLabel="Button"></extra-button>`,
  { icon: 'ti ti-check', iconOnly: true, ariaLabel: 'Button' }
);

export const Badge: Story = story(
  'Badge',
  'Бейдж на кнопке. Цвет задаётся badgeSeverity.',
  `<extra-button label="Button" [showBadge]="true" badge="2"></extra-button>`,
  { showBadge: true, badge: '2' }
);

export const Fluid: Story = story(
  'Fluid',
  'Кнопка занимает всю ширину контейнера.',
  `<extra-button label="Button" [fluid]="true"></extra-button>`,
  { fluid: true }
);
