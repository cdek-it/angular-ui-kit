import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <button (click)="visible = true" label="Создать заявку"></button>

  <ng-template #footer>
    <button variant="text" label="Отмена" (click)="visible = false"></button>
    <button label="Подтвердить" (click)="visible = false"></button>
  </ng-template>

  <dialog
    header="Подтверждение заявки"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению. Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок доставки — 3 рабочих дня.</p>
  </dialog>
</div>
`;

@Component({
  selector: 'app-dialog-basic',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template,
})
export class DialogDefaultComponent {
  visible = false;
}
