import { Component, ViewChild } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '../../../../lib/components/menu/menu.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground">
  <extra-button label="Действия с заказом" variant="secondary" (click)="toggle($event)"></extra-button>
  <extra-menu #menuRef [model]="items" [popup]="true"></extra-menu>
</div>
`;

@Component({
  selector: 'app-menu-popup',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraButtonComponent],
  template
})
export class MenuPopupComponent {
  @ViewChild('menuRef') menuRef!: ExtraMenuComponent;

  items: ExtraMenuModel[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Найти по трек-номеру', icon: 'ti ti-search' },
    { separator: true },
    { label: 'Экспорт данных', icon: 'ti ti-download' }
  ];

  toggle(event: Event): void {
    this.menuRef.toggle(event);
  }
}
