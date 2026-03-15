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

    <p-button icon="ti ti-check" size="small" />
    <p-button icon="ti ti-check" />
    <p-button icon="ti ti-check" size="large" />
    <p-button icon="ti ti-check" class="p-button-xlg" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-icon-only',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonIconOnlyComponent {}

export const IconOnly: StoryObj = {
  render: () => ({
    template: `<app-button-icon-only></app-button-icon-only>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'В случаях, когда текст не требуется, можно использовать только иконку.'
      }
    }
  }
};
