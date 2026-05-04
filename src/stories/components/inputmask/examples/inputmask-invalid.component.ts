import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: (args) => {
    const control = new FormControl('', Validators.required);
    return {
      props: { ...args, control },
      template: `<input-mask mask="99-99-99" placeholder="Обязательное поле" [formControl]="control"></input-mask>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputMaskComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Невалидное состояние — определяется через валидаторы `FormControl`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputMaskComponent, ReactiveFormsModule],
  template: \`<input-mask mask="99-99-99" [formControl]="control" placeholder="Обязательное поле"></input-mask>\`,
})
export class InvalidExample {
  control = new FormControl('', Validators.required);
}
        `,
      },
    },
  },
};
