import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<extra-toggle-button
  onLabel="Включено"
  offLabel="Выключено"
  onIcon="ti ti-check"
  offIcon="ti ti-x"
  [formControl]="control"
></extra-toggle-button>
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
        story: 'Кнопка с иконками через `onIcon`/`offIcon`. Позиция иконки управляется `iconPos`.',
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
    <extra-toggle-button
      onLabel="Включено"
      offLabel="Выключено"
      onIcon="ti ti-check"
      offIcon="ti ti-x"
      [formControl]="control"
    ></extra-toggle-button>
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
