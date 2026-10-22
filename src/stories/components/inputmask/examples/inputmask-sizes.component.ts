import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const template = `
<div class="flex flex-col gap-4">
  @for (size of sizes; track size) {
    <extra-input-mask
      [formControl]="control"
      [size]="size"
      [label]="'Size ' + size"
      mask="(999) 999-9999"
      placeholder="(___) ___-____"
    ></extra-input-mask>
  }
</div>
`;

@Component({
  selector: 'app-inputmask-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template
})
export class InputMaskSizesComponent {
  sizes = ['small', 'base', 'large', 'xlarge'];
  control = new FormControl('');
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-inputmask-sizes></app-inputmask-sizes>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Размеры поля: small, base, large, xlarge.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputmask-sizes',
  standalone: true,
  imports: [ExtraInputMaskComponent],
  template: \`
    <extra-input-mask size="small" label="Size small" mask="(999) 999-9999"></extra-input-mask>
    <extra-input-mask size="base" label="Size base" mask="(999) 999-9999"></extra-input-mask>
    <extra-input-mask size="large" label="Size large" mask="(999) 999-9999"></extra-input-mask>
    <extra-input-mask size="xlarge" label="Size xlarge" mask="(999) 999-9999"></extra-input-mask>
  \`,
})
export class InputMaskSizesComponent {}
        `
      }
    }
  }
};
