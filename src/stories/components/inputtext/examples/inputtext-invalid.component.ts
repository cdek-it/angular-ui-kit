import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<InputTextComponent>;

export const Invalid: Story = {
  name: 'Invalid',
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
    invalid: true,
    placeholder: 'Обязательное поле',
  },
  parameters: {
    docs: {
      description: {
        story: 'Невалидное состояние — управляется через formControl валидацию.',
      },
      source: {
        language: 'ts',
        code: `
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

// formControl = new FormControl('', Validators.required);
// <input-text [formControl]="formControl"></input-text>
        `,
      },
    },
  },
};
