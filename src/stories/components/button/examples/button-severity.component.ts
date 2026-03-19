import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

const template = `
<div class="bg-surface-ground p-4">
  <div style="display: grid; grid-template-columns: repeat(5, max-content); gap: 20px; align-items: center; justify-items: center;">
    <span></span>
    <span><code>success</code></span>
    <span><code>info</code></span>
    <span><code>warn</code></span>
    <span><code>danger</code></span>

    <span><code>small</code></span>
    <p-button size="small" severity="success" label="Button" />
    <p-button size="small" severity="info" label="Button" />
    <p-button size="small" severity="warn" label="Button" />
    <p-button size="small" severity="danger" label="Button" />

    <span><code>base</code></span>
    <p-button severity="success" label="Button" />
    <p-button severity="info" label="Button" />
    <p-button severity="warn" label="Button" />
    <p-button severity="danger" label="Button" />

    <span><code>large</code></span>
    <p-button size="large" severity="success" label="Button" />
    <p-button size="large" severity="info" label="Button" />
    <p-button size="large" severity="warn" label="Button" />
    <p-button size="large" severity="danger" label="Button" />

    <span><code>xlarge</code></span>
    <p-button class="p-button-xlg" severity="success" label="Button" />
    <p-button class="p-button-xlg" severity="info" label="Button" />
    <p-button class="p-button-xlg" severity="warn" label="Button" />
    <p-button class="p-button-xlg" severity="danger" label="Button" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-severity',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonSeverityComponent {}

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-button-severity></app-button-severity>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Цветовые схемы для различных контекстов: success, info, warn, danger.'
      }
    }
  }
};
