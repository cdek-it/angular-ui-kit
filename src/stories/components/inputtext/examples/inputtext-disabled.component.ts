import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-3 w-64">
  <input-text [disabled]="true" placeholder="Disabled пустой" [(ngModel)]="empty"></input-text>
  <input-text [disabled]="true" [(ngModel)]="value"></input-text>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputtext-disabled',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputTextDisabledComponent {
  empty = '';
  value = 'Disabled с текстом';
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-inputtext-disabled></app-inputtext-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Отключённое состояние: пустое поле и поле со значением.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputtext-disabled',
  standalone: true,
  imports: [InputTextComponent, FormsModule],
  template: \`
    <input-text [disabled]="true" [(ngModel)]="value"></input-text>
  \`,
})
export class InputTextDisabledComponent {
  value = 'Disabled';
}
        `,
      },
    },
  },
};
