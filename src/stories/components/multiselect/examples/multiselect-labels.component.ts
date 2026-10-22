import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraMultiSelectComponent } from '../../../../lib/components/multiselect/multiselect.component';

const CITIES = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
  { name: 'Казань', code: 'KZN' }
];

const template = `
<div class="flex flex-col gap-6">
  <extra-multi-select
    [formControl]="control"
    [options]="cities"
    optionLabel="name"
    label="Лейбл сверху"
    placeholder="Выберите города"
    info="Дополнительная информация в тултипе"
    caption="Пояснение под полем"
  ></extra-multi-select>
  <extra-multi-select
    [formControl]="control"
    [options]="cities"
    optionLabel="name"
    [floatLabel]="true"
    label="Плавающий лейбл"
  ></extra-multi-select>
  <extra-multi-select
    [formControl]="control"
    [options]="cities"
    optionLabel="name"
    labelPosition="left"
    label="Лейбл слева"
    placeholder="Выберите города"
  ></extra-multi-select>
  <extra-multi-select
    [formControl]="control"
    [options]="cities"
    optionLabel="name"
    placeholder="Без label и caption"
  ></extra-multi-select>
</div>
`;

@Component({
  selector: 'app-multiselect-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template
})
export class MultiSelectLabelsComponent {
  control = new FormControl<any[] | null>(null);
  cities = CITIES;
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-multiselect-labels></app-multiselect-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (labelPosition): top — сверху (по умолчанию), left — слева от поля; floatLabel — плавающий лейбл внутри поля. Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-multiselect-labels',
  standalone: true,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template: \`
    <extra-multi-select
      [formControl]="control"
      [options]="cities"
      optionLabel="name"
      label="Лейбл сверху"
      placeholder="Выберите города"
      info="Дополнительная информация в тултипе"
      caption="Пояснение под полем"
    ></extra-multi-select>

    <extra-multi-select
      [formControl]="control"
      [options]="cities"
      optionLabel="name"
      [floatLabel]="true"
      label="Плавающий лейбл"
    ></extra-multi-select>

    <extra-multi-select
      [formControl]="control"
      [options]="cities"
      optionLabel="name"
      labelPosition="left"
      label="Лейбл слева"
      placeholder="Выберите города"
    ></extra-multi-select>
  \`,
})
export class MultiSelectLabelsComponent {
  control = new FormControl<any[] | null>(null);
  cities = [
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Москва', code: 'MSK' },
  ];
}
        `
      }
    }
  }
};
