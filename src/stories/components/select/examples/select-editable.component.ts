import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  [showClear]="showClear"
  [readonly]="readonly"
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
  @Input() showClear = false;
  @Input() readonly = false;
  control = new FormControl(null);
  options = OPTIONS;

  @Input() set disabled(val: boolean) {
    val ? this.control.disable() : this.control.enable();
  }

  @Input() set invalid(val: boolean) {
    this.control.setValidators(val ? [Validators.required] : []);
    this.control.updateValueAndValidity();
    if (val) this.control.markAsTouched();
  }
}

export const Editable = {
  render: (args: any) => ({
    props: { size: args['size'], showClear: args['showClear'], readonly: args['readonly'], disabled: args['disabled'], invalid: args['invalid'] },
    template: `<app-select-editable [size]="size" [showClear]="showClear" [readonly]="readonly" [disabled]="disabled" [invalid]="invalid"></app-select-editable>`,
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
