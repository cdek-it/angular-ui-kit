import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-invalid',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template: `
    <div style="width: 320px">
      <extra-auto-complete [formControl]="control" placeholder="Невалидное значение"></extra-auto-complete>
    </div>
  `
})
export class AutoCompleteInvalidComponent {
  control = new FormControl<string | null>(null, Validators.required);

  constructor() {
    this.control.markAsTouched();
  }
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-invalid></app-autocomplete-invalid>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Невалидное состояние — определяется через валидаторы `FormControl` (нужно, чтобы контрол также был touched).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-invalid',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template: \`
    <extra-auto-complete [formControl]="control" placeholder="Невалидное значение"></extra-auto-complete>
  \`,
})
export class AutoCompleteInvalidComponent {
  control = new FormControl<string | null>(null, Validators.required);
}
        `
      }
    }
  }
};
