import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-button label="Outlined button" [outlined]="true">
  </p-button>
</div>`;
const styles = '';

@Component({
  selector: 'app-button-outlined',
  standalone: true,
  imports: [Button],
  template,
  styles
})
export class ButtonOutlinedComponent {}

export const Outlined: StoryObj = {
  render: () => ({
    template: `<app-button-outlined></app-button-outlined>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Outlined кнопка'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-outlined',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonOutlinedComponent {}
        `
      }
    }
  }
};
