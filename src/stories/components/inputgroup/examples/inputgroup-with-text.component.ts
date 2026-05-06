import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { InputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <input-group>
    <input-group-addon>@</input-group-addon>
    <input-text placeholder="Username" [(ngModel)]="value" [fluid]="true"></input-text>
  </input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-with-text',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputGroupWithTextComponent {
  value = '';
}

export const WithText: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-with-text></app-inputgroup-with-text>`,
  }),
  parameters: {
    docs: {
      description: { story: 'В качестве наполнения аддона можно использовать обычный текст — например, символ валюты или префикс.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-with-text',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <input-group>
      <input-group-addon>@</input-group-addon>
      <input-text placeholder="Username" [(ngModel)]="value" [fluid]="true"></input-text>
    </input-group>
  \`,
})
export class InputGroupWithTextComponent {
  value = '';
}
        `,
      },
    },
  },
};
