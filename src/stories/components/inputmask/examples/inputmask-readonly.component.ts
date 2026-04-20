import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

type Story = StoryObj<InputMaskComponent>;

export const Readonly: Story = {
  name: 'Readonly',
  render: (args) => ({
    props: { ...args, value: '12-34-56' },
    template: `
      <input-mask
        [mask]="mask"
        [slotChar]="slotChar"
        [readonly]="readonly"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></input-mask>
    `,
  }),
  args: {
    mask: '99-99-99',
    slotChar: '_',
    readonly: true,
    placeholder: '99-99-99',
  },
  parameters: {
    docs: {
      description: {
        story: 'Режим только для чтения — поле отображает значение, но недоступно для редактирования.',
      },
      source: {
        language: 'html',
        code: `<input-mask mask="99-99-99" [readonly]="true" [(ngModel)]="value"></input-mask>`,
      },
    },
  },
};
