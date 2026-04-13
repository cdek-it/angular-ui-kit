import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="visible = true" label="Создать заявку"></p-button>

  <ng-template #footer>
    <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
    <p-button label="Подтвердить" (onClick)="visible = false"></p-button>
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
  imports: [DialogComponent, Button],
  template,
})
export class DialogDefaultComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
