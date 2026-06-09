import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button
  onLabel="Вкл"
  offLabel="Выкл"
  [disabled]="true"
  [formControl]="control"
></toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-disabled',
  standalone: true,
  imports: [ToggleButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ToggleButtonDisabledComponent {
  control = new FormControl(false);
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
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-disabled',
  standalone: true,
  imports: [ToggleButtonComponent, ReactiveFormsModule],
  template: \`
    <toggle-button onLabel="Вкл" offLabel="Выкл" [disabled]="true" [formControl]="control"></toggle-button>
  \`,
})
export class ToggleButtonDisabledComponent {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};
