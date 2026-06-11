import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button
  onLabel="Вкл"
  offLabel="Выкл"
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
  control = new FormControl({ value: false, disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-disabled></app-togglebutton-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Отключённое состояние управляется через `FormControl`: `new FormControl({ value: false, disabled: true })` или `control.disable()`.',
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
    <toggle-button onLabel="Вкл" offLabel="Выкл" [formControl]="control"></toggle-button>
  \`,
})
export class ToggleButtonDisabledComponent {
  control = new FormControl({ value: false, disabled: true });
}
        `,
      },
    },
  },
};
