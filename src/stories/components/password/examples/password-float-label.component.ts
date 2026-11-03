import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraPasswordComponent } from '../../../../lib/components/password/password.component';

@Component({
  selector: 'app-password-float-label',
  standalone: true,
  imports: [ExtraPasswordComponent, FormsModule],
  template: `
    <div class="pt-6 w-64">
      <extra-password
        [floatLabel]="true"
        [label]="label"
        [showMaskToggle]="showMaskToggle"
        [showFeedback]="showFeedback"
        [fluid]="fluid"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></extra-password>
    </div>
  `
})
export class PasswordFloatLabelComponent {
  @Input() showFeedback = true;
  @Input() showMaskToggle = false;
  @Input() fluid = false;
  @Input() placeholder: string | undefined = undefined;
  @Input() label = 'Пароль';
  value = '';
}

export const FloatLabel: StoryObj<PasswordFloatLabelComponent> = {
  name: 'FloatLabel',
  render: (args) => {
    const parts: string[] = [];

    if (!args.showFeedback)    parts.push(`[showFeedback]="false"`);
    if (args.showMaskToggle)   parts.push(`[showMaskToggle]="true"`);
    if (args.placeholder)  parts.push(`placeholder="${args.placeholder}"`);
    if (args.fluid)        parts.push(`[fluid]="true"`);

    const attrs = parts.length ? `\n  ${parts.join('\n  ')}` : '';

    return {
      props: args,
      template: `<app-password-float-label${attrs}></app-password-float-label>`,
    };
  },
  args: {
    showFeedback: true,
    showMaskToggle: false,
    placeholder: undefined,
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
        code: `<extra-password [floatLabel]="true" label="Пароль" [(ngModel)]="value"></extra-password>`,
      },
    },
  },
};
