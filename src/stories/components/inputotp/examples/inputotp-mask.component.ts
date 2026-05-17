import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const Mask: StoryObj = {
  name: 'Mask',
  render: (args) => {
    const control = new FormControl('1234');
    return {
      props: { ...args, control },
      template: `<extra-input-otp [mask]="true" [formControl]="control"></extra-input-otp>`,
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
        story: 'Маскированный ввод — символы скрыты.',
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
  template: \`<extra-input-otp [mask]="true" [formControl]="control"></extra-input-otp>\`,
})
export class MaskExample {
  control = new FormControl('1234');
}
        `,
      },
    },
  },
};
