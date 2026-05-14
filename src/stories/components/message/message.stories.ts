import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MessageComponent } from '../../../lib/components/message/message.component';
import { MessageSeveritiesComponent, Severities } from './examples/message-severities.component';
import { MessageWithCloseButtonComponent, WithCloseButton } from './examples/message-with-close-button.component';
import { MessageWithContentComponent, WithContent } from './examples/message-with-content.component';

type MessageArgs = MessageComponent;

const meta: Meta<MessageArgs> = {
  title: 'Components/Feedback/Message',
  component: MessageComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MessageComponent,
        MessageSeveritiesComponent,
        MessageWithCloseButtonComponent,
        MessageWithContentComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-message' },
    docs: {
      description: {
        component: `Компонент для отображения встроенных уведомлений с различными уровнями важности.

\`\`\`typescript
import { MessageComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    severity: {
      control: 'select',
      options: ['info', 'success', 'warn', 'error', 'secondary', 'contrast'],
      description: 'Тип сообщения.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'info' },
        type: { summary: "'info' | 'success' | 'warn' | 'error' | 'secondary' | 'contrast'" },
      },
    },
    summary: {
      control: 'text',
      description: 'Заголовок сообщения.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    detail: {
      control: 'text',
      description: 'Подробный текст сообщения.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки. По умолчанию подбирается по severity.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    closable: {
      control: 'boolean',
      description: 'Показывает кнопку закрытия.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    life: {
      control: 'number',
      description: 'Время автоматического закрытия в миллисекундах. 0 — отключено.',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    // ── Events ───────────────────────────────────────────────
    onClose: {
      control: false,
      description: 'Событие закрытия сообщения.',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<Event>' },
      },
    },
  },
  args: {
    severity: 'info',
    summary: 'Message',
    detail: 'caption',
    closable: false,
  },
};

export default meta;
type Story = StoryObj<MessageArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`severity="${args.severity}"`];
    if (args.summary) parts.push(`summary="${args.summary}"`);
    if (args.detail) parts.push(`detail="${args.detail}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.closable) parts.push(`[closable]="true"`);
    if (args.life) parts.push(`[life]="${args.life}"`);

    const template = `<ui-message\n  ${parts.join('\n  ')}\n></ui-message>`;
    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Вариации ─────────────────────────────────────────────────────────────────
export { Severities, WithCloseButton, WithContent };
