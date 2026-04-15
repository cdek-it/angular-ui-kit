import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ListboxComponent } from '../../../../lib/components/listbox/listbox.component';

const groupedOptions = [
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
<listbox
  [formControl]="ctrl"
  [options]="options"
  [group]="true"
  optionLabel="label"
  optionGroupLabel="label"
  optionGroupChildren="items"
></listbox>
`;
const styles = '';

@Component({
  selector: 'app-listbox-grouped',
  standalone: true,
  imports: [ListboxComponent, ReactiveFormsModule],
  template,
  styles,
})
export class ListboxGroupedComponent {
  ctrl = new FormControl(null);
  options = groupedOptions;
}

export const Grouped: StoryObj = {
  render: () => ({
    template: `<app-listbox-grouped></app-listbox-grouped>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Группировка элементов с заголовками категорий.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ListboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-listbox-grouped',
  standalone: true,
  imports: [ListboxComponent, ReactiveFormsModule],
  template: \`
    <listbox
      [formControl]="ctrl"
      [options]="options"
      [group]="true"
      optionLabel="label"
      optionGroupLabel="label"
      optionGroupChildren="items"
    ></listbox>
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
        `,
      },
    },
  },
};
