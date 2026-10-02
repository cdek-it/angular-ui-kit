import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<extra-togglebutton
  label="Избранное"
  icon="ti ti-star"
  [formControl]="control"
></extra-togglebutton>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-icons',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ToggleButtonIconsComponent {
  control = new FormControl(false);
}

export const Icons: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-icons></app-togglebutton-icons>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Кнопка с иконкой через `icon` — та же иконка в обоих состояниях. Позиция управляется `iconPosition`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-icons',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-togglebutton
      label="Избранное"
      icon="ti ti-star"
      [formControl]="control"
    ></extra-togglebutton>
  \`,
})
export class ToggleButtonIconsComponent {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};
