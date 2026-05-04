import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: (args) => {
    const control = new FormControl({ value: '1234', disabled: true });
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
        story: 'Заблокированное состояние — управляется через `FormControl`.',
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
  template: \`<input-otp [formControl]="control"></input-otp>\`,
})
export class DisabledExample {
  control = new FormControl({ value: '1234', disabled: true });
}
        `,
      },
    },
  },
};
