import { Component } from '@angular/core';
import { ExtraMenuComponent, ExtraMenuItem } from '../../../../lib/components/menu/menu.component';

const template = `
<div class="bg-surface-ground">
  <extra-menu [items]="items"></extra-menu>
</div>
`;

@Component({
  selector: 'app-menu-basic',
  standalone: true,
  imports: [ExtraMenuComponent],
  template
})
export class MenuBasicComponent {
  items: ExtraMenuItem[] = [
    { label: 'Новый заказ' },
    { label: 'Поиск отправления' },
    { separator: true },
    { label: 'Экспорт' }
  ];
}
