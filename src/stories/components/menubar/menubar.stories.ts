import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMenubarComponent, ExtraMenubarItemDirective } from '../../../lib/components/menubar/menubar.component';
import { basicItems } from './menubar.data';

const iconItems = [
  { label: 'Файл', icon: 'ti ti-file' },
  { label: 'Правка', icon: 'ti ti-pencil' },
  { label: 'Вид', icon: 'ti ti-eye' }
];

const customItems = [
  { label: 'Продукты', description: 'Компоненты и блоки', badge: 'New' },
  { label: 'Решения', description: 'Готовые сценарии' }
];

type MenubarArgs = Partial<ExtraMenubarComponent>;

const plain = '<extra-menubar [model]="model"></extra-menubar>';

const meta: Meta<MenubarArgs> = {
  title: 'Components/Menu/Menubar',
  component: ExtraMenubarComponent,
  tags: ['autodocs', 'menubar'],
  decorators: [moduleMetadata({ imports: [ExtraMenubarComponent, ExtraMenubarItemDirective] })],
  parameters: {
    docs: {
      description: {
        component: `Горизонтальная навигационная панель с поддержкой вложенных выпадающих подменю.

Шаблон (передаётся между тегами компонента):
- \`extraMenubarItem\` — кастомный рендер пункта меню (контекст \`let-item\`, \`let-hasSubmenu="hasSubmenu"\`)

\`\`\`typescript
import { ExtraMenubarComponent, ExtraMenubarItemDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'code',
        transform: () => plain
      }
    },
    designTokens: { prefix: '--p-menubar' }
  },
  argTypes: {
    model: { control: 'object', description: 'Массив пунктов меню' }
  },
  args: {
    model: basicItems
  }
};
export default meta;
type Story = StoryObj<MenubarArgs>;

export const Basic: Story = {
  args: { model: basicItems },
  render: (args) => ({ props: args, template: plain }),
  parameters: {
    docs: { description: { story: 'Горизонтальное меню с выпадающими подменю.' } }
  }
};

export const WithIcon: Story = {
  args: { model: iconItems },
  render: (args) => ({ props: args, template: plain }),
  parameters: {
    docs: { description: { story: 'Menubar с иконками в пунктах меню и вложенных подменю.' } }
  }
};

export const Custom: Story = {
  args: { model: customItems },
  render: (args) => ({
    props: args,
    template: `<extra-menubar [model]="model">
  <ng-template extraMenubarItem let-item>{{ item.label }}</ng-template>
</extra-menubar>`
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон пункта меню с описанием и бейджем.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-menubar [model]="model"><ng-template extraMenubarItem let-item>{{ item.label }}</ng-template></extra-menubar>'
      }
    }
  }
};
