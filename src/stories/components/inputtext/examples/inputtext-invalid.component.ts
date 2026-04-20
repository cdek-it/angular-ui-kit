import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<InputTextComponent>;

export const Invalid: Story = {
  name: 'Invalid',
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <input-text
        [size]="size"
        [showClear]="showClear"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [fluid]="fluid"
        [placeholder]="placeholder"
        [(ngModel)]="value"
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
        story: 'Невалидное состояние — поле отображает ошибку.',
      },
      source: {
        language: 'ts',
        code: `
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-text [invalid]="true" placeholder="Обязательное поле" [(ngModel)]="value"></input-text>
        `,
      },
    },
  },
};
