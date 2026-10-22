import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

const template = `
<div class="pt-6 w-64">
  <extra-input-number
    [formControl]="control"
    [floatLabel]="true"
    label="Количество"
  ></extra-input-number>
</div>
`;

@Component({
  selector: 'app-inputnumber-float-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template
})
export class InputNumberFloatLabelComponent {
  control = new FormControl<number | null>(null);
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-inputnumber-float-label></app-inputnumber-float-label>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Плавающая метка внутри поля через `[floatLabel]="true"` — обёртка сама рисует `p-floatlabel` и лейбл, ничего дополнительно оборачивать не нужно. Несовместимо с `showButtons` (кнопки будут скрыты).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template: \`
    <extra-input-number
      [formControl]="control"
      [floatLabel]="true"
      label="Количество"
    ></extra-input-number>
  \`,
})
export class InputNumberFloatLabelExample {
  control = new FormControl<number | null>(null);
}
        `
      }
    }
  }
};
