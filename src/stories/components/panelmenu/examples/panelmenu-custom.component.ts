import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMenuItem } from '../../../../lib/shared/public_api';
import { PanelMenu } from 'primeng/panelmenu';
import { Badge } from 'primeng/badge';

const template = `
<div class="bg-surface-ground" style="width: 300px">
  <p-panelmenu [model]="items" [multiple]="true">
    <ng-template #item let-item let-props="props" let-hasSubmenu="hasSubmenu">
      <a [attr.href]="item.url" [attr.target]="item.target" v-bind="props?.action" class="p-panelmenu-item-link flex items-center gap-2 w-full">
        @if (item.icon) {<span [class]="'p-panelmenu-item-icon ' + item.icon"></span>}
        <div class="panelmenu-item-label flex-1">
          <span class="p-panelmenu-item-label">{{ item.label }}</span>
          @if (item['description']) {<small class="panelmenu-item-caption">{{ item['description'] }}</small>}
        </div>
        @if (item['badge']) {<p-badge [value]="item['badge']"></p-badge>}
        @if (hasSubmenu) {<span class="p-panelmenu-submenu-icon ti ti-chevron-right"></span>}
      </a>
    </ng-template>
  </p-panelmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-panelmenu-custom',
  standalone: true,
  imports: [PanelMenu, Badge],
  template,
  styles
})
export class PanelMenuCustomComponent {
  items: ExtraMenuItem[] = [
    {
      label: 'Дашборд',
      icon: 'ti ti-layout-dashboard',
      description: 'Главная страница',
      items: [
        { label: 'Аналитика', icon: 'ti ti-chart-line', description: 'Аналитика данных' },
        { label: 'Отчёты', icon: 'ti ti-file-analytics', description: 'Сводные отчёты' },
        { label: 'Статистика', icon: 'ti ti-chart-bar', description: 'Показатели доставки' }
      ]
    },
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      description: 'Управление заказами',
      badge: 'New'
    },
    {
      label: 'Склады',
      icon: 'ti ti-building-warehouse',
      description: 'Складское хранение',
      items: [
        { label: 'Документы', icon: 'ti ti-file-text', description: 'Накладные и акты' },
        { label: 'Фото', icon: 'ti ti-photo', description: 'Фотофиксация грузов' }
      ]
    },
    {
      label: 'Настройки',
      icon: 'ti ti-settings',
      description: 'Параметры системы',
      disabled: true
    }
  ];
}

export const Custom: StoryObj = {
  render: () => ({
    template: `<app-panelmenu-custom></app-panelmenu-custom>`
  }),
  parameters: {
    docs: {
      description: { story: 'Кастомный шаблон пункта меню с описанием и бейджем.' },
      source: {
        language: 'ts',
        code: `
import { ExtraMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-panelmenu-custom',
  standalone: true,
  imports: [PanelMenu, Badge],
  template: \`
    <p-panelmenu [model]="items" [multiple]="true">
      <ng-template #item let-item let-props="props" let-hasSubmenu="hasSubmenu">
        <a class="p-panelmenu-item-link flex items-center gap-2 w-full">
          @if (item.icon) {<span [class]="'p-panelmenu-item-icon ' + item.icon"></span>}
          <div class="panelmenu-item-label flex-1">
            <span class="p-panelmenu-item-label">{{ item.label }}</span>
            @if (item['description']) {<small class="panelmenu-item-caption">{{ item['description'] }}</small>}
          </div>
          @if (item['badge']) {<p-badge [value]="item['badge']"></p-badge>}
          @if (hasSubmenu) {<span class="p-panelmenu-submenu-icon ti ti-chevron-right"></span>}
        </a>
      </ng-template>
    </p-panelmenu>
  \`,
})
export class PanelMenuCustomComponent {
  items: ExtraMenuItem[] = [
    {
      label: 'Дашборд',
      icon: 'ti ti-layout-dashboard',
      description: 'Главная страница',
      items: [
        { label: 'Аналитика', icon: 'ti ti-chart-line', description: 'Аналитика данных' },
        { label: 'Отчёты', icon: 'ti ti-file-analytics', description: 'Сводные отчёты' },
      ],
    },
    { label: 'Отправления', icon: 'ti ti-package', description: 'Управление заказами', badge: 'New' },
    {
      label: 'Склады',
      icon: 'ti ti-building-warehouse',
      description: 'Складское хранение',
      items: [
        { label: 'Документы', icon: 'ti ti-file-text', description: 'Накладные и акты' },
        { label: 'Фото', icon: 'ti ti-photo', description: 'Фотофиксация грузов' },
      ],
    },
    { label: 'Настройки', icon: 'ti ti-settings', description: 'Параметры системы', disabled: true },
  ];
}
        `
      }
    }
  }
};
