import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-disabled',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template: `
    <div style="width: 320px">
      <extra-auto-complete [formControl]="control" placeholder="Отключено"></extra-auto-complete>
    </div>
  `
})
export class AutoCompleteDisabledComponent {
  control = new FormControl({ value: 'Москва', disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-disabled></app-autocomplete-disabled>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Поле автодополнения в отключённом состоянии — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-disabled',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template: \`
    <extra-auto-complete [formControl]="control" placeholder="Отключено"></extra-auto-complete>
  \`,
})
export class AutoCompleteDisabledComponent {
  control = new FormControl({ value: 'Москва', disabled: true });
}
        `
      }
    }
  }
};
