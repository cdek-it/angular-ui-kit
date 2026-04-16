import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button
  onLabel="Вкл"
  offLabel="Выкл"
  [disabled]="true"
  [(ngModel)]="checked"
></toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-disabled',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template,
  styles,
})
export class ToggleButtonDisabledComponent {
  checked = false;
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-disabled></app-togglebutton-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Отключённое состояние через `[disabled]="true"`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-disabled',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template: \`
    <toggle-button onLabel="Вкл" offLabel="Выкл" [disabled]="true" [(ngModel)]="checked"></toggle-button>
  \`,
})
export class ToggleButtonDisabledComponent {
  checked = false;
}
        `,
      },
    },
  },
};
