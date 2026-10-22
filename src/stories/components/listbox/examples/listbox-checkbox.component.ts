import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const options = [
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' }
];

const template = `
<extra-listbox [formControl]="ctrl" [options]="options" [multiple]="true" [showCheckbox]="true"></extra-listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-checkbox',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template,
  styles
})
export class ListboxCheckboxComponent {
  ctrl = new FormControl([]);
  options = options;
}

export const Checkbox: StoryObj = {
  render: () => ({
    template: `<app-listbox-checkbox></app-listbox-checkbox>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Чекбоксы у элементов и чекбокс «выбрать всё» в заголовке (`showCheckbox`, требует `multiple=true`).'
      },
      source: {
        language: 'ts',
        code: `
import { ExtraListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-checkbox',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template: \`
    <extra-listbox [formControl]="ctrl" [options]="options" [multiple]="true" [showCheckbox]="true"></extra-listbox>
  \`,
})
export class ListboxCheckboxComponent {
  ctrl = new FormControl([]);
  options = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
  ];
}
        `
      }
    }
  }
};
