import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../lib/components/message/message.component';
import { MessageSeverityComponent, Severity } from './examples/message-severity.component';
import { MessageIconComponent, WithIcon } from './examples/message-icon.component';
import { MessageCloseComponent, WithClose } from './examples/message-close.component';
import { MessageSlotsComponent, Slots } from './examples/message-slots.component';
import { MessageTimerComponent, Timer } from './examples/message-timer.component';

type MessageArgs = ExtraMessageComponent;

const meta: Meta<MessageArgs> = {
  title: 'Components/Feedback/Message',
  component: ExtraMessageComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraMessageComponent,
        MessageSeverityComponent,
        MessageIconComponent,
        MessageCloseComponent,
        MessageSlotsComponent,
        MessageTimerComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-message' },
    docs: {
      description: {
        component: `Сообщение-уведомление.

Реализован по спецификации \`docs/components-api/message.md\`.

\`\`\`typescript
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/message.md) ───────────────
    severity: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Тип сообщения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'info'" },
        type: { summary: "'info' | 'success' | 'warning' | 'danger'" }
      }
    },
    timer: {
      control: 'boolean',
      description: 'Таймер автоскрытия (3 секунды)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    message: {
      control: 'text',
      description: 'Заголовок сообщения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    caption: {
      control: 'text',
      description: 'Пояснение сообщения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'text',
      description:
        'Класс иконки tabler icon (вместо стандартной для severity). null скрывает иконку; не задан — стандартная по severity',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | null' }
      }
    },
    showClose: {
      control: 'boolean',
      description: 'Кнопка закрытия',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── События ─────────────────────────────────────────────────
    onClose: {
      control: false,
      description: 'Срабатывает при закрытии сообщения (крестиком или по таймеру)',
      action: 'onClose',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    }
  },
  args: {
    severity: 'info',
    timer: false,
    message: 'Message',
    caption: 'caption',
    icon: undefined,
    showClose: false
  }
};

export default meta;
type Story = StoryObj<MessageArgs>;

// ── Info (интерактивная) ─────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Info',
  render: (args) => {
    const parts: string[] = [];
    if (args.message) parts.push(`message="${args.message}"`);
    if (args.severity && args.severity !== 'info') parts.push(`severity="${args.severity}"`);
    if (args.caption) parts.push(`caption="${args.caption}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.showClose) parts.push(`[showClose]="true"`);
    if (args.timer) parts.push(`[timer]="true"`);

    const template = parts.length
      ? `<extra-message\n  ${parts.join('\n  ')}\n  (onClose)="onClose()"\n></extra-message>`
      : `<extra-message (onClose)="onClose()"></extra-message>`;

    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное сообщение со всеми свойствами спецификации (по умолчанию — info). Используйте Controls для изменения пропсов; onClose логируется в панель Actions.'
      }
    }
  }
};

// ── Комбинаторные истории ────────────────────────────────────────────────────

export { Severity, WithIcon, WithClose, Slots, Timer };
