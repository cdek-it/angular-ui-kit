import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

@Component({
  selector: 'app-toggleswitch-disabled',
  standalone: true,
  imports: [ExtraToggleSwitchComponent, ReactiveFormsModule],
  template: `
    <extra-toggleswitch [formControl]="control"></extra-toggleswitch>
  `,
})
export class ToggleSwitchDisabledComponent {
  control = new FormControl({ value: false, disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-disabled></app-toggleswitch-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние переключателя через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-toggleswitch-disabled',
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`
    <extra-toggleswitch [formControl]="control"></extra-toggleswitch>
  \`,
})
export class ToggleSwitchDisabledComponent {
  control = new FormControl({ value: false, disabled: true });
}
        `,
      },
    },
  },
};
