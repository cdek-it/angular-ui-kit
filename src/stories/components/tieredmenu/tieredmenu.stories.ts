import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraTieredMenuComponent } from '../../../lib/components/tieredmenu/tieredmenu.component';
import { basicItems } from './tieredmenu.data';

const withSelectedItems = [
  {
    label: 'Отправления',
    icon: 'ti ti-package',
    expanded: true,
    items: [
      { label: 'Новые' },
      { label: 'В обработке', styleClass: 'p-tieredmenu-item-active' },
      { label: 'Доставленные' }
    ]
  },
  { label: 'Маршруты', icon: 'ti ti-route' },
  { label: 'Настройки', icon: 'ti ti-settings', disabled: true }
];

type TieredMenuArgs = Partial<ExtraTieredMenuComponent>;

const plain = '<extra-tieredmenu [model]="model"></extra-tieredmenu>';

const meta: Meta<TieredMenuArgs> = {
  title: 'Components/Menu/TieredMenu',
  component: ExtraTieredMenuComponent,
  tags: ['autodocs', 'tieredmenu'],
  decorators: [moduleMetadata({ imports: [ExtraTieredMenuComponent] })],
  parameters: {
    docs: {
      description: {
        component: `Компонент для отображения иерархического меню с вложенными подменю, которые открываются в виде вложенных оверлеев при наведении на пункт.

\`\`\`typescript
import { ExtraTieredMenuComponent as TieredMenuComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: { language: 'html', type: 'code', transform: () => plain }
    },
    designTokens: { prefix: '--p-tieredmenu' }
  },
  argTypes: {
    model: { control: 'object', description: 'Массив пунктов меню с вложенными items' },
    autoDisplay: { control: 'boolean', description: 'Показывать подменю при наведении' },
    tabindex: { control: 'number', description: 'Порядок фокуса при навигации клавиатурой' }
  },
  args: { model: basicItems }
};
export default meta;
type Story = StoryObj<TieredMenuArgs>;

export const Basic: Story = {
  args: { model: basicItems },
  render: (args) => ({ props: args, template: plain }),
  parameters: {
    docs: { description: { story: 'Базовое иерархическое меню с вложенными подменю.' } }
  }
};

export const WithSelected: Story = {
  args: { model: withSelectedItems },
  render: (args) => ({ props: args, template: plain }),
  parameters: {
    docs: {
      description: { story: 'При клике на пункт меню он визуально выделяется как активный.' },
      source: { language: 'html', type: 'code', code: plain }
    }
  }
};
