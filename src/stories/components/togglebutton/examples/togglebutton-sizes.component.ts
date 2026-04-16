import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<div class="flex flex-col gap-4">
  <div class="grid grid-cols-3 gap-3 items-center">
    <toggle-button size="sm" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.sm"></toggle-button>
    <toggle-button size="sm" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.smChecked"></toggle-button>
    <toggle-button size="sm" onLabel="Вкл" offLabel="Выкл" [disabled]="true" [(ngModel)]="values.smDisabled"></toggle-button>

    <toggle-button size="base" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.base"></toggle-button>
    <toggle-button size="base" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.baseChecked"></toggle-button>
    <toggle-button size="base" onLabel="Вкл" offLabel="Выкл" [disabled]="true" [(ngModel)]="values.baseDisabled"></toggle-button>

    <toggle-button size="lg" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.lg"></toggle-button>
    <toggle-button size="lg" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.lgChecked"></toggle-button>
    <toggle-button size="lg" onLabel="Вкл" offLabel="Выкл" [disabled]="true" [(ngModel)]="values.lgDisabled"></toggle-button>

    <toggle-button size="xlg" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.xlg"></toggle-button>
    <toggle-button size="xlg" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="values.xlgChecked"></toggle-button>
    <toggle-button size="xlg" onLabel="Вкл" offLabel="Выкл" [disabled]="true" [(ngModel)]="values.xlgDisabled"></toggle-button>
  </div>
</div>
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
  values = {
    sm: false,
    smChecked: true,
    smDisabled: false,
    base: false,
    baseChecked: true,
    baseDisabled: false,
    lg: false,
    lgChecked: true,
    lgDisabled: false,
    xlg: false,
    xlgChecked: true,
    xlgDisabled: false,
  };
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-sizes></app-togglebutton-sizes>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Все размеры компонента: `sm`, `base`, `lg`, `xlg`. Колонки: выключен, включён, отключён.',
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
    <toggle-button size="sm"   onLabel="Вкл" offLabel="Выкл" [(ngModel)]="checked"></toggle-button>
    <toggle-button size="base" onLabel="Вкл" offLabel="Выкл" [(ngModel)]="checked"></toggle-button>
    <toggle-button size="lg"   onLabel="Вкл" offLabel="Выкл" [(ngModel)]="checked"></toggle-button>
    <toggle-button size="xlg"  onLabel="Вкл" offLabel="Выкл" [(ngModel)]="checked"></toggle-button>
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
