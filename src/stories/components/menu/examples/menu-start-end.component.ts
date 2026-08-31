import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuItem } from '../../../../lib/components/menu/menu.component';
import { ExtraMenuTemplateDirective } from '../../../../lib/components/menu/menu-template.directive';

const template = `
<div class="bg-surface-ground">
  <extra-menu [items]="items">
    <ng-template extraMenuTemplate="start">
      <div class="flex items-center gap-3 px-4 py-3 border-b border-surface-200">
        <span class="ti ti-user-circle text-2xl text-surface-500"></span>
        <div class="flex flex-col min-w-0">
          <span class="font-semibold truncate">Иван Иванов</span>
          <small class="text-surface-400 text-xs truncate">ivan@example.com</small>
        </div>
      </div>
    </ng-template>
    <ng-template extraMenuTemplate="end">
      <a class="flex items-center gap-2 px-4 py-3 border-t border-surface-200 text-primary" href="#">
        <span class="ti ti-settings text-lg"></span>
        <span class="text-sm font-medium">Все настройки</span>
      </a>
    </ng-template>
  </extra-menu>
</div>
`;

@Component({
  selector: 'app-menu-start-end',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraMenuTemplateDirective],
  template
})
export class MenuStartEndComponent {
  items: ExtraMenuItem[] = [
    { label: 'Профиль', icon: 'ti ti-user' },
    { label: 'Уведомления', icon: 'ti ti-bell' },
    { separator: true },
    { label: 'Выйти', icon: 'ti ti-logout' }
  ];
}
