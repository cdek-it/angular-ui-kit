import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogFooterDirective } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Посмотреть статус"></extra-button>

  <extra-dialog
    header="Статус отправления"
    size="sm"
    [visible]="visible"
    (visibleChange)="visible = $event"
  >
    <p>Отправление CDEK-2025-00478312 прибыло на сортировочный центр г. Новосибирск и готово к передаче курьеру.</p>
    <ng-template extraDialogFooter>
      <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
      <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
    </ng-template>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-small',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogFooterDirective, ExtraButtonComponent],
  template
})
export class DialogSmallComponent {
  visible = false;
}
