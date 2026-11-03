import { Component } from '@angular/core';
import {
  ExtraMenuAction,
  ExtraMenuComponent,
  ExtraMenuItemSelectEvent,
  ExtraMenuSeparator
} from '../../../../lib/components/menu/menu.component';
import { ExtraMenuTemplateDirective } from '../../../../lib/components/menu/menu-template.directive';
import { ExtraBadgeComponent } from '../../../../lib/components/badge/badge.component';

export const menuItemEndTemplate = `
<extra-menu [items]="items" (onItemSelect)="select($event)">
  <ng-template extraMenuTemplate="itemEnd" let-item>
    @if (hotkeys[item.id]) {
      <small class="menu-item-caption">{{ hotkeys[item.id] }}</small>
    }
    @if (item.id === 'registry') {
      <extra-badge value="Новое" severity="info"></extra-badge>
    }
  </ng-template>
</extra-menu>
`;

@Component({
  selector: 'app-menu-item-end',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraMenuTemplateDirective, ExtraBadgeComponent],
  template: menuItemEndTemplate
})
export class MenuItemEndComponent {
  hotkeys: Record<string, string> = { create: 'Ctrl+N', search: 'Ctrl+F' };

  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    { id: 'create', label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { id: 'search', label: 'Найти по трек-номеру', icon: 'ti ti-search' },
    { separator: true },
    { id: 'registry', label: 'Скачать реестр', caption: 'За текущий месяц', icon: 'ti ti-download' }
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((entry) => ('separator' in entry ? entry : { ...entry, selected: entry === item }));
  }
}
