import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-invalid',
  standalone: true,
  imports: [ExtraCheckboxComponent, FormsModule],
  styles,
  template: `
    <extra-checkbox [binary]="true" [invalid]="true" [(ngModel)]="checked"></extra-checkbox>
  `,
})
export class CheckboxInvalidComponent {
  checked = false;
}

export const Invalid: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `<extra-checkbox [binary]="true" [invalid]="invalid" [disabled]="disabled" [(ngModel)]="checked"></extra-checkbox>`,
  }),
  args: { invalid: true },
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние чекбокса.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-invalid',
  standalone: true,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: \`
    <extra-checkbox [binary]="true" [formControl]="control"></extra-checkbox>
  \`,
})
export class CheckboxInvalidComponent {
  control = new FormControl(false, [Validators.requiredTrue]);
}
        `,
      },
    },
  },
};
