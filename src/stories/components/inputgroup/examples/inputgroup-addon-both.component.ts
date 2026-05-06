import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { InputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <input-group>
    <input-group-addon><i class="ti ti-map-pin"></i></input-group-addon>
    <input-text placeholder="Введите адрес..." [(ngModel)]="value" [fluid]="true"></input-text>
    <input-group-addon><i class="ti ti-search"></i></input-group-addon>
  </input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-addon-both',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputGroupAddonBothComponent {
  value = '';
}

export const AddonBoth: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-addon-both></app-inputgroup-addon-both>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Аддоны расположены с обеих сторон — например, иконка-префикс и кнопка поиска.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-addon-both',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <input-group>
      <input-group-addon><i class="ti ti-map-pin"></i></input-group-addon>
      <input-text placeholder="Введите адрес..." [(ngModel)]="value" [fluid]="true"></input-text>
      <input-group-addon><i class="ti ti-search"></i></input-group-addon>
    </input-group>
  \`,
})
export class InputGroupAddonBothComponent {
  value = '';
}
        `,
      },
    },
  },
};
