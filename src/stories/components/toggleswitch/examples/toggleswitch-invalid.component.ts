import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleSwitchComponent } from '../../../../lib/components/toggleswitch/toggleswitch.component';

const template = `
  <toggleswitch [(ngModel)]="value" [invalid]="true"></toggleswitch>
`;

@Component({
  selector: 'app-toggleswitch-invalid',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template,
})
export class ToggleSwitchInvalidComponent {
  value = false;
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-toggleswitch-invalid></app-toggleswitch-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние переключателя.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggleswitch-invalid',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template: \`
    <toggleswitch [(ngModel)]="value" [invalid]="true"></toggleswitch>
  \`,
})
export class ToggleSwitchInvalidComponent {
  value = false;
}
        `,
      },
    },
  },
};
