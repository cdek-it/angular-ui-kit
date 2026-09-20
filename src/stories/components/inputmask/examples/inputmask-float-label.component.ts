import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

export const template = `
<div class="pt-6 w-64">
  <extra-input-mask
    mask="99-99-99"
    [formControl]="control"
    [floatLabel]="true"
    label="Дата"
  ></extra-input-mask>
</div>
`;

@Component({
  selector: 'app-inputmask-float-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template
})
export class InputMaskFloatLabelComponent {
  readonly control = new FormControl('');
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-inputmask-float-label></app-inputmask-float-label>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Плавающая метка внутри поля через `[floatLabel]="true"` — обёртка сама рисует `p-floatlabel` и лейбл, ничего дополнительно оборачивать не нужно.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`
    <extra-input-mask
      mask="99-99-99"
      [formControl]="control"
      [floatLabel]="true"
      label="Дата"
    ></extra-input-mask>
  \`,
})
export class InputMaskFloatLabelComponent {
  control = new FormControl('');
}
        `
      }
    }
  }
};
