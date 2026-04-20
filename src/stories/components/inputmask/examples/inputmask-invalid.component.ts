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
        [invalid]="invalid"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></input-mask>
    `,
  }),
  args: {
    mask: '99-99-99',
    slotChar: '_',
    invalid: true,
    placeholder: '99-99-99',
  },
  parameters: {
    docs: {
      description: {
        story: 'Невалидное состояние — поле отображает ошибку.',
      },
      source: {
        language: 'html',
        code: `<input-mask mask="99-99-99" [invalid]="true" [(ngModel)]="value"></input-mask>`,
      },
    },
  },
};
