import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
  <checkbox [indeterminate]="true" [binary]="true" [(ngModel)]="val1"></checkbox>
`;

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template,
})
export class CheckboxIndeterminateComponent {
  val1 = false;
}

export const Indeterminate: StoryObj = {
  render: () => ({
    template: `<app-checkbox-indeterminate></app-checkbox-indeterminate>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Состояние indeterminate (неопределенное).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-indeterminate',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template: \`
    <checkbox [indeterminate]="true" [binary]="true" [(ngModel)]="val1"></checkbox>
  \`,
})
export class CheckboxIndeterminateComponent {
  val1 = false;
}
        `,
      },
    },
  },
};
