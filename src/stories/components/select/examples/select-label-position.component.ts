import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSelectComponent } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' }
];

const template = `
<div class="flex flex-wrap gap-6">
  <div class="w-64">
    <extra-select [formControl]="control1" [options]="options" optionLabel="name" label="Город" placeholder="Выберите..."></extra-select>
  </div>
  <div class="w-64 pt-6">
    <extra-select [formControl]="control2" [options]="options" optionLabel="name" label="Город" labelPosition="float"></extra-select>
  </div>
  <div class="w-64">
    <extra-select [formControl]="control3" [options]="options" optionLabel="name" label="Город" labelPosition="left" placeholder="Выберите..."></extra-select>
  </div>
</div>
`;

@Component({
  selector: 'app-select-label-position',
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template
})
export class SelectLabelPositionComponent {
  readonly options = OPTIONS;
  control1 = new FormControl(null);
  control2 = new FormControl(null);
  control3 = new FormControl(null);
}

export const LabelPosition: StoryObj = {
  render: () => ({
    template: `<app-select-label-position></app-select-label-position>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (`label-position`): `top` (по умолчанию) — над полем, `float` — плавающая метка внутри поля, `left` — слева от поля.'
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
    <extra-select [formControl]="control1" [options]="options" optionLabel="name" label="Город" placeholder="Выберите..."></extra-select>

    <extra-select [formControl]="control2" [options]="options" optionLabel="name" label="Город" labelPosition="float"></extra-select>

    <extra-select [formControl]="control3" [options]="options" optionLabel="name" label="Город" labelPosition="left" placeholder="Выберите..."></extra-select>
  \`,
})
export class ExampleComponent {
  options = [
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Москва', code: 'MSK' },
  ];
  control1 = new FormControl(null);
  control2 = new FormControl(null);
  control3 = new FormControl(null);
}
        `
      }
    }
  }
};
