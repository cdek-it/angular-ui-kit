import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<checkbox [disabled]="true" [binary]="true" [(ngModel)]="val1"></checkbox>
`;

@Component({
  selector: 'app-checkbox-disabled',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template,
})
export class CheckboxDisabledComponent {
  val1 = true;
  val2 = false;
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-checkbox-disabled></app-checkbox-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Пример использования заблокированного чекбокса.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-disabled',
  standalone: true,
  imports: [CheckboxComponent, FormsModule],
  template: \`
    <checkbox [disabled]="true" [binary]="true" [(ngModel)]="val1"></checkbox>
    <checkbox [disabled]="true" [binary]="true" [(ngModel)]="val2"></checkbox>
  \`,
})
export class CheckboxDisabledComponent {
  val1 = true;
  val2 = false;
}
        `,
      },
    },
  },
};
