import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { SelectComponent } from '../../../../lib/components/select/select.component';

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
        <select-field
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          placeholder="Выберите город..."
        ></select-field>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [SelectComponent, ReactiveFormsModule],
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
    ></select-field>
  \`,
})
export class SelectDisabledExample {
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
