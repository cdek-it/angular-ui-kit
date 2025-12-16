import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-button label="Submit" icon="ti ti-check" [disabled]="true"/>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-disabled',
  standalone: true,
  imports: [Button],
  template,
  styles
})
export class ButtonDisabledComponent {}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-button-disabled></app-button-disabled>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Disabled кнопка'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-disabled',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonDisabledComponent {}
        `
      }
    }
  }
};
