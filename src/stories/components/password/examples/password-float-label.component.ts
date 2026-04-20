import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { Password } from 'primeng/password';
import { FloatLabel as PrimeFloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-password-float-label',
  standalone: true,
  imports: [Password, PrimeFloatLabel, FormsModule],
  template: `
    <div class="pt-6 w-64">
      <p-floatlabel variant="in">
        <p-password
          id="fl-password"
          [(ngModel)]="value"
          [toggleMask]="toggleMask"
          [feedback]="feedback"
          [disabled]="disabled"
          [invalid]="invalid"
          [fluid]="fluid"
          [placeholder]="placeholder"
        ></p-password>
        <label for="fl-password">Пароль</label>
      </p-floatlabel>
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
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля. Кликните на поле чтобы увидеть анимацию.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Password } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-float-label',
  standalone: true,
  imports: [Password, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <p-password id="fl-password" [(ngModel)]="value" [toggleMask]="true" [feedback]="false"></p-password>
      <label for="fl-password">Пароль</label>
    </p-floatlabel>
  \`,
})
export class PasswordFloatLabelComponent {
  value = '';
}
        `,
      },
    },
  },
};
