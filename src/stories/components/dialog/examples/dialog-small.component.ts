import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="visible = true" label="Посмотреть статус"></p-button>

  <ng-template #footer>
    <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
    <p-button label="Подтвердить" (onClick)="visible = false"></p-button>
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
  imports: [DialogComponent, Button],
  template,
})
export class DialogSmallComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
