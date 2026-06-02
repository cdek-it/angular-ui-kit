import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-invalid',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <extra-auto-complete [invalid]="true" [(ngModel)]="value" placeholder="Невалидное значение"></extra-auto-complete>
    </div>
  `,
})
export class AutoCompleteInvalidComponent {
  value: string | null = null;
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-invalid></app-autocomplete-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Поле автодополнения в состоянии ошибки валидации.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-invalid',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, FormsModule],
  template: \`
    <extra-auto-complete [invalid]="true" [(ngModel)]="value" placeholder="Невалидное значение"></extra-auto-complete>
  \`,
})
export class AutoCompleteInvalidComponent {
  value: string | null = null;
}
        `,
      },
    },
  },
};
