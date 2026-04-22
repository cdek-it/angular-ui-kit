import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../lib/components/select/select.component';

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
  control = new FormControl(null);
  options = OPTIONS;
}

export const Filter = {
  render: () => ({
    template: `<app-select-filter></app-select-filter>`,
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
