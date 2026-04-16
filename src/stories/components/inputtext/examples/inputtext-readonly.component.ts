import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-3 w-64">
  <input-text [readonly]="true" [(ngModel)]="value"></input-text>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputtext-readonly',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputTextReadonlyComponent {
  value = 'Только для чтения';
}

export const Readonly: StoryObj = {
  render: () => ({
    template: `<app-inputtext-readonly></app-inputtext-readonly>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Поле только для чтения — фон отличается от обычного.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputtext-readonly',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template: \`
    <input-text [readonly]="true" [(ngModel)]="value"></input-text>
  \`,
})
export class InputTextReadonlyComponent {
  value = 'Только для чтения';
}
        `,
      },
    },
  },
};
