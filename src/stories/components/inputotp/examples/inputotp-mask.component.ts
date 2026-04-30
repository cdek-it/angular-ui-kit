import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-mask',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputOtpComponent, ReactiveFormsModule],
  styles,
  template: `
    <input-otp [mask]="true" [formControl]="control"></input-otp>
  `,
})
export class InputOtpMaskComponent {
  readonly control = new FormControl('1234');
}

export const Mask: StoryObj = {
  render: () => ({
    template: `<app-inputotp-mask></app-inputotp-mask>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Маскированный ввод — символы скрыты.' },
      source: {
        language: 'ts',
        code: `
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// В компоненте:
readonly control = new FormControl('1234');

// template:
// <input-otp [mask]="true" [formControl]="control"></input-otp>
        `,
      },
    },
  },
};
