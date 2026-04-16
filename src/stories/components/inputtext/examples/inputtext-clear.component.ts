import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-3 w-64">
  <input-text
    [showClear]="true"
    placeholder="Введите текст..."
    [(ngModel)]="value"
  ></input-text>
  <input-text
    [showClear]="true"
    size="large"
    placeholder="Large с очисткой"
    [(ngModel)]="value2"
  ></input-text>
</div>
`;

const styles = '';

@Component({
  selector: 'app-inputtext-clear',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputTextClearComponent {
  value = '';
  value2 = '';
}

export const ClearButton: StoryObj = {
  render: () => ({
    template: `<app-inputtext-clear></app-inputtext-clear>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Поле с кнопкой очистки через `showClear`. Иконка × появляется при наличии значения.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputtext-clear',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template: \`
    <input-text
      [showClear]="true"
      placeholder="Введите текст..."
      [(ngModel)]="value"
    ></input-text>
  \`,
})
export class InputTextClearComponent {
  value = '';
}
        `,
      },
    },
  },
};
