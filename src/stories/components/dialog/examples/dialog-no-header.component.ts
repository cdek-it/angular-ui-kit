import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="visible = true" label="Открыть диалог"></p-button>

  <ng-template #footer>
    <div class="flex justify-end w-full">
      <p-button label="Закрыть" (onClick)="visible = false"></p-button>
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
  imports: [DialogComponent, Button],
  template,
})
export class DialogNoHeaderComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
