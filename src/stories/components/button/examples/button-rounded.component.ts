import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-button label="Primary" [rounded]="true" />
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-rounded',
  standalone: true,
  imports: [Button],
  template,
  styles
})
export class ButtonRoundedComponent {}

export const Rounded: StoryObj = {
  render: () => ({
    template: `<app-button-rounded></app-button-rounded>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Скругленная кнопка'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button-rounded',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonRoundedComponent {}
        `
      }
    }
  }
};
