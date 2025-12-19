import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-breadcrumb [model]="items" [home]="home" />
</div>
`;

const styles = '';

@Component({
  selector: 'app-breadcrumb-base',
  standalone: true,
  imports: [Breadcrumb],
  template,
  styles
})
export class BreadcrumbBaseComponent {
  items: MenuItem[] = [
    { label: 'Электроника' },
    { label: 'Компьютеры' },
    { label: 'Ноутбуки' }
  ];
  
  home: MenuItem = { icon: 'ti ti-home', routerLink: '/' };
}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-breadcrumb-base></app-breadcrumb-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый breadcrumb с навигацией'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb-base',
  standalone: true,
  imports: [Breadcrumb],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class BreadcrumbBaseComponent {
  items: MenuItem[] = [
    { label: 'Электроника' },
    { label: 'Компьютеры' },
    { label: 'Ноутбуки' }
  ];
  
  home: MenuItem = { icon: 'ti ti-home', routerLink: '/' };
}
        `
      }
    }
  }
};
