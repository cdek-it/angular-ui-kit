import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraPasswordComponent } from '../../../../lib/components/password/password.component';

const template = `
<div style="width: 280px">
  <extra-password [formControl]="passwordControl" placeholder="Отключено"></extra-password>
</div>
`;

@Component({
  selector: 'app-password-disabled',
  standalone: true,
  imports: [ExtraPasswordComponent, ReactiveFormsModule],
  template
})
export class PasswordDisabledComponent {
  passwordControl = new FormControl({ value: 'secret123', disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-password-disabled></app-password-disabled>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Поле ввода пароля в отключённом состоянии. `disabled` не публичный `@Input()`, отключается через форму (`disabled: true` в `FormControl`), см. `ControlValueAccessor.setDisabledState`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraPasswordComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-password-disabled',
  standalone: true,
  imports: [ExtraPasswordComponent, ReactiveFormsModule],
  template: \`
    <extra-password [formControl]="passwordControl" placeholder="Отключено"></extra-password>
  \`,
})
export class PasswordDisabledComponent {
  passwordControl = new FormControl({ value: 'secret123', disabled: true });
}
        `
      }
    }
  }
};
