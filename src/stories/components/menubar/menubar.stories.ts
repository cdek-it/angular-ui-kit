import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenubarComponent } from '../../../lib/components/menubar/menubar.component';
import { MenubarBasicComponent, Basic } from './examples/menubar-basic.component';
import { MenubarWithIconComponent, WithIcon } from './examples/menubar-with-icon.component';
import { MenubarCustomComponent, Custom } from './examples/menubar-custom.component';
import { basicItems } from './menubar.data';

const meta: Meta<MenubarComponent> = {
  title: 'Components/Menu/Menubar',
  component: MenubarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        MenubarComponent,
        MenubarBasicComponent,
        MenubarWithIconComponent,
        MenubarCustomComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Горизонтальная навигационная панель с поддержкой вложенных выпадающих подменю.

\`\`\`typescript
import { MenubarComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-menubar' },
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<MenubarComponent>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: { ...args, model: basicItems },
    template: `<menubar [model]="model"></menubar>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента.',
      },
    },
  },
};

export { Basic, WithIcon, Custom };
