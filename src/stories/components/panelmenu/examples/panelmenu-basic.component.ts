import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MenuItem } from 'primeng/api';
import { ExtraPanelMenuComponent } from '../../../../lib/components/panelmenu/panelmenu.component';

const template = `
<div class="bg-surface-ground" style="width: 280px">
  <extra-panelmenu [model]="items"></extra-panelmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-panelmenu-basic',
  standalone: true,
  imports: [ExtraPanelMenuComponent],
  template,
  styles
})
export class PanelMenuBasicComponent {
  items: MenuItem[] = [
    {
      label: 'Отправления',
      items: [
        { label: 'Новые' },
        { label: 'В пути' },
        { label: 'Доставленные' },
        { label: 'Возвраты', items: [{ label: 'Ожидают' }, { label: 'Завершённые' }] }
      ]
    },
    { label: 'Маршруты' },
    {
      label: 'Склады',
      items: [{ label: 'Москва' }, { label: 'Новосибирск' }, { label: 'Екатеринбург' }]
    },
    { label: 'Настройки', disabled: true }
  ];
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-panelmenu-basic></app-panelmenu-basic>`
  }),
  parameters: {
    docs: {
      description: { story: 'Базовое аккордеон-меню без иконок.' },
      source: {
        language: 'ts',
        code: `
import { ExtraPanelMenuComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-panelmenu-basic',
  standalone: true,
  imports: [ExtraPanelMenuComponent],
  template: \`
    <extra-panelmenu [model]="items"></extra-panelmenu>
  \`,
})
export class PanelMenuBasicComponent {
  items: MenuItem[] = [
    {
      label: 'Отправления',
      items: [
        { label: 'Новые' },
        { label: 'В пути' },
        { label: 'Доставленные' },
        { label: 'Возвраты', items: [{ label: 'Ожидают' }, { label: 'Завершённые' }] },
      ],
    },
    { label: 'Маршруты' },
    {
      label: 'Склады',
      items: [
        { label: 'Москва' },
        { label: 'Новосибирск' },
        { label: 'Екатеринбург' },
      ],
    },
    { label: 'Настройки', disabled: true },
  ];
}
        `
      }
    }
  }
};
