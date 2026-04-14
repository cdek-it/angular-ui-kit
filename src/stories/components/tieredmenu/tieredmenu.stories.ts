import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TieredMenuComponent } from '../../../lib/components/tieredmenu/tieredmenu.component';
import { TieredMenuBasicComponent, Basic } from './examples/tieredmenu-basic.component';
import { TieredMenuSelectedComponent, WithSelected } from './examples/tieredmenu-selected.component';
import { TieredMenuCustomComponent, Custom } from './examples/tieredmenu-custom.component';
import { basicItems } from './tieredmenu.data';

const meta: Meta<TieredMenuComponent> = {
  title: 'Components/Menu/TieredMenu',
  component: TieredMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TieredMenuComponent,
        TieredMenuBasicComponent,
        TieredMenuSelectedComponent,
        TieredMenuCustomComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент для отображения иерархического меню с вложенными подменю, которые открываются в виде вложенных оверлеев при наведении на пункт.

\`\`\`typescript
import { TieredMenuComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-tieredmenu' },
  },
  argTypes: {
    model: {
      table: { disable: true },
    },
    autoDisplay: {
      control: 'boolean',
      description: 'Показывать подменю при наведении',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    tabindex: {
      control: 'number',
      description: 'Порядок фокуса при навигации клавиатурой',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    autoDisplay: true,
  },
};

export default meta;
type Story = StoryObj<TieredMenuComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`[model]="model"`];
    if (!args.autoDisplay) parts.push(`[autoDisplay]="false"`);
    if (args.tabindex !== undefined) parts.push(`[tabindex]="${args.tabindex}"`);

    const template = `<tieredmenu\n  ${parts.join('\n  ')}\n></tieredmenu>`;

    return {
      props: {
        ...args,
        model: basicItems,
      },
      template,
    };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { Basic, WithSelected, Custom };
