import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-disabled',
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  styles,
  template: `
    <input-otp [disabled]="true" [(ngModel)]="value"></input-otp>
  `,
})
export class InputOtpDisabledComponent {
  value = '1234';
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-inputotp-disabled></app-inputotp-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Заблокированное состояние поля OTP.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputotp-disabled',
  standalone: true,
  imports: [InputOtpComponent, ReactiveFormsModule],
  template: \`
    <input-otp [formControl]="control"></input-otp>
  \`,
})
export class InputOtpDisabledComponent {
  control = new FormControl({ value: '1234', disabled: true });
}
        `,
      },
    },
  },
};
