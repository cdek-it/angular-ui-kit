import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: (args) => {
    const control = new FormControl('', Validators.required);
    return {
        props: { ...args, control },
        template: `<extra-input-text [formControl]="control" placeholder="Обязательное поле"></extra-input-text>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputTextComponent, ReactiveFormsModule],
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
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: \`<extra-input-text [formControl]="control" placeholder="Обязательное поле"></extra-input-text>\`,
})
export class InvalidExample {
  control = new FormControl('', Validators.required);
}
        `,
      },
    },
  },
};
