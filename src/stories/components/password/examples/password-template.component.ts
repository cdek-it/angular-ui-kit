import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { Password } from 'primeng/password';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-password-template',
  standalone: true,
  imports: [Password, Divider, FormsModule],
  template: `
    <div style="width: 280px">
      <p-password
        [(ngModel)]="value"
        [toggleMask]="true"
        [feedback]="true"
        promptLabel="Введите пароль"
        weakLabel="Слабый"
        mediumLabel="Средний"
        strongLabel="Надёжный"
        autocomplete="off"
      >
        <ng-template #header>
          <div class="font-semibold text-sm mb-4">Создание пароля</div>
        </ng-template>
        <ng-template #footer>
          <p-divider />
          <ul class="pl-2 my-0 leading-normal text-sm">
            <li>Минимум одна строчная буква</li>
            <li>Минимум одна заглавная буква</li>
            <li>Минимум одна цифра</li>
            <li>Не менее 8 символов</li>
          </ul>
        </ng-template>
      </p-password>
    </div>
  `,
})
export class PasswordTemplateComponent {
  value: string | null = null;
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
        story: 'Кастомный контент через `ng-template`: заголовок, разделитель и список требований к паролю.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Password } from 'primeng/password';
import { Divider } from 'primeng/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-template',
  standalone: true,
  imports: [Password, Divider, FormsModule],
  template: \`
    <p-password
      [(ngModel)]="value"
      [toggleMask]="true"
      [feedback]="true"
      promptLabel="Введите пароль"
      weakLabel="Слабый"
      mediumLabel="Средний"
      strongLabel="Надёжный"
    >
      <ng-template #header>
        <div class="font-semibold text-sm mb-4">Создание пароля</div>
      </ng-template>
      <ng-template #footer>
        <p-divider />
        <ul class="pl-2 my-0 leading-normal text-sm">
          <li>Минимум одна строчная буква</li>
          <li>Минимум одна заглавная буква</li>
          <li>Минимум одна цифра</li>
          <li>Не менее 8 символов</li>
        </ul>
      </ng-template>
    </p-password>
  \`,
})
export class PasswordTemplateComponent {
  value: string | null = null;
}
        `,
      },
    },
  },
};
