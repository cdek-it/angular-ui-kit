import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent, SelectSize } from '../../../../lib/components/select/select.component';

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
<select-field
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите пункт..."
  [optionTemplate]="optTpl"
  [size]="size"
></select-field>
`;
const styles = '';

@Component({
  selector: 'app-select-custom',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectCustomComponent {
  @Input() size: SelectSize = 'base';
  control = new FormControl(null);
  options = OPTIONS;
}

export const Custom = {
  render: (args: any) => ({
    props: { size: args['size'] },
    template: `<app-select-custom [size]="size"></app-select-custom>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон опции с иконкой и описанием.' },
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
    <ng-template #optTpl let-option>
      <div class="flex items-center gap-2">
        <span [class]="option.icon"></span>
        <div>
          <div>{{ option.name }}</div>
          <small>{{ option.description }}</small>
        </div>
      </div>
    </ng-template>
    <select-field
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите пункт..."
      [optionTemplate]="optTpl"
    ></select-field>
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
