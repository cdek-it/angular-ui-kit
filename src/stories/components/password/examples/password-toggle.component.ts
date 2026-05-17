import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraPasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <extra-password [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></extra-password>
</div>
`;

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
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
import { ExtraPasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
  template: \`
    <extra-password [toggleMask]="true" [(ngModel)]="value" placeholder="Введите пароль"></extra-password>
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
