import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { PasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <password [disabled]="true" [(ngModel)]="value" placeholder="Отключено"></password>
</div>
`;

@Component({
  selector: 'app-password-disabled',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template,
})
export class PasswordDisabledComponent {
  value: string | null = 'secret123';
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-password-disabled></app-password-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Поле ввода пароля в отключённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-disabled',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template: \`
    <password [disabled]="true" [(ngModel)]="value" placeholder="Отключено"></password>
  \`,
})
export class PasswordDisabledComponent {
  value: string | null = 'secret123';
}
        `,
      },
    },
  },
};
