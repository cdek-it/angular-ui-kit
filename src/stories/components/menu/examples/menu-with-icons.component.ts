import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuModel } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <extra-menu [model]="items"></extra-menu>
</div>
`;

@Component({
  selector: 'app-menu-with-icons',
  standalone: true,
  imports: [ExtraMenuComponent],
  template
})
export class MenuWithIconsComponent {
  items: ExtraMenuModel[] = [
    { label: 'Создать отправление', icon: 'ti ti-file-plus' },
    { label: 'Открыть список заказов', icon: 'ti ti-folder-open' },
    { label: 'Сохранить черновик', icon: 'ti ti-device-floppy' },
    { separator: true },
    { label: 'Распечатать накладную', icon: 'ti ti-printer' },
    { label: 'Экспорт данных', icon: 'ti ti-download' }
  ];
}
