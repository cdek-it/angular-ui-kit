import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { MultiSelectComponent } from '../../../../lib/components/multiselect/multiselect.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' },
];

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: () => {
    const control = new FormControl({ value: null, disabled: true });
    return {
      props: { control, options: OPTIONS },
      template: `
        <multiselect-field
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          placeholder="Выберите города..."
        ></multiselect-field>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [MultiSelectComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Отключённое состояние — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [MultiSelectComponent, ReactiveFormsModule],
  template: \`
    <multiselect-field
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите города..."
    ></multiselect-field>
  \`,
})
export class MultiSelectDisabledExample {
  control = new FormControl({ value: null, disabled: true });
  options = [
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Москва', code: 'MSK' },
  ];
}
        `,
      },
    },
  },
};
