import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="visible = true" label="Показать маршрут"></p-button>

  <ng-template #footer>
    <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
    <p-button label="Сохранить" (onClick)="visible = false"></p-button>
  </ng-template>

  <dialog
    header="Маршрут доставки"
    [modal]="false"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Маршрут отправления CDEK-2025-00478312: Москва (склад) → Новосибирск (сортировочный центр) → Новосибирск (пункт выдачи). Это окно не блокирует основной контент страницы.</p>
  </dialog>
</div>
`;

@Component({
  selector: 'app-dialog-no-modal',
  standalone: true,
  imports: [DialogComponent, Button],
  template,
})
export class DialogNoModalComponent {
  visible = false;
}
