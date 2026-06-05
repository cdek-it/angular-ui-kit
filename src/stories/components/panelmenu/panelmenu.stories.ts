import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraPanelMenuComponent } from '../../../lib/components/panelmenu/panelmenu.component';
import { Basic, PanelMenuBasicComponent } from './examples/panelmenu-basic.component';
import { Multiple, PanelMenuMultipleComponent } from './examples/panelmenu-multiple.component';
import { Custom, PanelMenuCustomComponent } from './examples/panelmenu-custom.component';

const meta: Meta<ExtraPanelMenuComponent> = {
  title: 'Components/Menu/PanelMenu',
  component: ExtraPanelMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraPanelMenuComponent, PanelMenuBasicComponent, PanelMenuMultipleComponent, PanelMenuCustomComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Аккордеон-меню с поддержкой вложенных подменю и раскрытием нескольких панелей.

\`\`\`typescript
import { ExtraPanelMenuComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-panelmenu' }
  },
  argTypes: {
    model: {
      table: { disable: true }
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешает одновременное раскрытие нескольких панелей',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    tabindex: {
      control: 'number',
      description: 'Порядок фокуса при навигации клавиатурой',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' }
      }
    }
  },
  args: {
    multiple: false
  }
};

export default meta;
type Story = StoryObj<ExtraPanelMenuComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`[model]="model"`];
    if (args.multiple) parts.push(`[multiple]="true"`);
    if (args.tabindex !== undefined) parts.push(`[tabindex]="${args.tabindex}"`);

    const template = `<extra-panelmenu\n  ${parts.join('\n  ')}\n></extra-panelmenu>`;

    return {
      props: {
        ...args,
        model: [
          {
            label: 'Отправления',
            items: [{ label: 'Новые' }, { label: 'В пути' }, { label: 'Доставленные' }]
          },
          { label: 'Маршруты' },
          {
            label: 'Склады',
            items: [{ label: 'Москва' }, { label: 'Новосибирск' }]
          },
          { label: 'Настройки', disabled: true }
        ]
      },
      template
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { Basic, Multiple, Custom };
