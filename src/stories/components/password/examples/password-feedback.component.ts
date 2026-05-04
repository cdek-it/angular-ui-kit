import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { PasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <password [feedback]="true" [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></password>
</div>
`;

@Component({
  selector: 'app-password-feedback',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template,
})
export class PasswordFeedbackComponent {
  value: string | null = null;
}

export const Feedback: StoryObj = {
  render: () => ({
    template: `<app-password-feedback></app-password-feedback>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Индикатор надёжности пароля с визуальной шкалой (слабый / средний / сильный).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-feedback',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template: \`
    <password [feedback]="true" [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></password>
  \`,
})
export class PasswordFeedbackComponent {
  value: string | null = null;
}
        `,
      },
    },
  },
};
