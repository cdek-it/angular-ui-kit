import { Component } from '@angular/core';
import {
  ExtraMenuAction,
  ExtraMenuComponent,
  ExtraMenuItemSelectEvent,
  ExtraMenuSeparator
} from '../../../../lib/components/menu/menu.component';

const template = `
<extra-menu [items]="items" (onItemSelect)="select($event)"></extra-menu>
`;

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [ExtraMenuComponent],
  template
})
export class MenuBasicComponent {
  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    { label: 'Новый заказ' },
    { label: 'Поиск отправления' },
    { separator: true },
    { label: 'Экспорт' }
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((entry) => ('separator' in entry ? entry : { ...entry, selected: entry === item }));
  }
}
