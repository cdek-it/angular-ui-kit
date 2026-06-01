import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-input-group>
    <extra-input-group-addon>@</extra-input-group-addon>
    <extra-input-text placeholder="Username" [(ngModel)]="value" [fluid]="true"></extra-input-text>
  </extra-input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-with-text',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, FormsModule],
  template,
  styles
})
export class InputGroupWithTextComponent {
  value = '';
}

export const WithText: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-with-text></app-inputgroup-with-text>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'В качестве наполнения аддона можно использовать обычный текст — например, символ валюты или префикс.'
      },
      source: {
        language: 'ts',
        code: `
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-with-text',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <extra-input-group>
      <extra-input-group-addon>@</extra-input-group-addon>
      <extra-input-text placeholder="Username" [(ngModel)]="value" [fluid]="true"></extra-input-text>
    </extra-input-group>
  \`,
})
export class InputGroupWithTextComponent {
  value = '';
}
        `
      }
    }
  }
};
