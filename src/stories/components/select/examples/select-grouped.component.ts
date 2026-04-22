import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../lib/components/select/select.component';

const GROUPED_OPTIONS = [
  {
    label: 'Германия',
    items: [
      { label: 'Берлин', value: 'BE' },
      { label: 'Франкфурт', value: 'FR' },
      { label: 'Гамбург', value: 'HA' },
    ],
  },
  {
    label: 'США',
    items: [
      { label: 'Чикаго', value: 'CH' },
      { label: 'Лос-Анджелес', value: 'LA' },
      { label: 'Нью-Йорк', value: 'NY' },
    ],
  },
];

const template = `
<ng-template #groupTpl let-group>
  <div class="flex items-center gap-2">
    <span class="ti ti-flag"></span>
    <span>{{ group.label }}</span>
  </div>
</ng-template>
<select-field
  [formControl]="control"
  [options]="options"
  optionLabel="label"
  optionGroupLabel="label"
  optionGroupChildren="items"
  [group]="true"
  placeholder="Выберите город..."
  [optionGroupTemplate]="groupTpl"
></select-field>
`;
const styles = '';

@Component({
  selector: 'app-select-grouped',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectGroupedComponent {
  control = new FormControl(null);
  options = GROUPED_OPTIONS;
}

export const Grouped = {
  render: () => ({
    template: `<app-select-grouped></app-select-grouped>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Опции, сгруппированные по категориям с кастомным заголовком группы.' },
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
    <ng-template #groupTpl let-group>
      <div class="flex items-center gap-2">
        <span class="ti ti-flag"></span>
        <span>{{ group.label }}</span>
      </div>
    </ng-template>
    <select-field
      [formControl]="control"
      [options]="options"
      optionLabel="label"
      optionGroupLabel="label"
      optionGroupChildren="items"
      [group]="true"
      placeholder="Выберите город..."
      [optionGroupTemplate]="groupTpl"
    ></select-field>
  \`,
})
export class SelectGroupedExample {
  control = new FormControl(null);
  options = [
    {
      label: 'Германия',
      items: [
        { label: 'Берлин', value: 'BE' },
        { label: 'Франкфурт', value: 'FR' },
      ],
    },
    {
      label: 'США',
      items: [
        { label: 'Нью-Йорк', value: 'NY' },
        { label: 'Чикаго', value: 'CH' },
      ],
    },
  ];
}
        `,
      },
    },
  },
};
