import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<InputTextComponent>;

export const Disabled: Story = {
  name: 'Disabled',
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
    disabled: true,
    placeholder: 'Введите текст...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключённое состояние — управляется через formControl.',
      },
      source: {
        language: 'ts',
        code: `
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// formControl = new FormControl({ value: '', disabled: true });
// <input-text [formControl]="formControl"></input-text>
        `,
      },
    },
  },
};
