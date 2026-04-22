import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectComponent } from '../../../../lib/components/multiselect/multiselect.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
];

const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <multiselect-field
      inputId="multiselect-fl"
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      [showClear]="showClear"
      [filter]="filter"
    ></multiselect-field>
    <label for="multiselect-fl">Города</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-multiselect-float-label',
  standalone: true,
  imports: [MultiSelectComponent, FloatLabel, ReactiveFormsModule],
  template,
  styles,
})
export class MultiSelectFloatLabelComponent {
  @Input() showClear = false;
  @Input() filter = true;
  control = new FormControl(null);
  options = OPTIONS;
}

export const FloatLabelStory = {
  name: 'FloatLabel',
  render: (args: any) => ({
    props: { showClear: args['showClear'], filter: args['filter'] },
    template: `<app-multiselect-float-label [showClear]="showClear" [filter]="filter"></app-multiselect-float-label>`,
  }),
  argTypes: {
    size: { table: { disable: true } },
    display: { table: { disable: true } },
    readonly: { table: { disable: true } },
    disabled: { table: { disable: true } },
    invalid: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Интеграция с `p-floatlabel` — плавающая метка внутри поля.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [MultiSelectComponent, FloatLabel, ReactiveFormsModule],
  template: \`
    <div class="pt-6 w-64">
      <p-floatlabel variant="in">
        <multiselect-field
          inputId="multiselect-fl"
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          [showClear]="true"
        ></multiselect-field>
        <label for="multiselect-fl">Города</label>
      </p-floatlabel>
    </div>
  \`,
})
export class MultiSelectFloatLabelExample {
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
