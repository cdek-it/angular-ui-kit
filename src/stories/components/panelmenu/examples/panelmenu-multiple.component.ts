import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMenuItem } from '../../../../lib/shared';
import { ExtraPanelMenuComponent } from '../../../../lib/components/panelmenu/panelmenu.component';

const template = `
<div class="bg-surface-ground" style="width: 280px">
  <extra-panelmenu [model]="items" [multiple]="true"></extra-panelmenu>
</div>
`;
const styles = '';

@Component({
  selector: 'app-panelmenu-multiple',
  standalone: true,
  imports: [ExtraPanelMenuComponent],
  template,
  styles
})
export class PanelMenuMultipleComponent {
  items: ExtraMenuItem[] = [
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
          items: [{ label: 'Ожидают' }, { label: 'Завершённые' }]
        }
      ]
    },
    { label: 'Маршруты', icon: 'ti ti-route' },
    {
      label: 'Склады',
      icon: 'ti ti-building-warehouse',
      items: [{ label: 'Москва' }, { label: 'Новосибирск' }, { label: 'Екатеринбург' }]
    },
    { label: 'Настройки', icon: 'ti ti-settings', disabled: true }
  ];
}

export const Multiple: StoryObj = {
  render: () => ({
    template: `<app-panelmenu-multiple></app-panelmenu-multiple>`
  }),
  parameters: {
    docs: {
      description: { story: 'Несколько панелей могут быть раскрыты одновременно.' },
      source: {
        language: 'ts',
        code: `
import { ExtraPanelMenuComponent, ExtraMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-panelmenu-multiple',
  standalone: true,
  imports: [ExtraPanelMenuComponent],
  template: \`
    <extra-panelmenu [model]="items" [multiple]="true"></extra-panelmenu>
  \`,
})
export class PanelMenuMultipleComponent {
  items: ExtraMenuItem[] = [
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
        `
      }
    }
  }
};
