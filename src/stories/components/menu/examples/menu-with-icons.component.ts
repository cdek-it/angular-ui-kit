import { Component } from '@angular/core';
import { MenuComponent, MenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <menu [model]="items"></menu>
</div>
`;

@Component({
  selector: 'app-menu-with-icons',
  standalone: true,
  imports: [MenuComponent],
  template,
})
export class MenuWithIconsComponent {
  items: MenuModel[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
    { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' },
    { separator: true },
    { label: 'Распечатать накладную', icon: 'ti ti-printer' },
    { label: 'Экспорт данных', icon: 'ti ti-download' },
  ];
}
