import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputOtpComponent, ReactiveFormsModule],
  styles,
  template: `
    <input-otp [formControl]="control"></input-otp>
  `,
})
export class InputOtpInvalidComponent {
  readonly control = new FormControl('', Validators.required);

  constructor() {
    this.control.markAsTouched();
  }
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-inputotp-invalid></app-inputotp-invalid>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Невалидное состояние — определяется через валидаторы `FormControl`.' },
      source: {
        language: 'ts',
        code: `
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// В компоненте:
readonly control = new FormControl('', Validators.required);

// template:
// <input-otp [formControl]="control"></input-otp>
        `,
      },
    },
  },
};
