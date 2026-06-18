import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraSelectComponent, ExtraSelectSize } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

const template = `
<extra-select
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите город..."
  [filter]="true"
  [showClear]="true"
  [size]="size"
  [readonly]="readonly"
></extra-select>
`;
const styles = '';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template,
  styles
})
export class SelectFilterComponent {
  @Input() size: ExtraSelectSize = 'base';
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

export const Filter = {
  render: (args: any) => ({
    props: { size: args['size'], readonly: args['readonly'], disabled: args['disabled'], invalid: args['invalid'] },
    template: `<app-select-filter [size]="size" [readonly]="readonly" [disabled]="disabled" [invalid]="invalid"></app-select-filter>`
  }),
  parameters: {
    docs: {
      description: { story: 'Выпадающий список с поиском по опциям.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template: \`
    <extra-select
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите город..."
      [filter]="true"
      [showClear]="true"
    ></extra-select>
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
        `
      }
    }
  }
};
