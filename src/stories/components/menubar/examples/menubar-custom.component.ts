import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Menubar } from 'primeng/menubar';
import { Badge } from 'primeng/badge';
import { MenuItem, SharedModule } from 'primeng/api';

const template = `
<div class="min-h-[300px]">
<p-menubar [model]="items">
  <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu" let-root="root">
    <a class="p-menubar-item-link flex items-center gap-2">
      @if (item.icon) {
        <span [class]="'p-menubar-item-icon ' + item.icon"></span>
      }
      <div class="menubar-item-label">
        <span class="p-menubar-item-label">{{ item.label }}</span>
        @if (item['description']) {
          <small class="menubar-item-caption">{{ item['description'] }}</small>
        }
      </div>
      @if (item['badge']) {
        <p-badge [value]="item['badge']"></p-badge>
      }
      @if (hasSubmenu) {
        <span [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'"></span>
      }
    </a>
  </ng-template>
</p-menubar>
</div>
`;
const styles = '';

@Component({
  selector: 'app-menubar-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menubar, Badge, SharedModule],
  template,
  styles
})
export class MenubarCustomComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'ti ti-home',
      description: 'Перейти на главную'
    },
    {
      label: 'Features',
      icon: 'ti ti-star',
      description: 'Explore features',
      badge: 'New',
      items: [
        {
          label: 'Core',
          icon: 'ti ti-cpu',
          description: 'Основные возможности'
        },
        {
          label: 'UI Kit',
          icon: 'ti ti-palette',
          description: 'UI компоненты'
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'ti ti-settings',
      description: 'Настройки приложения'
    }
  ];
}

export const Custom: StoryObj = {
  render: () => ({
    template: `<app-menubar-custom></app-menubar-custom>`
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон пункта меню с описанием и бейджем.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-menubar-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menubar, Badge, SharedModule],
  template: \`
    <p-menubar [model]="items">
      <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu" let-root="root">
        <a class="p-menubar-item-link flex items-center gap-2">
          @if (item.icon) {
            <span [class]="'p-menubar-item-icon ' + item.icon"></span>
          }
          <div class="menubar-item-label">
            <span class="p-menubar-item-label">{{ item.label }}</span>
            @if (item['description']) {
              <small class="menubar-item-caption">{{ item['description'] }}</small>
            }
          </div>
          @if (item['badge']) {
            <p-badge [value]="item['badge']"></p-badge>
          }
          @if (hasSubmenu) {
            <span [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'"></span>
          }
        </a>
      </ng-template>
    </p-menubar>
  \`,
})
export class MenubarCustomComponent {
  items: MenuItem[] = [
    { label: 'Home', icon: 'ti ti-home', description: 'Перейти на главную' },
    {
      label: 'Features', icon: 'ti ti-star', description: 'Explore features', badge: 'New',
      items: [
        { label: 'Core', icon: 'ti ti-cpu', description: 'Основные возможности' },
        { label: 'UI Kit', icon: 'ti ti-palette', description: 'UI компоненты' },
      ],
    },
    { label: 'Settings', icon: 'ti ti-settings', description: 'Настройки приложения' },
  ];
}
        `
      }
    }
  }
};
