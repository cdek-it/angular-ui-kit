import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraPasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <extra-password [feedback]="true" [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></extra-password>
</div>
`;

@Component({
  selector: 'app-password-feedback',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
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
import { ExtraPasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-feedback',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
  template: \`
    <extra-password [feedback]="true" [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></extra-password>
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
