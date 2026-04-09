import { Component, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { MenuComponent, MenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <p-button label="Действия с заказом" severity="contrast" (onClick)="toggle($event)"></p-button>
  <menu #menuRef [model]="items" [popup]="true"></menu>
</div>
`;

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [MenuComponent, Button],
  template,
})
export class MenuPopupComponent {
  @ViewChild('menuRef') menuRef!: MenuComponent;

  items: MenuModel[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Найти по трек-номеру', icon: 'ti ti-search' },
    { separator: true },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];

  toggle(event: Event): void {
    this.menuRef.toggle(event);
  }
}
