import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<InputTextComponent>;

export const ClearButton: Story = {
  name: 'ClearButton',
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
import { InputTextComponent } from '@cdek-it/angular-ui-kit';

// template:
// <input-text [showClear]="true" placeholder="Введите текст..."></input-text>
        `,
      },
    },
  },
};
