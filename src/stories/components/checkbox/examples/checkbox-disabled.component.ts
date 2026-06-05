import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, FormsModule],
  styles,
  template: ` <extra-checkbox [binary]="true" [disabled]="true" [(ngModel)]="checked"></extra-checkbox> `
})
export class CheckboxDisabledComponent {
  checked = true;
}

export const Disabled: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: true },
    template: `<extra-checkbox [binary]="true" [disabled]="disabled" [invalid]="invalid" [(ngModel)]="checked"></extra-checkbox>`
  }),
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние чекбокса.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: \`
    <extra-checkbox [binary]="true" [formControl]="control"></extra-checkbox>
  \`,
})
export class CheckboxDisabledComponent {
  control = new FormControl({ value: true, disabled: true });
}
        `
      }
    }
  }
};
