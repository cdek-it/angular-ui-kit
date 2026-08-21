import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraDialogComponent } from '../../../lib/components/dialog/dialog.component';
import { DialogBasicComponent, Basic } from './examples/dialog-basic.component';
import { DialogFeaturesComponent, Features } from './examples/dialog-features.component';
import { DialogSizesComponent, Sizes } from './examples/dialog-sizes.component';
import { DialogHeaderComponent, Header } from './examples/dialog-header.component';
import { DialogSlotsComponent, Slots } from './examples/dialog-slots.component';
import { DialogDynamicComponent, Dynamic } from './examples/dialog-dynamic.component';

const meta: Meta<ExtraDialogComponent> = {
  title: 'Components/Overlay/Dialog',
  component: ExtraDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraDialogComponent,
        DialogBasicComponent,
        DialogFeaturesComponent,
        DialogSizesComponent,
        DialogHeaderComponent,
        DialogSlotsComponent,
        DialogDynamicComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-dialog' },
    docs: {
      description: {
        component: `Универсальное окно (модальное или немодальное) для отображения произвольного содержимого.

Реализовано по спецификации \`docs/components-api/dialog.md\`.

Слоты: content — основной содержимое (обычная проекция); header и footer — через директиву \`extraDialogTemplate\`.

\`\`\`typescript
import { ExtraDialogComponent, ExtraDialogTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства (docs/components-api/dialog.md) ────────────────
    showOverlay: {
      control: 'boolean',
      description: 'Отображать маску (overlay) поверх интерфейса',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showMaximize: {
      control: 'boolean',
      description: 'Кнопка разворота окна на весь экран',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    showClose: {
      control: 'boolean',
      description: 'Кнопка закрытия окна',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    // ── Дополнительно (не в спеке) ───────────────────────────────
    header: {
      control: 'text',
      description: 'Заголовок окна (строкой; для кастома — слот header)',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xlg'],
      description: 'Размер окна',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: 'default' },
        type: { summary: "'sm' | 'default' | 'lg' | 'xlg'" }
      }
    },
    dismissableMask: {
      control: 'boolean',
      description: 'Закрывать окно при клике на маску',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Закрывать окно по Escape',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    focusOnShow: {
      control: 'boolean',
      description: 'Фокус на первый элемент при открытии',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    appendTo: {
      control: 'text',
      description: 'Элемент, к которому прикрепляется окно',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: "'body'" },
        type: { summary: 'string' }
      }
    },
    visible: {
      control: 'boolean',
      description: 'Видимость окна',
      table: {
        category: 'Дополнительно',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // ── События ─────────────────────────────────────────────────
    onShow: {
      control: false,
      description: 'Срабатывает при открытии окна',
      action: 'onShow',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    onHide: {
      control: false,
      description: 'Срабатывает при закрытии окна',
      action: 'onHide',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    onMaximize: {
      control: false,
      description: 'Срабатывает при развороте/сворачивании окна',
      action: 'onMaximize',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    visibleChange: {
      control: false,
      description: 'Изменение видимости (двусторонняя привязка [(visible)])',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<boolean>' }
      }
    }
  },
  args: {
    showOverlay: true,
    showMaximize: false,
    showClose: true
  }
};

export default meta;
type Story = StoryObj<ExtraDialogComponent>;

// ── Комбинаторные истории ────────────────────────────────────────────────────

export { Basic, Features, Sizes, Header, Slots, Dynamic };
