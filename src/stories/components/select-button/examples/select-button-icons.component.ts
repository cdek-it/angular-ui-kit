import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSelectButtonComponent, ExtraSelectButtonItem } from '../../../../lib/components/select-button/select-button.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-select-button [formControl]="control" [options]="options"></extra-select-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-select-button-icons',
  standalone: true,
  imports: [ExtraSelectButtonComponent, ReactiveFormsModule],
  template,
  styles,
})
export class SelectButtonIconsComponent {
  control = new FormControl('left');
  options: ExtraSelectButtonItem[] = [
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
import { ExtraSelectButtonComponent, ExtraSelectButtonItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-select-button-icons',
  standalone: true,
  imports: [ExtraSelectButtonComponent, ReactiveFormsModule],
  template: \`
    <extra-select-button [formControl]="control" [options]="options"></extra-select-button>
  \`,
})
export class SelectButtonIconsComponent {
  control = new FormControl('left');
  options: ExtraSelectButtonItem[] = [
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
