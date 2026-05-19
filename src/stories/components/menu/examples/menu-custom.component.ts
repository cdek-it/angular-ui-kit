import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <extra-menu [model]="items"></extra-menu>
</div>
`;

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [ExtraMenuComponent],
  template,
})
export class MenuCustomComponent {
  items: ExtraMenuModel[] = [
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
