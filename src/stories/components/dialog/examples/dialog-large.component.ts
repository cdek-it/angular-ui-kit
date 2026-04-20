import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <button (click)="visible = true" label="Детали отправления"></button>

  <ng-template #footer>
    <button variant="text" label="Отмена" (click)="visible = false"></button>
    <button label="Сохранить" (click)="visible = false"></button>
  </ng-template>

  <dialog
    header="Детали отправления"
    size="lg"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Отправление CDEK-2025-00478312 передано курьеру для доставки до двери получателя. Последнее обновление: 09.04.2025, 14:35. Адрес доставки: г. Новосибирск, ул. Ленина, 42, кв. 8. Получатель: Иванов И.И., +7 913 000-00-00.</p>
  </dialog>
</div>
`;

@Component({
  selector: 'app-dialog-large',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogComponent, ButtonComponent],
  template,
})
export class DialogLargeComponent {
  visible = false;
}
