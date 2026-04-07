import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

const template = `
  <toggleswitch [(ngModel)]="value"></toggleswitch>
`;

@Component({
  selector: 'app-toggleswitch-checked',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template,
})
export class ToggleSwitchCheckedComponent {
  value = true;
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
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggleswitch-checked',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template: \`
    <toggleswitch [(ngModel)]="value"></toggleswitch>
  \`,
})
export class ToggleSwitchCheckedComponent {
  value = true;
}
        `,
      },
    },
  },
};
