import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-end">  
      <p-button label="Primary"/>
      <p-button label="Danger" severity="danger" />
      <p-button label="Warning" severity="warning" />
      <p-button label="Success" severity="success" />
      <p-button label="Info" severity="info" />
      <p-button label="Help" severity="help" />
    </div>
    
      <div class="flex gap-3 items-end">  
      <p-button label="Primary" [rounded]="true"/>
      <p-button label="Danger" [rounded]="true" severity="danger" />
      <p-button label="Warning" [rounded]="true" severity="warning" />
      <p-button label="Success" [rounded]="true" severity="success" />
      <p-button label="Info" [rounded]="true" severity="info" />
      <p-button label="Help" [rounded]="true" severity="help" />
    </div>
    
    <div class="flex gap-3 items-end">  
      <p-button label="Primary" [text]="true"/>
      <p-button label="Danger" [text]="true" severity="danger" />
      <p-button label="Warning" [text]="true" severity="warning" />
      <p-button label="Success" [text]="true" severity="success" />
      <p-button label="Info" [text]="true" severity="info" />
      <p-button label="Help" [text]="true" severity="help" />
    </div>
    
    <div class="flex gap-3 items-end">  
      <p-button icon="pi pi-check" />
      <p-button icon="pi pi-times" severity="danger" />
      <p-button icon="pi pi-bell" severity="warning" />
      <p-button icon="pi pi-search" severity="success" />
      <p-button icon="pi pi-user" severity="info" />
      <p-button icon="pi pi-heart" severity="help" />
    </div>
    
     <div class="flex gap-3 items-end">  
      <p-button icon="pi pi-check" [outlined]="true" />
      <p-button icon="pi pi-times" [outlined]="true" severity="danger" />
      <p-button icon="pi pi-bell" [outlined]="true" severity="warning" />
      <p-button icon="pi pi-search" [outlined]="true" severity="success" />
      <p-button icon="pi pi-user" [outlined]="true" severity="info" />
      <p-button icon="pi pi-heart" [outlined]="true" severity="help" />
    </div>
    
    <div class="flex gap-3 items-end">  
      <p-button icon="pi pi-check" [rounded]="true" />
      <p-button icon="pi pi-times" [rounded]="true" severity="danger" />
      <p-button icon="pi pi-bell" [rounded]="true" severity="warning" />
      <p-button icon="pi pi-search" [rounded]="true" severity="success" />
      <p-button icon="pi pi-user" [rounded]="true" severity="info" />
      <p-button icon="pi pi-heart" [rounded]="true" severity="help" />
    </div>
    
    <div class="flex gap-3 items-end">  
      <p-button icon="pi pi-check" [rounded]="true" [outlined]="true" />
      <p-button icon="pi pi-times" [rounded]="true" [outlined]="true" severity="danger" />
      <p-button icon="pi pi-bell" [rounded]="true" [outlined]="true" severity="warning" />
      <p-button icon="pi pi-search" [rounded]="true" [outlined]="true" severity="success" />
      <p-button icon="pi pi-user" [rounded]="true" [outlined]="true" severity="info" />
      <p-button icon="pi pi-heart" [rounded]="true" [outlined]="true" severity="help" />
    </div>
    
      <div class="flex gap-3 items-end">  
      <p-button icon="pi pi-check" [rounded]="true" [text]="true" />
      <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger" />
      <p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning" />
      <p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success" />
      <p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info" />
      <p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help" />
    </div>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-button-severity',
  standalone: true,
  imports: [Button],
  template,
  styles,
})
export class ButtonSeverityComponent {}

export const Severity: StoryObj = {
  render: () => ({
    template: `<app-button-severity></app-button-severity>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки с разным Severity',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
        
@Component({
  selector: 'app-button-severity',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonSeverityComponent {}
        `,
      },
    },
  },
};
