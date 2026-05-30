import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSelectComponent } from '../../../../lib/components/select/select.component';

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
        <extra-select
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          placeholder="Выберите город..."
        ></extra-select>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraSelectComponent, ReactiveFormsModule],
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
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template: \`
    <extra-select
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите город..."
    ></extra-select>
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
