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
  tags: ['autodocs', 'button'],
  decorators: [moduleMetadata({ imports: [ExtraButtonComponent] })],
  render: (args) => renderButton(args),
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_code: string, context: { args: ButtonRenderArgs }) => buttonSource(context.args)
      },
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
      if: { arg: 'iconOnly', truthy: false },
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
      if: { arg: 'iconOnly', truthy: false },
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

const BUTTON_INPUTS = [
  'label',
  'severity',
  'variant',
  'size',
  'icon',
  'iconPosition',
  'iconOnly',
  'rounded',
  'fluid',
  'disabled',
  'loading',
  'showBadge',
  'badge',
  'badgeSeverity',
  'ariaLabel',
  'autofocus',
  'tabindex'
] as const;
type ButtonRenderArgs = Partial<Pick<ButtonArgs, (typeof BUTTON_INPUTS)[number]>>;
const BUTTON_DEFAULTS: ButtonRenderArgs = {
  label: '',
  severity: 'base',
  variant: 'primary',
  size: 'base',
  icon: '',
  iconPosition: 'left',
  iconOnly: false,
  rounded: false,
  fluid: false,
  disabled: false,
  loading: false,
  showBadge: false,
  badge: '',
  badgeSeverity: null,
  autofocus: false
};
const buttonSource = (args: ButtonRenderArgs): string => {
  const parts: string[] = [];
  for (const key of BUTTON_INPUTS) {
    const value = args[key] ?? BUTTON_DEFAULTS[key];
    if (value === undefined || value === BUTTON_DEFAULTS[key]) continue;
    if (typeof value === 'boolean' || typeof value === 'number') parts.push('[' + key + ']="' + value + '"');
    else
      parts.push(
        key + '="' + String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;') + '"'
      );
  }
  return '<extra-button' + (parts.length ? '\n  ' + parts.join('\n  ') : '') + '\n></extra-button>';
};
const renderButton = (args: ButtonRenderArgs) => ({
  props: { ...args, ...Object.fromEntries(BUTTON_INPUTS.map((key) => [key, args[key] ?? BUTTON_DEFAULTS[key]])) },
  template: '<extra-button ' + BUTTON_INPUTS.map((key) => '[' + key + ']="' + key + '"').join(' ') + '></extra-button>'
});

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true } };

export const Rounded: Story = {
  args: { rounded: true },
  parameters: {
    docs: {
      description: {
        story:
          'Скруглённая форма (rounded): варианты отображения при severity="base", семантические состояния (severity, variant="primary") и variant="outlined" × severity (контурная скруглённая кнопка).'
      }
    }
  }
};

export const Icon: Story = { args: { icon: 'ti ti-check' } };

export const IconRight: Story = { args: { icon: 'ti ti-check', iconPosition: 'right' } };

export const IconOnly: Story = { args: { icon: 'ti ti-check', iconOnly: true, ariaLabel: 'Button' } };

export const Badge: Story = {
  args: { showBadge: true, badge: '2' },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж поверх кнопки (`showBadge` + `badge` + `badgeSeverity`) — например, для счётчиков уведомлений.'
      }
    }
  }
};

export const Fluid: Story = {
  args: { fluid: true },
  parameters: {
    docs: {
      description: {
        story:
          'Растягивание на всю ширину контейнера (fluid). При `[fluid]="true"` кнопка занимает 100% ширины родителя — удобно для форм и мобильных раскладок. Контейнер в примере ограничен шириной 320px, чтобы эффект был нагляден.'
      }
    }
  }
};
