import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button size="xlarge" onLabel="Вкл" offLabel="Выкл" [formControl]="control"></toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ToggleButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ToggleButtonSizesComponent {
  control = new FormControl(false);
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-sizes></app-togglebutton-sizes>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Размер компонента задаётся через проп `size`: `small`, `base`, `large`, `xlarge`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ToggleButtonComponent, ReactiveFormsModule],
  template: \`
    <toggle-button size="xlarge" onLabel="Вкл" offLabel="Выкл" [formControl]="control"></toggle-button>
  \`,
})
export class ToggleButtonSizesComponent {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};
