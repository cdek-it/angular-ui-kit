import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

const template = `
<div class="bg-surface-ground p-4">
  <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 20px; align-items: center; justify-items: center;">
    <span><code>size="small"</code></span>
    <span><code>size="base"</code></span>
    <span><code>size="large"</code></span>
    <span><code>class="p-button-xlg"</code></span>

    <p-button label="Button" size="small" [text]="true" />
    <p-button label="Button" [text]="true" />
    <p-button label="Button" size="large" [text]="true" />
    <p-button label="Button" class="p-button-xlg" [text]="true" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-text',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonTextComponent {}

export const Text: StoryObj = {
  render: () => ({
    template: `<app-button-text></app-button-text>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка без заливки и границ, часто используется в тулбарах или списках.'
      }
    }
  }
};
