import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectComponent } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
];

const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <select-field
      inputId="select-fl"
      [formControl]="control"
      [options]="options"
      optionLabel="name"
    ></select-field>
    <label for="select-fl">Город</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-float-label',
  standalone: true,
  imports: [SelectComponent, FloatLabel, ReactiveFormsModule],
  template,
  styles,
})
export class SelectFloatLabelComponent {
  control = new FormControl(null);
  options = OPTIONS;
}

export const FloatLabelStory = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-select-float-label></app-select-float-label>`,
  }),
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
import { SelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [SelectComponent, FloatLabel, ReactiveFormsModule],
  template: \`
    <div class="pt-6 w-64">
      <p-floatlabel variant="in">
        <select-field
          inputId="select-fl"
          [formControl]="control"
          [options]="options"
          optionLabel="name"
        ></select-field>
        <label for="select-fl">Город</label>
      </p-floatlabel>
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
