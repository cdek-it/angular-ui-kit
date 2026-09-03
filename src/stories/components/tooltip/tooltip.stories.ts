import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraTooltipDirective as TooltipDirective } from '../../../lib/components/tooltip/tooltip.directive';
import { ExtraButtonComponent as ButtonComponent } from '../../../lib/components/button/button.component';
import { ExtraInputTextComponent } from '../../../lib/components/inputtext/inputtext.component';

type TooltipArgs = TooltipDirective & { label?: string };

const meta: Meta<TooltipArgs> = {
  title: 'Components/Overlay/Tooltip',
  // @ts-ignore — component ожидает компонент, а тут атрибутная директива
  component: TooltipDirective,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TooltipDirective, ButtonComponent, ExtraInputTextComponent] })],
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
    tooltipDisabled: {
      control: 'boolean',
      description: 'Отключает подсказку. Названо не `disabled`, чтобы не конфликтовать с одноимённым свойством хост-компонента.',
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
    tooltipDisabled: false
  }
};

export default meta;
type Story = StoryObj<TooltipArgs>;

const commonTemplate = `
<extra-button
  [extra-tooltip]="tooltip"
  [position]="position"
  [event]="event"
  [showDelay]="showDelay"
  [hideDelay]="hideDelay"
  [tooltipDisabled]="tooltipDisabled"
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
    if (args.tooltipDisabled) parts.push(`[tooltipDisabled]="true"`);
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
  render: () => ({
    template: `
<div class="grid grid-cols-2 gap-4 p-24">
  <div class="flex items-center justify-center min-h-30">
    <extra-button extra-tooltip="Подсказка сверху" position="top" label="Top"></extra-button>
  </div>
  <div class="flex items-center justify-center min-h-30">
    <extra-button extra-tooltip="Подсказка справа" position="right" label="Right"></extra-button>
  </div>
  <div class="flex items-center justify-center min-h-30">
    <extra-button extra-tooltip="Подсказка снизу" position="bottom" label="Bottom"></extra-button>
  </div>
  <div class="flex items-center justify-center min-h-30">
    <extra-button extra-tooltip="Подсказка слева" position="left" label="Left"></extra-button>
  </div>
</div>
`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Подсказка позиционируется относительно хост-элемента (top/right/bottom/left). ' +
          'Если в выбранной позиции не хватает места, PrimeNG автоматически переключается на ближайшую подходящую.'
      },
      source: {
        code: `<extra-button extra-tooltip="Подсказка сверху" position="top" label="Top"></extra-button>
<extra-button extra-tooltip="Подсказка справа" position="right" label="Right"></extra-button>
<extra-button extra-tooltip="Подсказка снизу" position="bottom" label="Bottom"></extra-button>
<extra-button extra-tooltip="Подсказка слева" position="left" label="Left"></extra-button>`
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
<span class="inline-block" [extra-tooltip]="tooltip" [event]="event">
  <extra-input-text [placeholder]="label || ''"></extra-input-text>
</span>
`
  }),
  args: {
    tooltip: 'Введите ваше имя',
    event: 'focus',
    label: 'Кликни для фокуса'
  },
  parameters: {
    docs: {
      description: { story: 'Подсказка может реагировать на фокус элемента вместо наведения.' },
      source: {
        code: `<span extra-tooltip="Введите ваше имя" event="focus">
  <extra-input-text placeholder="Кликни для фокуса"></extra-input-text>
</span>`
      }
    }
  }
};
