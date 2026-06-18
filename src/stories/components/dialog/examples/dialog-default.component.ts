import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogFooterDirective } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Создать заявку"></extra-button>

  <extra-dialog
    header="Подтверждение заявки"
    [visible]="visible"
    (visibleChange)="visible = $event"
  >
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению. Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок доставки — 3 рабочих дня.</p>
    <ng-template extraDialogFooter>
      <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
      <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
    </ng-template>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogFooterDirective, ExtraButtonComponent],
  template
})
export class DialogDefaultComponent {
  visible = false;
}
