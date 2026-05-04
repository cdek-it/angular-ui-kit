import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MenuItem } from 'primeng/api';
import { TieredMenuComponent } from '../../../../lib/components/tieredmenu/tieredmenu.component';
import { basicItems } from '../tieredmenu.data';

const template = `
<div class="bg-surface-ground" style="min-height: 280px">
  <tieredmenu [model]="items"></tieredmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-tieredmenu-basic',
  standalone: true,
  imports: [TieredMenuComponent],
  template,
  styles,
})
export class TieredMenuBasicComponent {
  items: MenuItem[] = basicItems;
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-tieredmenu-basic></app-tieredmenu-basic>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Базовое иерархическое меню с вложенными подменю.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-tieredmenu-basic',
  standalone: true,
  imports: [TieredMenuComponent],
  template: \`
    <tieredmenu [model]="items"></tieredmenu>
  \`,
})
export class TieredMenuBasicComponent {
  items: MenuItem[] = [
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      items: [
        { label: 'Новые' },
        { label: 'В обработке' },
        { label: 'Доставленные' },
        { label: 'Возвраты', items: [{ label: 'Ожидают' }, { label: 'Завершённые' }] },
      ],
    },
    { label: 'Маршруты' },
    {
      label: 'Склады',
      items: [{ label: 'Москва' }, { label: 'Новосибирск' }, { label: 'Екатеринбург' }],
    },
    { label: 'Настройки', icon: 'ti ti-settings', disabled: true },
  ];
}
        `,
      },
    },
  },
};
