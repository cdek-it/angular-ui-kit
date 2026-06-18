import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import {
  ExtraPasswordComponent,
  ExtraPasswordFooterDirective,
  ExtraPasswordHeaderDirective
} from '../../../../lib/components/password/password.component';

@Component({
  selector: 'app-password-header',
  standalone: true,
  imports: [ExtraPasswordComponent, ExtraPasswordHeaderDirective, ExtraPasswordFooterDirective, FormsModule],
  template: `
    <div style="width: 280px">
      <extra-password [(ngModel)]="value" [toggleMask]="true" [feedback]="true">
        <ng-template extraPasswordHeader>
          <div class="font-semibold mb-2">Требования к паролю</div>
        </ng-template>
        <ng-template extraPasswordFooter>
          <small class="text-surface-400">Не используйте пароль от других сервисов.</small>
        </ng-template>
      </extra-password>
    </div>
  `
})
export class PasswordHeaderComponent {
  value: string | null = null;
}

export const Header: StoryObj = {
  name: 'Header',
  render: () => ({ template: `<app-password-header></app-password-header>` }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Шапка панели через `extraPasswordHeader` (над правилами) и подвал через `extraPasswordFooter`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ExtraPasswordComponent,
  ExtraPasswordHeaderDirective,
  ExtraPasswordFooterDirective,
} from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [
    ExtraPasswordComponent,
    ExtraPasswordHeaderDirective,
    ExtraPasswordFooterDirective,
    FormsModule,
  ],
  template: \`
    <extra-password [(ngModel)]="value" [toggleMask]="true" [feedback]="true">
      <ng-template extraPasswordHeader>
        <div class="font-semibold mb-2">Требования к паролю</div>
      </ng-template>
      <ng-template extraPasswordFooter>
        <small class="text-surface-400">Не используйте пароль от других сервисов.</small>
      </ng-template>
    </extra-password>
  \`,
})
export class PasswordHeaderExample {
  value: string | null = null;
}
        `
      }
    }
  }
};
