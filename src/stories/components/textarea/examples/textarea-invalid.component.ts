import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: (args) => {
    const control = new FormControl('', Validators.required);
    return {
      props: { ...args, control },
      template: `<ui-textarea [formControl]="control" placeholder="Обязательное поле"></ui-textarea>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [TextareaComponent, ReactiveFormsModule],
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
import { TextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [TextareaComponent, ReactiveFormsModule],
  template: \`<ui-textarea [formControl]="control" placeholder="Обязательное поле"></ui-textarea>\`,
})
export class InvalidExample {
  control = new FormControl('', Validators.required);
}
        `,
      },
    },
  },
};
