import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <button (click)="visible = true" label="Открыть диалог"></button>

  <ng-template #footer>
    <div class="flex justify-end w-full">
      <button label="Закрыть" (click)="visible = false"></button>
    </div>
  </ng-template>

  <dialog
    [showHeader]="false"
    [dismissableMask]="true"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Заявка на доставку принята в обработку. Трек-номер будет присвоен в течение 15 минут и отправлен на указанный email.</p>
  </dialog>
</div>
`;

@Component({
  selector: 'app-dialog-no-header',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template,
})
export class DialogNoHeaderComponent {
  visible = false;
}
