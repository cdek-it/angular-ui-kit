import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SelectButtonComponent, SelectButtonItem } from '../../../../lib/components/select-button/select-button.component';

const template = `
<div class="bg-surface-ground p-4">
  <select-button [(value)]="value" [options]="options"></select-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-button-semi-disabled',
  standalone: true,
  imports: [SelectButtonComponent],
  template,
  styles,
})
export class SelectButtonSemiDisabledComponent {
  value = '1';
  options: SelectButtonItem[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2', disabled: true },
    { label: 'Option 3', value: '3' },
  ];
}

export const SemiDisabled: StoryObj = {
  name: 'Semi-disabled',
  render: () => ({
    template: `<app-select-button-semi-disabled></app-select-button-semi-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Отдельная опция отключена через поле `disabled` в объекте опции.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SelectButtonComponent, SelectButtonItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-semi-disabled',
  standalone: true,
  imports: [SelectButtonComponent],
  template: \`
    <select-button [(value)]="value" [options]="options"></select-button>
  \`,
})
export class SelectButtonSemiDisabledComponent {
  value = '1';
  options: SelectButtonItem[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2', disabled: true },
    { label: 'Option 3', value: '3' },
  ];
}
        `,
      },
    },
  },
};
