import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<extra-toggle-button size="xlarge" onLabel="Вкл" offLabel="Выкл" [formControl]="control"></extra-toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
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
import { ExtraToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-toggle-button size="xlarge" onLabel="Вкл" offLabel="Выкл" [formControl]="control"></extra-toggle-button>
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
