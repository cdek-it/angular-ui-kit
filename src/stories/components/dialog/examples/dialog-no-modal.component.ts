import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <button (click)="visible = true" label="Показать маршрут"></button>

  <ng-template #footer>
    <button variant="text" label="Отмена" (click)="visible = false"></button>
    <button label="Сохранить" (click)="visible = false"></button>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogComponent, ButtonComponent],
  template,
})
export class DialogNoModalComponent {
  visible = false;
}
