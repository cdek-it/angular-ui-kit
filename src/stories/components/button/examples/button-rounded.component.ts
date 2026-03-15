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

    <p-button label="Button" size="small" [rounded]="true" />
    <p-button label="Button" [rounded]="true" />
    <p-button label="Button" size="large" [rounded]="true" />
    <p-button label="Button" class="p-button-xlg" [rounded]="true" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-rounded',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonRoundedComponent {}

export const Rounded: StoryObj = {
  render: () => ({
    template: `<app-button-rounded></app-button-rounded>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Полностью скруглённая форма кнопки.'
      }
    }
  }
};
