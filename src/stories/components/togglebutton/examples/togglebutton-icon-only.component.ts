import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<extra-togglebutton
  icon="ti ti-star"
  [iconOnly]="true"
  ariaLabel="В избранное"
  [formControl]="control"
></extra-togglebutton>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-icon-only',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
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
        story: 'Icon-only вариант: квадратная кнопка без текста. Размер регулируется через `size`, для доступности обязателен `ariaLabel`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-icon-only',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-togglebutton
      icon="ti ti-star"
      [iconOnly]="true"
      ariaLabel="В избранное"
      [formControl]="control"
    ></extra-togglebutton>
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
