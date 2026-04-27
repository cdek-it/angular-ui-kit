import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<ExtraInputTextComponent>;

export const Readonly: Story = {
  name: 'Readonly',
  render: (args) => ({
    props: { ...args },
        template: `
      <extra-input-text
        [size]="size"
        [showClear]="showClear"
        [readonly]="readonly"
        [fluid]="fluid"
        [placeholder]="placeholder"
      ></extra-input-text>
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
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

// template:
// <extra-input-text [readonly]="true"></extra-input-text>
        `,
      },
    },
  },
};
