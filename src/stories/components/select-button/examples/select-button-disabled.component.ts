import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SelectButtonComponent, SelectButtonItem } from '../../../../lib/components/select-button/select-button.component';

const template = `
<div class="bg-surface-ground p-4">
  <select-button [(value)]="value" [options]="options" [disabled]="true"></select-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-button-disabled',
  standalone: true,
  imports: [SelectButtonComponent],
  template,
  styles,
})
export class SelectButtonDisabledComponent {
  value = '1';
  options: SelectButtonItem[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
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
      description: { story: 'Весь компонент отключён.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SelectButtonComponent, SelectButtonItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-disabled',
  standalone: true,
  imports: [SelectButtonComponent],
  template: \`
    <select-button [(value)]="value" [options]="options" [disabled]="true"></select-button>
  \`,
})
export class SelectButtonDisabledComponent {
  value = '1';
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
