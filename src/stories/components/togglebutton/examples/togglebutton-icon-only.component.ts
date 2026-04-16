import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<div class="flex flex-wrap items-center gap-3">
  <toggle-button
    size="sm"
    onIcon="ti ti-star-filled"
    offIcon="ti ti-star"
    [iconOnly]="true"
    [(ngModel)]="values.sm"
  ></toggle-button>
  <toggle-button
    size="base"
    onIcon="ti ti-star-filled"
    offIcon="ti ti-star"
    [iconOnly]="true"
    [(ngModel)]="values.base"
  ></toggle-button>
  <toggle-button
    size="lg"
    onIcon="ti ti-star-filled"
    offIcon="ti ti-star"
    [iconOnly]="true"
    [(ngModel)]="values.lg"
  ></toggle-button>
  <toggle-button
    size="xlg"
    onIcon="ti ti-star-filled"
    offIcon="ti ti-star"
    [iconOnly]="true"
    [(ngModel)]="values.xlg"
  ></toggle-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-icon-only',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template,
  styles,
})
export class ToggleButtonIconOnlyComponent {
  values = {
    sm: false,
    base: true,
    lg: false,
    xlg: true,
  };
}

export const IconOnly: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-icon-only></app-togglebutton-icon-only>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Icon-only вариант: квадратная кнопка без текста. Пропорции регулируются через `size`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-icon-only',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template: \`
    <toggle-button
      onIcon="ti ti-star-filled"
      offIcon="ti ti-star"
      [iconOnly]="true"
      [(ngModel)]="checked"
    ></toggle-button>
  \`,
})
export class ToggleButtonIconOnlyComponent {
  checked = false;
}
        `,
      },
    },
  },
};
