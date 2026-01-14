import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-button label="Primary text" [text]="true"></p-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-text',
  standalone: true,
  imports: [Button],
  template,
  styles
})
export class ButtonTextComponent {}

export const Text: StoryObj = {
  render: () => ({
    template: `<app-button-text></app-button-text>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Text кнопка'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-text',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonTextComponent {}
        `
      }
    }
  }
};
