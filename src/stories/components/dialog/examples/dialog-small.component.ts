import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <button (click)="visible = true" label="Посмотреть статус"></button>

  <ng-template #footer>
    <button variant="text" label="Отмена" (click)="visible = false"></button>
    <button label="Подтвердить" (click)="visible = false"></button>
  </ng-template>

  <dialog
    header="Статус отправления"
    size="sm"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Отправление CDEK-2025-00478312 прибыло на сортировочный центр г. Новосибирск и готово к передаче курьеру.</p>
  </dialog>
</div>
`;

@Component({
  selector: 'app-dialog-small',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template,
})
export class DialogSmallComponent {
  visible = false;
}
