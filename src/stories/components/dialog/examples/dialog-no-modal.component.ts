import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogFooterDirective } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Показать маршрут"></extra-button>

  <extra-dialog
    header="Маршрут доставки"
    [modal]="false"
    [visible]="visible"
    (visibleChange)="visible = $event"
  >
    <p>Маршрут отправления CDEK-2025-00478312: Москва (склад) → Новосибирск (сортировочный центр) → Новосибирск (пункт выдачи). Это окно не блокирует основной контент страницы.</p>
    <ng-template extraDialogFooter>
      <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
      <extra-button label="Сохранить" (click)="visible = false"></extra-button>
    </ng-template>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-no-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogFooterDirective, ExtraButtonComponent],
  template
})
export class DialogNoModalComponent {
  visible = false;
}
