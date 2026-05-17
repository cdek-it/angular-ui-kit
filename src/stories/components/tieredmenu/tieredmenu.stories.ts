import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraTieredMenuComponent } from '../../../lib/components/tieredmenu/tieredmenu.component';
import { TieredMenuBasicComponent, Basic } from './examples/tieredmenu-basic.component';
import { TieredMenuSelectedComponent, WithSelected } from './examples/tieredmenu-selected.component';
import { TieredMenuCustomComponent, Custom } from './examples/tieredmenu-custom.component';

const meta: Meta<ExtraTieredMenuComponent> = {
  title: 'Components/Menu/TieredMenu',
  component: ExtraTieredMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraTieredMenuComponent,
        TieredMenuBasicComponent,
        TieredMenuSelectedComponent,
        TieredMenuCustomComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент для отображения иерархического меню с вложенными подменю, которые открываются в виде вложенных оверлеев при наведении на пункт.

\`\`\`typescript
import { ExtraTieredMenuComponent as TieredMenuComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-tieredmenu' }
  },
  argTypes: {
    model: {
      table: { disable: true }
    },
    autoDisplay: {
      control: 'boolean',
      description: 'Показывать подменю при наведении',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
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
  }
};

export default meta;
type Story = StoryObj<ExtraTieredMenuComponent>;

// ── Re-exports from example components ────────────────────────────────────
export { Basic, WithSelected, Custom };
