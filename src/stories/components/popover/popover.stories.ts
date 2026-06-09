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
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    appendTo: {
      control: 'text',
      description: 'Элемент, к которому присоединяется popover в DOM.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'body' },
        type: { summary: 'string' },
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
