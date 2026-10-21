import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-input-group addonPosition="both">
    <extra-input-group-addon position="left" type="icon" icon="ti ti-map-pin"></extra-input-group-addon>
    <extra-input-text placeholder="Введите адрес..." [(ngModel)]="value"></extra-input-text>
    <extra-input-group-addon position="right" type="icon" icon="ti ti-search"></extra-input-group-addon>
  </extra-input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-addon-both',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, FormsModule],
  template,
  styles
})
export class InputGroupAddonBothComponent {
  value = '';
}

export const AddonBoth: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-addon-both></app-inputgroup-addon-both>`
  }),
  parameters: {
    docs: {
      description: { story: 'Аддоны расположены с обеих сторон — например, иконка-префикс и кнопка поиска.' },
      source: {
        language: 'ts',
        code: `
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-addon-both',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, FormsModule],
  template: \`
    <extra-input-group addonPosition="both">
      <extra-input-group-addon position="left" type="icon" icon="ti ti-map-pin"></extra-input-group-addon>
      <extra-input-text placeholder="Введите адрес..." [(ngModel)]="value"></extra-input-text>
      <extra-input-group-addon position="right" type="icon" icon="ti ti-search"></extra-input-group-addon>
    </extra-input-group>
  \`,
})
export class InputGroupAddonBothComponent {
  value = '';
}
        `
      }
    }
  }
};
