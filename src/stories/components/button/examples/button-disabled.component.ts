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

    <span><code>default</code></span>
    <p-button severity="success" label="Button" [disabled]="true" />
    <p-button severity="info" label="Button" [disabled]="true" />
    <p-button severity="warn" label="Button" [disabled]="true" />
    <p-button severity="danger" label="Button" [disabled]="true" />

    <span><code>outlined</code></span>
    <p-button severity="success" label="Button" [outlined]="true" [disabled]="true" />
    <p-button severity="info" label="Button" [outlined]="true" [disabled]="true" />
    <p-button severity="warn" label="Button" [outlined]="true" [disabled]="true" />
    <p-button severity="danger" label="Button" [outlined]="true" [disabled]="true" />

    <span><code>text</code></span>
    <p-button severity="success" label="Button" [text]="true" [disabled]="true" />
    <p-button severity="info" label="Button" [text]="true" [disabled]="true" />
    <p-button severity="warn" label="Button" [text]="true" [disabled]="true" />
    <p-button severity="danger" label="Button" [text]="true" [disabled]="true" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-disabled',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonDisabledComponent {}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-button-disabled></app-button-disabled>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Состояние кнопки, при котором взаимодействие с ней заблокировано.'
      }
    }
  }
};
