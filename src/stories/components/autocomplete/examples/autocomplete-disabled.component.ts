import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-disabled',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <extra-auto-complete [disabled]="true" [(ngModel)]="value" placeholder="Отключено"></extra-auto-complete>
    </div>
  `,
})
export class AutoCompleteDisabledComponent {
  value = 'Москва';
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-disabled></app-autocomplete-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Поле автодополнения в отключённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-disabled',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, FormsModule],
  template: \`
    <extra-auto-complete [disabled]="true" [(ngModel)]="value" placeholder="Отключено"></extra-auto-complete>
  \`,
})
export class AutoCompleteDisabledComponent {
  value = 'Москва';
}
        `,
      },
    },
  },
};
