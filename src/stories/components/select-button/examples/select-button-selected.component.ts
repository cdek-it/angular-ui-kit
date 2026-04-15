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
  selector: 'app-select-button-selected',
  standalone: true,
  imports: [SelectButtonComponent],
  template,
  styles,
})
export class SelectButtonSelectedComponent {
  value = '2';
  options: SelectButtonItem[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
}

export const Selected: StoryObj = {
  name: 'Selected',
  render: () => ({
    template: `<app-select-button-selected></app-select-button-selected>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Второй вариант выбран по умолчанию.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SelectButtonComponent, SelectButtonItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-selected',
  standalone: true,
  imports: [SelectButtonComponent],
  template: \`
    <select-button [(value)]="value" [options]="options"></select-button>
  \`,
})
export class SelectButtonSelectedComponent {
  value = '2';
  options: SelectButtonItem[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
}
        `,
      },
    },
  },
};
