import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-3 w-64">
  <input-text [invalid]="true" placeholder="Обязательное поле" [(ngModel)]="value"></input-text>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputtext-invalid',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputTextInvalidComponent {
  value = '';
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-inputtext-invalid></app-inputtext-invalid>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Невалидное состояние поля.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputtext-invalid',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template: \`
    <input-text [invalid]="true" placeholder="Обязательное поле" [(ngModel)]="value"></input-text>
  \`,
})
export class InputTextInvalidComponent {
  value = '';
}
        `,
      },
    },
  },
};
