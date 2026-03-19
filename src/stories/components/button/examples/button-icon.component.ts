import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

const template = `
<div class="bg-surface-ground p-4">
  <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 20px; align-items: center; justify-items: center;">
    <span></span>
    <span><code>icon prefix</code></span>
    <span><code>icon postfix</code></span>
    <span><code>rounded</code></span>

    <span><code>xlarge</code></span>
    <p-button icon="ti ti-check" label="Button" class="p-button-xlg" />
    <p-button label="Button" icon="ti ti-arrow-right" iconPos="right" class="p-button-xlg" />
    <p-button icon="ti ti-check" label="Button" class="p-button-xlg" [rounded]="true" />

    <span><code>large</code></span>
    <p-button icon="ti ti-check" label="Button" size="large" />
    <p-button label="Button" icon="ti ti-arrow-right" iconPos="right" size="large" />
    <p-button icon="ti ti-check" label="Button" size="large" [rounded]="true" />

    <span><code>base</code></span>
    <p-button icon="ti ti-check" label="Button" />
    <p-button label="Button" icon="ti ti-arrow-right" iconPos="right" />
    <p-button icon="ti ti-check" label="Button" [rounded]="true" />

    <span><code>small</code></span>
    <p-button icon="ti ti-check" label="Button" size="small" />
    <p-button label="Button" icon="ti ti-arrow-right" iconPos="right" size="small" />
    <p-button icon="ti ti-check" label="Button" size="small" [rounded]="true" />
  </div>
</div>
`;

@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [ButtonModule],
  template
})
export class ButtonIconComponent {}

export const Icons: StoryObj = {
  render: () => ({
    template: `<app-button-icon></app-button-icon>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки могут содержать иконки слева, справа или быть скруглёнными.'
      }
    }
  }
};
