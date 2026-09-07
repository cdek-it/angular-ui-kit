import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-checkbox [formControl]="control" label="Обычный" caption="Управляется через FormControl"></extra-checkbox>
  <extra-checkbox [formControl]="disabled" label="Disabled" caption="Управляется через FormControl.disable()"></extra-checkbox>
  <extra-checkbox [formControl]="invalid" label="Invalid" caption="Invalid определяется автоматически из NgControl"></extra-checkbox>
</div>
`;

@Component({
  selector: 'app-checkbox-states',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template
})
export class CheckboxStatesComponent {
  control = new FormControl(false);
  disabled = new FormControl({ value: true, disabled: true });
  invalid = new FormControl(false, Validators.requiredTrue);
}

export const States: StoryObj = {
  render: () => ({
    template: `<app-checkbox-states></app-checkbox-states>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Состояния disabled и invalid управляются через FormControl: disable() / Validators (invalid вычисляется из NgControl автоматически).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-states',
  standalone: true,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: \`
    <extra-checkbox [formControl]="control" label="Обычный"></extra-checkbox>

    <!-- disabled через FormControl -->
    <extra-checkbox [formControl]="disabled" label="Disabled"></extra-checkbox>

    <!-- invalid через Validators (красная рамка определяется из NgControl) -->
    <extra-checkbox [formControl]="invalid" label="Invalid"></extra-checkbox>
  \`,
})
export class CheckboxStatesComponent {
  control = new FormControl(false);
  disabled = new FormControl({ value: true, disabled: true });
  invalid = new FormControl(false, Validators.requiredTrue);
}
        `
      }
    }
  }
};
