import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraMultiSelectComponent } from '../../../../lib/components/multiselect/multiselect.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' }
];

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: () => {
    const control = new FormControl({ value: [OPTIONS[0]], disabled: true });
    return {
      props: { control, options: OPTIONS },
      template: `
        <extra-multi-select
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          placeholder="Выберите города"
        ></extra-multi-select>
      `
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraMultiSelectComponent, ReactiveFormsModule]
      }
    })
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Отключённое состояние — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template: \`
    <extra-multi-select
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Выберите города"
    ></extra-multi-select>
  \`,
})
export class MultiSelectDisabledExample {
  control = new FormControl({ value: [], disabled: true });
  options = [
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Москва', code: 'MSK' },
  ];
}
        `
      }
    }
  }
};
