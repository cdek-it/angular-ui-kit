import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraConfirmDialogComponent as ConfirmDialogComponent } from '../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogDefaultComponent, Default as DefaultStory } from './examples/confirm-dialog-default.component';
import { ConfirmDialogSeveritiesComponent, Severities } from './examples/confirm-dialog-severities.component';
import { ConfirmDialogSizesComponent, Sizes as SizesStory } from './examples/confirm-dialog-sizes.component';
import { provideExtraConfirmDialog } from '../../../lib/components/confirm-dialog/confirm-dialog.service';

const meta: Meta<ConfirmDialogComponent> = {
  title: 'Components/Overlay/ConfirmDialog',
  component: ConfirmDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ConfirmDialogDefaultComponent,
        ConfirmDialogSeveritiesComponent,
        ConfirmDialogSizesComponent,
      ],
      providers: [provideExtraConfirmDialog()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент для подтверждения действий пользователя.

\`\`\`typescript
import { ExtraConfirmDialogComponent, ExtraConfirmDialogService, provideExtraConfirmDialog } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-confirmdialog' }
  },
  argTypes: {
    key: {
      control: 'text',
      description: 'Идентификатор группы для адресной отправки сообщений.',
      table: {
        category: 'Props',
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xlg'],
      description: 'Размер диалога',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'sm' | 'default' | 'lg' | 'xlg'" }
      }
    },
    severity: {
      control: 'select',
      options: ['default', 'success', 'info', 'warn', 'help', 'danger'],
      description: 'Цветовая схема иконки в заголовке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'success' | 'info' | 'warn' | 'help' | 'danger'" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<ConfirmDialogComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const ConfirmDialog: Story = DefaultStory;

// ── Severities ────────────────────────────────────────────────────────────────

export const SeveritiesStory: Story = Severities;

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = SizesStory;
