import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputOtpComponent } from '../../../../lib/components/inputotp/inputotp.component';

const styles = '';

@Component({
  selector: 'app-inputotp-integeronly',
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  styles,
  template: `
    <input-otp [integerOnly]="true" [(ngModel)]="value"></input-otp>
  `,
})
export class InputOtpIntegerOnlyComponent {
  value: string | null = null;
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
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputotp-integeronly',
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  template: \`
    <input-otp [integerOnly]="true" [(ngModel)]="value"></input-otp>
  \`,
})
export class InputOtpIntegerOnlyComponent {
  value: string | null = null;
}
        `,
      },
    },
  },
};
