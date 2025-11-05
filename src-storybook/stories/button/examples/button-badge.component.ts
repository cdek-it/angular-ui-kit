import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3 items-end">  
    <p-button label="Emails" badge="8" size="small" />
  
    <p-button label="Emails" badge="8" />
    
    <p-button label="Emails" badge="8" size="large" />
  
    <p-button 
        label="Messages" 
        icon="pi pi-users" 
        badge="2" 
        badgeClass="p-badge-contrast" 
        outlined="true" />
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-badge',
  standalone: true,
  imports: [Button],
  template,
  styles,
})
export class ButtonBadgeComponent {}

export const Badge: StoryObj = {
  render: () => ({
    template: `<app-button-badge></app-button-badge>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Badge кнопка',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
        
@Component({
  selector: 'app-button-text',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonBadgeComponent {}
        `,
      },
    },
  },
};
