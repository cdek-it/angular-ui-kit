import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: (args) => {
    const control = new FormControl('1234');
    return {
      props: { ...args, control },
      template: `<extra-input-otp [readonly]="true" [formControl]="control"></extra-input-otp>`
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
        story: 'Режим только для чтения — поле отображает значение, но недоступно для редактирования.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraInputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputOtpComponent, ReactiveFormsModule],
  template: \`<extra-input-otp [readonly]="true" [formControl]="control"></extra-input-otp>\`,
})
export class ReadonlyExample {
  control = new FormControl('1234');
}
        `
      }
    }
  }
};
