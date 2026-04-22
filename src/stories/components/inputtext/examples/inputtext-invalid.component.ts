import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: (args) => {
    const control = new FormControl('', Validators.required);
    return {
      props: { ...args, control },
      template: `<input-text [formControl]="control" placeholder="Обязательное поле"></input-text>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputTextComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Невалидное состояние — управляется через FormControl + Validators.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule],
  template: \`<input-text [formControl]="control" placeholder="Обязательное поле"></input-text>\`,
})
export class InvalidExample {
  control = new FormControl('', Validators.required);
}
        `,
      },
    },
  },
};
