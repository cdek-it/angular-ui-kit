import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, FormsModule],
  styles,
  template: ` <extra-checkbox [binary]="true" [indeterminate]="true" [(ngModel)]="checked"></extra-checkbox> `
})
export class CheckboxIndeterminateComponent {
  checked = false;
}

export const Indeterminate: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `<extra-checkbox [binary]="true" [indeterminate]="indeterminate" [disabled]="disabled" [(ngModel)]="checked"></extra-checkbox>`
  }),
  args: { indeterminate: true },
  parameters: {
    docs: {
      description: { story: 'Неопределённое состояние чекбокса.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  imports: [ExtraCheckboxComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-checkbox [binary]="true" [indeterminate]="true" [(ngModel)]="checked"></extra-checkbox>
  \`,
})
export class CheckboxIndeterminateComponent {
  checked = false;
}
        `
      }
    }
  }
};
