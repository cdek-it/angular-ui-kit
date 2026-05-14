import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { PasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <password [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></password>
</div>
`;

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template,
})
export class PasswordToggleComponent {
  value: string | null = null;
}

export const ToggleMask: StoryObj = {
  render: () => ({
    template: `<app-password-toggle></app-password-toggle>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Возможность показать/скрыть введённый пароль по иконке.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template: \`
    <password [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></password>
  \`,
})
export class PasswordToggleComponent {
  value: string | null = null;
}
        `,
      },
    },
  },
};
