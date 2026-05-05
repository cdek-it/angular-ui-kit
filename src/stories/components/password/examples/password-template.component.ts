import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { PasswordComponent } from '../../../../lib/components/password/password.component';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-password-template',
  standalone: true,
  imports: [PasswordComponent, Divider, FormsModule],
  template: `
    <div style="width: 280px">
      <password
        [(ngModel)]="value"
        [toggleMask]="true"
        [feedback]="true"
        promptLabel="Введите пароль"
        weakLabel="Слабый"
        mediumLabel="Средний"
        strongLabel="Надёжный"
      >
        <ng-template #footer>
          <p-divider />
          <div class="p-password-rules">
            <div class="p-password-rule">
              <i class="ti" [class.ti-circle]="!hasLowercase" [class.ti-check]="hasLowercase"></i>
              <span>Минимум одна строчная буква</span>
            </div>
            <div class="p-password-rule">
              <i class="ti" [class.ti-circle]="!hasUppercase" [class.ti-check]="hasUppercase"></i>
              <span>Минимум одна заглавная буква</span>
            </div>
            <div class="p-password-rule">
              <i class="ti" [class.ti-circle]="!hasDigit" [class.ti-check]="hasDigit"></i>
              <span>Минимум одна цифра</span>
            </div>
            <div class="p-password-rule">
              <i class="ti" [class.ti-circle]="!hasMinLength" [class.ti-check]="hasMinLength"></i>
              <span>Не менее 8 символов</span>
            </div>
          </div>
        </ng-template>
      </password>
    </div>
  `,
})
export class PasswordTemplateComponent {
  value: string | null = null;

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.value ?? '');
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.value ?? '');
  }

  get hasDigit(): boolean {
    return /\d/.test(this.value ?? '');
  }

  get hasMinLength(): boolean {
    return (this.value ?? '').length >= 8;
  }
}

export const Template: StoryObj = {
  name: 'Template',
  render: () => ({
    template: `<app-password-template></app-password-template>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Кастомный контент через `ng-template`: разделитель и список требований к паролю с tabler-иконками.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from '@cdek-it/angular-ui-kit';
import { Divider } from 'primeng/divider';

@Component({
  standalone: true,
  imports: [PasswordComponent, Divider, FormsModule],
  template: \`
    <password
      [(ngModel)]="value"
      [toggleMask]="true"
      [feedback]="true"
      promptLabel="Введите пароль"
      weakLabel="Слабый"
      mediumLabel="Средний"
      strongLabel="Надёжный"
    >
      <ng-template #footer>
        <p-divider />
        <div class="p-password-rules">
          <div class="p-password-rule">
            <i class="ti" [class.ti-circle]="!hasLowercase" [class.ti-check]="hasLowercase"></i>
            <span>Минимум одна строчная буква</span>
          </div>
          <div class="p-password-rule">
            <i class="ti" [class.ti-circle]="!hasUppercase" [class.ti-check]="hasUppercase"></i>
            <span>Минимум одна заглавная буква</span>
          </div>
          <div class="p-password-rule">
            <i class="ti" [class.ti-circle]="!hasDigit" [class.ti-check]="hasDigit"></i>
            <span>Минимум одна цифра</span>
          </div>
          <div class="p-password-rule">
            <i class="ti" [class.ti-circle]="!hasMinLength" [class.ti-check]="hasMinLength"></i>
            <span>Не менее 8 символов</span>
          </div>
        </div>
      </ng-template>
    </password>
  \`,
})
export class PasswordTemplateExample {
  value: string | null = null;

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.value ?? '');
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.value ?? '');
  }

  get hasDigit(): boolean {
    return /\\d/.test(this.value ?? '');
  }

  get hasMinLength(): boolean {
    return (this.value ?? '').length >= 8;
  }
}
        `,
      },
    },
  },
};
