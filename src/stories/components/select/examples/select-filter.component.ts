import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent, SelectSize } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' },
];

const template = `
<select-field
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите город..."
  [filter]="true"
  [showClear]="true"
  [size]="size"
></select-field>
`;
const styles = '';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectFilterComponent {
  @Input() size: SelectSize = 'base';
  control = new FormControl(null);
  options = OPTIONS;
}

export const Filter = {
  render: (args: any) => ({
    props: { size: args['size'] },
    template: `<app-select-filter [size]="size"></app-select-filter>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Выпадающий список с поиском по опциям.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template: \`
    <select-field
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите город..."
      [filter]="true"
      [showClear]="true"
    ></select-field>
  \`,
})
export class SelectFilterExample {
  control = new FormControl(null);
  options = [
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Москва', code: 'MSK' },
    { name: 'Санкт-Петербург', code: 'SPB' },
  ];
}
        `,
      },
    },
  },
};
