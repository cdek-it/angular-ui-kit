import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-input-group>
    <extra-input-text placeholder="Сумма" [(ngModel)]="value" [fluid]="true"></extra-input-text>
    <extra-input-group-addon>руб.</extra-input-group-addon>
  </extra-input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-addon-right',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, FormsModule],
  template,
  styles
})
export class InputGroupAddonRightComponent {
  value = '';
}

export const AddonRight: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-addon-right></app-inputgroup-addon-right>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Аддон расположен справа — используется для единиц измерения, валюты или суффиксов.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-addon-right',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <extra-input-group>
      <extra-input-text placeholder="Сумма" [(ngModel)]="value" [fluid]="true"></extra-input-text>
      <extra-input-group-addon>руб.</extra-input-group-addon>
    </extra-input-group>
  \`,
})
export class InputGroupAddonRightComponent {
  value = '';
}
        `,
      },
    },
  },
};
