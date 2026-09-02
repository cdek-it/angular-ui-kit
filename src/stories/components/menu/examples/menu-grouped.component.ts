import { Component } from '@angular/core';
import {
  ExtraMenuComponent,
  ExtraMenuGroup,
  ExtraMenuItemSelectEvent
} from '../../../../lib/components/menu/menu.component';

const template = `
<extra-menu [items]="items" (onItemSelect)="select($event)"></extra-menu>
`;

@Component({
  selector: 'app-menu-grouped',
  standalone: true,
  imports: [ExtraMenuComponent],
  template
})
export class MenuGroupedComponent {
  items: ExtraMenuGroup[] = [
    {
      label: 'Заказы',
      items: [
        { label: 'Новый заказ', icon: 'ti ti-plus' },
        { label: 'Список заказов', icon: 'ti ti-list' },
        { label: 'Архив', icon: 'ti ti-archive' }
      ]
    },
    {
      label: 'Отправления',
      items: [
        { label: 'Создать накладную', icon: 'ti ti-file-invoice' },
        { label: 'Отследить посылку', icon: 'ti ti-map-pin' },
        { label: 'Отменить отправление', icon: 'ti ti-ban' }
      ]
    }
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((group) => ({
      ...group,
      items: group.items.map((action) => ({ ...action, selected: action === item }))
    }));
  }
}
