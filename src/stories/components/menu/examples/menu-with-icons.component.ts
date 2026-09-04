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
  selector: 'app-menu-with-icons',
  standalone: true,
  imports: [ExtraMenuComponent],
  template
})
export class MenuWithIconsComponent {
  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
    { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' },
    { separator: true },
    { label: 'Распечатать накладную', icon: 'ti ti-printer' },
    { label: 'Экспорт данных', icon: 'ti ti-download' }
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((entry) => ('separator' in entry ? entry : { ...entry, selected: entry === item }));
  }
}
