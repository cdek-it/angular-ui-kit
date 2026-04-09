import { Component } from '@angular/core';
import { MenuComponent, MenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <menu [model]="items"></menu>
</div>
`;

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [MenuComponent],
  template,
})
export class MenuBasicComponent {
  items: MenuModel[] = [
    { label: 'Новый заказ' },
    { label: 'Поиск отправления' },
    { separator: true },
    { label: 'Экспорт' },
  ];
}
