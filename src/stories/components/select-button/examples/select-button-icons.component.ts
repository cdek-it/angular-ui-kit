import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { SelectButtonComponent, SelectButtonItem } from '../../../../lib/components/select-button/select-button.component';

const template = `
<div class="bg-surface-ground p-4">
  <select-button [formControl]="control" [options]="options"></select-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-button-icons',
  standalone: true,
  imports: [SelectButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectButtonIconsComponent {
  control = new FormControl('left');
  options: SelectButtonItem[] = [
    { label: 'Left',   value: 'left',   icon: 'ti ti-align-left' },
    { label: 'Center', value: 'center', icon: 'ti ti-align-center' },
    { label: 'Right',  value: 'right',  icon: 'ti ti-align-right' },
  ];
}

export const WithIcons: StoryObj = {
  name: 'With Icons',
  render: () => ({
    template: `<app-select-button-icons></app-select-button-icons>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Опции с иконками — иконка отображается автоматически если задано поле `icon`.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SelectButtonComponent, SelectButtonItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-icons',
  standalone: true,
  imports: [SelectButtonComponent, ReactiveFormsModule],
  template: \`
    <select-button [formControl]="control" [options]="options"></select-button>
  \`,
})
export class SelectButtonIconsComponent {
  control = new FormControl('left');
  options: SelectButtonItem[] = [
    { label: 'Left',   value: 'left',   icon: 'ti ti-align-left' },
    { label: 'Center', value: 'center', icon: 'ti ti-align-center' },
    { label: 'Right',  value: 'right',  icon: 'ti ti-align-right' },
  ];
}
        `,
      },
    },
  },
};
