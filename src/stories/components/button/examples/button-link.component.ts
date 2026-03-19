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

    <p-button label="Button" size="small" [link]="true" />
    <p-button label="Button" [link]="true" />
    <p-button label="Button" size="large" [link]="true" />
    <p-button label="Button" class="p-button-xlg" [link]="true" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-link',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonLinkComponent {}

export const Link: StoryObj = {
  render: () => ({
    template: `<app-button-link></app-button-link>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка, стилизованная под ссылку.'
      }
    }
  }
};
