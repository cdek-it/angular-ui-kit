import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const options = [
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' },
];

const template = `
<extra-listbox [formControl]="ctrl" [options]="options"></extra-listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-disabled',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ListboxDisabledComponent {
  ctrl = new FormControl({ value: null, disabled: true });
  options = options;
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-listbox-disabled></app-listbox-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Список в отключённом состоянии — взаимодействие заблокировано.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
 import { ExtraListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-disabled',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template: \`
    <extra-listbox [formControl]="ctrl" [options]="options"></extra-listbox>
  \`,
})
export class ListboxDisabledComponent {
  ctrl = new FormControl({ value: null, disabled: true });
  options = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
  ];
}
        `,
      },
    },
  },
};
