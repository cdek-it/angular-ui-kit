import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  styles,
  template: `
    <checkbox [binary]="true" [indeterminate]="true" [(ngModel)]="checked"></checkbox>
  `,
})
export class CheckboxIndeterminateComponent {
  checked = false;
}

export const Indeterminate: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `<checkbox [binary]="true" [indeterminate]="indeterminate" [disabled]="disabled" [(ngModel)]="checked"></checkbox>`,
  }),
  args: { indeterminate: true },
  parameters: {
    docs: {
      description: { story: 'Неопределённое состояние чекбокса.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template: \`
    <checkbox [binary]="true" [indeterminate]="true" [(ngModel)]="checked"></checkbox>
  \`,
})
export class CheckboxIndeterminateComponent {
  checked = false;
}
        `,
      },
    },
  },
};
