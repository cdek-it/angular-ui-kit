import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MenuItem } from 'primeng/api';
import { TieredMenuComponent } from '../../../../lib/components/tieredmenu/tieredmenu.component';

const template = `
<div class="bg-surface-ground" style="min-height: 280px">
  <tieredmenu [model]="items"></tieredmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-tieredmenu-selected',
  standalone: true,
  imports: [TieredMenuComponent],
  template,
  styles,
})
export class TieredMenuSelectedComponent {
  items: MenuItem[] = [
    { label: 'Отправления', icon: 'ti ti-package' },
    { label: 'Маршруты', icon: 'ti ti-route' },
    { label: 'Склады', icon: 'ti ti-building-warehouse' },
  ];
}

export const WithSelected: StoryObj = {
  render: () => ({
    template: `<app-tieredmenu-selected></app-tieredmenu-selected>`,
  }),
  parameters: {
    docs: {
      description: { story: 'При клике на пункт меню он визуально выделяется как активный.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tieredmenu-selected',
  standalone: true,
  imports: [TieredMenuComponent],
  template: \`
    <tieredmenu [model]="items"></tieredmenu>
  \`,
})
export class TieredMenuSelectedComponent {
  items: MenuItem[] = [
    { label: 'Отправления', icon: 'ti ti-package' },
    { label: 'Маршруты', icon: 'ti ti-route' },
    { label: 'Склады', icon: 'ti ti-building-warehouse' },
  ];
}
        `,
      },
    },
  },
};
