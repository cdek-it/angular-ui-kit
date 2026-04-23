import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent, SelectSize } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
  { name: 'Екатеринбург', code: 'EKB' },
];

const template = `
<select-field
  [formControl]="control"
  [options]="options"
  optionLabel="name"
  placeholder="Выберите город..."
  [dropdownIcon]="dropdownIcon"
  [size]="size"
  [showClear]="showClear"
></select-field>
`;
const styles = '';

@Component({
  selector: 'app-select-dropdown-icon',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectDropdownIconComponent {
  @Input() size: SelectSize = 'base';
  @Input() showClear = false;
  @Input() dropdownIcon = 'ti ti-search';
  control = new FormControl(null);
  options = OPTIONS;
}

export const DropdownIcon = {
  render: (args: any) => ({
    props: { size: args['size'], showClear: args['showClear'], dropdownIcon: args['dropdownIcon'] },
    template: `<app-select-dropdown-icon [size]="size" [showClear]="showClear" [dropdownIcon]="dropdownIcon"></app-select-dropdown-icon>`,
  }),
  args: {
    dropdownIcon: 'ti ti-search',
  },
  argTypes: {
    dropdownIcon: {
      control: 'text' as const,
      description: 'CSS-класс иконки для выпадающего списка',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: { story: 'Кастомная иконка раскрытия списка через пропс `dropdownIcon`.' },
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
    <select-field
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите город..."
      dropdownIcon="ti ti-search"
    ></select-field>
  \`,
})
export class SelectDropdownIconExample {
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
