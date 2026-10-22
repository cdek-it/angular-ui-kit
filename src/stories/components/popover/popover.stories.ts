import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraPopoverComponent } from '../../../lib/components/popover/popover.component';
import { PopoverBasicComponent } from './examples/popover-basic.component';
import { PopoverRichContentComponent, RichContent } from './examples/popover-rich-content.component';

const meta: Meta<ExtraPopoverComponent> = {
  title: 'Components/Overlay/Popover',
  component: ExtraPopoverComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraPopoverComponent,
        PopoverBasicComponent,
        PopoverRichContentComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Всплывающее наложение, привязанное к целевому элементу.

\`\`\`typescript
import { ExtraPopoverComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-popover' },
  },
  argTypes: {
    dismissable: {
      control: 'boolean',
      description: 'Закрывает popover при клике вне его области.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    appendTo: {
      control: 'text',
      description: 'Куда в DOM монтируется оверлей — body, self или элемент.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'body' },
        type: { summary: "HTMLElement | 'body' | 'self' | null" },
      },
    },
    autoZIndex: {
      control: 'boolean',
      description: 'Автоматическое управление z-index при открытии.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    baseZIndex: {
      control: 'number',
      description: 'Базовое значение z-index.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    focusOnShow: {
      control: 'boolean',
      description: 'Переводить фокус на панель при открытии.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    onShow: {
      control: false,
      description: 'Событие открытия панели.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' },
      },
    },
    onHide: {
      control: false,
      description: 'Событие закрытия панели.',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ExtraPopoverComponent>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `<app-popover-basic></app-popover-basic>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Базовый пример компонента.',
      },
    },
  },
};

export { RichContent };
