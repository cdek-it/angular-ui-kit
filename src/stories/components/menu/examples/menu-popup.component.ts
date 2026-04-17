import { Component, ViewChild } from '@angular/core';
import { MenuComponent, MenuModel } from '../../../../lib/components/menu/menu.component';
import { ButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <button label="Действия с заказом" variant="secondary" (click)="toggle($event)"></button>
  <menu #menuRef [model]="items" [popup]="true"></menu>
</div>
`;

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [MenuComponent, ButtonComponent],
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
