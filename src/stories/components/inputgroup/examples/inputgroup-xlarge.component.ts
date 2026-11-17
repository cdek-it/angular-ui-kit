import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
  <extra-input-group size="xlarge">
    <extra-input-group-addon position="left" type="icon" icon="ti ti-search"></extra-input-group-addon>
    <extra-input-text ariaLabel="Поле ввода" [fluid]="true" placeholder="Поиск отправлений..." size="xlarge" [(ngModel)]="value"></extra-input-text>
  </extra-input-group>
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
        language: 'html',
        code: `<extra-input-group size="xlarge">
    <extra-input-group-addon position="left" type="icon" icon="ti ti-search"></extra-input-group-addon>
    <extra-input-text ariaLabel="Поле ввода" [fluid]="true" placeholder="Поиск отправлений..." size="xlarge" [(ngModel)]="value"></extra-input-text>
  </extra-input-group>`
      }
    }
  }
};
