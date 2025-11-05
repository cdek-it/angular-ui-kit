import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-button label="Submit" icon="pi pi-check" [loading]="true"/>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-loading',
  standalone: true,
  imports: [Button],
  template,
  styles,
})
export class ButtonLoadingComponent {}

export const Loading: StoryObj = {
  render: () => ({
    template: `<app-button-loading></app-button-loading>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопка в состоянии загрузки',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
        
@Component({
  selector: 'app-button-loading',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonLoadingComponent {}
        `,
      },
    },
  },
};
