import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<toggle-button size="xlg" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="checked"></toggle-button>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template,
  styles,
})
export class ToggleButtonSizesComponent {
  checked = false;
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-sizes></app-togglebutton-sizes>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Размер компонента задаётся через проп `size`: `sm`, `base`, `lg`, `xlg`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template: \`
    <toggle-button size="xlg" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="checked"></toggle-button>
  \`,
})
export class ToggleButtonSizesComponent {
  checked = false;
}
        `,
      },
    },
  },
};
