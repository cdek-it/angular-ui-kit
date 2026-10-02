import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const Autofocus: StoryObj = {
  name: 'Autofocus',
  render: (args) => {
    const control = new FormControl<string | null>(null);
    return {
      props: { ...args, control },
      template: `<extra-input-otp [autofocus]="true" [formControl]="control"></extra-input-otp>`
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputOtpComponent, ReactiveFormsModule]
      }
    })
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Автофокус на первой ячейке при инициализации.'
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
  template: \`<extra-input-otp [autofocus]="true" [formControl]="control"></extra-input-otp>\`,
})
export class AutofocusExample {
  control = new FormControl<string | null>(null);
}
        `
      }
    }
  }
};
