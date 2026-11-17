import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ExtraMessageComponent, ExtraMessageTemplateDirective } from '../../../lib/components/message/public_api';

type MessageArgs = Omit<Partial<ExtraMessageComponent>, 'onClose'> & { onClose: () => void };

const escapeAttribute = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');

const templateFor = (args: MessageArgs, withFooter = false): string => {
  const parts = ['severity="' + args.severity + '"'];
  for (const name of ['message', 'caption'] as const) {
    if (args[name]) parts.push(name + '="' + escapeAttribute(args[name]) + '"');
  }
  if (args.icon !== undefined) parts.push('icon="' + escapeAttribute(args.icon) + '"');
  for (const name of ['showClose', 'showTimer', 'fluid'] as const) {
    if (args[name]) parts.push('[' + name + ']="true"');
  }
  if (args.size && args.size !== 'base') parts.push('size="' + args.size + '"');
  parts.push('(onClose)="onClose()"');
  const footer = withFooter
    ? '\n  >\n  <ng-template extraMessageTemplate="footer">\n    <button type="button" class="message-footer-action">Повторить</button>\n  </ng-template>\n</extra-message>'
    : '\n></extra-message>';
  return '<extra-message\n  ' + parts.join('\n  ') + footer;
};

const meta: Meta<MessageArgs> = {
  title: 'Components/Feedback/Message',
  component: ExtraMessageComponent,
  tags: ['autodocs', 'message'],
  decorators: [moduleMetadata({ imports: [ExtraMessageComponent, ExtraMessageTemplateDirective] })],
  parameters: {
    designTokens: { prefix: '--p-message' },
    docs: {
      description: {
        component: `Сообщение-уведомление.

Реализован по спецификации \`docs/components-api/message.md\`.

\`\`\`typescript
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: MessageArgs }) => templateFor(context.args)
      }
    }
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Тип сообщения'
    },
    showTimer: { control: 'boolean', description: 'Таймер автоскрытия (3 секунды)' },
    message: { control: 'text', description: 'Заголовок сообщения' },
    caption: { control: 'text', description: 'Пояснение сообщения' },
    icon: {
      control: 'text',
      description:
        'Класс иконки tabler icon (вместо стандартной для severity). Пустая строка скрывает иконку; не задан — стандартная по severity'
    },
    showClose: { control: 'boolean', description: 'Кнопка закрытия' },
    size: { control: 'select', options: ['small', 'base', 'large', 'xlarge'], description: 'Ширина сообщения' },
    fluid: { control: 'boolean', description: 'Растягивает сообщение на всю ширину контейнера' },
    onClose: { control: false, description: 'Срабатывает при закрытии сообщения (крестиком или по таймеру)' }
  },
  args: {
    severity: 'info',
    showTimer: false,
    message: 'Message',
    caption: '',
    icon: undefined,
    showClose: false,
    size: 'base',
    fluid: false,
    onClose: fn()
  }
};
export default meta;
type Story = StoryObj<MessageArgs>;

export const Default: Story = {
  args: {},
  render: (args) => ({ props: args, template: templateFor(args) }),
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивное сообщение со всеми свойствами спецификации (по умолчанию — info). Используйте Controls для изменения пропсов; onClose логируется в панель Actions.'
      }
    }
  }
};

export const Success: Story = {
  args: { severity: 'success', message: 'Успешно сохранено' },
  render: (args) => ({ props: args, template: templateFor(args) })
};

export const Warning: Story = {
  args: { severity: 'warning', message: 'Проверьте данные' },
  render: (args) => ({ props: args, template: templateFor(args) })
};

export const Danger: Story = {
  args: { severity: 'danger', message: 'Не удалось сохранить' },
  render: (args) => ({ props: args, template: templateFor(args) })
};

export const Timer: Story = {
  args: { showTimer: true },
  render: (args) => ({ props: args, template: templateFor(args) }),
  parameters: {
    docs: {
      description: {
        story:
          'Таймер автоскрытия ([showTimer]="true", 3 секунды) — сообщение исчезает само; onClose срабатывает и при автоскрытии, и при закрытии крестиком. Кнопка «Показать снова» возвращает сообщения.'
      }
    }
  }
};

export const WithClose: Story = {
  args: { showClose: true },
  render: (args) => ({ props: args, template: templateFor(args) }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка закрытия ([show-close]="true") во всех severity. При закрытии срабатывает событие onClose.'
      }
    }
  }
};

export const WithIcon: Story = {
  args: { icon: 'ti ti-heart' },
  render: (args) => ({ props: args, template: templateFor(args) }),
  parameters: {
    docs: {
      description: {
        story:
          'Иконка tabler icon: не задана — стандартная по severity; своя — через icon; пустая строка (icon="") скрывает иконку.'
      }
    }
  }
};

export const Slots: Story = {
  args: { message: 'Сообщение с действием' },
  render: (args) => ({ props: args, template: templateFor(args, true) }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот content — любой проецируемый контент после caption (без атрибутов). Слот footer — через директиву extraMessageTemplate="footer", например кнопки действий.'
      }
    }
  }
};
