import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';
import { Badge } from 'primeng/badge';
import { ExtraTieredMenuComponent } from '../../../../lib/components/tieredmenu/tieredmenu.component';

const template = `
<div class="bg-surface-ground" style="min-height: 280px">
  <extra-tieredmenu [model]="items">
    <ng-template #item let-item let-hasSubmenu="hasSubmenu">
      <a class="p-tieredmenu-item-link flex items-center gap-2 w-full">
        @if (item.icon) {
          <span [class]="'p-tieredmenu-item-icon ' + item.icon"></span>
        }
        <div class="p-tieredmenu-item-caption flex-1">
          <span class="p-tieredmenu-item-label">{{ item.label }}</span>
          @if (item['description']) {
            <small class="p-tieredmenu-item-caption-text">{{ item['description'] }}</small>
          }
        </div>
        @if (item['badge']) {
          <p-badge [value]="item['badge']"></p-badge>
        }
        @if (hasSubmenu) {
          <span class="p-tieredmenu-submenu-icon ti ti-chevron-right"></span>
        }
      </a>
    </ng-template>
  </extra-tieredmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-tieredmenu-custom',
  standalone: true,
  imports: [ExtraTieredMenuComponent, Badge],
  template,
  styles,
})
export class TieredMenuCustomComponent {
  items: ExtraMenuItem[] = [
    {
      label: 'Дашборд',
      icon: 'ti ti-home',
      description: 'Перейти на главную',
    },
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      description: 'Управление заказами',
      badge: 'New',
      items: [
        { label: 'Активные', icon: 'ti ti-circle-check', description: 'Текущие заказы' },
        { label: 'Архив', icon: 'ti ti-archive', description: 'Завершённые заказы' },
      ],
    },
    {
      label: 'Склады',
      icon: 'ti ti-building-warehouse',
      description: 'Складское хранение',
      items: [
        { label: 'Документы', icon: 'ti ti-file-text', description: 'Накладные и акты' },
        { label: 'Фото', icon: 'ti ti-photo', description: 'Фотофиксация грузов' },
      ],
    },
    {
      label: 'Настройки',
      icon: 'ti ti-settings',
      description: 'Параметры системы',
      disabled: true,
    },
  ];
}

export const Custom: StoryObj = {
  render: () => ({
    template: `<app-tieredmenu-custom></app-tieredmenu-custom>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон пункта меню с описанием и бейджем.' },
      source: {
        language: 'ts',
        code: `
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-tieredmenu-custom',
  standalone: true,
  imports: [TieredMenu, Badge],
  template: \`
    <p-tieredmenu [model]="items">
      <ng-template #item let-item let-hasSubmenu="hasSubmenu">
        <a class="p-tieredmenu-item-link flex items-center gap-2 w-full">
          @if (item.icon) {
            <span [class]="'p-tieredmenu-item-icon ' + item.icon"></span>
          }
          <div class="p-tieredmenu-item-caption flex-1">
            <span class="p-tieredmenu-item-label">{{ item.label }}</span>
            @if (item['description']) {
              <small class="p-tieredmenu-item-caption-text">{{ item['description'] }}</small>
            }
          </div>
          @if (item['badge']) {
            <p-badge [value]="item['badge']"></p-badge>
          }
          @if (hasSubmenu) {
            <span class="p-tieredmenu-submenu-icon ti ti-chevron-right"></span>
          }
        </a>
      </ng-template>
    </p-tieredmenu>
  \`,
})
export class TieredMenuCustomComponent {
  items: ExtraMenuItem[] = [
    { label: 'Дашборд', icon: 'ti ti-home', description: 'Перейти на главную' },
    { label: 'Отправления', icon: 'ti ti-package', description: 'Управление заказами', badge: 'New',
      items: [
        { label: 'Активные', icon: 'ti ti-circle-check', description: 'Текущие заказы' },
        { label: 'Архив', icon: 'ti ti-archive', description: 'Завершённые заказы' },
      ],
    },
    { label: 'Настройки', icon: 'ti ti-settings', description: 'Параметры системы', disabled: true },
  ];
}
        `,
      },
    },
  },
};
