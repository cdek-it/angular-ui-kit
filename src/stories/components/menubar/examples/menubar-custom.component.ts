import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';
import { ExtraMenubarComponent, ExtraMenubarItemDirective } from '../../../../lib/components/menubar/menubar.component';

const template = `
<div class="min-h-[300px]">
  <extra-menubar [model]="items">
    <ng-template extraMenubarItem let-item let-hasSubmenu="hasSubmenu" let-root="root">
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
          <span class="text-xs font-bold bg-primary text-white rounded-full px-2 py-0.5">{{ item['badge'] }}</span>
        }
        @if (hasSubmenu) {
          <span [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'"></span>
        }
      </a>
    </ng-template>
  </extra-menubar>
</div>
`;
const styles = '';

@Component({
  selector: 'app-menubar-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMenubarComponent, ExtraMenubarItemDirective],
  template,
  styles
})
export class MenubarCustomComponent {
  items: ExtraMenuItem[] = [
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
import { ExtraMenubarComponent, ExtraMenubarItemDirective, ExtraMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-menubar-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMenubarComponent, ExtraMenubarItemDirective],
  template: \`
  <extra-menubar [model]="items">
    <ng-template extraMenubarItem let-item let-hasSubmenu="hasSubmenu" let-root="root">
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
          <span class="text-xs font-bold bg-primary text-white rounded-full px-2 py-0.5">{{ item['badge'] }}</span>
        }
        @if (hasSubmenu) {
          <span [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'"></span>
        }
      </a>
    </ng-template>
  </extra-menubar>
  \`,
})
export class MenubarCustomComponent {
  items: ExtraMenuItem[] = [
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
