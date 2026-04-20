import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, FormsModule],
  styles,
  template: `
    <checkbox [binary]="true" [disabled]="true" [(ngModel)]="checked"></checkbox>
  `,
})
export class CheckboxDisabledComponent {
  checked = true;
}

export const Disabled: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: true },
    template: `<checkbox [binary]="true" [disabled]="disabled" [invalid]="invalid" [(ngModel)]="checked"></checkbox>`,
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
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: \`
    <checkbox [binary]="true" [formControl]="control"></checkbox>
  \`,
})
export class CheckboxDisabledComponent {
  control = new FormControl({ value: true, disabled: true });
}
        `,
      },
    },
  },
};
