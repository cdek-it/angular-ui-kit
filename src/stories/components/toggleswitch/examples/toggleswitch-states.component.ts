import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-toggleswitch [formControl]="control" label="Обычный" caption="Управляется через FormControl"></extra-toggleswitch>
  <extra-toggleswitch [formControl]="checked" label="Включён" caption="Начальное значение true"></extra-toggleswitch>
  <extra-toggleswitch [formControl]="disabled" label="Disabled" caption="Управляется через FormControl.disable()"></extra-toggleswitch>
  <extra-toggleswitch [formControl]="invalid" label="Invalid" caption="Invalid определяется автоматически из NgControl"></extra-toggleswitch>
</div>
`;

@Component({
  selector: 'app-toggleswitch-states',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraToggleSwitchComponent, ReactiveFormsModule],
  template
})
export class ToggleSwitchStatesComponent {
  control = new FormControl(false);
  checked = new FormControl(true);
  disabled = new FormControl({ value: false, disabled: true });
  invalid = new FormControl(false, Validators.requiredTrue);
}

export const States: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-states></app-toggleswitch-states>`
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
import { ExtraToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-toggleswitch-states',
  standalone: true,
  imports: [ExtraToggleSwitchComponent, ReactiveFormsModule],
  template: \`
    <extra-toggleswitch [formControl]="control" label="Обычный"></extra-toggleswitch>

    <!-- disabled через FormControl -->
    <extra-toggleswitch [formControl]="disabled" label="Disabled"></extra-toggleswitch>

    <!-- invalid через Validators (красная рамка определяется из NgControl) -->
    <extra-toggleswitch [formControl]="invalid" label="Invalid"></extra-toggleswitch>
  \`,
})
export class ToggleSwitchStatesComponent {
  control = new FormControl(false);
  disabled = new FormControl({ value: false, disabled: true });
  invalid = new FormControl(false, Validators.requiredTrue);
}
        `
      }
    }
  }
};
