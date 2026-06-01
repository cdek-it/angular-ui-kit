import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraSelectComponent } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' }
];

const template = `
<div class="pt-6 w-64">
  <extra-select
    inputId="select-fl"
    [formControl]="control"
    [options]="options"
    optionLabel="name"
    [floatLabel]="true"
    [label]="label"
    [showClear]="showClear"
    [readonly]="readonly"
  ></extra-select>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-float-label',
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template,
  styles
})
export class SelectFloatLabelComponent {
  @Input() showClear = false;
  @Input() readonly = false;
  @Input() label = 'Город';
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

export const FloatLabelStory = {
  name: 'FloatLabel',
  render: (args: any) => ({
    props: {
      showClear: args['showClear'],
      label: 'Город',
      readonly: args['readonly'],
      disabled: args['disabled'],
      invalid: args['invalid']
    },
    template: `<app-select-float-label [showClear]="showClear" [label]="label" [readonly]="readonly" [disabled]="disabled" [invalid]="invalid"></app-select-float-label>`
  }),
  argTypes: {
    size: { table: { disable: true } }
  },
  parameters: {
    docs: {
      description: {
        story: 'Плавающая метка внутри поля. Используйте пропс `floatLabel` для встроенной интеграции с `p-floatlabel`.'
      },
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
    <div class="pt-6 w-64">
      <extra-select
        inputId="select-fl"
        [formControl]="control"
        [options]="options"
        optionLabel="name"
        [floatLabel]="true"
        label="Город"
        [showClear]="true"
      ></extra-select>
    </div>
  \`,
})
export class SelectFloatLabelExample {
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
