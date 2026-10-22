import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraMultiSelectComponent } from '../../../../lib/components/multiselect/multiselect.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' }
];

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: () => {
    const control = new FormControl<any[] | null>(null, Validators.required);
    control.markAsTouched();
    return {
      props: { control, options: OPTIONS },
      template: `
        <extra-multi-select
          [formControl]="control"
          [options]="options"
          optionLabel="name"
          placeholder="Обязательное поле"
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
      description: {
        story:
          'Невалидное состояние — определяется через валидаторы `FormControl` (нужно, чтобы контрол также был touched).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExtraMultiSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraMultiSelectComponent, ReactiveFormsModule],
  template: \`
    <extra-multi-select
      [formControl]="control"
      [options]="options"
      optionLabel="name"
      placeholder="Обязательное поле"
    ></extra-multi-select>
  \`,
})
export class MultiSelectInvalidExample {
  control = new FormControl<any[] | null>(null, Validators.required);
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
