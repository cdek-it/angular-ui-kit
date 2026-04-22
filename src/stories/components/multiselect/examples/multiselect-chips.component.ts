import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent, MultiSelectSize } from '../../../../lib/components/multiselect/multiselect.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' },
];

const template = `
<multiselect-field
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите города..."
  display="chip"
  [showClear]="showClear"
  [size]="size"
></multiselect-field>
`;
const styles = '';

@Component({
  selector: 'app-multiselect-chips',
  standalone: true,
  imports: [MultiSelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class MultiSelectChipsComponent {
  @Input() size: MultiSelectSize = 'base';
  @Input() showClear = false;
  control = new FormControl(null);
  options = OPTIONS;
}

export const Chips = {
  name: 'Chips',
  render: (args: any) => ({
    props: { size: args['size'], showClear: args['showClear'] },
    template: `<app-multiselect-chips [size]="size" [showClear]="showClear"></app-multiselect-chips>`,
  }),
  argTypes: {
    display: { table: { disable: true } },
    filter: { table: { disable: true } },
    readonly: { table: { disable: true } },
    disabled: { table: { disable: true } },
    invalid: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: { story: 'Выбранные значения отображаются в виде чипов (`display="chip"`).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [MultiSelectComponent, ReactiveFormsModule],
  template: \`
    <multiselect-field
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите города..."
      display="chip"
      [showClear]="true"
    ></multiselect-field>
  \`,
})
export class MultiSelectChipsExample {
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
