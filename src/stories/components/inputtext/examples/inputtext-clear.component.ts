import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<ExtraInputTextComponent>;

export const ClearButton: Story = {
  name: 'ClearButton',
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
    showClear: true,
    placeholder: 'Введите текст...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле с кнопкой очистки через `showClear`. Иконка × появляется при вводе первого символа.',
      },
      source: {
        language: 'ts',
        code: `
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

// template:
// <extra-input-text [showClear]="true" placeholder="Введите текст..."></extra-input-text>
        `,
      },
    },
  },
};
