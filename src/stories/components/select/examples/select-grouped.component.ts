import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ExtraSelectComponent,
  ExtraSelectOptionGroupDirective,
  ExtraSelectSize
} from '../../../../lib/components/select/select.component';

const GROUPED_OPTIONS = [
  {
    label: 'Германия',
    items: [
      { label: 'Берлин', value: 'BE' },
      { label: 'Франкфурт', value: 'FR' },
      { label: 'Гамбург', value: 'HA' }
    ]
  },
  {
    label: 'США',
    items: [
      { label: 'Чикаго', value: 'CH' },
      { label: 'Лос-Анджелес', value: 'LA' },
      { label: 'Нью-Йорк', value: 'NY' }
    ]
  }
];

const template = `
<extra-select
  [formControl]="control"
  [options]="options"
  optionLabel="label"
  optionGroupLabel="label"
  optionGroupChildren="items"
  [group]="true"
  placeholder="Выберите город..."
  [size]="size"
  [showClear]="showClear"
  [readonly]="readonly"
>
  <ng-template extraSelectOptionGroup let-group>
    <div class="flex items-center gap-2">
      <span class="ti ti-flag"></span>
      <span>{{ group.label }}</span>
    </div>
  </ng-template>
</extra-select>
`;
const styles = '';

@Component({
  selector: 'app-select-grouped',
  standalone: true,
  imports: [ExtraSelectComponent, ExtraSelectOptionGroupDirective, ReactiveFormsModule],
  template,
  styles
})
export class SelectGroupedComponent {
  @Input() size: ExtraSelectSize = 'base';
  @Input() showClear = false;
  @Input() readonly = false;
  control = new FormControl(null);
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
      showClear: args['showClear'],
      readonly: args['readonly'],
      disabled: args['disabled'],
      invalid: args['invalid']
    },
    template: `<app-select-grouped [size]="size" [showClear]="showClear" [readonly]="readonly" [disabled]="disabled" [invalid]="invalid"></app-select-grouped>`
  }),
  parameters: {
    docs: {
      description: { story: 'Опции, сгруппированные по категориям с кастомным заголовком группы.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraSelectComponent, ExtraSelectOptionGroupDirective } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraSelectComponent, ExtraSelectOptionGroupDirective, ReactiveFormsModule],
  template: \`
    <extra-select
      [formControl]="control"
      [options]="options"
      optionLabel="label"
      optionGroupLabel="label"
      optionGroupChildren="items"
      [group]="true"
      placeholder="Выберите город..."
    >
      <ng-template extraSelectOptionGroup let-group>
        <div class="flex items-center gap-2">
          <span class="ti ti-flag"></span>
          <span>{{ group.label }}</span>
        </div>
      </ng-template>
    </extra-select>
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
        `
      }
    }
  }
};
