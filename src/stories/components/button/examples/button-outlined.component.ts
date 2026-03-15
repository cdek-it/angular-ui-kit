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

    <p-button label="Button" size="small" [outlined]="true" />
    <p-button label="Button" [outlined]="true" />
    <p-button label="Button" size="large" [outlined]="true" />
    <p-button label="Button" class="p-button-xlg" [outlined]="true" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-outlined',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonOutlinedComponent {}

export const Outlined: StoryObj = {
  render: () => ({
    template: `<app-button-outlined></app-button-outlined>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с контуром без заливки.'
      }
    }
  }
};
