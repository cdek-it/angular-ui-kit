import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

type Story = StoryObj<InputMaskComponent>;

export const Invalid: Story = {
  name: 'Invalid',
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <input-mask
        [mask]="mask"
        [slotChar]="slotChar"
        [size]="size"
        [showClear]="showClear"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [fluid]="fluid"
        [variant]="variant"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></input-mask>
    `,
  }),
  args: {
    mask: '99-99-99',
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
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-mask mask="99-99-99" [invalid]="true" placeholder="Обязательное поле" [(ngModel)]="value"></input-mask>
        `,
      },
    },
  },
};
