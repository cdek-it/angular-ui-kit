import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Открыть диалог"></extra-button>

  <ng-template #footer>
    <div class="flex justify-end w-full">
      <extra-button label="Закрыть" (click)="visible = false"></extra-button>
    </div>
  </ng-template>

  <extra-dialog
    [showHeader]="false"
    [dismissableMask]="true"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>Заявка на доставку принята в обработку. Трек-номер будет присвоен в течение 15 минут и отправлен на указанный email.</p>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-no-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraButtonComponent],
  template
})
export class DialogNoHeaderComponent {
  visible = false;
}
