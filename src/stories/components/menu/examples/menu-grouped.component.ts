import { Component } from '@angular/core';
import { MenuComponent, MenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <menu [model]="items"></menu>
</div>
`;

@Component({
  selector: 'app-menu-grouped',
  standalone: true,
  imports: [MenuComponent],
  template,
})
export class MenuGroupedComponent {
  items: MenuModel[] = [
    {
      label: 'Заказы',
      items: [
        { label: 'Новый заказ', icon: 'ti ti-plus' },
        { label: 'Список заказов', icon: 'ti ti-list' },
        { label: 'Архив', icon: 'ti ti-archive' },
      ],
    },
    {
      label: 'Отправления',
      items: [
        { label: 'Создать накладную', icon: 'ti ti-file-invoice' },
        { label: 'Отследить посылку', icon: 'ti ti-map-pin' },
        { label: 'Отменить отправление', icon: 'ti ti-ban' },
      ],
    },
  ];
}
