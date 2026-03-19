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

    <p-button label="Button" size="small" />
    <p-button label="Button" />
    <p-button label="Button" size="large" />
    <p-button label="Button" class="p-button-xlg" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-sizes',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonSizesComponent { }

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-button-sizes></app-button-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры: small, base, large, xlg.'
      }
    }
  }
};
