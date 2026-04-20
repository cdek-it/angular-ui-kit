import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-disabled',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <auto-complete [disabled]="true" [(ngModel)]="value" placeholder="Отключено"></auto-complete>
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
import { AutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-disabled',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: \`
    <auto-complete [disabled]="true" [(ngModel)]="value" placeholder="Отключено"></auto-complete>
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
