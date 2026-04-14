import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-invalid',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  styles,
  template: `
    <checkbox [binary]="true" [invalid]="true" [(ngModel)]="checked"></checkbox>
  `,
})
export class CheckboxInvalidComponent {
  checked = false;
}

export const Invalid: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `<checkbox [binary]="true" [invalid]="invalid" [disabled]="disabled" [(ngModel)]="checked"></checkbox>`,
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
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-invalid',
  standalone: true,
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: \`
    <checkbox [binary]="true" [formControl]="control"></checkbox>
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
