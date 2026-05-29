import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraSelectComponent, SelectSize } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Профиль', description: 'Настройки аккаунта', icon: 'ti ti-user' },
  { name: 'Настройки', description: 'Параметры приложения', icon: 'ti ti-settings' },
  { name: 'Сообщения', description: 'Входящие', icon: 'ti ti-message' },
];

const template = `
<ng-template #optTpl let-option>
  <div class="flex items-center gap-2">
    <span [class]="option.icon"></span>
    <div>
      <div>{{ option.name }}</div>
      <small class="text-surface-400">{{ option.description }}</small>
    </div>
  </div>
</ng-template>
<extra-select
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите пункт..."
  [optionTemplate]="optTpl"
  [size]="size"
  [showClear]="showClear"
  [readonly]="readonly"
></extra-select>
`;
const styles = '';

@Component({
  selector: 'app-select-custom',
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectCustomComponent {
  @Input() size: SelectSize = 'base';
  @Input() showClear = false;
  @Input() readonly = false;
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

export const Custom = {
  render: (args: any) => ({
    props: { size: args['size'], showClear: args['showClear'], readonly: args['readonly'], disabled: args['disabled'], invalid: args['invalid'] },
    template: `<app-select-custom [size]="size" [showClear]="showClear" [readonly]="readonly" [disabled]="disabled" [invalid]="invalid"></app-select-custom>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон опции с иконкой и описанием.' },
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
    <ng-template #optTpl let-option>
      <div class="flex items-center gap-2">
        <span [class]="option.icon"></span>
        <div>
          <div>{{ option.name }}</div>
          <small>{{ option.description }}</small>
        </div>
      </div>
    </ng-template>
    <extra-select
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите пункт..."
      [optionTemplate]="optTpl"
    ></extra-select>
  \`,
})
export class SelectCustomExample {
  control = new FormControl(null);
  options = [
    { name: 'Профиль', description: 'Настройки аккаунта', icon: 'ti ti-user' },
    { name: 'Настройки', description: 'Параметры приложения', icon: 'ti ti-settings' },
    { name: 'Сообщения', description: 'Входящие', icon: 'ti ti-message' },
  ];
}
        `,
      },
    },
  },
};
