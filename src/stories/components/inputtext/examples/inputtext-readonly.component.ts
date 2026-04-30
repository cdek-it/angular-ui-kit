import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<InputTextComponent>;

export const Readonly: Story = {
  name: 'Readonly',
  render: (args) => ({
    props: { ...args },
    template: `
      <input-text
        [size]="size"
        [showClear]="showClear"
        [readonly]="readonly"
        [fluid]="fluid"
        [placeholder]="placeholder"
      ></input-text>
    `,
  }),
  args: {
    readonly: true,
    placeholder: 'Введите текст...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Режим только для чтения — поле отображает значение, но недоступно для редактирования.',
      },
      source: {
        language: 'ts',
        code: `
import { InputTextComponent } from '@cdek-it/angular-ui-kit';

// template:
// <input-text [readonly]="true"></input-text>
        `,
      },
    },
  },
};
