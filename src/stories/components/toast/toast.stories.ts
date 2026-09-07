import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ExtraToastComponent } from '../../../lib/components/toast/toast.component';
import { provideExtraToast } from '../../../lib/components/toast/provide-toast';
import { Severities, ToastSeveritiesComponent } from './examples/toast-severities.component';
import { ToastWithCloseButtonComponent, WithCloseButton } from './examples/toast-with-close-button.component';
import { Slots, ToastSlotsComponent } from './examples/toast-slots.component';
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
        ToastSlotsComponent,
        ToastWidthComponent,
        ToastPositionComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-toast' },
    docs: {
      description: {
        component: `Всплывающее уведомление поверх интерфейса — overlay-вариант \`ExtraMessage\`.

Реализован по спецификации [toast.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/toast.md).

\`\`\`typescript
import { ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';
\`\`\`

Контейнер \`<extra-toast>\` монтируется один раз (обычно в корне приложения), а показ каждого уведомления выполняется императивно через \`ExtraToastService.add({...})\` — свойства спецификации (\`severity\`/\`timer\`/\`message\`/\`caption\`/\`icon\`/\`show-close\`), слоты (\`content\`/\`footer\`) и событие \`onClose\` передаются полем в этом объекте, а не как \`@Input()\`/\`@Output()\` самого контейнера.

## Подключение

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
    this.toast.add({ severity: 'success', message: 'Готово', caption: 'Операция выполнена успешно' });
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
      description: 'Позиция группы уведомлений на экране',
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
      description: 'Время (мс) до автоматического закрытия — общий дефолт контейнера, переопределяется полем `life` сообщения',
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
export { Severities as Default, WithCloseButton, Slots, Width, Position };
