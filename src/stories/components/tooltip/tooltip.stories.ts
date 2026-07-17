import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraTooltipDirective as TooltipDirective } from '../../../lib/components/tooltip/tooltip.directive';
import { ExtraButtonComponent as ButtonComponent } from '../../../lib/components/button/button.component';

const meta: Meta<TooltipDirective & { label?: string; isFocused?: boolean }> = {
  title: 'Prime/Form/Tooltip',
  // @ts-ignore
  component: TooltipDirective,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TooltipDirective, ButtonComponent] })],
  parameters: {
    designTokens: { prefix: '--p-tooltip' },
    docs: {
      description: {
        component: `Компонент для отображения информационного текста при наведении на элемент.

\`\`\`typescript
import { ExtraTooltipDirective as TooltipDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    tooltip: {
      control: 'text',
      description: 'Текст внутри подсказки.',
      table: { category: 'Props', type: { summary: 'string' } }
    },
    label: {
      control: 'text',
      description: 'Текст кнопки-примера (не является свойством директивы).',
      table: { category: 'Props', type: { summary: 'string' } }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция подсказки относительно элемента.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'right' },
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" }
      }
    },
    event: {
      control: 'select',
      options: ['hover', 'focus', 'both'],
      description: 'Событие, по которому показывается подсказка.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'hover' },
        type: { summary: "'hover' | 'focus' | 'both'" }
      }
    },
    showDelay: {
      control: 'number',
      description: 'Задержка перед появлением в миллисекундах.',
      table: { category: 'Props', type: { summary: 'number' } }
    },
    hideDelay: {
      control: 'number',
      description: 'Задержка перед скрытием в миллисекундах.',
      table: { category: 'Props', type: { summary: 'number' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает подсказку.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    tooltip: 'Это текст подсказки',
    label: 'Наведи на меня',
    position: 'right',
    event: 'hover',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<TooltipDirective & { label?: string; isFocused?: boolean }>;

const commonTemplate = `
<extra-button
  [extra-tooltip]="tooltip"
  [position]="position"
  [event]="event"
  [showDelay]="showDelay"
  [hideDelay]="hideDelay"
  [disabled]="disabled"
  [label]="label || ''"
>
</extra-button>
`;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.tooltip) parts.push(`extra-tooltip="${args.tooltip}"`);
    if (args.position && args.position !== 'right') parts.push(`position="${args.position}"`);
    if (args.event && args.event !== 'hover') parts.push(`event="${args.event}"`);
    if (args.showDelay) parts.push(`[showDelay]="${args.showDelay}"`);
    if (args.hideDelay) parts.push(`[hideDelay]="${args.hideDelay}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);
    if (args.label) parts.push(`label="${args.label}"`);

    const template = `
<extra-button ${parts.join('\n  ')}></extra-button>
`;
    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Вариации ─────────────────────────────────────────────────────────────────

export const Positions: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    tooltip: 'Подсказка сверху',
    position: 'top',
    label: 'Сверху'
  },
  parameters: {
    docs: {
      description: { story: 'Различные варианты позиционирования (измените через Controls).' },
      source: {
        code: `<extra-button extra-tooltip="Подсказка сверху" position="top" label="Сверху"></extra-button>`
      }
    }
  }
};

export const Delay: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    tooltip: 'Подсказка с задержкой 1с',
    showDelay: 1000,
    label: 'Задержка появления (1с)'
  },
  parameters: {
    docs: {
      description: { story: 'Подсказка может появляться или скрываться с задержкой в миллисекундах.' },
      source: {
        code: `<extra-button extra-tooltip="Подсказка с задержкой 1с" [showDelay]="1000" label="Задержка появления (1с)"></extra-button>`
      }
    }
  }
};

export const EventFocus: Story = {
  name: 'Event',
  render: (args) => ({
    props: args,
    template: `
<input type="text"
  [extra-tooltip]="tooltip"
  [event]="event"
  [placeholder]="label || ''"
  style="padding: 0.5rem 1rem; border: 1px solid var(--p-surface-300); border-radius: var(--p-border-radius); outline: none; transition: border-color 0.2s; color: var(--p-text-color); background: var(--p-surface-0);"
  (focus)="isFocused = true"
  (blur)="isFocused = false"
  [style.borderColor]="isFocused ? 'var(--p-primary-500)' : 'var(--p-surface-300)'"
/>
`
  }),
  args: {
    tooltip: 'Введите ваше имя',
    event: 'focus',
    label: 'Кликни для фокуса',
    isFocused: false
  },
  parameters: {
    docs: {
      description: { story: 'Подсказка может реагировать на фокус элемента вместо наведения.' },
      source: {
        code: `<input type="text" extra-tooltip="Введите ваше имя" event="focus" placeholder="Кликни для фокуса" />`
      }
    }
  }
};
