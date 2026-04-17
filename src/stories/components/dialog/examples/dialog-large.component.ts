import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="visible = true" label="Детали отправления"></p-button>

  <ng-template #footer>
    <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
    <p-button label="Сохранить" (onClick)="visible = false"></p-button>
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
  imports: [DialogComponent, Button],
  template,
})
export class DialogLargeComponent {
  visible = false;
}
