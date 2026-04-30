import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

type Story = StoryObj<InputMaskComponent>;

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => ({
    props: { ...args, control: new FormControl('') },
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
        [formControl]="control"
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// В компоненте:
readonly control = new FormControl('');

// template:
// <input-mask mask="99-99-99" size="small" [formControl]="control"></input-mask>
        `,
      },
    },
  },
};
