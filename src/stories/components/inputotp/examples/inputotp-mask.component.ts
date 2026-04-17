import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-mask',
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  styles,
  template: `
    <input-otp [mask]="true" [(ngModel)]="value"></input-otp>
  `,
})
export class InputOtpMaskComponent {
  value = '1234';
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
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputotp-mask',
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  template: \`
    <input-otp [mask]="true" [(ngModel)]="value"></input-otp>
  \`,
})
export class InputOtpMaskComponent {
  value = '1234';
}
        `,
      },
    },
  },
};
