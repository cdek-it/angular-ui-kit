import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MessageService } from 'primeng/api';
import { ToastComponent } from '../../../lib/components/toast/toast.component';
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
        ToastSeveritiesComponent,
        ToastWithCloseButtonComponent,
        ToastWithContentComponent,
        ToastWidthComponent,
        ToastPositionComponent,
      ],
      providers: [MessageService],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-toast' },
    docs: {
      description: {
        component: `Компонент для отображения всплывающих уведомлений поверх интерфейса. Требует подключения \`UiToastService\`.

\`\`\`typescript
import { ToastComponent, UiToastService } from '@cdek-it/angular-ui-kit';
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
      table: { disable: true },
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

// ── Re-exports from example components ────────────────────────────────────
export { Severities as Default, WithCloseButton, WithContent, Width, Position };
