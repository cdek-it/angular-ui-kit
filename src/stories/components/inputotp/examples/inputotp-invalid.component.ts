import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-invalid',
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  styles,
  template: `
    <input-otp [invalid]="true" [(ngModel)]="value"></input-otp>
  `,
})
export class InputOtpInvalidComponent {
  value: string | null = null;
}

export const Invalid: StoryObj = {
  render: (args) => ({
    props: { ...args },
    template: `<input-otp [invalid]="true" [(ngModel)]="value"></input-otp>`,
  }),
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Невалидное состояние поля OTP.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputotp-invalid',
  standalone: true,
  imports: [InputOtpComponent, ReactiveFormsModule],
  template: \`
    <input-otp [formControl]="control"></input-otp>
  \`,
})
export class InputOtpInvalidComponent {
  control = new FormControl('', [Validators.required]);
}
        `,
      },
    },
  },
};
