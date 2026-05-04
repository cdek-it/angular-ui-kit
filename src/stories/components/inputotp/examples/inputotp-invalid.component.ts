import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: (args) => {
    const control = new FormControl('', Validators.required);
    return {
      props: { ...args, control },
      template: `<input-otp [formControl]="control"></input-otp>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputOtpComponent, ReactiveFormsModule],
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
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputOtpComponent, ReactiveFormsModule],
  template: \`<input-otp [formControl]="control"></input-otp>\`,
})
export class InvalidExample {
  control = new FormControl('', Validators.required);
}
        `,
      },
    },
  },
};
