import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const IntegerOnly: StoryObj = {
  name: 'IntegerOnly',
  render: (args) => {
    const control = new FormControl<string | null>(null);
    return {
      props: { ...args, control },
      template: `<extra-input-otp [integerOnly]="true" [formControl]="control"></extra-input-otp>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputOtpComponent, ReactiveFormsModule],
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
import { ExtraInputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputOtpComponent, ReactiveFormsModule],
  template: \`<extra-input-otp [integerOnly]="true" [formControl]="control"></extra-input-otp>\`,
})
export class IntegerOnlyExample {
  control = new FormControl<string | null>(null);
}
        `,
      },
    },
  },
};
