import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { PasswordComponent } from '../../../../lib/components/password/password.component';

@Component({
  selector: 'app-password-float-label',
  standalone: true,
  imports: [PasswordComponent, FormsModule],
  template: `
    <div class="pt-6 w-64">
      <password
        [floatLabel]="true"
        [label]="label"
        [toggleMask]="toggleMask"
        [feedback]="feedback"
        [disabled]="disabled"
        [invalid]="invalid"
        [fluid]="fluid"
        [placeholder]="placeholder"
        [inputId]="'fl-password'"
        [(ngModel)]="value"
      ></password>
    </div>
  `,
})
export class PasswordFloatLabelComponent {
  @Input() feedback = true;
  @Input() toggleMask = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() fluid = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() label = 'Пароль';
  value = '';
}

export const FloatLabel: StoryObj<PasswordFloatLabelComponent> = {
  name: 'FloatLabel',
  render: (args) => {
    const parts: string[] = [];

    if (!args.feedback)    parts.push(`[feedback]="false"`);
    if (args.toggleMask)   parts.push(`[toggleMask]="true"`);
    if (args.placeholder)  parts.push(`placeholder="${args.placeholder}"`);
    if (args.disabled)     parts.push(`[disabled]="true"`);
    if (args.invalid)      parts.push(`[invalid]="true"`);
    if (args.fluid)        parts.push(`[fluid]="true"`);

    const attrs = parts.length ? `\n  ${parts.join('\n  ')}` : '';

    return {
      props: args,
      template: `<app-password-float-label${attrs}></app-password-float-label>`,
    };
  },
  args: {
    feedback: true,
    toggleMask: false,
    placeholder: undefined,
    disabled: false,
    invalid: false,
    fluid: false,
    label: 'Пароль',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интеграция с `floatLabel` — плавающая метка внутри поля. Кликните на поле чтобы увидеть анимацию.',
      },
      source: {
        language: 'html',
        code: `<password [floatLabel]="true" label="Пароль" inputId="fl-password" [(ngModel)]="value"></password>`,
      },
    },
  },
};
