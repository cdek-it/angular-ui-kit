import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button
  onLabel="Включено"
  offLabel="Выключено"
  onIcon="ti ti-check"
  offIcon="ti ti-x"
  [(ngModel)]="checked"
></toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-icons',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template,
  styles,
})
export class ToggleButtonIconsComponent {
  checked = false;
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
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-icons',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template: \`
    <toggle-button
      onLabel="Включено"
      offLabel="Выключено"
      onIcon="ti ti-check"
      offIcon="ti ti-x"
      [(ngModel)]="checked"
    ></toggle-button>
  \`,
})
export class ToggleButtonIconsComponent {
  checked = false;
}
        `,
      },
    },
  },
};
