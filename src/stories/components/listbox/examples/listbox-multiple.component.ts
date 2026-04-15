import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const options = [
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' },
];

const template = `
<listbox [formControl]="ctrl" [options]="options" [multiple]="true"></listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-multiple',
  standalone: true,
  imports: [ListboxComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ListboxMultipleComponent {
  ctrl = new FormControl([]);
  options = options;
}

export const Multiple: StoryObj = {
  render: () => ({
    template: `<app-listbox-multiple></app-listbox-multiple>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Множественный выбор элементов.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-multiple',
  standalone: true,
  imports: [ListboxComponent, ReactiveFormsModule],
  template: \`
    <listbox [formControl]="ctrl" [options]="options" [multiple]="true"></listbox>
  \`,
})
export class ListboxMultipleComponent {
  ctrl = new FormControl([]);
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
