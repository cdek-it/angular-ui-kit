import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <extra-menu [model]="items" [itemTemplate]="customItem"></extra-menu>
</div>

<ng-template #customItem let-item>
  <a
    class="p-menu-item-link flex items-center gap-3 px-4 py-2"
    role="menuitem"
    tabindex="0"
    [class.opacity-50]="item.disabled"
    [attr.href]="item.url || null"
    (click)="!item.disabled && item.command && item.command({ originalEvent: $event, item: item })"
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
    @if (item.badge) {
      <span class="ml-auto text-xs font-bold bg-primary text-white rounded-full px-2 py-0.5">
        {{ item.badge }}
      </span>
    }
  </a>
</ng-template>
`;

@Component({
  selector: 'app-menu-custom',
  standalone: true,
  imports: [ExtraMenuComponent],
  template
})
export class MenuCustomComponent {
  items: ExtraMenuModel[] = [
    {
      label: 'Создать отправление',
      caption: 'Оформление нового заказа',
      icon: 'ti ti-file-plus',
      badge: 'Новое'
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
}
