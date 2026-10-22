import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-input-number
    [formControl]="filled"
    [clearable]="true"
    label="С очисткой"
    placeholder="0"
    caption="Иконка × появляется при наличии значения"
  ></extra-input-number>
  <extra-input-number
    [formControl]="empty"
    [clearable]="true"
    label="С очисткой (пустое)"
    placeholder="0"
  ></extra-input-number>
</div>
`;

@Component({
  selector: 'app-inputnumber-clearable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template
})
export class InputNumberClearableComponent {
  filled = new FormControl<number | null>(42);
  empty = new FormControl<number | null>(null);
}

export const Clearable: StoryObj = {
  render: () => ({
    template: `<app-inputnumber-clearable></app-inputnumber-clearable>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable) — соответствует PrimeNG `showClear`. Иконка появляется только при наличии значения.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputnumber-clearable',
  standalone: true,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template: \`
    <extra-input-number
      [formControl]="control"
      [clearable]="true"
      label="С очисткой"
      placeholder="0"
    ></extra-input-number>
  \`,
})
export class InputNumberClearableComponent {
  control = new FormControl<number | null>(42);
}
        `
      }
    }
  }
};
