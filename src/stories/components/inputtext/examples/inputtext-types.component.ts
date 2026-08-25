import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <extra-input-text [formControl]="text" label="Text" placeholder="Обычный текст"></extra-input-text>
    <extra-input-text [formControl]="password" type="password" label="Password" placeholder="Пароль"></extra-input-text>
  </div>
</div>
`;

@Component({
  selector: 'app-inputtext-types',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template
})
export class InputTextTypesComponent {
  text = new FormControl('');
  password = new FormControl('');
}

export const Types: StoryObj = {
  render: () => ({
    template: `<app-inputtext-types></app-inputtext-types>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Типы поля: text (по умолчанию) и password.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-types',
  standalone: true,
  imports: [ExtraInputTextComponent],
  template: \`
    <extra-input-text label="Text" placeholder="Обычный текст"></extra-input-text>
    <extra-input-text type="password" label="Password" placeholder="Пароль"></extra-input-text>
  \`,
})
export class InputTextTypesComponent {}
        `
      }
    }
  }
};
