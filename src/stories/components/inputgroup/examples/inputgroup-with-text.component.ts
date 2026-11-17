import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
  <extra-input-group>
    <extra-input-group-addon position="left">@</extra-input-group-addon>
    <extra-input-text ariaLabel="Поле ввода" [fluid]="true" placeholder="Username" [(ngModel)]="value"></extra-input-text>
  </extra-input-group>
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
        language: 'html',
        code: `<extra-input-group>
    <extra-input-group-addon position="left">@</extra-input-group-addon>
    <extra-input-text ariaLabel="Поле ввода" [fluid]="true" placeholder="Username" [(ngModel)]="value"></extra-input-text>
  </extra-input-group>`
      }
    }
  }
};
