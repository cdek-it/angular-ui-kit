import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<form class="flex align-items-center gap-1">
  <checkbox [formControl]="formControl" inputId="checkbox" [binary]="true"></checkbox>
  <label for="checkbox" class="checkbox-label">Checkbox</label>
</form>
`;

@Component({
  selector: 'app-checkbox-label',
  standalone: true,
  imports: [CheckboxComponent, ReactiveFormsModule],
  styles: [`
    .checkbox-label {
      color: var(--text-color, #2B2E33);
      font-family: var(--typography-font-family-base, "PT Sans");
      font-size: var(--typography-font-size-text-base, 14px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
    }
  `],
  template,
})
export class CheckboxLabelComponent {
  formControl = new FormControl(false);
}

export const Label: StoryObj = {
  render: () => ({
    template: `<app-checkbox-label></app-checkbox-label>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Чекбокс с привязанным label через inputId.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-label',
  standalone: true,
  imports: [CheckboxComponent, ReactiveFormsModule],
  styles: [\`
    .checkbox-label {
      color: var(--text-color, #2B2E33);
      font-family: var(--typography-font-family-base, "PT Sans");
      font-size: var(--typography-font-size-text-base, 14px);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
    }
  \`],
  template: \`
    <form class="flex align-items-center gap-1">
      <checkbox [formControl]="formControl" inputId="checkbox" [binary]="true"></checkbox>
      <label for="checkbox" class="checkbox-label">Checkbox</label>
    </form>
  \`,
})
export class CheckboxLabelComponent {
  formControl = new FormControl(false);
}
        `,
      },
    },
  },
};
