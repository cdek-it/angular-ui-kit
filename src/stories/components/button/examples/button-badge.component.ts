import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

const template = `
<div class="bg-surface-ground p-4">
  <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 40px; row-gap: 20px; align-items: center; justify-items: center;">
    <span><code>size="small"</code></span>
    <span><code>size="base"</code></span>
    <span><code>size="large"</code></span>
    <span><code>class="p-button-xlg"</code></span>

    <p-overlay-badge value="8" severity="danger">
        <p-button label="Button" size="small" />
    </p-overlay-badge>

    <p-overlay-badge value="8" severity="danger">
        <p-button label="Button" />
    </p-overlay-badge>

    <p-overlay-badge value="8" severity="danger">
        <p-button label="Button" size="large" />
    </p-overlay-badge>

    <p-overlay-badge value="8" severity="danger">
        <p-button label="Button" class="p-button-xlg" />
    </p-overlay-badge>
  </div>
</div>
`;

@Component({
  selector: 'app-button-badge',
  standalone: true,
  imports: [ButtonModule, OverlayBadgeModule],
  template
})
export class ButtonBadgeComponent {}

export const Badge: StoryObj = {
  render: () => ({
    template: `<app-button-badge></app-button-badge>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с уведомлением или числовым индикатором (OverlayBadge).'
      }
    }
  }
};
