import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

@Component({
  selector: 'app-inputtext-clear',
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule],
  template: `<input-text [formControl]="control" [showClear]="true" placeholder="Введите текст..."></input-text>`,
})
export class InputTextClearComponent {
  control = new FormControl('');
}

export const ClearButton: StoryObj = {
  name: 'ClearButton',
  render: () => ({
    template: `<app-inputtext-clear></app-inputtext-clear>`,
  }),
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputTextClearComponent],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Поле с кнопкой очистки через `showClear`. Иконка × появляется при вводе первого символа.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule],
  template: \`<input-text [formControl]="control" [showClear]="true" placeholder="Введите текст..."></input-text>\`,
})
export class ClearButtonExample {
  control = new FormControl('');
}
        `,
      },
    },
  },
};
