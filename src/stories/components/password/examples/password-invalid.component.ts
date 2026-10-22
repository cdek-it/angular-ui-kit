import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraPasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <extra-password [formControl]="passwordControl" placeholder="Минимум 8 символов"></extra-password>
</div>
`;

@Component({
  selector: 'app-password-invalid',
  standalone: true,
  imports: [ExtraPasswordComponent, ReactiveFormsModule],
  template
})
export class PasswordInvalidComponent {
  passwordControl = new FormControl('', { validators: [Validators.required, Validators.minLength(8)] });

  constructor() {
    this.passwordControl.markAsTouched();
  }
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-password-invalid></app-password-invalid>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Поле ввода пароля в состоянии ошибки валидации. `invalid` не публичный `@Input()` — вычисляется автоматически из состояния привязанного `FormControl` (невалидные `Validators` + touched).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraPasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-invalid',
  standalone: true,
  imports: [ExtraPasswordComponent, ReactiveFormsModule],
  template: \`
    <extra-password [formControl]="passwordControl" placeholder="Минимум 8 символов"></extra-password>
  \`,
})
export class PasswordInvalidComponent {
  passwordControl = new FormControl('', { validators: [Validators.required, Validators.minLength(8)] });

  constructor() {
    this.passwordControl.markAsTouched();
  }
}
        `
      }
    }
  }
};
