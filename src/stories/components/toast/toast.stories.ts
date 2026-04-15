import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { ToastComponent } from '../../../lib/components/toast/toast.component';
import { ToastDefaultComponent } from './examples/toast-default.component';
import { ToastSeveritiesComponent, Severities } from './examples/toast-severities.component';
import { ToastWithCloseButtonComponent, WithCloseButton } from './examples/toast-with-close-button.component';
import { ToastWithContentComponent, WithContent } from './examples/toast-with-content.component';
import { ToastWidthComponent, Width } from './examples/toast-width.component';
import { ToastPositionComponent, Position } from './examples/toast-position.component';

const meta: Meta<ToastComponent> = {
  title: 'Components/Feedback/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ToastComponent,
        ToastDefaultComponent,
        ToastSeveritiesComponent,
        ToastWithCloseButtonComponent,
        ToastWithContentComponent,
        ToastWidthComponent,
        ToastPositionComponent,
        Toast,
        Button,
      ],
      providers: [MessageService],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-toast' },
    docs: {
      description: {
        component: `Компонент для отображения всплывающих уведомлений поверх интерфейса. Требует подключения \`MessageService\`.

\`\`\`typescript
import { ToastComponent } from '@cdek-it/angular-ui-kit';
import { MessageService } from 'primeng/api';

@Component({
  providers: [MessageService],
})
export class MyComponent {
  constructor(private messageService: MessageService) {}

  show(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon: 'ti ti-info-circle',
    });
  }
}
\`\`\``,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center', 'center'],
      description: 'Позиция тоста на экране.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'top-right' },
        type: { summary: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center' | 'center'" },
      },
    },
    key: {
      control: 'text',
      description: 'Ключ для адресной отправки сообщений через MessageService.',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    life: {
      control: 'number',
      description: 'Время (мс) до автоматического закрытия тоста.',
      table: {
        category: 'Props',
        defaultValue: { summary: '5000' },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    position: 'top-right',
    key: undefined,
    life: 5000,
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: {
      position: args.position,
      life: args.life,
    },
    template: `<app-toast-default [position]="position" [life]="life"></app-toast-default>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для изменения позиции и времени жизни тоста.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { Severities, WithCloseButton, WithContent, Width, Position };
