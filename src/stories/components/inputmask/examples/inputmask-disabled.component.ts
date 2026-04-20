import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

type Story = StoryObj<InputMaskComponent>;

export const Disabled: Story = {
  name: 'Disabled',
  render: (args) => ({
    props: { ...args, value: '12-34-56' },
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
    disabled: true,
    placeholder: '99-99-99',
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключённое состояние — поле недоступно для взаимодействия.',
      },
      source: {
        language: 'ts',
        code: `
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-mask mask="99-99-99" [disabled]="true" [(ngModel)]="value"></input-mask>
        `,
      },
    },
  },
};
