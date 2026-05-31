import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Посмотреть статус"></extra-button>

  <ng-template #footer>
    <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
    <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
  </ng-template>

  <extra-dialog
    header="Статус отправления"
    size="sm"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Отправление CDEK-2025-00478312 прибыло на сортировочный центр г. Новосибирск и готово к передаче курьеру.</p>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-small',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraButtonComponent],
  template,
})
export class DialogSmallComponent {
  visible = false;
}
