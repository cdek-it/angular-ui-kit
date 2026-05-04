import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const IntegerOnly: StoryObj = {
  name: 'IntegerOnly',
  render: (args) => {
    const control = new FormControl<string | null>(null);
    return {
      props: { ...args, control },
      template: `<input-otp [integerOnly]="true" [formControl]="control"></input-otp>`,
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
        story: 'Ввод только цифр.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputOtpComponent, ReactiveFormsModule],
  template: \`<input-otp [integerOnly]="true" [formControl]="control"></input-otp>\`,
})
export class IntegerOnlyExample {
  control = new FormControl<string | null>(null);
}
        `,
      },
    },
  },
};
