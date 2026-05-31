import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const groupedOptions = [
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
<extra-listbox
  [formControl]="ctrl"
  [options]="options"
  [group]="true"
  optionLabel="label"
  optionGroupLabel="label"
  optionGroupChildren="items"
></extra-listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-grouped',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template,
  styles
})
export class ListboxGroupedComponent {
  ctrl = new FormControl(null);
  options = groupedOptions;
}

export const Grouped: StoryObj = {
  render: () => ({
    template: `<app-listbox-grouped></app-listbox-grouped>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Группировка элементов с заголовками категорий.' },
      source: {
        language: 'ts',
        code: `
 import { ExtraListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-grouped',
  standalone: true,
  imports: [ExtraListboxComponent, ReactiveFormsModule],
  template: \`
    <extra-listbox
      [formControl]="ctrl"
      [options]="options"
      [group]="true"
      optionLabel="label"
      optionGroupLabel="label"
      optionGroupChildren="items"
    ></extra-listbox>
  \`,
})
export class ListboxGroupedComponent {
  ctrl = new FormControl(null);
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
        { label: 'Чикаго', value: 'CH' },
        { label: 'Нью-Йорк', value: 'NY' },
      ],
    },
  ];
}
        `
      }
    }
  }
};
