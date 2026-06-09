import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button
  onIcon="ti ti-star-filled"
  offIcon="ti ti-star"
  [iconOnly]="true"
  [formControl]="control"
></toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-icon-only',
  standalone: true,
  imports: [ToggleButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ToggleButtonIconOnlyComponent {
  control = new FormControl(false);
}

export const IconOnly: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-icon-only></app-togglebutton-icon-only>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Icon-only вариант: квадратная кнопка без текста. Размер регулируется через `size`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-icon-only',
  standalone: true,
  imports: [ToggleButtonComponent, ReactiveFormsModule],
  template: \`
    <toggle-button
      onIcon="ti ti-star-filled"
      offIcon="ti ti-star"
      [iconOnly]="true"
      [formControl]="control"
    ></toggle-button>
  \`,
})
export class ToggleButtonIconOnlyComponent {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};
