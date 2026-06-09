import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

@Component({
  selector: 'app-toggleswitch-checked',
  standalone: true,
  imports: [ExtraToggleSwitchComponent, ReactiveFormsModule],
  template: `
    <extra-toggleswitch [formControl]="control"></extra-toggleswitch>
  `,
})
export class ToggleSwitchCheckedComponent {
  control = new FormControl(true);
}

export const Checked: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-checked></app-toggleswitch-checked>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Переключатель во включённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-toggleswitch-checked',
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`
    <extra-toggleswitch [formControl]="control"></extra-toggleswitch>
  \`,
})
export class ToggleSwitchCheckedComponent {
  control = new FormControl(true);
}
        `,
      },
    },
  },
};
