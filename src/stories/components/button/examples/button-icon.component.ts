import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-button icon="ti ti-check" />
    <p-button label="Submit" icon="ti ti-check" />
    <p-button label="Submit" icon="ti ti-check" iconPos="right" />
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [Button],
  template,
  styles
})
export class ButtonIconComponent {}

export const Icon: StoryObj = {
  render: () => ({
    template: `<app-button-icon></app-button-icon>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки с иконками'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonIconComponent {}
        `
      }
    }
  }
};
