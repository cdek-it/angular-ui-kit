import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const styles = '';

@Component({
  selector: 'app-checkbox-label',
  standalone: true,
  imports: [ExtraCheckboxComponent, FormsModule],
  styles,
  template: `
    <form class="flex items-center gap-2">
      <extra-checkbox [binary]="true" [(ngModel)]="checked" inputId="checkbox"></extra-checkbox>
      <label for="checkbox" class="checkbox-label">Checkbox</label>
    </form>
  `,
})
export class CheckboxLabelComponent {
  checked = false;
}

export const Label: StoryObj = {
  render: (args) => ({
    props: { ...args, checked: false },
    template: `
      <form class="flex items-center gap-2">
        <extra-checkbox [binary]="true" [invalid]="invalid" [disabled]="disabled" [(ngModel)]="checked" inputId="checkbox"></extra-checkbox>
        <label for="checkbox" class="checkbox-label">Checkbox</label>
      </form>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Чекбокс с привязанным label через inputId.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-checkbox-label',
  standalone: true,
  imports: [ExtraCheckboxComponent, ReactiveFormsModule],
  template: \`
    <form class="flex items-center gap-2">
      <extra-checkbox [binary]="true" [formControl]="control" inputId="checkbox"></extra-checkbox>
      <label for="checkbox" class="checkbox-label">Checkbox</label>
    </form>
  \`,
})
export class CheckboxLabelComponent {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};
