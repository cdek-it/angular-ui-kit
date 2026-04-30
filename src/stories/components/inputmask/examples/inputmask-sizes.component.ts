import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

type Story = StoryObj<InputMaskComponent>;

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <input-mask
        [mask]="mask"
        [slotChar]="slotChar"
        [size]="size"
        [showClear]="showClear"
        [readonly]="readonly"
        [fluid]="fluid"
        [variant]="variant"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></input-mask>
    `,
  }),
  args: {
    mask: '99-99-99',
    size: 'small',
    placeholder: '99-99-99',
  },
  parameters: {
    docs: {
      description: {
        story: 'Размеры поля: small, base, large, xlarge. Переключайте через Controls.',
      },
      source: {
        language: 'ts',
        code: `
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-mask mask="99-99-99" size="small" [(ngModel)]="value"></input-mask>
        `,
      },
    },
  },
};
