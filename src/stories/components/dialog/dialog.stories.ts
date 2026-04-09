import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DialogComponent } from '../../../lib/components/dialog/dialog.component';
import { DialogDefaultComponent } from './examples/dialog-default.component';
import { DialogSmallComponent } from './examples/dialog-small.component';
import { DialogLargeComponent } from './examples/dialog-large.component';
import { DialogExtraLargeComponent } from './examples/dialog-extra-large.component';
import { DialogNoModalComponent } from './examples/dialog-no-modal.component';
import { DialogNoHeaderComponent } from './examples/dialog-no-header.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/Overlay/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Dialog (модальное окно) — это контейнер, который отображается поверх основного содержимого страницы.

\`\`\`typescript
import { DialogComponent } from '@your-lib/dialog';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-dialog' },
  },
  argTypes: {
    header: {
      control: 'text',
      description: 'Заголовок окна',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xlg'],
      description: 'Размер диалога',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'sm' | 'default' | 'lg' | 'xlg'" },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Должно ли окно быть модальным (блокировать фон)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    dismissableMask: {
      control: 'boolean',
      description: 'Закрывать ли окно при клике на маску',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Закрывать ли окно по нажатию Escape',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showHeader: {
      control: 'boolean',
      description: 'Отображать ли заголовок',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    focusOnShow: {
      control: 'boolean',
      description: 'Фокус на первый элемент при открытии',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    visibleChange: {
      control: false,
      description: 'Изменение видимости диалога',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<boolean>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogComponent>;

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  name: 'Basic',
  decorators: [moduleMetadata({ imports: [DialogDefaultComponent] })],
  render: () => ({ template: `<app-dialog-default></app-dialog-default>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример диалогового окна с заголовком, текстом и кнопками.',
      },
      source: {
        code: `
<p-button (onClick)="visible = true" label="Open Dialog"></p-button>

<dialog header="Dialog Header" [visible]="visible" (visibleChange)="visible = $event">
  <p>Lorem ipsum dolor sit amet...</p>
  <ng-template #dialogFooter>
    <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
    <p-button label="Сохранить" (onClick)="visible = false"></p-button>
  </ng-template>
</dialog>`,
      },
    },
  },
};

// ── Small ─────────────────────────────────────────────────────────────────────

export const Small: Story = {
  name: 'Small',
  decorators: [moduleMetadata({ imports: [DialogSmallComponent] })],
  render: () => ({ template: `<app-dialog-small></app-dialog-small>` }),
  parameters: {
    docs: {
      description: { story: 'Уменьшенный размер диалога (SM).' },
      source: {
        code: `<dialog header="Small Dialog" size="sm" [visible]="visible" (visibleChange)="visible = $event">...</dialog>`,
      },
    },
  },
};

// ── Large ─────────────────────────────────────────────────────────────────────

export const Large: Story = {
  name: 'Large',
  decorators: [moduleMetadata({ imports: [DialogLargeComponent] })],
  render: () => ({ template: `<app-dialog-large></app-dialog-large>` }),
  parameters: {
    docs: {
      description: { story: 'Увеличенный размер диалога (LG).' },
      source: {
        code: `<dialog header="Large Dialog" size="lg" [visible]="visible" (visibleChange)="visible = $event">...</dialog>`,
      },
    },
  },
};

// ── Extra Large ───────────────────────────────────────────────────────────────

export const ExtraLarge: Story = {
  name: 'Extra Large',
  decorators: [moduleMetadata({ imports: [DialogExtraLargeComponent] })],
  render: () => ({ template: `<app-dialog-extra-large></app-dialog-extra-large>` }),
  parameters: {
    docs: {
      description: { story: 'Максимальный размер диалога (XLG).' },
      source: {
        code: `<dialog header="Extra Large Dialog" size="xlg" [visible]="visible" (visibleChange)="visible = $event">...</dialog>`,
      },
    },
  },
};

// ── No Modal ──────────────────────────────────────────────────────────────────

export const NoModal: Story = {
  name: 'No Modal',
  decorators: [moduleMetadata({ imports: [DialogNoModalComponent] })],
  render: () => ({ template: `<app-dialog-no-modal></app-dialog-no-modal>` }),
  parameters: {
    docs: {
      description: { story: 'Окно не блокирует фон страницы.' },
      source: {
        code: `<dialog header="No Modal Dialog" [modal]="false" [visible]="visible" (visibleChange)="visible = $event">...</dialog>`,
      },
    },
  },
};

// ── No Header ─────────────────────────────────────────────────────────────────

export const NoHeader: Story = {
  name: 'No Header',
  decorators: [moduleMetadata({ imports: [DialogNoHeaderComponent] })],
  render: () => ({ template: `<app-dialog-no-header></app-dialog-no-header>` }),
  parameters: {
    docs: {
      description: { story: 'Диалог без заголовка и кнопки закрытия.' },
      source: {
        code: `<dialog [visible]="visible" (visibleChange)="visible = $event" [showHeader]="false" [dismissableMask]="true">...</dialog>`,
      },
    },
  },
};
