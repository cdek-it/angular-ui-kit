import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-invalid',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <auto-complete [invalid]="true" [(ngModel)]="value" placeholder="Невалидное значение"></auto-complete>
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
import { AutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-invalid',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: \`
    <auto-complete [invalid]="true" [(ngModel)]="value" placeholder="Невалидное значение"></auto-complete>
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
