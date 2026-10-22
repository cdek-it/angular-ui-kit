import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraMultiSelectComponent } from '../../../../lib/components/multiselect/multiselect.component';

const CITIES = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' }
];

const template = `
<extra-multi-select
  [formControl]="control"
  [options]="cities"
  optionLabel="name"
  [showChips]="true"
  placeholder="Выберите города"
></extra-multi-select>
`;

@Component({
  selector: 'app-multiselect-chips',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template
})
export class MultiSelectChipsComponent {
  control = new FormControl<any[] | null>([CITIES[0], CITIES[2]]);
  cities = CITIES;
}

export const Chips: StoryObj = {
  render: () => ({
    template: `<app-multiselect-chips></app-multiselect-chips>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Выбранные значения отображаются как chips (`showChips`) вместо списка через запятую. Каждый chip можно удалить по крестику — событие `(onRemove)`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template: \`
    <extra-multi-select
      [formControl]="control"
      [options]="cities"
      optionLabel="name"
      [showChips]="true"
      placeholder="Выберите города"
    ></extra-multi-select>
  \`,
})
export class MultiSelectChipsExample {
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
