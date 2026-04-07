import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

const template = `
  <toggleswitch [(ngModel)]="value" [disabled]="true"></toggleswitch>
`;

@Component({
  selector: 'app-toggleswitch-disabled',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template,
})
export class ToggleSwitchDisabledComponent {
  value = false;
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-disabled></app-toggleswitch-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние переключателя.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggleswitch-disabled',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template: \`
    <toggleswitch [(ngModel)]="value" [disabled]="true"></toggleswitch>
  \`,
})
export class ToggleSwitchDisabledComponent {
  value = false;
}
        `,
      },
    },
  },
};
