import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
];

const template = `
<div class="pt-6 w-64">
  <select-field
    inputId="select-fl"
    [formControl]="control"
    [options]="options"
    optionLabel="name"
    [floatLabel]="true"
    [label]="label"
    [showClear]="showClear"
  ></select-field>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-float-label',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectFloatLabelComponent {
  @Input() showClear = false;
  @Input() label = 'Город';
  control = new FormControl(null);
  options = OPTIONS;
}

export const FloatLabelStory = {
  name: 'FloatLabel',
  render: (args: any) => ({
    props: { showClear: args['showClear'], label: 'Город' },
    template: `<app-select-float-label [showClear]="showClear" [label]="label"></app-select-float-label>`,
  }),
  argTypes: {
    size: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Плавающая метка внутри поля. Используйте пропс `floatLabel` для встроенной интеграции с `p-floatlabel`.',
      },
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
    <div class="pt-6 w-64">
      <select-field
        inputId="select-fl"
        [formControl]="control"
        [options]="options"
        optionLabel="name"
        [floatLabel]="true"
        label="Город"
        [showClear]="true"
      ></select-field>
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
        `,
      },
    },
  },
};
