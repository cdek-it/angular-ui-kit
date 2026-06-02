import { FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

type Story = StoryObj<ExtraInputMaskComponent>;

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => ({
    props: { ...args, control: new FormControl('') },
    template: `
      <extra-input-mask
        [mask]="mask"
        [slotChar]="slotChar"
        [size]="size"
        [showClear]="showClear"
        [readonly]="readonly"
        [fluid]="fluid"

        [placeholder]="placeholder"
        [formControl]="control"
      ></extra-input-mask>
    `
  }),
  args: {
    mask: '99-99-99',
    size: 'small',
    placeholder: '99-99-99'
  },
  parameters: {
    docs: {
      description: {
        story: 'Размеры поля: small, base, large, xlarge. Переключайте через Controls.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`<extra-input-mask mask="99-99-99" size="small" [formControl]="control"></extra-input-mask>\`,
})
export class SizesExample {
  control = new FormControl('');
}
        `
      }
    }
  }
};
