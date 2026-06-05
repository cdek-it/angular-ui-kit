import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ExtraToastComponent } from '../../../lib/components/toast/toast.component';
import { provideExtraToast } from '../../../lib/components/toast/provide-toast';
import { Severities, ToastSeveritiesComponent } from './examples/toast-severities.component';
import { ToastWithCloseButtonComponent, WithCloseButton } from './examples/toast-with-close-button.component';
import { ToastWithContentComponent, WithContent } from './examples/toast-with-content.component';
import { ToastWidthComponent, Width } from './examples/toast-width.component';
import { Position, ToastPositionComponent } from './examples/toast-position.component';

const meta: Meta<ExtraToastComponent> = {
  title: 'Components/Feedback/Toast',
  component: ExtraToastComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideExtraToast()] }),
    moduleMetadata({
      imports: [
        ExtraToastComponent,
        ToastSeveritiesComponent,
        ToastWithCloseButtonComponent,
        ToastWithContentComponent,
        ToastWidthComponent,
        ToastPositionComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-toast' },
    docs: {
      description: {
        component: `Компонент для отображения всплывающих уведомлений поверх интерфейса.

## Подключение

Добавьте \`provideExtraToast()\` в провайдеры приложения:

\`\`\`typescript
// app.config.ts
import { provideExtraToast } from '@cdek-it/angular-ui-kit';

export const appConfig: ApplicationConfig = {
  providers: [provideExtraToast()],
};
\`\`\`

## Использование

\`\`\`typescript
import { ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

@Component({
  imports: [ExtraToastComponent],
  template: \`<extra-toast />\`,
})
export class AppComponent {
  private toast = inject(ExtraToastService);

  show() {
    this.toast.add({ severity: 'success', summary: 'Готово', detail: 'Операция выполнена успешно' });
  }
}
\`\`\``
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center', 'center'],
      description: 'Позиция тоста на экране.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'top-right' },
        type: {
          summary:
            "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center' | 'center'"
        }
      }
    },
    key: {
      table: { disable: true }
    },
    life: {
      control: 'number',
      description: 'Время (мс) до автоматического закрытия тоста.',
      table: {
        category: 'Props',
        defaultValue: { summary: '5000' },
        type: { summary: 'number' }
      }
    }
  },
  args: {
    position: 'top-right',
    key: undefined,
    life: 5000
  }
};

export default meta;

// ── Re-exports from example components ────────────────────────────────────
export { Severities as Default, WithCloseButton, WithContent, Width, Position };
