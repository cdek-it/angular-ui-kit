import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const options = [
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' },
];

const template = `
<extra-listbox [formControl]="ctrl" [options]="options" [checkmark]="true"></extra-listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-checkmark',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ListboxCheckmarkComponent {
  ctrl = new FormControl(null);
  options = options;
}

export const Checkmark: StoryObj = {
  render: () => ({
    template: `<app-listbox-checkmark></app-listbox-checkmark>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Галочка рядом с выбранным элементом.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
 import { ExtraListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-checkmark',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template: \`
    <extra-listbox [formControl]="ctrl" [options]="options" [checkmark]="true"></extra-listbox>
  \`,
})
export class ListboxCheckmarkComponent {
  ctrl = new FormControl(null);
  options = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
  ];
}
        `,
      },
    },
  },
};
