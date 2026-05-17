import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraPasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <extra-password [invalid]="true" [(ngModel)]="value" placeholder="Невалидный пароль"></extra-password>
</div>
`;

@Component({
  selector: 'app-password-invalid',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
  template,
})
export class PasswordInvalidComponent {
  value: string | null = null;
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-password-invalid></app-password-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Поле ввода пароля в состоянии ошибки валидации.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraPasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-invalid',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
  template: \`
    <extra-password [invalid]="true" [(ngModel)]="value" placeholder="Невалидный пароль"></extra-password>
  \`,
})
export class PasswordInvalidComponent {
  value: string | null = null;
}
        `,
      },
    },
  },
};
