import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MenuItem } from 'primeng/api';
import { PanelMenuComponent } from '../../../../lib/components/panelmenu/panelmenu.component';

const template = `
<div class="bg-surface-ground" style="width: 280px">
  <panelmenu [model]="items" [multiple]="true"></panelmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-panelmenu-multiple',
  standalone: true,
  imports: [PanelMenuComponent],
  template,
  styles,
})
export class PanelMenuMultipleComponent {
  items: MenuItem[] = [
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      items: [
        { label: 'Новые', icon: 'ti ti-circle-plus' },
        { label: 'В пути', icon: 'ti ti-truck' },
        { label: 'Доставленные', icon: 'ti ti-circle-check' },
        {
          label: 'Возвраты',
          icon: 'ti ti-arrow-back',
          items: [{ label: 'Ожидают' }, { label: 'Завершённые' }],
        },
      ],
    },
    { label: 'Маршруты', icon: 'ti ti-route' },
    {
      label: 'Склады',
      icon: 'ti ti-building-warehouse',
      items: [
        { label: 'Москва' },
        { label: 'Новосибирск' },
        { label: 'Екатеринбург' },
      ],
    },
    { label: 'Настройки', icon: 'ti ti-settings', disabled: true },
  ];
}

export const Multiple: StoryObj = {
  render: () => ({
    template: `<app-panelmenu-multiple></app-panelmenu-multiple>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Несколько панелей могут быть раскрыты одновременно.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-panelmenu-multiple',
  standalone: true,
  imports: [PanelMenuComponent],
  template: \`
    <panelmenu [model]="items" [multiple]="true"></panelmenu>
  \`,
})
export class PanelMenuMultipleComponent {
  items: MenuItem[] = [
    {
      label: 'Отправления',
      icon: 'ti ti-package',
      items: [
        { label: 'Новые', icon: 'ti ti-circle-plus' },
        { label: 'В пути', icon: 'ti ti-truck' },
        { label: 'Доставленные', icon: 'ti ti-circle-check' },
        { label: 'Возвраты', icon: 'ti ti-arrow-back', items: [{ label: 'Ожидают' }, { label: 'Завершённые' }] },
      ],
    },
    { label: 'Маршруты', icon: 'ti ti-route' },
    {
      label: 'Склады',
      icon: 'ti ti-building-warehouse',
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
