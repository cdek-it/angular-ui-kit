import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputOtpComponent, ReactiveFormsModule],
  styles,
  template: `
    <input-otp [formControl]="control"></input-otp>
  `,
})
export class InputOtpDisabledComponent {
  readonly control = new FormControl({ value: '1234', disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-inputotp-disabled></app-inputotp-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Заблокированное состояние — управляется через `FormControl`.' },
      source: {
        language: 'ts',
        code: `
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// В компоненте:
readonly control = new FormControl({ value: '1234', disabled: true });

// template:
// <input-otp [formControl]="control"></input-otp>
        `,
      },
    },
  },
};
