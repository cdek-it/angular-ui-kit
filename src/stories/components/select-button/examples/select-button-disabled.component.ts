import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from '../../../../lib/components/select-button/select-button.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-select-button [formControl]="control" [options]="options"></extra-select-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-button-disabled',
  standalone: true,
  imports: [ExtraSelectButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectButtonDisabledComponent {
  control = new FormControl({ value: '1', disabled: true });
  options: ExtraSelectButtonOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
  ];
}

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: () => ({
    template: `<app-select-button-disabled></app-select-button-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Весь компонент отключён через `FormControl`.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ExtraSelectButtonComponent, ExtraSelectButtonOption } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-disabled',
  standalone: true,
  imports: [ExtraSelectButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-select-button [formControl]="control" [options]="options"></extra-select-button>
  \`,
})
export class SelectButtonDisabledComponent {
  control = new FormControl({ value: '1', disabled: true });
  options: ExtraSelectButtonOption[] = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
  ];
}
        `,
      },
    },
  },
};
