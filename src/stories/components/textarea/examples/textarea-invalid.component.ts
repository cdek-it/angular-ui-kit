import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraTextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: (args) => {
    const control = new FormControl('', Validators.required);
    return {
      props: { ...args, control },
      template: `<extra-textarea [formControl]="control" placeholder="Обязательное поле"></extra-textarea>`
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraTextareaComponent, ReactiveFormsModule]
      }
    })
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
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template: \`<extra-textarea [formControl]="control" placeholder="Обязательное поле"></extra-textarea>\`,
})
export class InvalidExample {
  control = new FormControl('', Validators.required);
}
        `
      }
    }
  }
};
