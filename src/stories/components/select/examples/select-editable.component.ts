import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent, SelectSize } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
];

const template = `
<select-field
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите или введите город..."
  [editable]="true"
  [size]="size"
></select-field>
`;
const styles = '';

@Component({
  selector: 'app-select-editable',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectEditableComponent {
  @Input() size: SelectSize = 'base';
  control = new FormControl(null);
  options = OPTIONS;
}

export const Editable = {
  render: (args: any) => ({
    props: { size: args['size'] },
    template: `<app-select-editable [size]="size"></app-select-editable>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Редактируемый режим — позволяет вводить произвольное значение.' },
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
      placeholder="Выберите или введите город..."
      [editable]="true"
    ></select-field>
  \`,
})
export class SelectEditableExample {
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
