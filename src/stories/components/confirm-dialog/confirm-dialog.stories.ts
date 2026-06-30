import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraConfirmDialogComponent as ConfirmDialogComponent } from '../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogDefaultComponent, Default as DefaultStory } from './examples/confirm-dialog-default.component';
import { ConfirmDialogSeveritiesComponent, Severities } from './examples/confirm-dialog-severities.component';
import { ConfirmDialogSizesComponent, Sizes as SizesStory } from './examples/confirm-dialog-sizes.component';
import {
  ConfirmDialogTemplatesComponent,
  Templates as TemplatesStory
} from './examples/confirm-dialog-templates.component';
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
        ConfirmDialogTemplatesComponent
      ],
      providers: [provideExtraConfirmDialog()]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент для подтверждения действий пользователя.

Шаблоны (передаются между тегами компонента):
- \`extraConfirmDialogHeader\` — кастомный заголовок
- \`extraConfirmDialogFooter\` — кастомный футер

Контекст шаблонов: \`let-message\`, \`let-onAccept="onAccept"\`, \`let-onReject="onReject"\`.

\`\`\`typescript
import { ExtraConfirmDialogComponent, ExtraConfirmDialogService, provideExtraConfirmDialog } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
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
      options: ['default', 'success', 'info', 'warning', 'help', 'danger'],
      description: 'Цветовая схема иконки в заголовке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'success' | 'info' | 'warning' | 'help' | 'danger'" }
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

// ── Templates ─────────────────────────────────────────────────────────────────

export const Templates: Story = TemplatesStory;
