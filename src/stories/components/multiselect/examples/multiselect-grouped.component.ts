import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ExtraMultiSelectComponent,
  ExtraMultiSelectSize
} from '../../../../lib/components/multiselect/multiselect.component';

const GROUPED_OPTIONS = [
  {
    name: 'Германия',
    options: [
      { name: 'Берлин', code: 'BE' },
      { name: 'Франкфурт', code: 'FR' },
      { name: 'Гамбург', code: 'HA' }
    ]
  },
  {
    name: 'США',
    options: [
      { name: 'Чикаго', code: 'CH' },
      { name: 'Лос-Анджелес', code: 'LA' },
      { name: 'Нью-Йорк', code: 'NY' }
    ]
  }
];

const template = `
<extra-multi-select
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  optionGroupLabel="name"
  optionGroupChildren="options"
  [group]="true"
  placeholder="Выберите города"
  [size]="size"
  [showFilter]="showFilter"
></extra-multi-select>
`;

@Component({
  selector: 'app-multiselect-grouped',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template
})
export class MultiSelectGroupedComponent {
  @Input() size: ExtraMultiSelectSize = 'base';
  @Input() showFilter = false;
  control = new FormControl<any[] | null>(null);
  options = GROUPED_OPTIONS;

  @Input() set disabled(val: boolean) {
    val ? this.control.disable() : this.control.enable();
  }

  @Input() set invalid(val: boolean) {
    this.control.setValidators(val ? [Validators.required] : []);
    this.control.updateValueAndValidity();
    if (val) this.control.markAsTouched();
  }
}

export const Grouped = {
  render: (args: any) => ({
    props: {
      size: args['size'],
      showFilter: args['showFilter'],
      disabled: args['disabled'],
      invalid: args['invalid']
    },
    template: `<app-multiselect-grouped [size]="size" [showFilter]="showFilter" [disabled]="disabled" [invalid]="invalid"></app-multiselect-grouped>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Опции, сгруппированные по категориям, через `[group]="true"` + `optionGroupLabel`/`optionGroupChildren`.'
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
      [options]="options"
      optionLabel="name"
      optionGroupLabel="name"
      optionGroupChildren="options"
      [group]="true"
      placeholder="Выберите города"
    ></extra-multi-select>
  \`,
})
export class MultiSelectGroupedExample {
  control = new FormControl<any[] | null>(null);
  options = [
    {
      name: 'Германия',
      options: [
        { name: 'Берлин', code: 'BE' },
        { name: 'Франкфурт', code: 'FR' },
      ],
    },
    {
      name: 'США',
      options: [
        { name: 'Нью-Йорк', code: 'NY' },
        { name: 'Чикаго', code: 'CH' },
      ],
    },
  ];
}
        `
      }
    }
  }
};
