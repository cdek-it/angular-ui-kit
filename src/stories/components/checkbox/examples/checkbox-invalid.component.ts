import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
  <checkbox [binary]="true" [invalid]="true" [(ngModel)]="val1"></checkbox>
`;

@Component({
  selector: 'app-checkbox-invalid',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template,
})
export class CheckboxInvalidComponent {
  val1 = false;
  val2 = true;
}

export const Invalid: StoryObj = {
  render: () => ({
    template: `<app-checkbox-invalid></app-checkbox-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Пример невалидного состояния чекбокса.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-invalid',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template: \`
    <checkbox [binary]="true" [invalid]="true" [(ngModel)]="val1"></checkbox>
    <checkbox [binary]="true" [invalid]="true" [(ngModel)]="val2"></checkbox>
  \`,
})
export class CheckboxInvalidComponent {
  val1 = false;
  val2 = true;
}
        `,
      },
    },
  },
};
