import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

@Component({
  selector: 'app-toggleswitch-invalid',
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: `
    <toggleswitch [formControl]="control"></toggleswitch>
  `,
})
export class ToggleSwitchInvalidComponent {
  // Validators.requiredTrue требует значение true, поэтому false делает контрол невалидным
  control = new FormControl(false, [Validators.requiredTrue]);
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-invalid></app-toggleswitch-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние переключателя через FormControl и Validators.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-toggleswitch-invalid',
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`
    <toggleswitch [formControl]="control"></toggleswitch>
  \`,
})
export class ToggleSwitchInvalidComponent {
  control = new FormControl(false, [Validators.requiredTrue]);
}
        `,
      },
    },
  },
};
