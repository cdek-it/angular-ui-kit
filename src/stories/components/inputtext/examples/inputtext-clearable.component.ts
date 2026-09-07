import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-input-text
    [formControl]="filled"
    clearable
    label="С очисткой"
    placeholder="Введите текст..."
    caption="Иконка × появляется при наличии значения"
  ></extra-input-text>
  <extra-input-text
    [formControl]="empty"
    clearable
    label="С очисткой (пустое)"
    placeholder="Введите текст..."
  ></extra-input-text>
</div>
`;

@Component({
  selector: 'app-inputtext-clearable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template
})
export class InputTextClearableComponent {
  filled = new FormControl('Какой-то текст');
  empty = new FormControl('');
}

export const Clearable: StoryObj = {
  render: () => ({
    template: `<app-inputtext-clearable></app-inputtext-clearable>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable). Иконка × доступна с клавиатуры (Enter / Space) и появляется только при наличии значения.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputtext-clearable',
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: \`
    <extra-input-text
      [formControl]="control"
      clearable
      label="С очисткой"
      placeholder="Введите текст..."
    ></extra-input-text>
  \`,
})
export class InputTextClearableComponent {
  control = new FormControl('Какой-то текст');
}
        `
      }
    }
  }
};
