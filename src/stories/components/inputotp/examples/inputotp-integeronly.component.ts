import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-integeronly',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputOtpComponent, ReactiveFormsModule],
  styles,
  template: `
    <input-otp [integerOnly]="true" [formControl]="control"></input-otp>
  `,
})
export class InputOtpIntegerOnlyComponent {
  readonly control = new FormControl<string | null>(null);
}

export const IntegerOnly: StoryObj = {
  render: () => ({
    template: `<app-inputotp-integeronly></app-inputotp-integeronly>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Ввод только цифр.' },
      source: {
        language: 'ts',
        code: `
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// В компоненте:
readonly control = new FormControl(null);

// template:
// <input-otp [integerOnly]="true" [formControl]="control"></input-otp>
        `,
      },
    },
  },
};
