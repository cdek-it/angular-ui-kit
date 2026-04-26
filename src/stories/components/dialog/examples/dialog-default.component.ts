import { Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Создать заявку"></extra-button>

  <ng-template #footer>
    <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
    <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
  </ng-template>

  <extra-dialog
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
  imports: [ExtraDialogComponent, ExtraButtonComponent],
  template,
})
export class DialogDefaultComponent {
  visible = false;
}
