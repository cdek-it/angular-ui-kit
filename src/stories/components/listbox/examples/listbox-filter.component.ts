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
<listbox [formControl]="ctrl" [options]="options" [filter]="true" filterPlaceHolder="Поиск..."></listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-filter',
  standalone: true,
  imports: [ListboxComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ListboxFilterComponent {
  ctrl = new FormControl(null);
  options = options;
}

export const Filter: StoryObj = {
  render: () => ({
    template: `<app-listbox-filter></app-listbox-filter>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Фильтрация списка по введённому тексту.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-filter',
  standalone: true,
  imports: [ListboxComponent, ReactiveFormsModule],
  template: \`
    <listbox [formControl]="ctrl" [options]="options" [filter]="true" filterPlaceHolder="Поиск..."></listbox>
  \`,
})
export class ListboxFilterComponent {
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
