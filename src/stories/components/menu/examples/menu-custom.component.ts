import { Component } from '@angular/core';
import {
  ExtraMenuAction,
  ExtraMenuComponent,
  ExtraMenuItemSelectEvent,
  ExtraMenuSeparator
} from '../../../../lib/components/menu/menu.component';
import { ExtraMenuTemplateDirective } from '../../../../lib/components/menu/menu-template.directive';

const template = `
<extra-menu [items]="items" (onItemSelect)="select($event)">
  <ng-template extraMenuTemplate="item" let-item>
    <a
      class="p-menu-item-link flex items-center gap-3 px-4 py-2"
      [attr.tabindex]="-1"
      [class.opacity-50]="item.disabled"
    >
      @if (item.icon) {
        <span
          [class]="item.icon"
          class="text-xl w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white shrink-0"
        ></span>
      }
      <div class="flex flex-col min-w-0">
        <span class="p-menu-item-label font-semibold truncate">{{ item.label }}</span>
        @if (item.caption) {
          <small class="text-surface-400 text-xs truncate">{{ item.caption }}</small>
        }
      </div>
    </a>
  </ng-template>
</extra-menu>
`;

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [ExtraMenuComponent, ExtraMenuTemplateDirective],
  template
})
export class MenuCustomComponent {
  items: (ExtraMenuAction | ExtraMenuSeparator)[] = [
    {
      label: 'Создать отправление',
      caption: 'Оформление нового заказа',
      icon: 'ti ti-file-plus'
    },
    {
      label: 'Найти посылку',
      caption: 'Поиск по трек-номеру',
      icon: 'ti ti-map-pin'
    },
    { separator: true },
    {
      label: 'Экспорт данных',
      caption: 'Выгрузка в CSV или Excel',
      icon: 'ti ti-download'
    },
    {
      label: 'Удалить',
      caption: 'Действие недоступно',
      icon: 'ti ti-trash',
      disabled: true
    }
  ];

  select({ item }: ExtraMenuItemSelectEvent): void {
    this.items = this.items.map((entry) => ('separator' in entry ? entry : { ...entry, selected: entry === item }));
  }
}
