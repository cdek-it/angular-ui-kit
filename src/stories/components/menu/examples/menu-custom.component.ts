import { Component } from '@angular/core';
import { MenuComponent, MenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <menu [model]="items"></menu>
</div>
`;

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [MenuComponent],
  template,
})
export class MenuCustomComponent {
  items: MenuModel[] = [
    {
      label: 'Создать отправление',
      caption: 'Оформление нового заказа',
      icon: 'ti ti-file-plus',
    },
    {
      label: 'Найти посылку',
      caption: 'Поиск по трек-номеру',
      icon: 'ti ti-map-pin',
    },
    { separator: true },
    {
      label: 'Экспорт данных',
      caption: 'Выгрузка в CSV или Excel',
      icon: 'ti ti-download',
    },
  ];
}
