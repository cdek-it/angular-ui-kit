import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-input-group size="xlarge">
    <extra-input-group-addon><i class="ti ti-search"></i></extra-input-group-addon>
    <extra-input-text placeholder="Поиск отправлений..." size="xlarge" [(ngModel)]="value" [fluid]="true"></extra-input-text>
  </extra-input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-xlarge',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, FormsModule],
  template,
  styles
})
export class InputGroupXlargeComponent {
  value = '';
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-xlarge></app-inputgroup-xlarge>`
  }),
  parameters: {
    docs: {
      description: { story: 'Увеличенный размер группы ввода — для акцентных форм и поисковых строк.' },
      source: {
        language: 'ts',
        code: `
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-xlarge',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <extra-input-group size="xlarge">
      <extra-input-group-addon><i class="ti ti-search"></i></extra-input-group-addon>
      <extra-input-text placeholder="Поиск отправлений..." size="xlarge" [(ngModel)]="value" [fluid]="true"></extra-input-text>
    </extra-input-group>
  \`,
})
export class InputGroupXlargeComponent {
  value = '';
}
        `
      }
    }
  }
};
